const Article = require('../models/article');

//Get all articles
exports.findAll = async (req, res) => {
    try {
        const articles = await Article.find().populate('comments');
        res.json(articles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//Create new article
exports.create = async (req, res) => {
    try {
        const article = new Article(req.body);
        await article.save();
        res.status(201).json(article);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//Update new article
exports.update = async (req, res) => {
    try {
        const article = await Article.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if(!article) {
            return res.status(400).json({ message: "Article not found." });
        }

        res.json(article);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//Delete article by ID
exports.delete = async (req, res) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id);

        if(!article) {
            return res.status(404).json({ message: "Article not found." });
        }
        
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//Find article by ID
exports.findById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id).populate('comments');

        if(!article) {
            return res.status(404).json({ message: "Article not found." });
        }
        
        res.json(article);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};