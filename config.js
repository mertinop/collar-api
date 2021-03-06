/**
 * module dependencies for server configuration
 */
const path = require('path');

/**
 * server configurations
 */
const serverConfig = {
  PRODUCTION: process.env.NODE_ENV === 'production',
  PORT: process.env.PORT || 3000,
  ROOT: path.resolve(__dirname, '..'),
  DBURL: 'mongodb://localhost:27017/collar',
  SECRET: 'H-9BL2jN#4vy4%6a',
};

module.exports = serverConfig;
