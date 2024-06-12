const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors'); // Import the cors middleware
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();


app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

// Allow all origins
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
