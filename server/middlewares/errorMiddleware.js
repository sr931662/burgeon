const AppError = require('../utils/AppError');

// ===== Existing helper functions same as yours =====
// (handleCastErrorDB, handleDuplicateFieldsDB, etc.)
// Keep everything above unchanged
// ---------------------------------------------------


// Development error response
const sendErrorDev = (err, req, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack
  });
};

// Production error response
const sendErrorProd = (err, req, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  }

  console.error('ERROR 💥', err);

  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!'
  });
};

// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  console.error({
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method,
    error: {
      message: err.message,
      stack: err.stack,
      statusCode: err.statusCode
    },
    user: req.user ? req.user.id : 'unauthenticated',
    ip: req.ip
  });

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else {
    let error = { ...err };
    error.message = err.message;

    if (err.name === 'CastError') error = handleCastErrorDB(err);
    if (err.code === 11000) error = handleDuplicateFieldsDB(err);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(err);
    if (err.name === 'JsonWebTokenError') error = handleJWTError();
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
};

// 404 handler
const notFound = (req, res, next) => {
  const err = new AppError(`Can't find ${req.originalUrl} on this server!`, 404);
  next(err);
};

// Unhandled rejection handler
const unhandledRejection = (server) => {
  process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION! 💥 Shutting down...');
    console.error(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });
};

// Uncaught exception handler
const uncaughtException = () => {
  process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.error(err.name, err.message);
    console.error(err.stack);
    process.exit(1);
  });
};

// ✅ EXPORT EVERYTHING PROPERLY
module.exports = {
  sendErrorDev,
  sendErrorProd,
  errorHandler,
  notFound,
  unhandledRejection,
  uncaughtException
};