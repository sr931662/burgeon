const mongoose = require('mongoose');

const seoSchema = new mongoose.Schema({
  page: {
    type: String,
    required: [true, 'Page identifier is required'],
    unique: true,
    trim: true,
    index: true,
    enum: {
      values: [
        'home',
        'products',
        'services',
        'projects',
        'about',
        'contact',
        'blog',
        'careers'
      ],
      message: '{VALUE} is not a valid page'
    }
  },
  metaTitle: {
    type: String,
    required: [true, 'Meta title is required'],
    trim: true,
    maxlength: [60, 'Meta title should not exceed 60 characters'],
    validate: {
      validator: function(title) {
        return title.length >= 30 && title.length <= 60;
      },
      message: 'Meta title should be between 30 and 60 characters for optimal SEO'
    }
  },
  metaDescription: {
    type: String,
    required: [true, 'Meta description is required'],
    trim: true,
    maxlength: [160, 'Meta description should not exceed 160 characters'],
    validate: {
      validator: function(desc) {
        return desc.length >= 120 && desc.length <= 160;
      },
      message: 'Meta description should be between 120 and 160 characters for optimal SEO'
    }
  },
  keywords: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  ogTitle: {
    type: String,
    trim: true,
    maxlength: 60
  },
  ogDescription: {
    type: String,
    trim: true,
    maxlength: 160
  },
  ogImage: {
    type: String
  },
  twitterCard: {
    type: String,
    enum: ['summary', 'summary_large_image', 'app', 'player'],
    default: 'summary_large_image'
  },
  canonicalUrl: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || validator.isURL(v);
      },
      message: 'Please provide a valid canonical URL'
    }
  },
  robots: {
    type: String,
    default: 'index, follow',
    enum: ['index, follow', 'noindex, follow', 'index, nofollow', 'noindex, nofollow']
  },
  structuredData: {
    type: mongoose.Schema.Types.Mixed, // For JSON-LD schema markup
    default: null
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

// Index for full-text search
seoSchema.index({ keywords: 1 });
seoSchema.index({ metaTitle: 'text', metaDescription: 'text', keywords: 'text' });

// Virtual for page URL
seoSchema.virtual('pageUrl').get(function() {
  const baseUrl = process.env.BASE_URL || 'https://industrialcompany.com';
  return `${baseUrl}/${this.page}`;
});

// Pre-save validation for structured data
seoSchema.pre('save', function(next) {
  if (this.structuredData) {
    try {
      // Ensure it's valid JSON
      JSON.stringify(this.structuredData);
    } catch (error) {
      next(new Error('Invalid structured data format'));
    }
  }
  // next();
});

module.exports = mongoose.model('SEO', seoSchema);