const express = require('express');
const { body } = require('express-validator');
const companySettingsController = require('../controllers/companySettingsController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validateMiddleware');

const router = express.Router();

// Validation rules for settings update
const settingsValidation = [
  // Basic Info
  body('companyName')
    .optional()
    .isLength({ max: 100 }).withMessage('Company name cannot exceed 100 characters')
    .trim()
    .escape(),
  body('tagline')
    .optional()
    .isLength({ max: 200 }).withMessage('Tagline cannot exceed 200 characters')
    .trim()
    .escape(),
  body('description')
    .optional()
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters')
    .trim()
    .escape(),
  body('establishedYear')
    .optional()
    .isInt({ min: 1800, max: new Date().getFullYear() })
    .withMessage(`Year must be between 1800 and ${new Date().getFullYear()}`),
  body('registrationNumber')
    .optional()
    .trim()
    .escape(),

  // Branding
  body('branding.logoPrimary')
    .optional()
    .isURL().withMessage('Logo URL must be valid')
    .trim(),
  body('branding.logoSecondary')
    .optional()
    .isURL().withMessage('Logo URL must be valid')
    .trim(),
  body('branding.favicon')
    .optional()
    .isURL().withMessage('Favicon URL must be valid')
    .trim(),
  body('branding.brandColorPrimary')
    .optional()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .withMessage('Please provide a valid hex color'),
  body('branding.brandColorSecondary')
    .optional()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .withMessage('Please provide a valid hex color'),

  // Contact
  body('contact.email')
    .optional()
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('contact.phone')
    .optional()
    .trim(),
  body('contact.alternatePhone')
    .optional()
    .trim(),
  body('contact.whatsapp')
    .optional()
    .trim(),
  body('contact.supportEmail')
    .optional()
    .isEmail().withMessage('Please provide a valid support email')
    .normalizeEmail(),

  // Locations array validation
  body('locations.*.officeName')
    .optional()
    .notEmpty().withMessage('Office name is required')
    .trim()
    .escape(),
  body('locations.*.addressLine1')
    .optional()
    .notEmpty().withMessage('Address line 1 is required')
    .trim()
    .escape(),
  body('locations.*.city')
    .optional()
    .notEmpty().withMessage('City is required')
    .trim()
    .escape(),
  body('locations.*.state')
    .optional()
    .notEmpty().withMessage('State is required')
    .trim()
    .escape(),
  body('locations.*.country')
    .optional()
    .notEmpty().withMessage('Country is required')
    .trim()
    .escape(),
  body('locations.*.pincode')
    .optional()
    .notEmpty().withMessage('Pincode is required')
    .trim()
    .escape(),
  body('locations.*.googleMapsURL')
    .optional()
    .isURL().withMessage('Google Maps URL must be valid')
    .trim(),
  body('locations.*.isHeadOffice')
    .optional()
    .isBoolean().withMessage('isHeadOffice must be a boolean'),

  // SEO Defaults
  body('seoDefaults.defaultMetaTitle')
    .optional()
    .isLength({ max: 60 }).withMessage('Meta title should not exceed 60 characters')
    .trim()
    .escape(),
  body('seoDefaults.defaultMetaDescription')
    .optional()
    .isLength({ max: 160 }).withMessage('Meta description should not exceed 160 characters')
    .trim()
    .escape(),
  body('seoDefaults.defaultKeywords')
    .optional()
    .isArray().withMessage('Keywords must be an array')
];

// Public route
router.get('/', companySettingsController.getSettings);

// Protected admin routes
router.use(authMiddleware.protect, authMiddleware.restrictTo('admin', 'superadmin'));

// Admin full settings
router.get('/admin', companySettingsController.getAdminSettings);

// Update settings
router.patch(
  '/',
  validate(settingsValidation),
  companySettingsController.createOrUpdateSettings
);

// Toggle maintenance mode
router.patch(
  '/maintenance',
  validate([
    body('maintenanceMode')
      .optional()
      .isBoolean().withMessage('maintenanceMode must be a boolean'),
    body('maintenanceMessage')
      .optional()
      .trim()
      .escape()
  ]),
  companySettingsController.toggleMaintenanceMode
);

module.exports = router;