const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Product title is required'],
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
  category: {
    type: String,
    required: [true, 'Product category is required'],
    trim: true,
    enum: {
      values: [
        'industrial-machinery',
        'heavy-equipment',
        'industrial-tools',
        'automation-systems',
        'material-handling',
        'industrial-supplies',
        'safety-equipment',
        'industrial-parts'
      ],
      message: '{VALUE} is not a valid category'
    },
    index: true
  },// Add this field to your existing Product schema
  industry: {
    type: mongoose.Schema.ObjectId,
    ref: 'Industry',
    index: true
  },
  shortDescription: {
    type: String,
    required: [true, 'Short description is required'],
    trim: true,
    maxlength: [300, 'Short description cannot exceed 300 characters']
  },
  fullDescription: {
    type: String,
    required: [true, 'Full description is required'],
    trim: true
  },
  features: [{
    type: String,
    trim: true,
    maxlength: [200, 'Feature cannot exceed 200 characters']
  }],
  specifications: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    value: {
      type: String,
      required: true,
      trim: true
    },
    unit: {
      type: String,
      trim: true
    }
  }],
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: function() {
        return this.parent().title;
      }
    },
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  brochureURL: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/.+\.(pdf|doc|docx)$/i.test(v);
      },
      message: 'Brochure must be a valid PDF or DOC URL'
    }
  },
  metaTitle: {
    type: String,
    trim: true,
    maxlength: [60, 'Meta title should not exceed 60 characters']
  },
  metaDescription: {
    type: String,
    trim: true,
    maxlength: [160, 'Meta description should not exceed 160 characters']
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  sortOrder: {
    type: Number,
    default: 0
  },
  seoKeywords: [String],
  relatedProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
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
productSchema.pre('save', function () {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();
  }
});

// Ensure primary image logic
productSchema.pre('save', function () {
  if (this.images && this.images.length > 0) {
    const hasPrimary = this.images.some(img => img.isPrimary);
    if (!hasPrimary) {
      this.images[0].isPrimary = true;
    }
  }
});

// Virtual for primary image
productSchema.virtual('primaryImage').get(function() {
  return this.images?.find(img => img.isPrimary) || this.images?.[0];
});

// Indexes for efficient querying
productSchema.index({ title: 'text', shortDescription: 'text', fullDescription: 'text' });
productSchema.index({ category: 1, isActive: 1 });
productSchema.index({ sortOrder: 1 });
productSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Product', productSchema);