const ProductService = require('../services/productService')

const createProduct = async (req, res) => {
    try {
        const productService = new ProductService();
        const response = await productService.createProduct({
            userId: req.user.id,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            imagePath: req.file?.path,
            category: req.body.category,
            inStock: req.body.inStock
        });
        res.status(201).json({
            message: "Sucessfully registered the user",
            success: true,
            data: response,
            error: {}
        });
    } catch (error) {
        res.status(error.statusCode).json({
            reason: error.reason,
            success: false,
            data: {},
            error: error
        })
    }
}

const getProductById = async (req, res) => {
    try {
        
        const productService = new ProductService();
        const response = await productService.getProductById({ id: req.params.id });
        res.status(200).json({
            message: "Product fetched successfully",
            success: true,
            data: response,
            error: {}
        });
    } catch (error) {
        res.status(error.statusCode).json({
            reason: error.reason,
            success: false,
            data: {},
            error: error
        })
    }
}

const deleteProductById = async (req, res) => {
    try {
        const productService = new ProductService();
        const response = await productService.deleteProduct({ 
            id: req.params.id,
            userId: req.user.id 
        });
        res.status(200).json({
            message: "Product deleted successfully",
            success: true,
            data: response,
            error: {}
        });
    } catch (error) {
        res.status(error.statusCode).json({
            reason: error.reason,
            success: false,
            data: {},
            error: error
        })
    }
}





module.exports = {
    createProduct,
    getProductById,
    deleteProductById
}