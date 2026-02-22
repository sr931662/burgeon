const express = require('express');
const { body } = require('express-validator');
const clientController = require('../controllers/clientController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validateMiddleware');

const router = express.Router();

// Validation rules for create/update
const clientValidation = [
  body('name')
    .notEmpty().withMessage('Client/Partner name is required')
    .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters')
    .trim()
    .escape(),
  body('logoURL')
    .notEmpty().withMessage('Logo URL is required')
    .isURL().withMessage('Please provide a valid URL for the logo')
    .trim(),
  body('website')
    .optional()
    .isURL().withMessage('Please provide a valid website URL')
    .trim(),
  body('industry')
    .optional()
    .isMongoId().withMessage('Invalid industry ID format'),
  body('type')
    .optional()
    .isIn(['client', 'partner', 'vendor']).withMessage('Type must be client, partner, or vendor'),
  body('isFeatured')
    .optional()
    .isBoolean().withMessage('isFeatured must be a boolean'),
  body('isActive')
    .optional()
    .isBoolean().withMessage('isActive must be a boolean'),
  body('displayOrder')
    .optional()
    .isInt({ min: 0 }).withMessage('Display order must be a positive number'),
  body('shortDescription')
    .optional()
    .isLength({ max: 200 }).withMessage('Description cannot exceed 200 characters')
    .trim()
    .escape()
];

// Public routes
router.get('/', clientController.getAllClients);
router.get('/featured', clientController.getFeaturedClients);
router.get('/industry/:industry', clientController.getClientsByIndustry);
router.get('/:slug', clientController.getClientBySlug);

// Protected admin routes
router.use(authMiddleware.protect, authMiddleware.restrictTo('admin', 'superadmin'));

router.post(
  '/',
  validate(clientValidation),
  clientController.createClient
);

router.patch(
  '/reorder',
  body('orders').isArray().withMessage('Orders must be an array'),
  validate([
    body('orders.*.id').isMongoId().withMessage('Invalid client ID'),
    body('orders.*.order').isInt({ min: 0 }).withMessage('Order must be a positive number')
  ]),
  clientController.reorderClients
);

router.patch(
  '/:id',
  validate([
    body('id').isMongoId().withMessage('Invalid client ID')
  ]),
  validate(clientValidation),
  clientController.updateClient
);

router.patch(
  '/:id/active',
  validate([
    body('id').isMongoId().withMessage('Invalid client ID')
  ]),
  clientController.toggleActive
);

router.patch(
  '/:id/feature',
  validate([
    body('id').isMongoId().withMessage('Invalid client ID')
  ]),
  clientController.toggleFeatured
);

router.delete(
  '/:id',
  validate([
    body('id').isMongoId().withMessage('Invalid client ID')
  ]),
  clientController.deleteClient
);

module.exports = router;