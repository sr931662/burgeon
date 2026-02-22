const express = require('express');
const { body } = require('express-validator');
const brochureController = require('../controllers/brochureController');
const authMiddleware = require('../middlewares/authMiddleware');
const validateMiddleware = require('../middlewares/validateMiddleware');

const router = express.Router();

// Validation rules for create
const brochureValidation = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 200 }).withMessage('Title cannot exceed 200 characters')
    .trim()
    .escape(),
  body('description')
    .optional()
    .isLength({ max: 1000 }).withMessage('Description cannot exceed 1000 characters')
    .trim()
    .escape(),
  body('fileURL')
    .notEmpty().withMessage('File URL is required')
    .isURL().withMessage('File URL must be a valid URL')
    .trim(),
  body('fileSize')
    .optional()
    .isInt({ min: 0 }).withMessage('File size must be a positive number'),
  body('fileType')
    .optional()
    .isIn(['pdf', 'doc', 'docx']).withMessage('File type must be pdf, doc, or docx'),
  body('category')
    .notEmpty().withMessage('Category is required')
    .isIn(['product', 'service', 'company-profile', 'technical'])
    .withMessage('Category must be product, service, company-profile, or technical'),
  body('relatedProduct')
    .optional()
    .isMongoId().withMessage('Invalid product ID format'),
  body('relatedService')
    .optional()
    .isMongoId().withMessage('Invalid service ID format'),
  body('isPublic')
    .optional()
    .isBoolean().withMessage('isPublic must be a boolean')
];

// Public routes
router.get('/', brochureController.getAllBrochures);
router.get('/:id', brochureController.getBrochureById);
router.patch('/:id/download', brochureController.incrementDownloadCount);

// Protected admin routes
router.use(authMiddleware.protect, authMiddleware.restrictTo('admin', 'superadmin'));

// FIXED: Added parentheses to call validateMiddleware as a function
router.post(
  '/',
  brochureValidation,
  validateMiddleware.validate(brochureValidation),
  brochureController.createBrochure
);

router.delete('/:id', brochureController.deleteBrochure);

module.exports = router;