// Central export for all middlewares
const authMiddleware = require('./authMiddleware');
const errorMiddleware = require('./errorMiddleware');
const uploadMiddleware = require('./uploadMiddleware');
const rateLimiter = require('./rateLimiter');
const validateMiddleware = require('./validateMiddleware');

module.exports = {
  ...authMiddleware,
  ...errorMiddleware,
  ...uploadMiddleware,
  ...rateLimiter,
  ...validateMiddleware
};