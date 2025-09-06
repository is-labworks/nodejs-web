function priceValidation(req, res, next) {
    const { price } = req.body;
    if (typeof price !== 'number' || price <= 0 || price >= 1000) {
        return res.status(400).json({ error: 'Price must be a number greater than 0 and less than 1000.' });
    }
    next();
}

module.exports = priceValidation;