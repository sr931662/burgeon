const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: [true, 'Client name is required'],
    trim: true,
    index: true
  },
  designation: {
    type: String,
    required: [true, 'Designation is required'],
    trim: true
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    index: true
  },
  message: {
    type: String,
    required: [true, 'Testimonial message is required'],
    trim: true,
    minlength: [10, 'Message must be at least 10 characters long'],
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  image: {
    url: String,
    alt: {
      type: String,
      default: function() {
        return `${this.clientName} - ${this.company}`;
      }
    }
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  },
  isFeatured: {
    type: Boolean,
    default: false,
    index: true
  },
  isApproved: {
    type: Boolean,
    default: true,
    index: true
  },
  displayOrder: {
    type: Number,
    default: 0
  },
  videoUrl: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/(www\.)?(youtube\.com|vimeo\.com)\/.+$/.test(v);
      },
      message: 'Please provide a valid YouTube or Vimeo URL'
    }
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Ensure rating is a whole number
testimonialSchema.pre('validate', function(next) {
  if (this.rating) {
    this.rating = Math.round(this.rating * 2) / 2; // Round to nearest 0.5
  }
  // next();
});

// Indexes
testimonialSchema.index({ isFeatured: -1, displayOrder: 1 });
testimonialSchema.index({ company: 1, rating: -1 });
testimonialSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Testimonial', testimonialSchema);