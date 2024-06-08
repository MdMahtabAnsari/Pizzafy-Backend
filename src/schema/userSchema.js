const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        lowercase: true,
        trim: true,
        required: [true, "First name is required"],
        minlength: [5, "First name must be at least 5 characters"],
        maxlength: [20, "First name must be less than 20 characters"]
    },
    lastname: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, "Last name is required"],
        minlength: [5, "Last name must be at least 5 characters"],
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
        minlength: [6, "Password must be at least 8 characters"],
    }

}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;