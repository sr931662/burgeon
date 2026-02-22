const rateLimit = require('express-rate-limit');
const MongoStore = require('rate-limit-mongo');
const AppError = require('../utils/AppError');

// Helper function to get IP consistently (handles IPv4 and IPv6)
const getIp = (req) => {
  // Use the built-in helper to handle IPv4-mapped IPv6 addresses correctly
  return req.ip || req.connection.remoteAddress;
};

// General API rate limiter
exports.apiLimiter = rateLimit({
  store: process.env.NODE_ENV === 'production' ? new MongoStore({
    uri: process.env.MONGODB_URI,
    collectionName: 'rateLimits',
    expireTimeMs: 15 * 60 * 1000 // 15 minutes
  }) : undefined,
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per windowMs (using 'limit' instead of 'max' for v7+)
  message: {
    status: 'error',
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  keyGenerator: (req) => {
    return getIp(req);
  },
  handler: (req, res, next, options) => {
    next(new AppError(options.message.message, 429));
  },
  skip: (req) => {
    // Skip rate limiting for health checks
    return req.path === '/health';
  }
});

// Strict rate limiter for authentication endpoints
exports.authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 50, // Limit each IP to 10 login/register attempts per hour
  message: {
    status: 'error',
    message: 'Too many authentication attempts, please try again after an hour.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    // Use email as key for login attempts, fallback to IP
    if (req.body && req.body.email) {
      return req.body.email.toLowerCase();
    }
    return getIp(req);
  },
  handler: (req, res, next, options) => {
    next(new AppError(options.message.message, 429));
  }
});

// Strict rate limiter for lead submission
exports.leadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 5, // Limit each IP to 5 lead submissions per hour
  message: {
    status: 'error',
    message: 'Too many submissions from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => getIp(req),
  handler: (req, res, next, options) => {
    next(new AppError(options.message.message, 429));
  }
});

// Strict rate limiter for file uploads
exports.uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 20, // Limit each IP to 20 uploads per hour
  message: {
    status: 'error',
    message: 'Too many upload attempts, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => getIp(req),
  handler: (req, res, next, options) => {
    next(new AppError(options.message.message, 429));
  }
});

// Very strict rate limiter for password reset
exports.passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 3, // Limit each IP to 3 password reset requests per hour
  message: {
    status: 'error',
    message: 'Too many password reset attempts, please try again after an hour.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => getIp(req),
  handler: (req, res, next, options) => {
    next(new AppError(options.message.message, 429));
  }
});

// Create different limiters for different user roles
exports.createRoleBasedLimiter = (roleLimits) => {
  return (req, res, next) => {
    const userRole = req.user?.role || 'public';
    const limit = roleLimits[userRole] || roleLimits.default;
    
    const limiter = rateLimit({
      windowMs: limit.windowMs || 15 * 60 * 1000,
      limit: limit.max || 100,
      message: {
        status: 'error',
        message: limit.message || 'Too many requests, please try again later.'
      },
      keyGenerator: (req) => {
        return req.user?.id || getIp(req);
      },
      handler: (req, res, next, options) => {
        next(new AppError(options.message.message, 429));
      }
    });
    
    return limiter(req, res, next);
  };
};