const CMSPage = require('../models/cmsPage');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const { validationResult } = require('express-validator');
const APIFeatures = require('../utils/apiFeatures');

// @desc    Create a new CMS page
// @route   POST /api/v1/cms
// @access  Private (Admin/Superadmin)
exports.createPage = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError('Validation failed', 400, errors.array()));
  }

  // Check if slug already exists
  const existingPage = await CMSPage.findOne({ slug: req.body.slug });
  if (existingPage) {
    return next(new AppError('A page with this slug already exists', 400));
  }

  const pageData = {
    ...req.body,
    createdBy: req.admin.id
  };

  const page = await CMSPage.create(pageData);

  res.status(201).json({
    status: 'success',
    data: {
      page
    }
  });
});

// @desc    Update a CMS page
// @route   PATCH /api/v1/cms/:id
// @access  Private (Admin/Superadmin)
exports.updatePage = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError('Validation failed', 400, errors.array()));
  }

  const page = await CMSPage.findById(req.params.id);
  if (!page) {
    return next(new AppError('No page found with that ID', 404));
  }

  // If slug is being updated, check uniqueness
  if (req.body.slug && req.body.slug !== page.slug) {
    const existingPage = await CMSPage.findOne({ 
      slug: req.body.slug,
      _id: { $ne: page._id }
    });
    if (existingPage) {
      return next(new AppError('A page with this slug already exists', 400));
    }
  }

  Object.assign(page, req.body);
  await page.save();

  res.status(200).json({
    status: 'success',
    data: {
      page
    }
  });
});

// @desc    Delete a CMS page
// @route   DELETE /api/v1/cms/:id
// @access  Private (Admin/Superadmin)
exports.deletePage = catchAsync(async (req, res, next) => {
  const page = await CMSPage.findById(req.params.id);
  if (!page) {
    return next(new AppError('No page found with that ID', 404));
  }

  await page.deleteOne();

  res.status(204).json({
    status: 'success',
    data: null
  });
});

// @desc    Get a single page by slug (public)
// @route   GET /api/v1/cms/:slug
// @access  Public
exports.getPageBySlug = catchAsync(async (req, res, next) => {
  const page = await CMSPage.findOne({ 
    slug: req.params.slug,
    isPublished: true 
  }).populate('createdBy', 'name email');

  if (!page) {
    return next(new AppError('No page found with that slug', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      page
    }
  });
});

// @desc    Get all pages (admin only)
// @route   GET /api/v1/cms
// @access  Private (Admin/Superadmin)
exports.getAllPages = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(CMSPage.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const pages = await features.query.populate('createdBy', 'name email');
  const total = await CMSPage.countDocuments();

  res.status(200).json({
    status: 'success',
    results: pages.length,
    data: {
      pages,
      total,
      page: req.query.page * 1 || 1,
      limit: req.query.limit * 1 || 10
    }
  });
});

// @desc    Toggle page publish status
// @route   PATCH /api/v1/cms/:id/publish
// @access  Private (Admin/Superadmin)
exports.togglePublish = catchAsync(async (req, res, next) => {
  const page = await CMSPage.findById(req.params.id);
  if (!page) {
    return next(new AppError('No page found with that ID', 404));
  }

  page.isPublished = !page.isPublished;
  await page.save();

  res.status(200).json({
    status: 'success',
    data: {
      page
    }
  });
});