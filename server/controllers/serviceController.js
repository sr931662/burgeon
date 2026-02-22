const { validationResult } = require('express-validator');
const { Service, Industry } = require('../models'); // ADD Industry
const factory = require('./factoryHandler');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const APIFeatures = require('../utils/apiFeatures'); // ADD this

// @desc    Get all services
// @route   GET /api/v1/services
// @access  Public
exports.getAllServices = catchAsync(async (req, res, next) => {
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

  // Build query with population
  let query = Service.find({ isActive: true }).populate('industry', 'name slug icon');
  
  // Apply API features
  const features = new APIFeatures(query, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const services = await features.query;
  const total = await Service.countDocuments({ isActive: true });

  res.status(200).json({
    status: 'success',
    results: services.length,
    total,
    page: req.query.page * 1 || 1,
    limit: req.query.limit * 1 || 10,
    data: {
      data: services
    }
  });
});

// @desc    Get single service
// @route   GET /api/v1/services/:id
// @access  Public
exports.getService = catchAsync(async (req, res, next) => {
  const service = await Service.findById(req.params.id)
    .populate('industry', 'name slug icon'); // ADD industry population

  if (!service) {
    return next(new AppError('No service found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: service
    }
  });
});

// @desc    Get service by slug
// @route   GET /api/v1/services/slug/:slug
// @access  Public
exports.getServiceBySlug = catchAsync(async (req, res, next) => {
  const service = await Service.findOne({ slug: req.params.slug, isActive: true })
    .populate('industry', 'name slug icon'); // ADD industry population

  if (!service) {
    return next(new AppError('No service found with that slug', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: service
    }
  });
});

// @desc    Create service
// @route   POST /api/v1/services
// @access  Private (Admin)
exports.createService = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError(errors.array()[0].msg, 400));
  }

  // Add createdBy
  req.body.createdBy = req.user.id;

  const service = await Service.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: service
    }
  });
});

// @desc    Update service
// @route   PATCH /api/v1/services/:id
// @access  Private (Admin)
exports.updateService = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError(errors.array()[0].msg, 400));
  }

  const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!service) {
    return next(new AppError('No service found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: service
    }
  });
});

// @desc    Delete service
// @route   DELETE /api/v1/services/:id
// @access  Private (Admin/SuperAdmin)
exports.deleteService = factory.deleteOne(Service);

// @desc    Update service order
// @route   PATCH /api/v1/services/reorder
// @access  Private (Admin)
exports.reorderServices = catchAsync(async (req, res, next) => {
  const { orders } = req.body;

  if (!Array.isArray(orders)) {
    return next(new AppError('Please provide an array of service orders', 400));
  }

  const bulkOps = orders.map(order => ({
    updateOne: {
      filter: { _id: order.id },
      update: { $set: { order: order.order } }
    }
  }));

  await Service.bulkWrite(bulkOps);

  res.status(200).json({
    status: 'success',
    message: 'Services reordered successfully'
  });
});

// @desc    Get services by industry (legacy - supports both string and ObjectId)
// @route   GET /api/v1/services/industry/:industry
// @access  Public
exports.getServicesByIndustry = catchAsync(async (req, res, next) => {
  let query = { isActive: true };
  
  // Check if the parameter is a valid ObjectId (new system) or string (legacy)
  if (req.params.industry.match(/^[0-9a-fA-F]{24}$/)) {
    query.industry = req.params.industry;
  } else {
    // Legacy support - assuming industriesServed field exists
    query.industriesServed = req.params.industry;
  }

  const services = await Service.find(query)
    .populate('industry', 'name slug icon')
    .sort('order');

  res.status(200).json({
    status: 'success',
    results: services.length,
    data: {
      data: services
    }
  });
});
