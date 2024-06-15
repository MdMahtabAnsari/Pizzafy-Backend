const Product = require('../schema/productSchema')

class ProductRepository {
    async createProduct(productDetail) {
        try {
            const response = await Product.create({...productDetail})
            return response
        } catch (error) {
            throw {
                reason: error.message,
                statusCode: 500
            }

        }
    }
    async getProduct(productDetail) {
        try {
            
            const response = await Product.find({...productDetail});
            return response;
        }
        catch (error) {
            throw {
                reason: error.message,
                statusCode:  500
            }
        }
    }
    async deleteProduct(productDetail) {
        try {
            const response = await Product.deleteOne({...productDetail});
            return response;
        }
        catch (error) {
            throw {
                reason: error.message,
                statusCode:500
            }
        }
    }
}

module.exports = ProductRepository;