const http = require('http');
const url = require('url');
const books = require('./books');

const PORT = 3000;

let bookList = [...books]; // Use a mutable copy for CRUD

function sendJSON(res, statusCode, data) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname, query } = parsedUrl;

    // GET /books - list of code and name
    if (req.method === 'GET' && pathname === '/books' && !query.bookId) {
        const result = bookList.map(b => ({ id: b.id, name: b.name, page: b.page, price: b.price }));
        return sendJSON(res, 200, result);
    }

    // GET /books?bookId=xxx - get book by id
    if (req.method === 'GET' && pathname === '/books' && query.bookId) {
        const book = bookList.find(b => b.id == query.bookId);
        if (book) return sendJSON(res, 200, book);
        return sendJSON(res, 404, { message: 'Book not found' });
    }

    // POST /books - create new book
    if (req.method === 'POST' && pathname === '/books') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            try {
                const newBook = JSON.parse(body);
                if (!newBook.id || !newBook.name || !newBook.page || !newBook.price) {
                    return sendJSON(res, 400, { message: 'Missing book fields' });
                }
                if (bookList.some(b => b.id == newBook.id)) {
                    return sendJSON(res, 409, { message: 'Book ID already exists' });
                }
                bookList.push(newBook);
                sendJSON(res, 201, newBook);
            } catch {
                sendJSON(res, 400, { message: 'Invalid JSON' });
            }
        });
        return;
    }

    // PUT /books?bookId=xxx - update book
    if (req.method === 'PUT' && pathname === '/books' && query.bookId) {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            try {
                const update = JSON.parse(body);
                const idx = bookList.findIndex(b => b.id == query.bookId);
                if (idx === -1) return sendJSON(res, 404, { message: 'Book not found' });
                bookList[idx] = { ...bookList[idx], ...update, id: bookList[idx].id };
                sendJSON(res, 200, bookList[idx]);
            } catch {
                sendJSON(res, 400, { message: 'Invalid JSON' });
            }
        });
        return;
    }

    // DELETE /books?bookId=xxx - remove book
    if (req.method === 'DELETE' && pathname === '/books' && query.bookId) {
        const idx = bookList.findIndex(b => b.id == query.bookId);
        if (idx === -1) return sendJSON(res, 404, { message: 'Book not found' });
        const removed = bookList.splice(idx, 1)[0];
        return sendJSON(res, 200, removed);
    }

    // Not found
    sendJSON(res, 404, { message: 'Not found' });
});

server.listen(3000, () => {
    console.log(`Server running at http://localhost:${PORT}/`);

});