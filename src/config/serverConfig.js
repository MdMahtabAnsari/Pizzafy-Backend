const dotenv = require('dotenv');
dotenv.config();

// Here we are exporting the environment variables for the application to use.
module.exports = {
  PORT: process.env.PORT,
  DB_URI: process.env.DB_URI,
};