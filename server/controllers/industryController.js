const Industry = require('../models/Industry');
const Product = require('../models/Product');
const Service = require('../models/Service');
const Project = require('../models/Project');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const { validationResult } = require('express-validator');
const APIFeatures = require('../utils/apiFeatures');

// @desc    Create a new industry
// @route   POST /api/v1/industries
// @access  Private (Admin/Superadmin)
exports.createIndustry = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError('Validation failed', 400, errors.array()));
  }

  const industryData = {
    ...req.body,
    createdBy: req.admin.id
  };

  const industry = await Industry.create(industryData);

  res.status(201).json({
    status: 'success',
    data: {
      industry
    }
  });
});

// @desc    Update an industry
// @route   PATCH /api/v1/industries/:id
// @access  Private (Admin/Superadmin)
exports.updateIndustry = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError('Validation failed', 400, errors.array()));
  }

  const industry = await Industry.findById(req.params.id);
  if (!industry) {
    return next(new AppError('No industry found with that ID', 404));
  }

  // Check if trying to make name unique
  if (req.body.name && req.body.name !== industry.name) {
    const existingIndustry = await Industry.findOne({ 
      name: req.body.name,
      _id: { $ne: industry._id }
    });
    if (existingIndustry) {
      return next(new AppError('Industry with this name already exists', 400));
    }
  }

  Object.assign(industry, req.body);
  await industry.save();

  res.status(200).json({
    status: 'success',
    data: {
      industry
    }
  });
});

// @desc    Delete an industry (only if not in use)
// @route   DELETE /api/v1/industries/:id
// @access  Private (Admin/Superadmin)
exports.deleteIndustry = catchAsync(async (req, res, next) => {
  const industry = await Industry.findById(req.params.id);
  if (!industry) {
    return next(new AppError('No industry found with that ID', 404));
  }

  // Check if industry is being used by any product, service, or project
  const [productsCount, servicesCount, projectsCount] = await Promise.all([
    Product.countDocuments({ industry: industry._id }),
    Service.countDocuments({ industry: industry._id }),
    Project.countDocuments({ industry: industry._id })
  ]);

  const totalUsage = productsCount + servicesCount + projectsCount;
  
  if (totalUsage > 0) {
    return next(new AppError(
      `Cannot delete industry. It is being used by ${productsCount} products, ${servicesCount} services, and ${projectsCount} projects.`,
      400
    ));
  }

  await industry.deleteOne();

  res.status(204).json({
    status: 'success',
    data: null
  });
});

// @desc    Get all industries (public - only active)
// @route   GET /api/v1/industries
// @access  Public
exports.getAllIndustries = catchAsync(async (req, res, next) => {
  // Base query: only active industries for public
  let query = Industry.find({ isActive: true });
  
  // Allow admins to see all industries
  if (req.admin) {
    query = Industry.find();
  }

  const features = new APIFeatures(query, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const industries = await features.query
    .populate('createdBy', 'name email')
    .sort('displayOrder name');

  const total = await Industry.countDocuments(
    req.admin ? {} : { isActive: true }
  );

  res.status(200).json({
    status: 'success',
    results: industries.length,
    data: {
      industries,
      total,
      page: req.query.page * 1 || 1,
      limit: req.query.limit * 1 || 10
    }
  });
});

// @desc    Get industry by slug
// @route   GET /api/v1/industries/:slug
// @access  Public
exports.getIndustryBySlug = catchAsync(async (req, res, next) => {
  const industry = await Industry.findOne({ 
    slug: req.params.slug,
    ...(!req.admin && { isActive: true })
  }).populate('createdBy', 'name email');

  if (!industry) {
    return next(new AppError('No industry found with that slug', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      industry
    }
  });
});