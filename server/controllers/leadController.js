const { validationResult } = require('express-validator');
const { Lead } = require('../models');
const factory = require('./factoryHandler');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const sendEmail = require('../utils/emailService');

// @desc    Create lead
// @route   POST /api/v1/leads
// @access  Public
exports.createLead = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError(errors.array()[0].msg, 400));
  }

  // Capture IP and user agent
  req.body.ipAddress = req.ip;
  req.body.userAgent = req.get('User-Agent');

  const lead = await Lead.create(req.body);

  // Send notification email to admin
  try {
    await sendEmail({
      email: process.env.ADMIN_EMAIL,
      subject: 'New Lead Received',
      template: 'newLead',
      data: {
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        company: lead.company,
        message: lead.message,
        service: lead.service
      }
    });

    // Send confirmation email to lead
    await sendEmail({
      email: lead.email,
      subject: 'Thank you for contacting us',
      template: 'leadConfirmation',
      data: {
        name: lead.name
      }
    });
  } catch (error) {
    console.error('Email sending failed:', error);
    // Don't fail the request if email fails
  }

  res.status(201).json({
    status: 'success',
    data: {
      data: lead
    }
  });
});

// @desc    Get all leads
// @route   GET /api/v1/leads
// @access  Private (Admin)
exports.getAllLeads = factory.getAll(Lead);

// @desc    Get single lead
// @route   GET /api/v1/leads/:id
// @access  Private (Admin)
exports.getLead = factory.getOne(Lead, { path: 'assignedTo', select: 'name email' });

// @desc    Update lead status
// @route   PATCH /api/v1/leads/:id/status
// @access  Private (Admin)
exports.updateLeadStatus = catchAsync(async (req, res, next) => {
  const { status, notes } = req.body;

  if (!status) {
    return next(new AppError('Please provide a status', 400));
  }

  const lead = await Lead.findById(req.params.id);

  if (!lead) {
    return next(new AppError('No lead found with that ID', 404));
  }

  // Add note about status change
  if (notes) {
    lead.notes.push({
      content: notes,
      addedBy: req.user.id,
      addedAt: Date.now()
    });
  }

  lead.status = status;
  
  // If converted, set convertedAt
  if (status === 'converted') {
    lead.convertedAt = Date.now();
  }

  await lead.save();

  // Send email notification for status change
  if (status === 'converted' || status === 'qualified') {
    try {
      await sendEmail({
        email: lead.email,
        subject: `Your inquiry status: ${status}`,
        template: 'leadStatusUpdate',
        data: {
          name: lead.name,
          status: status,
          company: lead.company
        }
      });
    } catch (error) {
      console.error('Status update email failed:', error);
    }
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: lead
    }
  });
});

// @desc    Assign lead to admin
// @route   PATCH /api/v1/leads/:id/assign
// @access  Private (Admin/SuperAdmin)
exports.assignLead = catchAsync(async (req, res, next) => {
  const { adminId } = req.body;

  if (!adminId) {
    return next(new AppError('Please provide an admin ID', 400));
  }

  const lead = await Lead.findByIdAndUpdate(
    req.params.id,
    { 
      assignedTo: adminId,
      $push: {
        notes: {
          content: `Lead assigned to admin ${adminId}`,
          addedBy: req.user.id,
          addedAt: Date.now()
        }
      }
    },
    { new: true }
  );

  if (!lead) {
    return next(new AppError('No lead found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: lead
    }
  });
});

// @desc    Add note to lead
// @route   POST /api/v1/leads/:id/notes
// @access  Private (Admin)
exports.addLeadNote = catchAsync(async (req, res, next) => {
  const { content } = req.body;

  if (!content) {
    return next(new AppError('Please provide note content', 400));
  }

  const lead = await Lead.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        notes: {
          content,
          addedBy: req.user.id,
          addedAt: Date.now()
        }
      }
    },
    { new: true }
  );

  if (!lead) {
    return next(new AppError('No lead found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: lead
    }
  });
});

// @desc    Get leads statistics
// @route   GET /api/v1/leads/stats
// @access  Private (Admin)
exports.getLeadStats = catchAsync(async (req, res, next) => {
  const stats = await Lead.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        avgResponseTime: { $avg: '$responseTime' }
      }
    }
  ]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayCount = await Lead.countDocuments({
    createdAt: { $gte: today }
  });

  res.status(200).json({
    status: 'success',
    data: {
      stats,
      todayLeads: todayCount
    }
  });
});


// Add this method for bulk updates
exports.bulkUpdateLeads = catchAsync(async (req, res, next) => {
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

  const result = await Lead.bulkWrite(bulkOps);

  res.status(200).json({
    status: 'success',
    data: {
      modifiedCount: result.modifiedCount
    }
  });
});

// Add this method for exporting leads to CSV
exports.exportLeadsCSV = catchAsync(async (req, res, next) => {
  const leads = await Lead.find().populate('assignedTo', 'name email');
  
  // Create CSV header
  let csv = 'Name,Email,Phone,Company,Service,Status,Priority,Date\n';
  
  // Add rows
  leads.forEach(lead => {
    csv += `"${lead.name}","${lead.email}","${lead.phone}","${lead.company}","${lead.service || ''}","${lead.status}","${lead.priority}","${lead.createdAt.toISOString()}"\n`;
  });

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=leads.csv');
  res.status(200).send(csv);
});