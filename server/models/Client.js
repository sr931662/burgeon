const mongoose = require('mongoose');
const slugify = require('slugify');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Client/Partner name is required'],
    unique: true,
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  logoURL: {
    type: String,
    required: [true, 'Logo URL is required'],
    trim: true
  },
  website: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        if (!v) return true;
        return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(v);
      },
      message: 'Please provide a valid website URL'
    }
  },
  industry: {
    type: mongoose.Schema.ObjectId,
    ref: 'Industry',
    index: true
  },
  type: {
    type: String,
    enum: {
      values: ['client', 'partner', 'vendor'],
      message: 'Type must be client, partner, or vendor'
    },
    default: 'client',
    index: true
  },
  isFeatured: {
    type: Boolean,
    default: false,
    index: true
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
  shortDescription: {
    type: String,
    trim: true,
    maxlength: [200, 'Description cannot exceed 200 characters']
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

// Generate slug from name before validation
clientSchema.pre('validate', function(next) {
  if (this.name && (!this.slug || this.isModified('name'))) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g
    });
  }
  next();
});

// Prevent duplicate slugs
clientSchema.pre('save', async function(next) {
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

// Compound indexes for common queries
clientSchema.index({ type: 1, isActive: 1, displayOrder: 1 });
clientSchema.index({ isFeatured: 1, displayOrder: 1, isActive: 1 });
clientSchema.index({ industry: 1, isActive: 1 });

// Text search index
clientSchema.index({ 
  name: 'text', 
  shortDescription: 'text' 
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;