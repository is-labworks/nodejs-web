const errorHandler = (err, req, res, next) => {
    try {
        console.error(err.stack);
    
        if (req.method === 'GET') {
            res.status(500);
        } else {
            res.status(400);
        }
    
        res.json({
            error: err.message || 'Internal Server Error'
        });
    }catch (error) {
        next(error);
    }
};

module.exports = errorHandler; 