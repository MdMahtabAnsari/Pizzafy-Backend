const mongoose = require('mongoose')
const serverConfig = require('../config/serverConfig')

// Below function is used to connect to database

const connectDB = async () => {
    try {
        await mongoose.connect(serverConfig.DB_URI)
        console.log("database connected")
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB