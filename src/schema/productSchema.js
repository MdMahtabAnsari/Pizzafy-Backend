const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Product name is require"],
        minlength: [5, "Product name length atleat 5"],
        maxlength: [50, "Product name length less then 50"],
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Price is require"],
    },
    description: {
        type: String,
        required: [true, "Description is Require"],
        maxlength: [50, "Product name length less then 50"],
        maxlength: [200, "Discription  Should be less then 200 char"],
    },
    imageUrl: {
        type: String,
        
    },
    category: {
        type: String,
        enum: ["veg", "non-veg", "drinks", "sides"],
        default: "veg"
    },
    inStock: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

const Product = mongoose.model('Product', productSchema);

module.exports = Product;