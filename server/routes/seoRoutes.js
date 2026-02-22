const express = require('express');
const { body, query } = require('express-validator');
const seoController = require('../controllers/seoController');
const { 
  protect, 
  restrictTo, 
  validate,
  commonValidators,
  sanitizers
} = require('../middlewares');

const router = express.Router();

// Public routes
router.get('/sitemap',
  seoController.generateSitemap
);

router.get('/page/:page',
  validate([
    commonValidators.param('page')
  ]),
  seoController.getSEOByPage
);

// Protected routes (Admin only)
router.use(protect);
router.use(restrictTo('admin', 'superadmin'));

// SEO CRUD operations
router.get('/',
  validate([
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 })
  ]),
  seoController.getAllSEO
);

router.get('/:id',
  validate([
    commonValidators.paramId('id')
  ]),
  seoController.getSEO
);

router.post('/',
  sanitizers.trimString(['metaTitle', 'metaDescription']),
  validate([
    body('page')
      .notEmpty().withMessage('Page identifier is required')
      .isIn(['home', 'products', 'services', 'projects', 'about', 'contact', 'blog', 'careers'])
      .withMessage('Invalid page identifier'),
    body('metaTitle')
      .notEmpty().withMessage('Meta title is required')
      .isLength({ min: 30, max: 60 }).withMessage('Meta title must be between 30 and 60 characters'),
    body('metaDescription')
      .notEmpty().withMessage('Meta description is required')
      .isLength({ min: 120, max: 160 }).withMessage('Meta description must be between 120 and 160 characters'),
    body('keywords')
      .optional()
      .isArray().withMessage('Keywords must be an array'),
    body('ogTitle')
      .optional()
      .isLength({ max: 60 }).withMessage('OG title cannot exceed 60 characters'),
    body('ogDescription')
      .optional()
      .isLength({ max: 160 }).withMessage('OG description cannot exceed 160 characters'),
    body('ogImage')
      .optional()
      .isURL().withMessage('Please provide a valid URL for OG image'),
    body('canonicalUrl')
      .optional()
      .isURL().withMessage('Please provide a valid canonical URL'),
    body('robots')
      .optional()
      .isIn(['index, follow', 'noindex, follow', 'index, nofollow', 'noindex, nofollow'])
      .withMessage('Invalid robots directive')
  ]),
  seoController.createSEO
);

router.patch('/:id',
  sanitizers.trimString(['metaTitle', 'metaDescription']),
  validate([
    commonValidators.paramId('id'),
    body('metaTitle')
      .optional()
      .isLength({ min: 30, max: 60 }).withMessage('Meta title must be between 30 and 60 characters'),
    body('metaDescription')
      .optional()
      .isLength({ min: 120, max: 160 }).withMessage('Meta description must be between 120 and 160 characters'),
    body('robots')
      .optional()
      .isIn(['index, follow', 'noindex, follow', 'index, nofollow', 'noindex, nofollow'])
      .withMessage('Invalid robots directive')
  ]),
  seoController.updateSEO
);

router.delete('/:id',
  validate([
    commonValidators.paramId('id')
  ]),
  seoController.deleteSEO
);

// Bulk operations (Superadmin only)
router.post('/bulk-update',
  restrictTo('superadmin'),
  validate([
    body('updates')
      .isArray().withMessage('Updates must be an array')
      .notEmpty().withMessage('Updates array cannot be empty')
  ]),
  seoController.bulkUpdateSEO
);

module.exports = router;