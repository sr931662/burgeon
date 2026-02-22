const mongoose = require('mongoose');
const slugify = require('slugify');

const industrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Industry name is required'],
    unique: true,
    trim: true,
    maxlength: [100, 'Industry name cannot exceed 100 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  icon: {
    type: String,
    trim: true,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  displayOrder: {
    type: Number,
    default: 0,
    min: [0, 'Display order cannot be negative']
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'Admin',
    required: true
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

// Generate slug from name before validation
industrySchema.pre('validate', function(next) {
  if (this.name && (!this.slug || this.isModified('name'))) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g
    });
  }
  next();
});

// Prevent duplicate slugs (additional safety)
industrySchema.pre('save', async function(next) {
  if (!this.isModified('slug')) return next();
  
  const slugRegex = new RegExp(`^${this.slug}(-[0-9]*)?$`, 'i');
  const existingWithSlug = await this.constructor.find({ 
    slug: slugRegex,
    _id: { $ne: this._id }
  });
  
  if (existingWithSlug.length > 0) {
    this.slug = `${this.slug}-${existingWithSlug.length + 1}`;
  }
  next();
});

// Compound index for active industries with display order
industrySchema.index({ isActive: 1, displayOrder: 1, name: 1 });

// Text search index
industrySchema.index({ 
  name: 'text', 
  description: 'text' 
});

const Industry = mongoose.model('Industry', industrySchema);

module.exports = Industry;