const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: './.env' });

// Handle uncaught exceptions (must be at the top)
process.on('uncaughtException', (err) => {
  console.error('💥 UNCAUGHT EXCEPTION! Shutting down...');
  console.error(err.name, err.message);
  console.error(err.stack);
  
  // Log to file in production
  if (process.env.NODE_ENV === 'production') {
    const fs = require('fs');
    const logEntry = `[${new Date().toISOString()}] UNCAUGHT EXCEPTION: ${err.name} - ${err.message}\n${err.stack}\n`;
    fs.appendFileSync('logs/errors.log', logEntry);
  }
  
  process.exit(1);
});

// Import app after handling uncaught exceptions
const app = require('./app');
const config = require('./config/env.config');
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

// Start server
const PORT = config.port || 5000;
const server = app.listen(PORT, () => {
  console.log(`✅ Server running in ${config.env} mode on port ${PORT}`);
  console.log(`📍 API: http://localhost:${PORT}/api/v1`);
  console.log(`💚 Health: http://localhost:${PORT}/health`);
  
  if (config.env === 'production') {
    console.log('🔒 Production mode: Security features enabled');
    console.log(`🌐 CORS origin: ${config.cors.origin}`);
  }
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('💥 UNHANDLED REJECTION! Shutting down...');
  console.error(err.name, err.message);
  console.error(err.stack);
  
  // Log to file in production
  if (process.env.NODE_ENV === 'production') {
    const fs = require('fs');
    const logEntry = `[${new Date().toISOString()}] UNHANDLED REJECTION: ${err.name} - ${err.message}\n${err.stack}\n`;
    fs.appendFileSync('logs/errors.log', logEntry);
  }
  
  // Graceful shutdown
  server.close(() => {
    console.log('👋 Server closed.');
    process.exit(1);
  });
});

// Graceful shutdown on SIGTERM (for cloud platforms)
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('💤 Process terminated!');
    mongoose.connection.close(false, () => {
      process.exit(0);
    });
  });
});

// Graceful shutdown on SIGINT (for development)
process.on('SIGINT', () => {
  console.log('👋 SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('💤 Process terminated!');
    mongoose.connection.close(false, () => {
      process.exit(0);
    });
  });
});

module.exports = server;