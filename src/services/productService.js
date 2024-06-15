const cloudinary = require('../config/cloudinaryConfig');
const fs = require('fs/promises');
const ProductRepository = require('../respositories/productRepository');
const UserRepository = require('../respositories/userRepository');
class ProductService {
    constructor() {
        // create instance of productRepository
            this.productRepository = new ProductRepository();
            // create instance of cloudinary
            this.cloudinary = cloudinary;
            // create instance of fs
            this.fs = fs;
            // create instance of userRepository
            this.userRepository = new UserRepository();
    }
    async createProduct(productDetail) {
        // upload image to cloudinary
        const imagePath = productDetail.imagePath;
        if (imagePath) {
            try {

                const imageUrl = await this.cloudinary.uploader.upload(imagePath);
                productDetail.imageUrl = imageUrl.secure_url;
                await this.fs.unlink(imagePath);
            }
            catch (error) {
                throw {
                    reason: error.message,
                    statusCode: 500
                }
            }
        }
        try {
            // create product
            const response = await this.productRepository.createProduct({
                name: productDetail.name,
                description: productDetail.description,
                price: productDetail.price,
                imageUrl: productDetail.imageUrl,
                category: productDetail.category,
                inStock: productDetail.inStock

            });
            // update user with product id
            const user = await this.userRepository.findUser({ _id: productDetail.userId });
            user.products.push(response._id);
            await this.userRepository.updateUser({ _id: productDetail.userId }, { products: user.products });
            return response;
        }
        catch (error) {
            throw {
                reason: error.reason,
                statusCode: error.statusCode || 500
            }
        }


    }
    async getProductById(productDetail) {
        try {
            
            const response = await this.productRepository.getProduct({ _id: productDetail.id });
            return response;
        }
        catch (error) {
            throw {
                reason: error.reason,
                statusCode: error.statusCode || 500
            }
        }
    }
    async deleteProduct(productDetail) {
        try {
            // remove product from user's product list
            const user = await this.userRepository.findUser({ _id: productDetail.userId });
            const index = user.products.indexOf(productDetail.id);
            // if product not found in user's product list
            if (index === -1) {
                throw {
                    reason: "Product not found in user's product list",
                    statusCode: 404
                }
            }
            // remove product from user's product list
            user.products.splice(index, 1);
            // update user
            await this.userRepository.updateUser({ _id: productDetail.userId }, { products: user.products });
            // delete product
            const product = await this.productRepository.getProduct({ _id: productDetail.id });
            // delete product from database
            const response = await this.productRepository.deleteProduct({ _id: productDetail.id });
            // delete product image from cloudinary
            const imageUrl = product[0].imageUrl;
            if (imageUrl) {
                const splitedUrl = imageUrl.split('/');
                const publicId = splitedUrl[splitedUrl.length - 1].split('.')[0];
                await this.cloudinary.uploader.destroy(publicId);
            }
            // return response
            return {...product, ...response}
           
        }
        catch (error) {
            throw {
                reason: error.reason,
                statusCode: error.statusCode || 500
            }
        }
    }
}

module.exports = ProductService;