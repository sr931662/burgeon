const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Service title is required'],
    trim: true,
    unique: true,
    minlength: [3, 'Title must be at least 3 characters long'],
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  overview: {
    type: String,
    required: [true, 'Service overview is required'],
    trim: true,
    minlength: [50, 'Overview must be at least 50 characters long']
  },
  processSteps: [{
    stepNumber: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    icon: String
  }],
  // Add this field to your existing Service schema
  industry: {
    type: mongoose.Schema.ObjectId,
    ref: 'Industry',
    index: true
  },
  industriesServed: [{
    type: String,
    trim: true,
    enum: [
      'automotive',
      'aerospace',
      'construction',
      'manufacturing',
      'energy',
      'chemical',
      'food-processing',
      'pharmaceutical',
      'mining',
      'steel',
      'textile',
      'packaging'
    ]
  }],
  images: [{
    url: String,
    alt: String,
    caption: String
  }],
  icon: {
    type: String,
    required: [true, 'Service icon is required']
  },
  order: {
    type: Number,
    default: 0,
    index: true
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  metaTitle: {
    type: String,
    trim: true,
    maxlength: 60
  },
  metaDescription: {
    type: String,
    trim: true,
    maxlength: 160
  },
  features: [{
    type: String,
    trim: true
  }],
  faqs: [{
    question: String,
    answer: String
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Generate slug before saving
serviceSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();
  }
  // next();
});

// Indexes
serviceSchema.index({ title: 'text', overview: 'text' });
serviceSchema.index({ industriesServed: 1 });

module.exports = mongoose.model('Service', serviceSchema);