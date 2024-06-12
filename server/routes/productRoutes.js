const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage });

router.post('/',  upload.single('image'), productController.addProduct);
router.get('/', productController.getAllProducts);
router.get('/:category_name', productController.getProductsByCategory);
router.get('/product/:id', productController.getProductById);

module.exports = router;
