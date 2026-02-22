const { validationResult } = require('express-validator');
const { Product, Industry } = require('../models'); // ADD Industry
const factory = require('./factoryHandler');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const APIFeatures = require('../utils/apiFeatures'); // ADD this if not already

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
exports.getAllProducts = catchAsync(async (req, res, next) => {
  // Handle industry filtering by slug
  if (req.query.industry) {
    const industry = await Industry.findOne({ slug: req.query.industry });
    if (industry) {
      req.query.industry = industry._id;
    } else {
      // Return empty if industry slug doesn't exist
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
  let query = Product.find({ isActive: true }).populate('industry', 'name slug icon');
  
  // Apply API features
  const features = new APIFeatures(query, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const products = await features.query;
  const total = await Product.countDocuments({ isActive: true });

  res.status(200).json({
    status: 'success',
    results: products.length,
    total,
    page: req.query.page * 1 || 1,
    limit: req.query.limit * 1 || 10,
    data: {
      data: products
    }
  });
});

// @desc    Get single product
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
    .populate('createdBy', 'name email')
    .populate('industry', 'name slug icon'); // ADD industry population

  if (!product) {
    return next(new AppError('No product found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: product
    }
  });
});

// @desc    Get product by slug
// @route   GET /api/v1/products/slug/:slug
// @access  Public
exports.getProductBySlug = catchAsync(async (req, res, next) => {
  const product = await Product.findOne({ slug: req.params.slug, isActive: true })
    .populate('createdBy', 'name email')
    .populate('industry', 'name slug icon'); // ADD industry population

  if (!product) {
    return next(new AppError('No product found with that slug', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: product
    }
  });
});

// @desc    Create product
// @route   POST /api/v1/products
// @access  Private (Admin)
exports.createProduct = catchAsync(async (req, res, next) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError(errors.array()[0].msg, 400));
  }

  // Add createdBy from authenticated user
  req.body.createdBy = req.user.id;

  // Handle image upload
  if (req.files && req.files.length > 0) {
    req.body.images = req.files.map((file, index) => ({
      url: `/uploads/products/${file.filename}`,
      isPrimary: index === 0 // First image is primary by default
    }));
  }

  const product = await Product.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: product
    }
  });
});

// @desc    Update product
// @route   PATCH /api/v1/products/:id
// @access  Private (Admin)
exports.updateProduct = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError(errors.array()[0].msg, 400));
  }

  // Remove fields that shouldn't be updated
  const filteredBody = { ...req.body };
  const forbiddenFields = ['id', '_id', 'createdAt', 'slug', 'createdBy'];
  forbiddenFields.forEach(field => delete filteredBody[field]);

  // Handle image updates
  if (req.files && req.files.length > 0) {
    const newImages = req.files.map((file, index) => ({
      url: `/uploads/products/${file.filename}`,
      isPrimary: false
    }));
    
    // Merge with existing images or replace based on requirement
    filteredBody.images = [...(req.body.existingImages || []), ...newImages];
  }

  const product = await Product.findByIdAndUpdate(req.params.id, filteredBody, {
    new: true,
    runValidators: true
  });

  if (!product) {
    return next(new AppError('No product found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: product
    }
  });
});

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
// @access  Private (Admin/SuperAdmin)
exports.deleteProduct = factory.deleteOne(Product);

// @desc    Get products by category
// @route   GET /api/v1/products/category/:category
// @access  Public
exports.getProductsByCategory = catchAsync(async (req, res, next) => {
  const products = await Product.find({ 
    category: req.params.category,
    isActive: true 
  }).sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: products.length,
    data: {
      data: products
    }
  });
});

// @desc    Get featured products
// @route   GET /api/v1/products/featured
// @access  Public
exports.getFeaturedProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find({ 
    isActive: true,
    'images.isPrimary': true
  })
    .limit(6)
    .sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: products.length,
    data: {
      data: products
    }
  });
});

// @desc    Bulk update products
// @route   POST /api/v1/products/bulk-update
// @access  Private (Admin/SuperAdmin)
exports.bulkUpdateProducts = catchAsync(async (req, res, next) => {
  const { updates } = req.body;
  
  if (!Array.isArray(updates) || updates.length === 0) {
    return next(new AppError('Please provide an array of updates', 400));
  }

  const bulkOps = updates.map(update => ({
    updateOne: {
      filter: { _id: update.id },
      update: { $set: update.data }
    }
  }));

  const result = await Product.bulkWrite(bulkOps);

  res.status(200).json({
    status: 'success',
    data: {
      modifiedCount: result.modifiedCount
    }
  });
});