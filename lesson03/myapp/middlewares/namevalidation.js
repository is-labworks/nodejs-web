function nameValidation(req, res, next) {
    const { name } = req.body;
    if (typeof name !== 'string' || name.length <= 7) {
        return res.status(400).json({ error: 'Name must be longer than seven characters.' });
    }
    next();
}

module.exports = nameValidation;