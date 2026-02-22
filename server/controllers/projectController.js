const { validationResult } = require('express-validator');
const { Project, Industry } = require('../models'); // ADD Industry
const factory = require('./factoryHandler');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const APIFeatures = require('../utils/apiFeatures'); // ADD this
const mongoose = require('mongoose'); // ADD this

// @desc    Get all projects
// @route   GET /api/v1/projects
// @access  Public
exports.getAllProjects = catchAsync(async (req, res, next) => {
  // Handle industry filtering by slug
  if (req.query.industry) {
    const industry = await Industry.findOne({ slug: req.query.industry });
    if (industry) {
      req.query.industry = industry._id;
    } else {
      return res.status(200).json({
        status: 'success',
        results: 0,
        data: {
          data: []
        }
      });
    }
  }

  // Build base query with populations
  let query = Project.find().populate([
    { path: 'services', select: 'title slug' },
    { path: 'products', select: 'title slug' },
    { path: 'industry', select: 'name slug icon' }
  ]);
  
  // Apply API features
  const features = new APIFeatures(query, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const projects = await features.query;
  const total = await Project.countDocuments();

  res.status(200).json({
    status: 'success',
    results: projects.length,
    total,
    page: req.query.page * 1 || 1,
    limit: req.query.limit * 1 || 10,
    data: {
      data: projects
    }
  });
});

// @desc    Get single project
// @route   GET /api/v1/projects/:id
// @access  Public
exports.getProject = catchAsync(async (req, res, next) => {
  const project = await Project.findById(req.params.id)
    .populate('services', 'title slug')
    .populate('products', 'title slug')
    .populate('industry', 'name slug icon'); // ADD industry population

  if (!project) {
    return next(new AppError('No project found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: project
    }
  });
});

// @desc    Get project by slug
// @route   GET /api/v1/projects/slug/:slug
// @access  Public
exports.getProjectBySlug = catchAsync(async (req, res, next) => {
  const project = await Project.findOne({ slug: req.params.slug })
    .populate('services', 'title slug')
    .populate('products', 'title slug')
    .populate('industry', 'name slug icon'); // ADD industry population

  if (!project) {
    return next(new AppError('No project found with that slug', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: project
    }
  });
});

// @desc    Create project
// @route   POST /api/v1/projects
// @access  Private (Admin)
exports.createProject = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError(errors.array()[0].msg, 400));
  }

  // Add createdBy
  req.body.createdBy = req.user.id;

  // Handle image upload
  if (req.files && req.files.length > 0) {
    req.body.images = req.files.map(file => ({
      url: `/uploads/projects/${file.filename}`
    }));
  }

  const project = await Project.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: project
    }
  });
});

// @desc    Update project
// @route   PATCH /api/v1/projects/:id
// @access  Private (Admin)
exports.updateProject = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError(errors.array()[0].msg, 400));
  }

  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!project) {
    return next(new AppError('No project found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: project
    }
  });
});

// @desc    Delete project
// @route   DELETE /api/v1/projects/:id
// @access  Private (Admin/SuperAdmin)
exports.deleteProject = factory.deleteOne(Project);

// @desc    Get featured projects
// @route   GET /api/v1/projects/featured
// @access  Public
exports.getFeaturedProjects = catchAsync(async (req, res, next) => {
  const projects = await Project.find({ isFeatured: true })
    .limit(6)
    .sort('-completionDate');

  res.status(200).json({
    status: 'success',
    results: projects.length,
    data: {
      data: projects
    }
  });
});

// @desc    Get projects by industry (supports both slug and ID)
// @route   GET /api/v1/projects/industry/:industry
// @access  Public
exports.getProjectsByIndustry = catchAsync(async (req, res, next) => {
  let industryId = req.params.industry;
  
  // Check if it's a slug (not a valid ObjectId)
  if (!req.params.industry.match(/^[0-9a-fA-F]{24}$/)) {
    const industry = await Industry.findOne({ slug: req.params.industry });
    if (industry) {
      industryId = industry._id;
    } else {
      return res.status(200).json({
        status: 'success',
        results: 0,
        data: {
          data: []
        }
      });
    }
  }

  // Handle both ObjectId and legacy string formats
  const projects = await Project.find({
    $or: [
      { industry: industryId },
      { industry: industryId.toString() } // For legacy string values
    ]
  })
    .populate('services', 'title slug')
    .populate('products', 'title slug')
    .populate('industry', 'name slug icon')
    .sort('-completionDate');

  res.status(200).json({
    status: 'success',
    results: projects.length,
    data: {
      data: projects
    }
  });
});

// @desc    Get projects by date range
// @route   GET /api/v1/projects/date-range
// @access  Public
exports.getProjectsByDateRange = catchAsync(async (req, res, next) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return next(new AppError('Please provide start and end dates', 400));
  }

  const projects = await Project.find({
    completionDate: {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    }
  }).sort('completionDate');

  res.status(200).json({
    status: 'success',
    results: projects.length,
    data: {
      data: projects
    }
  });
});