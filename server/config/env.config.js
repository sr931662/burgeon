const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

// Validate required environment variables
const requiredEnvVars = [
  'NODE_ENV',
  'PORT',
  'MONGODB_URI',
  'JWT_SECRET',
  'JWT_EXPIRES_IN'
];

if (process.env.NODE_ENV === 'production') {
  requiredEnvVars.push(
    'MONGODB_URI_PRODUCTION',
    'EMAIL_HOST',
    'EMAIL_USERNAME',
    'EMAIL_PASSWORD',
    'EMAIL_FROM'
  );
}

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
if (missingEnvVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

// Environment configuration
const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 5000,
  
  mongo: {
    uri: process.env.NODE_ENV === 'production' 
      ? process.env.MONGODB_URI_PRODUCTION 
      : process.env.MONGODB_URI || 'mongodb://localhost:27017/industrial_db',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: process.env.NODE_ENV === 'development',
      maxPoolSize: 50,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
      retryWrites: true,
      retryReads: true
    }
  },
  
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '90d',
    cookieExpiresIn: parseInt(process.env.JWT_COOKIE_EXPIRES_IN, 10) || 90
  },
  
  email: {
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT, 10) || 587,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    },
    from: process.env.EMAIL_FROM,
    templates: path.join(__dirname, '../templates/email')
  },
  
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100
  },
  
  cors: {
    origin: process.env.NODE_ENV === 'production'
      ? process.env.CORS_ORIGIN_PRODUCTION || process.env.CORS_ORIGIN
      : process.env.CORS_ORIGIN || 'http://localhost:3000'
  },
  
  upload: {
    maxSize: parseInt(process.env.MAX_FILE_SIZE, 10) || 5 * 1024 * 1024,
    allowedTypes: (process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/webp,application/pdf').split(',')
  },
  
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    dir: process.env.LOG_DIR || 'logs'
  }
};

// Platform-specific configurations
if (process.env.RENDER === 'true') {
  console.log('🚀 Running on Render platform');
  config.platform = 'render';
  config.cors.origin = process.env.CORS_ORIGIN_PRODUCTION || 'https://*.onrender.com';
} else if (process.env.AWS_EXECUTION_ENV) {
  console.log('🚀 Running on AWS platform');
  config.platform = 'aws';
} else if (process.env.DROPLET_ID) {
  console.log('🚀 Running on DigitalOcean platform');
  config.platform = 'digitalocean';
}

module.exports = config;