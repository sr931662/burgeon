const { validationResult, body, param, query } = require('express-validator');
const mongoose = require('mongoose');
const sanitizeHtml = require('sanitize-html');
const AppError = require('../utils/AppError');

// Validation result checker
exports.validate = (validations) => {
  return async (req, res, next) => {
    // Run all validations
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const extractedErrors = errors.array().map(err => ({
      field: err.param,
      message: err.msg
    }));

    return next(new AppError(`Validation failed: ${extractedErrors[0].message}`, 400));
  };
};

// Sanitize input to prevent NoSQL injection
exports.sanitizeInput = (req, res, next) => {
  const sanitize = (obj) => {
    if (!obj || typeof obj !== 'object') return obj;

    Object.keys(obj).forEach(key => {
      // Remove MongoDB operator keys only
      if (key.startsWith('$') || key.includes('.')) {
        delete obj[key];
      }

      if (typeof obj[key] === 'object') {
        sanitize(obj[key]);
      }
    });

    return obj;
  };

  if (req.body) sanitize(req.body);
  if (req.params) sanitize(req.params);

  next();
};

// Prevent XSS attacks
exports.preventXSS = (req, res, next) => {
  const sanitize = (obj) => {
    if (!obj || typeof obj !== 'object') return;

    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === 'string') {
        obj[key] = sanitizeHtml(obj[key], {
          allowedTags: [],
          allowedAttributes: {}
        });
      } else if (typeof obj[key] === 'object') {
        sanitize(obj[key]);
      }
    });
  };

  if (req.body) sanitize(req.body);
  if (req.params) sanitize(req.params);

  // DO NOT TOUCH req.query in Express 5
  next();
};

// Sanitize HTML content (for rich text fields)
exports.sanitizeHtml = (fields = []) => {
  return (req, res, next) => {
    fields.forEach(field => {
      if (req.body[field]) {
        req.body[field] = sanitizeHtml(req.body[field], {
          allowedTags: ['b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li', 'p', 'br', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
          allowedAttributes: {
            'a': ['href', 'target']
          },
          allowedSchemes: ['http', 'https', 'mailto']
        });
      }
    });
    next();
  };
};

// Common validators
exports.commonValidators = {
  // MongoDB ObjectId validator for params
  paramId: (paramName = 'id') => 
    param(paramName).custom(value => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error(`Invalid ${paramName} format`);
      }
      return true;
    }),

  // Generic param validator
  param: (paramName) => 
    param(paramName).notEmpty().withMessage(`${paramName} is required`),

  // Param string validator
  paramString: (paramName) => 
    param(paramName).isString().withMessage(`${paramName} must be a string`),

  // Param integer validator
  paramInt: (paramName) => 
    param(paramName).isInt().withMessage(`${paramName} must be an integer`),

  // MongoDB ObjectId validator (for backward compatibility)
  objectId: (paramName = 'id') => 
    param(paramName).custom(value => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error(`Invalid ${paramName} format`);
      }
      return true;
    }),

  // Email validator
  email: () =>
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email'),

  // Password validator
  password: () =>
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      .withMessage('Password must contain at least one letter, one number, and one special character'),

  // Phone validator
  phone: () =>
    body('phone')
      .optional()
      .matches(/^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/)
      .withMessage('Please provide a valid phone number'),

  // URL validator
  url: (field = 'url') =>
    body(field)
      .optional()
      .isURL()
      .withMessage(`Please provide a valid URL`),

  // Pagination validators
  pagination: () => [
    query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Page must be a positive integer'),
    query('limit')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('Limit must be between 1 and 100'),
    query('sort')
      .optional()
      .isString()
      .matches(/^[a-zA-Z0-9,_+-]+$/)
      .withMessage('Invalid sort parameter')
  ],

  // Date validator
  date: (field) =>
    body(field)
      .optional()
      .isISO8601()
      .withMessage(`Please provide a valid date`),

  // Boolean validator
  boolean: (field) =>
    body(field)
      .optional()
      .isBoolean()
      .withMessage(`Please provide a valid boolean value`),

  // Array validator
  array: (field) =>
    body(field)
      .optional()
      .isArray()
      .withMessage(`Please provide a valid array`),

  // Enum validator
  enum: (field, values) =>
    body(field)
      .optional()
      .isIn(values)
      .withMessage(`Please provide a valid value from: ${values.join(', ')}`)
};

// Custom sanitizers
exports.sanitizers = {
  // Trim and escape string
  trimString: (fields) => {
    return (req, res, next) => {
      fields.forEach(field => {
        if (req.body[field] && typeof req.body[field] === 'string') {
          req.body[field] = req.body[field].trim();
        }
      });
      next();
    };
  },

  // Convert to number
  toNumber: (fields) => {
    return (req, res, next) => {
      fields.forEach(field => {
        if (req.body[field] && !isNaN(req.body[field])) {
          req.body[field] = Number(req.body[field]);
        }
      });
      next();
    };
  },

  // Convert to boolean
  toBoolean: (fields) => {
    return (req, res, next) => {
      fields.forEach(field => {
        if (req.body[field] !== undefined) {
          req.body[field] = req.body[field] === 'true' || req.body[field] === true;
        }
      });
      next();
    };
  },

  // Convert to date
  toDate: (fields) => {
    return (req, res, next) => {
      fields.forEach(field => {
        if (req.body[field]) {
          const date = new Date(req.body[field]);
          if (!isNaN(date.getTime())) {
            req.body[field] = date;
          }
        }
      });
      next();
    };
  }
};

// Prevent HTTP Parameter Pollution
exports.preventParameterPollution = (req, res, next) => {
  // Only sanitize query params, NOT body arrays
  Object.keys(req.query).forEach(key => {
    if (Array.isArray(req.query[key]) && req.query[key].length > 1) {
      req.query[key] = req.query[key][req.query[key].length - 1];
    }
  });

  next();
};