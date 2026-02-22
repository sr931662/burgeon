const express = require('express');
const { body, query } = require('express-validator');
const leadController = require('../controllers/leadController');
const { 
  protect, 
  restrictTo, 
  leadLimiter,
  uploadMultiple, 
  validate,
  commonValidators,
  sanitizers
} = require('../middlewares');

const router = express.Router();

// Public route for submitting leads (with rate limiting)
router.post('/',
  leadLimiter,
  sanitizers.trimString(['name', 'company', 'message']),
  validate([
    body('name')
      .notEmpty().withMessage('Name is required')
      .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
    body('email')
      .isEmail().withMessage('Please provide a valid email')
      .normalizeEmail(),
    body('phone')
      .notEmpty().withMessage('Phone number is required')
      .matches(/^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/)
      .withMessage('Please provide a valid phone number'),
    body('company')
      .notEmpty().withMessage('Company name is required'),
    body('message')
      .notEmpty().withMessage('Message is required')
      .isLength({ max: 5000 }).withMessage('Message cannot exceed 5000 characters'),
    body('service')
      .optional()
      .isString(),
    body('product')
      .optional()
      .isMongoId().withMessage('Invalid product ID')
  ]),
  leadController.createLead
);

// Protected routes (Admin only)
router.use(protect);
router.use(restrictTo('admin', 'superadmin'));

// Lead management
router.get('/',
  validate([
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
    query('status').optional().isIn(['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'converted', 'lost']),
    query('priority').optional().isIn(['low', 'medium', 'high', 'urgent']),
    query('fromDate').optional().isISO8601(),
    query('toDate').optional().isISO8601()
  ]),
  leadController.getAllLeads
);

router.get('/stats',
  leadController.getLeadStats
);

router.get('/:id',
  validate([
    commonValidators.paramId('id')
  ]),
  leadController.getLead
);

router.patch('/:id/status',
  validate([
    commonValidators.paramId('id'),
    body('status')
      .isIn(['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'converted', 'lost'])
      .withMessage('Invalid status'),
    body('notes')
      .optional()
      .isString()
  ]),
  leadController.updateLeadStatus
);

router.patch('/:id/assign',
  validate([
    commonValidators.paramId('id'),
    body('adminId')
      .isMongoId().withMessage('Invalid admin ID')
  ]),
  leadController.assignLead
);

router.post('/:id/notes',
  validate([
    commonValidators.paramId('id'),
    body('content')
      .notEmpty().withMessage('Note content is required')
      .isLength({ max: 1000 }).withMessage('Note cannot exceed 1000 characters')
  ]),
  leadController.addLeadNote
);

// Bulk operations (Superadmin only)
router.post('/bulk-update',
  restrictTo('superadmin'),
  validate([
    body('updates')
      .isArray().withMessage('Updates must be an array')
      .notEmpty().withMessage('Updates array cannot be empty')
  ]),
  leadController.bulkUpdateLeads
);

// Export leads
router.get('/export/csv',
  restrictTo('superadmin'),
  leadController.exportLeadsCSV
);

module.exports = router;