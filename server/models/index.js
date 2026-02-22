// Central export file for all models
const Admin = require('./Admin');
const Brochure = require('./Brochure.js');
const Client = require('./Client.js')
const cmsPage = require('./cmsPage.js')
const CompanySettings = require('./CompanySettings.js')
const Industry = require('./Industry.js')
const Product = require('./Product');
const Service = require('./Service');
const Project = require('./Project');
const Testimonial = require('./Testimonial');
const Lead = require('./Lead.js');
const SEO = require('./SEO');

module.exports = {
  Admin,
  Brochure,
  Client,
  cmsPage,
  CompanySettings,
  Industry,
  Product,
  Service,
  Project,
  Testimonial,
  Lead,
  SEO
};