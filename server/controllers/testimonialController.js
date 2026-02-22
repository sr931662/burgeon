const { validationResult } = require('express-validator');
const { Testimonial } = require('../models');
const factory = require('./factoryHandler');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

// @desc    Get all testimonials
// @route   GET /api/v1/testimonials
// @access  Public
exports.getAllTestimonials = factory.getAll(Testimonial, {
  filter: { isApproved: true }
});

// @desc    Get single testimonial
// @route   GET /api/v1/testimonials/:id
// @access  Public
exports.getTestimonial = factory.getOne(Testimonial, [
  { path: 'project', select: 'title slug' },
  { path: 'service', select: 'title slug' }
]);

// @desc    Create testimonial
// @route   POST /api/v1/testimonials
// @access  Public (with approval) or Private (Admin)
exports.createTestimonial = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError(errors.array()[0].msg, 400));
  }

  // If created by admin, auto-approve
  if (req.user) {
    req.body.isApproved = true;
    req.body.createdBy = req.user.id;
  } else {
    // Public submissions need approval
    req.body.isApproved = false;
  }

  const testimonial = await Testimonial.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: testimonial
    }
  });
});

// @desc    Update testimonial
// @route   PATCH /api/v1/testimonials/:id
// @access  Private (Admin)
exports.updateTestimonial = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError(errors.array()[0].msg, 400));
  }

  const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!testimonial) {
    return next(new AppError('No testimonial found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: testimonial
    }
  });
});

// @desc    Delete testimonial
// @route   DELETE /api/v1/testimonials/:id
// @access  Private (Admin/SuperAdmin)
exports.deleteTestimonial = factory.deleteOne(Testimonial);

// @desc    Approve testimonial
// @route   PATCH /api/v1/testimonials/:id/approve
// @access  Private (Admin)
exports.approveTestimonial = catchAsync(async (req, res, next) => {
  const testimonial = await Testimonial.findByIdAndUpdate(
    req.params.id, 
    { isApproved: true },
    { new: true }
  );

  if (!testimonial) {
    return next(new AppError('No testimonial found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: testimonial
    }
  });
});

// @desc    Get featured testimonials
// @route   GET /api/v1/testimonials/featured
// @access  Public
exports.getFeaturedTestimonials = catchAsync(async (req, res, next) => {
  const testimonials = await Testimonial.find({ 
    isFeatured: true,
    isApproved: true 
  })
    .limit(6)
    .sort('-rating');

  res.status(200).json({
    status: 'success',
    results: testimonials.length,
    data: {
      data: testimonials
    }
  });
});

// @desc    Get testimonials by rating
// @route   GET /api/v1/testimonials/rating/:rating
// @access  Public
exports.getTestimonialsByRating = catchAsync(async (req, res, next) => {
  const rating = parseInt(req.params.rating);
  
  if (rating < 1 || rating > 5) {
    return next(new AppError('Rating must be between 1 and 5', 400));
  }

  const testimonials = await Testimonial.find({ 
    rating: { $gte: rating },
    isApproved: true 
  }).sort('-rating');

  res.status(200).json({
    status: 'success',
    results: testimonials.length,
    data: {
      data: testimonials
    }
  });
});