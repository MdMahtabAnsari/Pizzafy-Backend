const express = require('express');
const { isAdmin } = require('../validation/authValidator');
const { createProduct, getProductById, deleteProductById } = require('../controllers/productController');
const uploader = require('../middlewares/multerMiddleware');
const productRouter = express.Router()

productRouter.get('/:id',getProductById);
productRouter.post('/', isAdmin, uploader.single('productImage'), createProduct);
productRouter.delete('/:id', isAdmin, deleteProductById);


module.exports = productRouter;