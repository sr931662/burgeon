const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const APIFeatures = require('../utils/apiFeatures');

// Delete One
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  });

// Update One
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    // Remove fields that shouldn't be updated
    const filteredBody = { ...req.body };
    const forbiddenFields = ['id', '_id', 'createdAt', 'slug'];
    forbiddenFields.forEach(field => delete filteredBody[field]);

    const doc = await Model.findByIdAndUpdate(req.params.id, filteredBody, {
      new: true,
      runValidators: true
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

// Create One
exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    // Add createdBy from authenticated user
    if (req.user) {
      req.body.createdBy = req.user.id;
    }

    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

// Get One
exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    
    // If slug is provided instead of ID
    if (req.params.slug) {
      query = Model.findOne({ slug: req.params.slug });
    }

    if (popOptions) query = query.populate(popOptions);
    
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

// Get All (with filtering, sorting, pagination)
exports.getAll = (Model, options = {}) =>
  catchAsync(async (req, res, next) => {
    // Build query
    const features = new APIFeatures(Model.find(options.filter || {}), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    // Execute query
    const docs = await features.query;
    
    // Get total count for pagination
    const totalCount = await Model.countDocuments(features.query._conditions);

    res.status(200).json({
      status: 'success',
      results: docs.length,
      total: totalCount,
      page: req.query.page * 1 || 1,
      limit: req.query.limit * 1 || 10,
      totalPages: Math.ceil(totalCount / (req.query.limit * 1 || 10)),
      data: {
        data: docs
      }
    });
  });