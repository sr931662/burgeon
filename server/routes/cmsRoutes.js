const express = require('express');
const { body } = require('express-validator');
const cmsController = require('../controllers/cmsController');
const authMiddleware = require('../middlewares/authMiddleware');
const validateMiddleware = require('../middlewares/validateMiddleware');

const router = express.Router();

// Validation rules for create/update
const pageValidation = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 200 }).withMessage('Title cannot exceed 200 characters')
    .trim()
    .escape(),
  body('content')
    .notEmpty().withMessage('Content is required')
    .trim(),
  body('slug')
    .optional()
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).withMessage('Slug can only contain lowercase letters, numbers, and hyphens')
    .isLength({ max: 200 }).withMessage('Slug cannot exceed 200 characters'),
  body('metaTitle')
    .optional()
    .isLength({ max: 60 }).withMessage('Meta title should not exceed 60 characters')
    .trim()
    .escape(),
  body('metaDescription')
    .optional()
    .isLength({ max: 160 }).withMessage('Meta description should not exceed 160 characters')
    .trim()
    .escape(),
  body('featuredImage')
    .optional()
    .isURL().withMessage('Featured image must be a valid URL')
    .trim(),
  body('isPublished')
    .optional()
    .isBoolean().withMessage('isPublished must be a boolean')
];

// Public routes
router.get('/:slug', cmsController.getPageBySlug);

// Protected admin routes
router.use(authMiddleware.protect, authMiddleware.restrictTo('admin', 'superadmin'));

// Route definitions - FIXED: ensure all handlers are functions
router.route('/')
  .get(cmsController.getAllPages)
  .post(
    pageValidation,
    validateMiddleware.validate, // Make sure this is a function reference
    cmsController.createPage
  );

router.route('/:id')
  .patch(
    pageValidation,
    validateMiddleware.validate, // Make sure this is a function reference
    cmsController.updatePage
  )
  .delete(cmsController.deletePage);

router.patch('/:id/publish', cmsController.togglePublish);

module.exports = router;