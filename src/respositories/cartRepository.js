const Cart = require('../schema/cartSchema');
const Product = require('../schema/productSchema');

class CartRepository {
    async createCart(cartDetails) {
        try {
            const response = await Cart.create({ ...cartDetails });
            return response;
        }
        catch (error) {
            throw {
                reason: error.message,
                statusCode: 500
            }
        }
    }
    async addProductToCart(cartDetails) {
        try {
            // check if cart exists
            const cart = await Cart.findOne({ userId: cartDetails.userId });
            // cart not found
            if (!cart) {
                throw {
                    reason: "Cart not found",
                    statusCode: 404
                }
            }
            // check if product already exists in cart
            const index = cart.items.findIndex(item => item.productId == cartDetails.productId);
            if (index !== -1) {
                throw {
                    reason: "Product already exists in cart",
                    statusCode: 400
                }
            }
            // check if product quantity is less
            const product = await Product.findById(cartDetails.productId);
            if (product.quantity < parseInt(cartDetails.quantity)) {
                
                throw {
                    reason: "Product quantity is less",
                    statusCode: 400
                }
            }
            // add product to cart
            cart.items = [...cart.items, { productId: cartDetails.productId, quantity: cartDetails.quantity }];
            // update cart
            const response = await Cart.findByIdAndUpdate(cart._id, { items: cart.items }, { new: true });
            return response;
        }
        catch (error) {
            console.log(error.reason, error.statusCode);
            throw {

                reason: error.message || error.reason,
                statusCode: error.statusCode || 500
            }
        }
    }
    async removeProductFromCart(cartDetails) {
        try {
            // check if cart exists
            const cart = await Cart.findOne({ userId: cartDetails.userId });
            // cart not found
            if (!cart) {
                throw {
                    reason: "Cart not found",
                    statusCode: 404
                }
            }
            // check if product exists in cart
            const index = cart.items.findIndex(item => item.productId == cartDetails.productId);
            if (index === -1) {
                throw {
                    reason: "Product not found in cart",
                    statusCode: 404
                }
            }
            // remove product from cart
            cart.items.splice(index, 1);
            // update cart
            const response = await Cart.findByIdAndUpdate(cart._id, { items: cart.items }, { new: true });
            return response;
        }
        catch (error) {
            throw {
                reason: error.message || error.reason,
                statusCode: error.statusCode || 500
            }
        }
    }
    async getCart(cartDetails) {
        try {
            const response = await Cart.findOne({ userId: cartDetails.userId }).populate('items.productId');
            return response;
        }
        catch (error) {
            throw {
                reason: error.message,
                statusCode: 500
            }
        }
    }
    async updateCartQuantity(cartDetails) {
        try {
            // check if cart exists
            const cart = await Cart.findOne({ userId: cartDetails.userId });
            // cart not found
            if (!cart) {
                throw {
                    reason: "Cart not found",
                    statusCode: 404
                }
            }
            // check if product exists in cart
            const index = cart.items.findIndex(item => item.productId == cartDetails.productId);
            if (index === -1) {
                throw {
                    reason: "Product not found in cart",
                    statusCode: 404
                }
            }
            // check if product quantity is less
            const product = await Product.findById(cartDetails.productId);
            if (product.quantity < parseInt(cartDetails.quantity)) {
                throw {
                    reason: "Product quantity is less",
                    statusCode: 400
                }
            }
            // update product quantity
            cart.items[index].quantity = cartDetails.quantity;
            // update cart
            const response = await Cart.findByIdAndUpdate(cart._id, { items: cart.items }, { new: true });
            return response;
        }
        catch (error) {
            throw {
                reason: error.message||error.reason,
                statusCode: error.statusCode||500
            }
        }
    }


}

module.exports = CartRepository;