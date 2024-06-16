const CartService = require('../services/cartService');

async function createCart(req, res) {
    try{
        const cartService = new CartService();
        const response = await cartService.createCart({
            userId: req.user.id
        });
        return res.status(201).json({
            message: "Cart created successfully",
            success: true,
            data: response,
            error: {}
        })
    
    }
    catch(error){
        return res.status(error.statusCode).json({
            reason: error.reason,
            success: false,
            data: {},
            error: error
        })
    }
}

async function addProductToCart(req, res) {
    try{
        console.log('cart controller');
        const cartService = new CartService();
        const response = await cartService.addProductToCart({
            userId: req.user.id,
            productId: req.body.productId,
            quantity: req.body.quantity
        });
        return res.status(200).json({
            message: "Product added to cart successfully",
            success: true,
            data: response,
            error: {}
        })
    
    }
    catch(error){
        return res.status(error.statusCode).json({
            reason: error.reason,
            success: false,
            data: {},
            error: error
        })
    }
}
async function removeProductFromCart(req, res) {
    try{
        const cartService = new CartService();
        const response = await cartService.removeProductFromCart({
            userId: req.user.id,
            productId: req.body.productId
        });
        return res.status(200).json({
            message: "Product removed from cart successfully",
            success: true,
            data: response,
            error: {}
        })
    
    }
    catch(error){
        return res.status(error.statusCode).json({
            reason: error.reason,
            success: false,
            data: {},
            error: error
        })
    }
}
async function getCart(req, res) {
    try{
        const cartService = new CartService();
        const response = await cartService.getCart({
            userId: req.user.id
        });
        return res.status(200).json({
            message: "Cart retrieved successfully",
            success: true,
            data: response,
            error: {}
        })
    
    }
    catch(error){
        return res.status(error.statusCode).json({
            reason: error.reason,
            success: false,
            data: {},
            error: error
        })
    }
}

async function updateCartQuantity(req, res) {
    try{
        const cartService = new CartService();
        const response = await cartService.updateCartQuantity({
            userId: req.user.id,
            productId: req.body.productId,
            quantity: req.body.quantity
        });
        return res.status(200).json({
            message: "Cart updated successfully",
            success: true,
            data: response,
            error: {}
        })
    
    }
    catch(error){
        return res.status(error.statusCode).json({
            reason: error.reason,
            success: false,
            data: {},
            error: error
        })
    }
}

module.exports = {
    createCart,
    addProductToCart,
    removeProductFromCart,
    getCart,
    updateCartQuantity
}