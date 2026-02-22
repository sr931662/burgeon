const express = require('express');
const { body, query } = require('express-validator');
const testimonialController = require('../controllers/testimonialController');
const { 
  protect, 
  restrictTo, 
  optionalAuth,
  uploadSingle, 
  validate,
  commonValidators,
  sanitizers
} = require('../middlewares');

const router = express.Router();

// Public routes (with optional auth for showing pending testimonials to admins)
router.get('/',
  optionalAuth,
  validate([
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
    query('rating').optional().isInt({ min: 1, max: 5 }),
    query('featured').optional().isBoolean()
  ]),
  (req, res, next) => {
    // If user is admin, show all testimonials including pending
    if (req.user) {
      return testimonialController.getAllTestimonials(req, res, next);
    }
    // Otherwise show only approved
    req.query.isApproved = 'true';
    return testimonialController.getAllTestimonials(req, res, next);
  }
);

router.get('/featured',
  testimonialController.getFeaturedTestimonials
);

router.get('/rating/:rating',
  validate([
    commonValidators.param('rating')
  ]),
  testimonialController.getTestimonialsByRating
);

router.get('/:id',
  validate([
    commonValidators.paramId('id')
  ]),
  testimonialController.getTestimonial
);

// Public route for submitting testimonials (requires approval)
router.post('/',
  uploadSingle('image'),
  sanitizers.trimString(['clientName', 'company', 'message']),
  validate([
    body('clientName')
      .notEmpty().withMessage('Client name is required'),
    body('company')
      .notEmpty().withMessage('Company name is required'),
    body('message')
      .notEmpty().withMessage('Testimonial message is required')
      .isLength({ min: 10, max: 1000 }).withMessage('Message must be between 10 and 1000 characters'),
    body('rating')
      .notEmpty().withMessage('Rating is required')
      .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('designation')
      .optional()
      .isString(),
    body('project')
      .optional()
      .isMongoId().withMessage('Invalid project ID'),
    body('service')
      .optional()
      .isMongoId().withMessage('Invalid service ID')
  ]),
  testimonialController.createTestimonial
);

// Protected routes (Admin only)
router.use(protect);
router.use(restrictTo('admin', 'superadmin'));

// Admin operations
router.patch('/:id',
  uploadSingle('image'),
  sanitizers.trimString(['clientName', 'company', 'message']),
  validate([
    commonValidators.paramId('id'),
    body('rating')
      .optional()
      .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('isFeatured')
      .optional()
      .isBoolean().withMessage('isFeatured must be a boolean'),
    body('isApproved')
      .optional()
      .isBoolean().withMessage('isApproved must be a boolean')
  ]),
  testimonialController.updateTestimonial
);

router.patch('/:id/approve',
  validate([
    commonValidators.paramId('id')
  ]),
  testimonialController.approveTestimonial
);

router.delete('/:id',
  validate([
    commonValidators.paramId('id')
  ]),
  testimonialController.deleteTestimonial
);

module.exports = router;