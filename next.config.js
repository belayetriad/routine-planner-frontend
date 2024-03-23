const path = require('path')

const dotenv = require('dotenv')

dotenv.config()
module.exports = {
  trailingSlash: true,
  reactStrictMode: false, 
  env: {
    API_BASE_URL: process.env.API_BASE_URL || 'localhost:3001'
  }
}
