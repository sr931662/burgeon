const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { protect, restrictTo, authLimiter, validate } = require('../middlewares');

const router = express.Router();

// Public routes with rate limiting
router.post('/register',
  authLimiter,
  validate([
    body('name')
      .notEmpty().withMessage('Name is required')
      .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters')
      .trim()
      .escape(),
    body('email')
      .isEmail().withMessage('Please provide a valid email')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      .withMessage('Password must contain at least one letter, one number, and one special character'),
    body('role')
      .optional()
      .isIn(['admin', 'superadmin']).withMessage('Invalid role')
  ]),
  authController.register
);

router.post('/login',
  authLimiter,
  validate([
    body('email')
      .isEmail().withMessage('Please provide a valid email')
      .normalizeEmail(),
    body('password')
      .notEmpty().withMessage('Password is required')
  ]),
  authController.login
);

router.post('/logout',
  authController.logout
);

router.post('/forgot-password',
  authLimiter,
  validate([
    body('email')
      .isEmail().withMessage('Please provide a valid email')
      .normalizeEmail()
  ]),
  authController.forgotPassword
);

router.patch('/reset-password/:token',
  validate([
    body('password')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      .withMessage('Password must contain at least one letter, one number, and one special character')
  ]),
  authController.resetPassword
);

// Protected routes
router.use(protect);

router.get('/me',
  authController.getCurrentUser
);

router.patch('/update-password',
  validate([
    body('currentPassword')
      .notEmpty().withMessage('Current password is required'),
    body('newPassword')
      .isLength({ min: 8 }).withMessage('New password must be at least 8 characters long')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      .withMessage('New password must contain at least one letter, one number, and one special character')
  ]),
  authController.updatePassword
);

// Superadmin only routes
router.use(restrictTo('superadmin'));

router.get('/users',
  authController.getAllUsers
);

router.patch('/users/:id/role',
  validate([
    body('role')
      .isIn(['admin', 'superadmin']).withMessage('Invalid role')
  ]),
  authController.updateUserRole
);

router.delete('/users/:id',
  authController.deleteUser
);

module.exports = router;