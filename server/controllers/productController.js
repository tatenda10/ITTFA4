const db = require('../models/db');

exports.addProduct = (req, res) => {
    const { name,author, description, price, quantity, category_name } = req.body;
    const imagePath = req.file ? `/images/${req.file.filename}` : null;
    db.query('INSERT INTO products (name, description,author, price, quantity, image_path, category_name) VALUES (?, ?, ?, ?, ?,?, ?)', [name, description,author, price, quantity, imagePath, category_name], (err) => {
        if (err) return res.status(500).send(err);
        res.status(201).send('Product added');
    });
};

exports.getProductsByCategory = (req, res) => {
    const { category_name } = req.params;
    db.query('SELECT * FROM products WHERE category_name = ?', [category_name], (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(results);
    });
};

exports.getAllProducts = (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(results);
    });
};


exports.getProductById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send('Product not found');
        res.status(200).send(results[0]);
    });
};