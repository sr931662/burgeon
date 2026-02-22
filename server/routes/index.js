const express = require('express');
const router = express.Router();

// Import all route modules
const authRoutes = require('./authRoutes');
const productRoutes = require('./productRoutes');
const serviceRoutes = require('./serviceRoutes');
const projectRoutes = require('./projectRoutes');
const testimonialRoutes = require('./testimonialRoutes');
const leadRoutes = require('./leadRoutes');
const seoRoutes = require('./seoRoutes');
const cmsRoutes = require('./cmsRoutes');
const brochureRoutes = require('./brochureRoutes'); // ADD THIS LINE
const industryRoutes = require('./industryRoutes');
const clientRoutes = require('./clientRoutes');
const companySettingsRoutes = require('./companySettingsRoutes');

router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running',
    timestamp: new Date().toISOString(),
    version: 'v1'
  });
});

// Mount routes
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/services', serviceRoutes);
router.use('/projects', projectRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/leads', leadRoutes);
router.use('/seo', seoRoutes);
router.use('/cms', cmsRoutes);
router.use('/brochures', brochureRoutes); // ADD THIS LINE
router.use('/industries', industryRoutes);
router.use('/clients', clientRoutes);
router.use('/settings', companySettingsRoutes);

// API documentation route (if you have one)
router.get('/docs', (req, res) => {
  res.json({
    status: 'success',
    message: 'API Documentation',
    version: '1.0.0',
    endpoints: {
      auth: '/api/v1/auth',
      products: '/api/v1/products',
      services: '/api/v1/services',
      projects: '/api/v1/projects',
      testimonials: '/api/v1/testimonials',
      leads: '/api/v1/leads',
      seo: '/api/v1/seo',
      cms: '/api/v1/cms',
      brochures: '/api/v1/brochures', // ADD THIS LINE
      industries: '/api/v1/industries',
      clients: '/api/v1/clients',
      settings: '/api/v1/settings'
    }
  });
});

module.exports = router;