const mongoose = require('mongoose');
const slugify = require('slugify');

const cmsPageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Page title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  content: {
    type: String,
    required: [true, 'Page content is required']
  },
  featuredImage: {
    type: String,
    default: null
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
  isPublished: {
    type: Boolean,
    default: false
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

// Generate slug from title before validation
cmsPageSchema.pre('validate', function(next) {
  if (this.title && (!this.slug || this.isModified('title'))) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g
    });
  }
  next();
});

// Text search index for content search
cmsPageSchema.index({ 
  title: 'text', 
  content: 'text',
  metaTitle: 'text',
  metaDescription: 'text' 
});

// Compound index for unique slug per published status (optional but useful)
cmsPageSchema.index({ slug: 1, isPublished: 1 });

const CMSPage = mongoose.model('CMSPage', cmsPageSchema);

module.exports = CMSPage;