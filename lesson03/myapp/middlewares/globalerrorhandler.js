const globalErrorHandler = (err, req, res, next) => {
    console.error('Error stack:', err.stack);
    res.status(err.status || 500).json({
        message: 'APIs is not found',
        error: err.message
    });
};

module.exports = globalErrorHandler;