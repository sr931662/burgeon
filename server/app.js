const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const sanitizeHtml = require('sanitize-html');
const hpp = require('hpp');
const compression = require('compression');
const mongoSanitize = require('mongo-sanitize');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const config = require('./config/env.config');
const routes = require('./routes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const { apiLimiter, authLimiter } = require('./middlewares/rateLimiter');
const { sanitizeInput, preventXSS, preventParameterPollution } = require('./middlewares/validateMiddleware');

// Initialize express
const app = express();

// 1️⃣ TRUST PROXY
app.enable('trust proxy');

// 2️⃣ SECURITY MIDDLEWARES
// Set security HTTP headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      imgSrc: ["'self'", "data:", "blob:", "https:"],
      connectSrc: ["'self'", "https://"],
      fontSrc: ["'self'", "https:", "data:"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: process.env.NODE_ENV === 'production',
  crossOriginOpenerPolicy: process.env.NODE_ENV === 'production',
  crossOriginResourcePolicy: { policy: "cross-origin" },
  dnsPrefetchControl: { allow: false },
  frameguard: { action: 'deny' },
  hidePoweredBy: true,
  hsts: process.env.NODE_ENV === 'production' ? {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  } : false,
  ieNoOpen: true,
  noSniff: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  xssFilter: true
}));

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      config.cors.origin,
      ...(process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [])
    ];
    
    if (process.env.NODE_ENV === 'development') {
      allowedOrigins.push('http://localhost:3000', 'http://localhost:5000', 'http://127.0.0.1:3000');
    }
    
    if (allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      console.warn(`CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range']
};

app.use(cors(corsOptions));

// 3️⃣ BODY PARSING - MUST COME BEFORE SANITIZATION
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 4️⃣ DATA SANITIZATION - AFTER BODY PARSING
// Sanitize input to prevent NoSQL injection
app.use((req, res, next) => {
  if (req.body) req.body = mongoSanitize(req.body);
  if (req.params) req.params = mongoSanitize(req.params);
  next();
});

// Custom sanitization
app.use(sanitizeInput);

// Data sanitization against XSS
app.use(preventXSS);

// Prevent parameter pollution
app.use(hpp({
  whitelist: [
    'price', 'rating', 'createdAt', 'category', 'industry',
    'status', 'priority', 'page', 'limit', 'sort'
  ]
}));
app.use(preventParameterPollution);

// 5️⃣ COMPRESSION
app.use(compression());

// 6️⃣ LOGGING
// Create logs directory if it doesn't exist
const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Access log stream
const accessLogStream = fs.createWriteStream(
  path.join(logDir, 'access.log'),
  { flags: 'a' }
);

// Morgan logging configuration
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined', { 
    stream: accessLogStream,
    skip: (req, res) => res.statusCode < 400
  }));
  
  const errorLogStream = fs.createWriteStream(
    path.join(logDir, 'error.log'),
    { flags: 'a' }
  );
  
  app.use(morgan('combined', {
    stream: errorLogStream,
    skip: (req, res) => res.statusCode < 400
  }));
}

// 7️⃣ STATIC FILES
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  maxAge: process.env.NODE_ENV === 'production' ? '1d' : 0,
  etag: true,
  lastModified: true,
  setHeaders: (res, path) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
  }
}));

// 8️⃣ RATE LIMITING
// Apply rate limiting to all API routes
app.use('/api', apiLimiter);

// Stricter rate limiting for auth routes
app.use('/api/v1/auth/login', authLimiter);
app.use('/api/v1/auth/register', authLimiter);
app.use('/api/v1/auth/forgot-password', authLimiter);

// 9️⃣ HEALTH CHECK ENDPOINT
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    memory: process.memoryUsage(),
    mongoConnection: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// 🔟 API ROUTES
app.use('/api/v1', routes);

// 1️⃣1️⃣ ROOT ROUTE
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Industrial Engineering API',
    version: '1.0.0',
    documentation: '/api/v1/docs',
    health: '/health'
  });
});

// 1️⃣2️⃣ 404 HANDLER
app.use((req, res, next) => {
  notFound(req, res, next);
});
// 1️⃣3️⃣ GLOBAL ERROR HANDLER
app.use(errorHandler);

module.exports = app;