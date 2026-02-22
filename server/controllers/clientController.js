const { validationResult } = require('express-validator');
const Client = require('../models/Client');
const Industry = require('../models/Industry');
const Project = require('../models/Project'); // For checking references
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');

// @desc    Create a new client/partner
// @route   POST /api/v1/clients
// @access  Private (Admin/Superadmin)
exports.createClient = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError(errors.array()[0].msg, 400));
  }

  // Add createdBy from authenticated user
  const clientData = {
    ...req.body,
    createdBy: req.user.id
  };

  const client = await Client.create(clientData);

  res.status(201).json({
    status: 'success',
    data: {
      data: client
    }
  });
});

// @desc    Update a client
// @route   PATCH /api/v1/clients/:id
// @access  Private (Admin/Superadmin)
exports.updateClient = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError(errors.array()[0].msg, 400));
  }

  // Remove fields that shouldn't be updated directly
  const filteredBody = { ...req.body };
  const forbiddenFields = ['id', '_id', 'createdAt', 'slug', 'createdBy'];
  forbiddenFields.forEach(field => delete filteredBody[field]);

  const client = await Client.findByIdAndUpdate(
    req.params.id, 
    filteredBody, 
    {
      new: true,
      runValidators: true
    }
  );

  if (!client) {
    return next(new AppError('No client found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: client
    }
  });
});

// @desc    Delete a client (with reference check)
// @route   DELETE /api/v1/clients/:id
// @access  Private (Admin/Superadmin)
exports.deleteClient = catchAsync(async (req, res, next) => {
  const client = await Client.findById(req.params.id);
  
  if (!client) {
    return next(new AppError('No client found with that ID', 404));
  }

  // Check if client is referenced in any projects (if applicable)
  // Uncomment if you have a client field in projects
  // const projectCount = await Project.countDocuments({ client: client._id });
  // if (projectCount > 0) {
  //   return next(new AppError(`Cannot delete client. It is referenced in ${projectCount} projects.`, 400));
  // }

  await client.deleteOne();

  res.status(204).json({
    status: 'success',
    data: null
  });
});

// @desc    Toggle client active status
// @route   PATCH /api/v1/clients/:id/active
// @access  Private (Admin/Superadmin)
exports.toggleActive = catchAsync(async (req, res, next) => {
  const client = await Client.findById(req.params.id);
  
  if (!client) {
    return next(new AppError('No client found with that ID', 404));
  }

  client.isActive = !client.isActive;
  await client.save();

  res.status(200).json({
    status: 'success',
    data: {
      data: client
    }
  });
});

// @desc    Toggle featured status
// @route   PATCH /api/v1/clients/:id/feature
// @access  Private (Admin/Superadmin)
exports.toggleFeatured = catchAsync(async (req, res, next) => {
  const client = await Client.findById(req.params.id);
  
  if (!client) {
    return next(new AppError('No client found with that ID', 404));
  }

  client.isFeatured = !client.isFeatured;
  await client.save();

  res.status(200).json({
    status: 'success',
    data: {
      data: client
    }
  });
});

// @desc    Reorder clients (bulk update displayOrder)
// @route   PATCH /api/v1/clients/reorder
// @access  Private (Admin/Superadmin)
exports.reorderClients = catchAsync(async (req, res, next) => {
  const { orders } = req.body;

  if (!Array.isArray(orders) || orders.length === 0) {
    return next(new AppError('Please provide an array of client orders', 400));
  }

  const bulkOps = orders.map(order => ({
    updateOne: {
      filter: { _id: order.id },
      update: { $set: { displayOrder: order.order } }
    }
  }));

  await Client.bulkWrite(bulkOps);

  res.status(200).json({
    status: 'success',
    message: 'Clients reordered successfully'
  });
});

// @desc    Get all clients (with filtering)
// @route   GET /api/v1/clients
// @access  Public
exports.getAllClients = catchAsync(async (req, res, next) => {
  // Build base query - only active clients for public
  let query = Client.find({ isActive: true });

  // Handle industry filtering by slug
  if (req.query.industry) {
    const industry = await Industry.findOne({ slug: req.query.industry });
    if (industry) {
      query = query.where('industry').equals(industry._id);
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

  // Handle type filtering
  if (req.query.type) {
    query = query.where('type').equals(req.query.type);
  }

  // Handle featured filtering
  if (req.query.featured === 'true') {
    query = query.where('isFeatured').equals(true);
  }

  // Apply population
  query = query.populate('industry', 'name slug icon');

  // Apply API features (pagination, sorting, etc.)
  const features = new APIFeatures(query, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const clients = await features.query;
  const total = await Client.countDocuments({ isActive: true });

  res.status(200).json({
    status: 'success',
    results: clients.length,
    total,
    page: req.query.page * 1 || 1,
    limit: req.query.limit * 1 || 10,
    data: {
      data: clients
    }
  });
});

// @desc    Get featured clients
// @route   GET /api/v1/clients/featured
// @access  Public
exports.getFeaturedClients = catchAsync(async (req, res, next) => {
  const clients = await Client.find({ 
    isActive: true, 
    isFeatured: true 
  })
    .populate('industry', 'name slug icon')
    .sort('displayOrder name')
    .limit(req.query.limit || 10);

  res.status(200).json({
    status: 'success',
    results: clients.length,
    data: {
      data: clients
    }
  });
});

// @desc    Get clients by industry (supports both slug and ID)
// @route   GET /api/v1/clients/industry/:industry
// @access  Public
exports.getClientsByIndustry = catchAsync(async (req, res, next) => {
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

  const clients = await Client.find({ 
    industry: industryId,
    isActive: true 
  })
    .populate('industry', 'name slug icon')
    .sort('displayOrder name');

  res.status(200).json({
    status: 'success',
    results: clients.length,
    data: {
      data: clients
    }
  });
});

// @desc    Get single client by slug
// @route   GET /api/v1/clients/:slug
// @access  Public
exports.getClientBySlug = catchAsync(async (req, res, next) => {
  const client = await Client.findOne({ 
    slug: req.params.slug,
    isActive: true 
  }).populate('industry', 'name slug icon');

  if (!client) {
    return next(new AppError('No client found with that slug', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: client
    }
  });
});