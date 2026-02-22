const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
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
  clientName: {
    type: String,
    required: [true, 'Client name is required'],
    trim: true
  },
  industry: {
    type: String,
    required: [true, 'Industry is required'],
    trim: true,
    index: true
  },
  problemStatement: {
    type: String,
    required: [true, 'Problem statement is required'],
    trim: true
  },
  solutionGiven: {
    type: String,
    required: [true, 'Solution is required'],
    trim: true
  },
  // Add this field to your existing Service schema
  industry: {
    type: mongoose.Schema.ObjectId,
    ref: 'Industry',
    index: true
  },
  results: [{
    metric: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    description: String
  }],
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: String,
    caption: String,
    isBeforeAfter: {
      type: Boolean,
      default: false
    }
  }],
  testimonial: {
    clientName: String,
    designation: String,
    message: String,
    rating: {
      type: Number,
      min: 1,
      max: 5
    }
  },
  completionDate: {
    type: Date,
    required: [true, 'Completion date is required'],
    index: true
  },
  isFeatured: {
    type: Boolean,
    default: false,
    index: true
  },
  technologies: [String],
  services: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  }],
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
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
projectSchema.pre('save', function () {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();
  }
});

// Virtual for project duration
projectSchema.virtual('projectDuration').get(function() {
  if (this.createdAt && this.completionDate) {
    const diffTime = Math.abs(this.completionDate - this.createdAt);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
  return null;
});

// Indexes
projectSchema.index({ isFeatured: -1, completionDate: -1 });
projectSchema.index({ industry: 1, completionDate: -1 });
projectSchema.index({ title: 'text', problemStatement: 'text', solutionGiven: 'text' });

module.exports = mongoose.model('Project', projectSchema);