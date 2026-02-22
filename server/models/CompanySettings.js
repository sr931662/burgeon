const mongoose = require('mongoose');

// Location sub-schema
const locationSchema = new mongoose.Schema({
  officeName: {
    type: String,
    required: [true, 'Office name is required'],
    trim: true
  },
  addressLine1: {
    type: String,
    required: [true, 'Address line 1 is required'],
    trim: true
  },
  addressLine2: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  state: {
    type: String,
    required: [true, 'State is required'],
    trim: true
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true
  },
  pincode: {
    type: String,
    required: [true, 'Pincode is required'],
    trim: true
  },
  googleMapsURL: {
    type: String,
    trim: true
  },
  isHeadOffice: {
    type: Boolean,
    default: false
  }
}, { _id: true });

// Business hours sub-schema
const businessHoursSchema = new mongoose.Schema({
  weekdays: {
    type: String,
    default: '9:00 AM - 6:00 PM'
  },
  saturday: {
    type: String,
    default: 'Closed'
  },
  sunday: {
    type: String,
    default: 'Closed'
  },
  timezone: {
    type: String,
    default: 'Asia/Kolkata'
  }
}, { _id: false });

// Social links sub-schema
const socialLinksSchema = new mongoose.Schema({
  linkedin: { type: String, trim: true },
  facebook: { type: String, trim: true },
  instagram: { type: String, trim: true },
  youtube: { type: String, trim: true },
  twitter: { type: String, trim: true }
}, { _id: false });

// Main settings schema
const companySettingsSchema = new mongoose.Schema({
  // Ensure only one document exists
  _id: {
    type: String,
    default: 'company-settings' // Fixed ID to enforce single document
  },

  // Basic Info
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  tagline: {
    type: String,
    trim: true,
    maxlength: [200, 'Tagline cannot exceed 200 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  establishedYear: {
    type: Number,
    min: [1800, 'Established year must be valid'],
    max: [new Date().getFullYear(), 'Established year cannot be in the future']
  },
  registrationNumber: {
    type: String,
    trim: true
  },

  // Branding
  branding: {
    logoPrimary: { type: String, trim: true },
    logoSecondary: { type: String, trim: true },
    favicon: { type: String, trim: true },
    brandColorPrimary: { 
      type: String, 
      trim: true,
      match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Please provide a valid hex color']
    },
    brandColorSecondary: { 
      type: String, 
      trim: true,
      match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Please provide a valid hex color']
    }
  },

  // Contact
  contact: {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    phone: {
      type: String,
      trim: true
    },
    alternatePhone: {
      type: String,
      trim: true
    },
    whatsapp: {
      type: String,
      trim: true
    },
    supportEmail: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid support email']
    }
  },

  // Locations (Array)
  locations: [locationSchema],

  // Business Hours
  businessHours: {
    type: businessHoursSchema,
    default: () => ({})
  },

  // Social Links
  socialLinks: {
    type: socialLinksSchema,
    default: () => ({})
  },

  // SEO Defaults
  seoDefaults: {
    defaultMetaTitle: {
      type: String,
      trim: true,
      maxlength: [60, 'Meta title should not exceed 60 characters']
    },
    defaultMetaDescription: {
      type: String,
      trim: true,
      maxlength: [160, 'Meta description should not exceed 160 characters']
    },
    defaultKeywords: [{
      type: String,
      trim: true
    }]
  },

  // Other
  maintenanceMode: {
    type: Boolean,
    default: false
  },
  maintenanceMessage: {
    type: String,
    trim: true,
    default: 'Site is under maintenance. Please check back soon.'
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

// Ensure single document by using a fixed _id
companySettingsSchema.statics.ensureSingleDocument = async function() {
  const count = await this.countDocuments();
  if (count > 1) {
    // Keep only the most recent document
    const docs = await this.find().sort('-createdAt');
    for (let i = 1; i < docs.length; i++) {
      await docs[i].deleteOne();
    }
  }
};

// Text search index
companySettingsSchema.index({ 
  companyName: 'text', 
  description: 'text',
  'seoDefaults.defaultKeywords': 'text'
});

// Pre-save middleware to ensure only one document
companySettingsSchema.pre('save', async function(next) {
  if (this.isNew) {
    const count = await this.constructor.countDocuments();
    if (count >= 1 && !this._id) {
      return next(new Error('Company settings already exist. Use update instead.'));
    }
  }
  next();
});

const CompanySettings = mongoose.model('CompanySettings', companySettingsSchema);

module.exports = CompanySettings;