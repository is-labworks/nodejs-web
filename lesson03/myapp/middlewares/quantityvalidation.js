function quantityValidation(req, res, next) {
    const { quantity, price } = req.body;

    if (typeof quantity !== 'number' || quantity <= 0) {
        return res.status(400).json({ error: 'Quantity must be a number greater than zero.' });
    }

    if (typeof price === 'number' && price > 100 && quantity >= 500) {
        return res.status(400).json({ error: 'If price is greater than 100, quantity must be less than 500.' });
    }

    next();
}

module.exports = quantityValidation;