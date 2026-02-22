const express = require('express');
const { body, query } = require('express-validator');
const projectController = require('../controllers/projectController');
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
    query('industry').optional().isString(),
    query('featured').optional().isBoolean()
  ]),
  projectController.getAllProjects
);

router.get('/featured',
  projectController.getFeaturedProjects
);

router.get('/industry/:industry',
  validate([
    commonValidators.param('industry')
  ]),
  projectController.getProjectsByIndustry
);

router.get('/date-range',
  validate([
    query('startDate').isISO8601().withMessage('Valid start date required'),
    query('endDate').isISO8601().withMessage('Valid end date required')
  ]),
  projectController.getProjectsByDateRange
);

router.get('/slug/:slug',
  validate([
    commonValidators.param('slug')
  ]),
  projectController.getProjectBySlug
);

router.get('/:id',
  validate([
    commonValidators.paramId('id')
  ]),
  projectController.getProject
);

// Protected routes (Admin only)
router.use(protect);
router.use(restrictTo('admin', 'superadmin'));

// Project CRUD operations
router.post('/',
  uploadMultiple('images', 10),
  sanitizers.trimString(['title', 'clientName', 'problemStatement', 'solutionGiven']),
  validate([
    body('title')
      .notEmpty().withMessage('Project title is required')
      .isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
    body('clientName')
      .notEmpty().withMessage('Client name is required'),
    body('industry')
      .notEmpty().withMessage('Industry is required'),
    body('problemStatement')
      .notEmpty().withMessage('Problem statement is required'),
    body('solutionGiven')
      .notEmpty().withMessage('Solution is required'),
    body('completionDate')
      .isISO8601().withMessage('Valid completion date required'),
    body('isFeatured')
      .optional()
      .isBoolean().withMessage('isFeatured must be a boolean'),
    body('services')
      .optional()
      .isArray().withMessage('Services must be an array'),
    body('products')
      .optional()
      .isArray().withMessage('Products must be an array'),
    body('testimonial')
      .optional()
      .isObject().withMessage('Testimonial must be an object')
  ]),
  projectController.createProject
);

router.patch('/:id',
  uploadMultiple('images', 10),
  sanitizers.trimString(['title', 'clientName', 'problemStatement', 'solutionGiven']),
  validate([
    commonValidators.paramId('id'),
    body('title')
      .optional()
      .isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
    body('completionDate')
      .optional()
      .isISO8601().withMessage('Valid completion date required'),
    body('isFeatured')
      .optional()
      .isBoolean().withMessage('isFeatured must be a boolean')
  ]),
  projectController.updateProject
);

router.delete('/:id',
  validate([
    commonValidators.paramId('id')
  ]),
  projectController.deleteProject
);

module.exports = router;