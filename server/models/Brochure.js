const mongoose = require('mongoose');

const brochureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Brochure title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  fileURL: {
    type: String,
    required: [true, 'File URL is required'],
    trim: true
  },
  fileSize: {
    type: Number,
    min: [0, 'File size cannot be negative']
  },
  fileType: {
    type: String,
    enum: {
      values: ['pdf', 'doc', 'docx'],
      message: 'File type must be pdf, doc, or docx'
    },
    default: 'pdf'
  },
  category: {
    type: String,
    enum: {
      values: ['product', 'service', 'company-profile', 'technical'],
      message: 'Category must be product, service, company-profile, or technical'
    },
    required: [true, 'Category is required'],
    index: true
  },
  relatedProduct: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    index: true
  },
  relatedService: {
    type: mongoose.Schema.ObjectId,
    ref: 'Service',
    index: true
  },
  isPublic: {
    type: Boolean,
    default: true,
    index: true
  },
  downloadCount: {
    type: Number,
    default: 0,
    min: [0, 'Download count cannot be negative']
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'Admin',
    required: [true, 'Creator information is required']
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      delete ret.__v;
      delete ret.createdBy?.password;
      return ret;
    }
  },
  toObject: {
    virtuals: true,
    transform: function(doc, ret) {
      delete ret.__v;
      return ret;
    }
  }
});

// Compound indexes for common queries
brochureSchema.index({ category: 1, isPublic: 1, createdAt: -1 });
brochureSchema.index({ relatedProduct: 1, isPublic: 1 });
brochureSchema.index({ relatedService: 1, isPublic: 1 });

// Pre-remove hook to check if brochure is being used (optional)
brochureSchema.pre('deleteOne', { document: true, query: false }, function(next) {
  // Add any cleanup logic here if needed
  console.log(`Brochure "${this.title}" is being deleted`);
  next();
});

// Static method to get popular brochures
brochureSchema.statics.getPopular = function(limit = 10) {
  return this.find({ isPublic: true })
    .sort('-downloadCount')
    .limit(limit)
    .populate('relatedProduct', 'name slug')
    .populate('relatedService', 'title slug');
};

const Brochure = mongoose.model('Brochure', brochureSchema);

module.exports = Brochure;