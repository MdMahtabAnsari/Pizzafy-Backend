const express = require('express');
const cartRouter = express.Router();
const cartController = require('../controllers/cartController');

cartRouter.post('/', cartController.createCart);
cartRouter.get('/', cartController.getCart);
cartRouter.post('/addProduct', cartController.addProductToCart);
cartRouter.delete('/removeProduct', cartController.removeProductFromCart)
cartRouter.put('/updateQuantity', cartController.updateCartQuantity);

module.exports = cartRouter;