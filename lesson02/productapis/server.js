const http = require("http");
const url = require("url");
const products = require("./products"); // Import products array

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  // GET /products: list all code and name
  if (
    req.method === "GET" &&
    parsedUrl.pathname === "/products" &&
    parsedUrl.query.pcode
  ) {
    const product = products.find((p) => p.code === parsedUrl.query.pcode);
    if (product) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Product not found" }));
    }
    return;
  }

  // GET /products → list all (code + name only)
  if (req.method === "GET" && parsedUrl.pathname === "/products") {
    const list = products.map((p) => ({ code: p.code, name: p.name }));
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(list));
    return;
  }

  // POST /products: create new product
  if (req.method === "POST" && parsedUrl.pathname === "/products") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const newProduct = JSON.parse(body);
      products.push(newProduct);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newProduct));
    });
    return;
  }

  // PUT /products?pcode=xxx: update product
  if (
    req.method === "PUT" &&
    parsedUrl.pathname === "/products" &&
    parsedUrl.query.pcode
  ) {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const updatedProduct = JSON.parse(body);
      const index = products.findIndex((p) => p.code === parsedUrl.query.pcode);
      if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(products[index]));
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Product not found" }));
      }
    });
    return;
  }

  // DELETE /products?pcode=xxx: delete product
  if (
    req.method === "DELETE" &&
    parsedUrl.pathname === "/products" &&
    parsedUrl.query.pcode
  ) {
    const index = products.findIndex((p) => p.code === parsedUrl.query.pcode);
    if (index !== -1) {
      products.splice(index, 1);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product deleted" }));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Product not found" }));
    }
    return;
  }

  // Fallback: Not found
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
