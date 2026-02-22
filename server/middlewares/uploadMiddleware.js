const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const AppError = require('../utils/AppError');

// Ensure upload directories exist
const createUploadDirs = () => {
  const dirs = [
    'uploads',
    'uploads/products',
    'uploads/services',
    'uploads/projects',
    'uploads/testimonials',
    'uploads/brochures',
    'uploads/temp'
  ];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

createUploadDirs();

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = 'uploads/';
    
    // Determine folder based on route or file type
    if (req.baseUrl.includes('products')) {
      uploadPath += 'products/';
    } else if (req.baseUrl.includes('services')) {
      uploadPath += 'services/';
    } else if (req.baseUrl.includes('projects')) {
      uploadPath += 'projects/';
    } else if (req.baseUrl.includes('testimonials')) {
      uploadPath += 'testimonials/';
    } else if (file.mimetype === 'application/pdf') {
      uploadPath += 'brochures/';
    } else {
      uploadPath += 'temp/';
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate secure random filename
    const randomString = crypto.randomBytes(16).toString('hex');
    const sanitizedOriginalName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_');
    const uniqueSuffix = `${Date.now()}-${randomString}`;
    const extension = path.extname(sanitizedOriginalName);
    
    cb(null, `${uniqueSuffix}${extension}`);
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Allowed mime types
  const allowedMimeTypes = {
    images: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
    documents: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    archives: ['application/zip', 'application/x-rar-compressed']
  };

  // Check if file type is allowed
  const allAllowedTypes = [...allowedMimeTypes.images, ...allowedMimeTypes.documents, ...allowedMimeTypes.archives];
  
  if (allAllowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new AppError(`File type not allowed. Allowed types: ${allAllowedTypes.join(', ')}`, 400), false);
  }
};

// Multer configuration
const upload = multer({
  storage: storage,
  limits: {
    fileSize: process.env.MAX_FILE_SIZE || 5 * 1024 * 1024, // 5MB default
    files: 10 // Max 10 files per upload
  },
  fileFilter: fileFilter
});

// Middleware for single file upload
exports.uploadSingle = (fieldName) => {
  return (req, res, next) => {
    upload.single(fieldName)(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return next(new AppError(`File too large. Max size: ${process.env.MAX_FILE_SIZE / (1024 * 1024)}MB`, 400));
        }
        if (err.code === 'LIMIT_FILE_COUNT') {
          return next(new AppError('Too many files', 400));
        }
        return next(new AppError(err.message, 400));
      } else if (err) {
        return next(err);
      }
      next();
    });
  };
};

// Middleware for multiple file upload
exports.uploadMultiple = (fieldName, maxCount = 10) => {
  return (req, res, next) => {
    upload.array(fieldName, maxCount)(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return next(new AppError(`File too large. Max size: ${process.env.MAX_FILE_SIZE / (1024 * 1024)}MB`, 400));
        }
        if (err.code === 'LIMIT_FILE_COUNT') {
          return next(new AppError(`Too many files. Max: ${maxCount}`, 400));
        }
        return next(new AppError(err.message, 400));
      } else if (err) {
        return next(err);
      }
      next();
    });
  };
};

// Middleware for multiple fields upload
exports.uploadFields = (fields) => {
  return (req, res, next) => {
    upload.fields(fields)(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return next(new AppError(err.message, 400));
      } else if (err) {
        return next(err);
      }
      next();
    });
  };
};

// Clean up old temp files
exports.cleanTempFiles = () => {
  const tempDir = 'uploads/temp/';
  if (fs.existsSync(tempDir)) {
    const files = fs.readdirSync(tempDir);
    const now = Date.now();
    
    files.forEach(file => {
      const filePath = path.join(tempDir, file);
      const stats = fs.statSync(filePath);
      const fileAge = now - stats.mtimeMs;
      
      // Delete files older than 24 hours
      if (fileAge > 24 * 60 * 60 * 1000) {
        fs.unlinkSync(filePath);
      }
    });
  }
};

// Run cleanup every hour
setInterval(exports.cleanTempFiles, 60 * 60 * 1000);