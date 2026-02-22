const express = require('express');
const { body, query } = require('express-validator');
const serviceController = require('../controllers/serviceController');
const { 
  protect, 
  restrictTo, 
  uploadMultiple, 
  validate,
  commonValidators,
  sanitizers
} = require('../middlewares');

const router = express.Router();

// Public routes
router.get('/',
  validate([
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
    query('sort').optional().isString(),
    query('industry').optional().isString()
  ]),
  serviceController.getAllServices
);

router.get('/industry/:industry',
  validate([
    commonValidators.param('industry')
  ]),
  serviceController.getServicesByIndustry
);

router.get('/slug/:slug',
  validate([
    commonValidators.param('slug')
  ]),
  serviceController.getServiceBySlug
);

router.get('/:id',
  validate([
    commonValidators.paramId('id')
  ]),
  serviceController.getService
);

// Protected routes (Admin only)
router.use(protect);
router.use(restrictTo('admin', 'superadmin'));

// Service CRUD operations
router.post('/',
  uploadMultiple('images', 5),
  sanitizers.trimString(['title', 'overview']),
  validate([
    body('title')
      .notEmpty().withMessage('Service title is required')
      .isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
    body('overview')
      .notEmpty().withMessage('Service overview is required')
      .isLength({ min: 50 }).withMessage('Overview must be at least 50 characters'),
    body('processSteps')
      .optional()
      .isArray().withMessage('Process steps must be an array'),
    body('industriesServed')
      .optional()
      .isArray().withMessage('Industries served must be an array'),
    body('icon')
      .notEmpty().withMessage('Service icon is required'),
    body('order')
      .optional()
      .isInt({ min: 0 }).withMessage('Order must be a positive integer'),
    body('isActive')
      .optional()
      .isBoolean().withMessage('isActive must be a boolean')
  ]),
  serviceController.createService
);

router.patch('/:id',
  uploadMultiple('images', 5),
  sanitizers.trimString(['title', 'overview']),
  validate([
    commonValidators.paramId('id'),
    body('title')
      .optional()
      .isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
    body('order')
      .optional()
      .isInt({ min: 0 }).withMessage('Order must be a positive integer'),
    body('isActive')
      .optional()
      .isBoolean().withMessage('isActive must be a boolean')
  ]),
  serviceController.updateService
);

router.delete('/:id',
  validate([
    commonValidators.paramId('id')
  ]),
  serviceController.deleteService
);

// Service reordering
router.patch('/reorder',
  restrictTo('superadmin'),
  validate([
    body('orders')
      .isArray().withMessage('Orders must be an array')
      .notEmpty().withMessage('Orders array cannot be empty'),
    body('orders.*.id')
      .isMongoId().withMessage('Invalid service ID'),
    body('orders.*.order')
      .isInt({ min: 0 }).withMessage('Order must be a positive integer')
  ]),
  serviceController.reorderServices
);

module.exports = router;