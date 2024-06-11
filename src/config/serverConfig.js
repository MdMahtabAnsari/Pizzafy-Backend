const dotenv = require('dotenv');
dotenv.config();

// Here we are exporting the environment variables for the application to use.
module.exports = {
  PORT: process.env.PORT,
  DB_URI: process.env.DB_URI,
  SALT_ROUND : process.env.SALT_ROUND,
  JWT_SECRET : process.env.JWT_SECRET,
  JWT_EXPIRE : process.env.JWT_EXPIRE,
  COOKIE_EXPIRE : process.env.COOKIE_EXPIRE
};