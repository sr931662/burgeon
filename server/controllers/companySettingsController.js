const { validationResult } = require('express-validator');
const CompanySettings = require('../models/CompanySettings');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

// @desc    Create or update company settings (single document)
// @route   PATCH /api/v1/settings
// @access  Private (Admin/Superadmin)
exports.createOrUpdateSettings = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError(errors.array()[0].msg, 400));
  }

  // Remove forbidden fields
  const filteredBody = { ...req.body };
  const forbiddenFields = ['_id', 'id', 'createdAt', 'updatedAt'];
  forbiddenFields.forEach(field => delete filteredBody[field]);

  // Add createdBy
  filteredBody.createdBy = req.user.id;

  // Try to find existing settings
  let settings = await CompanySettings.findById('company-settings');

  if (settings) {
    // Update existing
    settings = await CompanySettings.findByIdAndUpdate(
      'company-settings',
      filteredBody,
      {
        new: true,
        runValidators: true
      }
    ).populate('createdBy', 'name email');
  } else {
    // Create new with fixed ID
    settings = await CompanySettings.create({
      _id: 'company-settings',
      ...filteredBody
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: settings
    }
  });
});

// @desc    Toggle maintenance mode
// @route   PATCH /api/v1/settings/maintenance
// @access  Private (Admin/Superadmin)
exports.toggleMaintenanceMode = catchAsync(async (req, res, next) => {
  const { maintenanceMode, maintenanceMessage } = req.body;

  const settings = await CompanySettings.findById('company-settings');
  
  if (!settings) {
    return next(new AppError('Company settings not found. Please create settings first.', 404));
  }

  if (maintenanceMode !== undefined) {
    settings.maintenanceMode = maintenanceMode;
  }

  if (maintenanceMessage !== undefined) {
    settings.maintenanceMessage = maintenanceMessage;
  }

  await settings.save();

  res.status(200).json({
    status: 'success',
    data: {
      data: {
        maintenanceMode: settings.maintenanceMode,
        maintenanceMessage: settings.maintenanceMessage
      }
    }
  });
});

// @desc    Get company settings (public safe version)
// @route   GET /api/v1/settings
// @access  Public
exports.getSettings = catchAsync(async (req, res, next) => {
  const settings = await CompanySettings.findById('company-settings')
    .populate('createdBy', 'name email');

  if (!settings) {
    return res.status(200).json({
      status: 'success',
      data: {
        data: null
      }
    });
  }

  // Create a public-safe version (remove internal fields)
  const publicSettings = {
    companyName: settings.companyName,
    tagline: settings.tagline,
    description: settings.description,
    establishedYear: settings.establishedYear,
    branding: settings.branding,
    contact: {
      email: settings.contact?.email,
      phone: settings.contact?.phone,
      alternatePhone: settings.contact?.alternatePhone,
      whatsapp: settings.contact?.whatsapp,
      supportEmail: settings.contact?.supportEmail
    },
    locations: settings.locations?.map(loc => ({
      officeName: loc.officeName,
      addressLine1: loc.addressLine1,
      addressLine2: loc.addressLine2,
      city: loc.city,
      state: loc.state,
      country: loc.country,
      pincode: loc.pincode,
      googleMapsURL: loc.googleMapsURL,
      isHeadOffice: loc.isHeadOffice
    })),
    businessHours: settings.businessHours,
    socialLinks: settings.socialLinks,
    seoDefaults: settings.seoDefaults,
    maintenanceMode: settings.maintenanceMode
  };

  res.status(200).json({
    status: 'success',
    data: {
      data: publicSettings
    }
  });
});

// @desc    Get full settings (admin only)
// @route   GET /api/v1/settings/admin
// @access  Private (Admin/Superadmin)
exports.getAdminSettings = catchAsync(async (req, res, next) => {
  const settings = await CompanySettings.findById('company-settings')
    .populate('createdBy', 'name email');

  if (!settings) {
    return res.status(200).json({
      status: 'success',
      data: {
        data: null
      }
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: settings
    }
  });
});