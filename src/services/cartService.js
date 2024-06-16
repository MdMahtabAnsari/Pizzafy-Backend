const CartRepository = require('../respositories/cartRepository');

class CartService{
    constructor(){
        this.cartRepository = new CartRepository();
    }

    async createCart(cartDetails){
        try{
            const response = await this.cartRepository.createCart({
                userId: cartDetails.userId
            });
            return response;
        }
        catch(error){
            throw{
                reason:error.message,
                statusCode:error.statusCode
            }
        }
    }
    async addProductToCart(cartDetails){
        try{
            console.log('cart service');
            const response = await this.cartRepository.addProductToCart({
                userId: cartDetails.userId,
                productId: cartDetails.productId,
                quantity: cartDetails.quantity
            });
            return response;
        }
        catch(error){
            console.log(error.reason, error.statusCode);
            throw{
                reason:error.reason,
                statusCode:error.statusCode
            }
        }
    }
    async removeProductFromCart(cartDetails){
        try{
            const response = await this.cartRepository.removeProductFromCart({
                userId: cartDetails.userId,
                productId: cartDetails.productId
            });
            return response;
        }
        catch(error){
            throw{
                reason:error.reason,
                statusCode:error.statusCode
            }
        }
    }
    async getCart(cartDetails){
        try{
            const response = await this.cartRepository.getCart({
                userId: cartDetails.userId
            });
            return response;
        }
        catch(error){
            throw{
                reason:error.reason,
                statusCode:error.statusCode
            }
        }
    }
    async updateCartQuantity(cartDetails){
        try{
            const response = await this.cartRepository.updateCartQuantity({
                userId: cartDetails.userId,
                productId: cartDetails.productId,
                quantity: cartDetails.quantity
            });
            return response;
        }
        catch(error){
            throw{
                reason:error.reason,
                statusCode:error.statusCode
            }
        }
    }
}

module.exports = CartService;