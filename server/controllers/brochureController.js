const Brochure = require('../models/Brochure');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const { validationResult } = require('express-validator');
const APIFeatures = require('../utils/apiFeatures');

// @desc    Create a new brochure
// @route   POST /api/v1/brochures
// @access  Private (Admin/Superadmin)
exports.createBrochure = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError('Validation failed', 400, errors.array()));
  }

  const brochureData = {
    ...req.body,
    createdBy: req.user.id
  };

  const brochure = await Brochure.create(brochureData);

  res.status(201).json({
    status: 'success',
    data: {
      brochure
    }
  });
});

// @desc    Get all brochures (public with filtering)
// @route   GET /api/v1/brochures
// @access  Public
exports.getAllBrochures = catchAsync(async (req, res, next) => {
  // Build query - only show public brochures to public users
  let query = Brochure.find({ isPublic: true });
  
  // Allow admins to see all brochures if they're authenticated
  if (req.admin) {
    query = Brochure.find(); // Admins can see everything
  }

  const features = new APIFeatures(query, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const brochures = await features.query
    .populate('relatedProduct', 'name slug')
    .populate('relatedService', 'title slug')
    .populate('createdBy', 'name email');

  const total = await Brochure.countDocuments(
    req.admin ? {} : { isPublic: true }
  );

  res.status(200).json({
    status: 'success',
    results: brochures.length,
    data: {
      brochures,
      total,
      page: req.query.page * 1 || 1,
      limit: req.query.limit * 1 || 10
    }
  });
});

// @desc    Get single brochure by ID
// @route   GET /api/v1/brochures/:id
// @access  Public (with download tracking)
exports.getBrochureById = catchAsync(async (req, res, next) => {
  const brochure = await Brochure.findById(req.params.id)
    .populate('relatedProduct', 'name slug')
    .populate('relatedService', 'title slug')
    .populate('createdBy', 'name email');

  if (!brochure) {
    return next(new AppError('No brochure found with that ID', 404));
  }

  // Check if brochure is public or user is admin
  if (!brochure.isPublic && !req.admin) {
    return next(new AppError('This brochure is not available for public access', 403));
  }

  // Increment download count if accessed publicly
  if (!req.admin) {
    brochure.downloadCount += 1;
    await brochure.save({ validateBeforeSave: false });
  }

  res.status(200).json({
    status: 'success',
    data: {
      brochure
    }
  });
});

// @desc    Delete a brochure
// @route   DELETE /api/v1/brochures/:id
// @access  Private (Admin/Superadmin)
exports.deleteBrochure = catchAsync(async (req, res, next) => {
  const brochure = await Brochure.findById(req.params.id);

  if (!brochure) {
    return next(new AppError('No brochure found with that ID', 404));
  }

  await brochure.deleteOne();

  res.status(204).json({
    status: 'success',
    data: null
  });
});

// @desc    Increment download count manually (alternative endpoint)
// @route   PATCH /api/v1/brochures/:id/download
// @access  Public
exports.incrementDownloadCount = catchAsync(async (req, res, next) => {
  const brochure = await Brochure.findById(req.params.id);

  if (!brochure) {
    return next(new AppError('No brochure found with that ID', 404));
  }

  if (!brochure.isPublic) {
    return next(new AppError('This brochure is not available for public download', 403));
  }

  brochure.downloadCount += 1;
  await brochure.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    data: {
      downloadCount: brochure.downloadCount
    }
  });
});