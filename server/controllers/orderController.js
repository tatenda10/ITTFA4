const db = require('../models/db');


exports.placeOrder = (req, res) => {
    const { user_id, total_price, delivery_date, address, items } = req.body;
    db.query('INSERT INTO orders (user_id, total_price, delivery_date, address) VALUES (?, ?, ?, ?)', [user_id, total_price, delivery_date, address], (err, result) => {
        if (err) return res.status(500).send(err);
        const orderId = result.insertId;
        const orderItems = items.map(item => [orderId, item.product_id, item.quantity, item.price]);
        db.query('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?', [orderItems], (err) => {
            if (err) return res.status(500).send(err);
            res.status(201).send({ message: 'Order placed' });
        });
    });
};


exports.getUserOrders = (req, res) => {
    const userId = req.params.id;
    db.query('SELECT * FROM orders WHERE user_id = ?', [userId], (err, orders) => {
        if (err) return res.status(500).send(err);
        if (orders.length === 0) return res.status(200).send([]);

        const orderIds = orders.map(order => order.id);
        db.query(`
            SELECT oi.*, p.name as product_name 
            FROM order_items oi 
            JOIN products p ON oi.product_id = p.id 
            WHERE order_id IN (?)`, [orderIds], (err, items) => {
            if (err) return res.status(500).send(err);

            const ordersWithItems = orders.map(order => ({
                ...order,
                items: items.filter(item => item.order_id === order.id)
            }));

            res.status(200).send(ordersWithItems);
        });
    });
};

exports.getAllOrders = (req, res) => {
    db.query('SELECT * FROM orders', (err, orders) => {
        if (err) return res.status(500).send(err);
        if (orders.length === 0) return res.status(200).send([]);

        const orderIds = orders.map(order => order.id);
        db.query(`
            SELECT oi.*, p.name as product_name 
            FROM order_items oi 
            JOIN products p ON oi.product_id = p.id 
            WHERE order_id IN (?)`, [orderIds], (err, items) => {
            if (err) return res.status(500).send(err);

            const ordersWithItems = orders.map(order => ({
                ...order,
                items: items.filter(item => item.order_id === order.id)
            }));

            res.status(200).send(ordersWithItems);
        });
    });
};

