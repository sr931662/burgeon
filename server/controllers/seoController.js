const { validationResult } = require('express-validator');
const { SEO } = require('../models');
const factory = require('./factoryHandler');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

// @desc    Get all SEO entries
// @route   GET /api/v1/seo
// @access  Private (Admin)
exports.getAllSEO = factory.getAll(SEO);

// @desc    Get single SEO entry
// @route   GET /api/v1/seo/:id
// @access  Private (Admin)
exports.getSEO = factory.getOne(SEO);

// @desc    Get SEO by page
// @route   GET /api/v1/seo/page/:page
// @access  Public
exports.getSEOByPage = catchAsync(async (req, res, next) => {
  const seo = await SEO.findOne({ page: req.params.page });

  if (!seo) {
    // Return default SEO if not found
    return res.status(200).json({
      status: 'success',
      data: {
        data: {
          page: req.params.page,
          metaTitle: `Industrial Engineering ${req.params.page}`,
          metaDescription: `Professional industrial engineering ${req.params.page} services and solutions`,
          keywords: ['industrial engineering', req.params.page]
        }
      }
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: seo
    }
  });
});

// @desc    Create SEO entry
// @route   POST /api/v1/seo
// @access  Private (Admin)
exports.createSEO = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError(errors.array()[0].msg, 400));
  }

  // Check if SEO entry already exists for this page
  const existingSEO = await SEO.findOne({ page: req.body.page });
  if (existingSEO) {
    return next(new AppError(`SEO entry for page '${req.body.page}' already exists`, 400));
  }

  // Add createdBy
  req.body.createdBy = req.user.id;

  const seo = await SEO.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: seo
    }
  });
});

// @desc    Update SEO entry
// @route   PATCH /api/v1/seo/:id
// @access  Private (Admin)
exports.updateSEO = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError(errors.array()[0].msg, 400));
  }

  const seo = await SEO.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!seo) {
    return next(new AppError('No SEO entry found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: seo
    }
  });
});

// @desc    Delete SEO entry
// @route   DELETE /api/v1/seo/:id
// @access  Private (Admin/SuperAdmin)
exports.deleteSEO = factory.deleteOne(SEO);

// @desc    Bulk update SEO entries
// @route   POST /api/v1/seo/bulk-update
// @access  Private (Admin/SuperAdmin)
exports.bulkUpdateSEO = catchAsync(async (req, res, next) => {
  const { updates } = req.body;

  if (!Array.isArray(updates) || updates.length === 0) {
    return next(new AppError('Please provide an array of updates', 400));
  }

  const bulkOps = updates.map(update => ({
    updateOne: {
      filter: { page: update.page },
      update: { $set: update.data },
      upsert: true
    }
  }));

  const result = await SEO.bulkWrite(bulkOps);

  res.status(200).json({
    status: 'success',
    data: {
      modifiedCount: result.modifiedCount,
      upsertedCount: result.upsertedCount
    }
  });
});

// @desc    Generate sitemap data
// @route   GET /api/v1/seo/sitemap
// @access  Public
exports.generateSitemap = catchAsync(async (req, res, next) => {
  const pages = await SEO.find({}, 'page updatedAt');
  
  const sitemapData = pages.map(page => ({
    url: `/${page.page}`,
    lastModified: page.updatedAt,
    changeFrequency: 'weekly',
    priority: page.page === 'home' ? 1.0 : 0.8
  }));

  res.status(200).json({
    status: 'success',
    data: {
      data: sitemapData
    }
  });
});