const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { SALT_ROUND } = require('../config/serverConfig');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        lowercase: true,
        trim: true,
        required: [true, "First name is required"],
        minlength: [3, "First name must be at least 5 characters"],
        maxlength: [20, "First name must be less than 20 characters"]
    },
    lastName: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, "Last name is required"],
        minlength: [3, "Last name must be at least 5 characters"],
        maxlength: [20, "Last name must be less than 20 characters"]
    },
    mobileNumber: {
        type: String,
        required: true,
        trim: true,
        unique: [true, "Phone Number is already in use"],
        minlength: [10, "Mobile number must be at least 10 characters"],
        maxlength: [10, "Mobile number must be less than 10 characters"],
        match: [/^[0-9]+$/, 'Phone number must contain only numbers']
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, "Email should be provided"],
        unique: [true, "Email is already in use"],
        minlength: [5, "Email must be at least 5 characters"],
        maxlength: [50, "Email must be less than 50 characters"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: [true, "Password should be provided"],
        minlength: [8, "Password must be at least 8 characters"],
    },
    userType: {
        type: String,
        enum: ['admin', 'customer'],
        default: 'customer'
    },
    products: {
        type: [Schema.Types.ObjectId],
        ref: 'Product',
        default: []
    },
    
}, {
    timestamps: true,
});

userSchema.pre('save', async function () {
    try {
        const plainPassword = this.password;
        const hashPassword = await bcrypt.hash(plainPassword, parseInt(SALT_ROUND));
        this.password = hashPassword;
    }
    catch (error) {
        throw {
            reason: error.message,
            statusCode: 400,


        };
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;