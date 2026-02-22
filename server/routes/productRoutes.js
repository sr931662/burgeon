const express = require('express');
const { body, query } = require('express-validator');
const productController = require('../controllers/productController');
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
    query('category').optional().isString(),
    query('minPrice').optional().isFloat({ min: 0 }),
    query('maxPrice').optional().isFloat({ min: 0 })
  ]),
  productController.getAllProducts
);

router.get('/featured',
  productController.getFeaturedProducts
);

router.get('/category/:category',
  validate([
    commonValidators.param('category')
  ]),
  productController.getProductsByCategory
);

router.get('/slug/:slug',
  validate([
    commonValidators.param('slug')
  ]),
  productController.getProductBySlug
);

router.get('/:id',
  validate([
    commonValidators.paramId('id')
  ]),
  productController.getProduct
);

// Protected routes (Admin only)
router.use(protect);
router.use(restrictTo('admin', 'superadmin'));

// Product CRUD operations
router.post('/',
  uploadMultiple('images', 10),
  sanitizers.trimString(['title', 'shortDescription', 'fullDescription']),
  validate([
    body('title')
      .notEmpty().withMessage('Product title is required')
      .isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
    body('category')
      .notEmpty().withMessage('Category is required')
      .isIn([
        'industrial-machinery',
        'heavy-equipment',
        'industrial-tools',
        'automation-systems',
        'material-handling',
        'industrial-supplies',
        'safety-equipment',
        'industrial-parts'
      ]).withMessage('Invalid category'),
    body('shortDescription')
      .notEmpty().withMessage('Short description is required')
      .isLength({ max: 300 }).withMessage('Short description cannot exceed 300 characters'),
    body('fullDescription')
      .notEmpty().withMessage('Full description is required'),
    body('features')
      .optional()
      .isArray().withMessage('Features must be an array'),
    body('specifications')
      .optional()
      .isArray().withMessage('Specifications must be an array'),
    body('brochureURL')
      .optional()
      .isURL().withMessage('Please provide a valid URL for brochure'),
    body('isActive')
      .optional()
      .isBoolean().withMessage('isActive must be a boolean')
  ]),
  productController.createProduct
);

router.patch('/:id',
  uploadMultiple('images', 10),
  sanitizers.trimString(['title', 'shortDescription', 'fullDescription']),
  validate([
    commonValidators.paramId('id'),
    body('title')
      .optional()
      .isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
    body('category')
      .optional()
      .isIn([
        'industrial-machinery',
        'heavy-equipment',
        'industrial-tools',
        'automation-systems',
        'material-handling',
        'industrial-supplies',
        'safety-equipment',
        'industrial-parts'
      ]).withMessage('Invalid category'),
    body('shortDescription')
      .optional()
      .isLength({ max: 300 }).withMessage('Short description cannot exceed 300 characters'),
    body('isActive')
      .optional()
      .isBoolean().withMessage('isActive must be a boolean')
  ]),
  productController.updateProduct
);

router.delete('/:id',
  validate([
    commonValidators.paramId('id')
  ]),
  productController.deleteProduct
);

// Bulk operations
router.post('/bulk-update',
  restrictTo('superadmin'),
  validate([
    body('updates')
      .isArray().withMessage('Updates must be an array')
      .notEmpty().withMessage('Updates array cannot be empty')
  ]),
  productController.bulkUpdateProducts
);

module.exports = router;