const express = require('express');
const { body } = require('express-validator');
const industryController = require('../controllers/industryController');
const authMiddleware = require('../middlewares/authMiddleware');
const validateMiddleware = require('../middlewares/validateMiddleware');

const router = express.Router();

// Validation rules for create/update
const industryValidation = [
  body('name')
    .notEmpty().withMessage('Industry name is required')
    .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters')
    .trim()
    .escape(),
  body('description')
    .optional()
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters')
    .trim()
    .escape(),
  body('icon')
    .optional()
    .isURL().withMessage('Icon must be a valid URL')
    .trim(),
  body('isActive')
    .optional()
    .isBoolean().withMessage('isActive must be a boolean'),
  body('displayOrder')
    .optional()
    .isInt({ min: 0 }).withMessage('Display order must be a positive number')
];

// Public routes
router.get('/', industryController.getAllIndustries);
router.get('/:slug', industryController.getIndustryBySlug);

// Protected admin routes
router.use(authMiddleware.protect, authMiddleware.restrictTo('admin', 'superadmin'));

// FIXED: Use validateMiddleware.validate with the validation array
router.post(
  '/',
  validateMiddleware.validate(industryValidation), // Pass validation array to validate method
  industryController.createIndustry
);

router.patch(
  '/:id',
  validateMiddleware.validate(industryValidation), // Pass validation array to validate method
  industryController.updateIndustry
);

router.delete('/:id', industryController.deleteIndustry);

module.exports = router;