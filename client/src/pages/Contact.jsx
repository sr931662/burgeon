import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Contact.module.css';
import { submitLead } from '../api/leads';

// Icon URLs from the HTML
const phoneIcon = "https://cdn-icons-png.flaticon.com/512/724/724664.png";
const emailIcon = "https://cdn-icons-png.flaticon.com/512/732/732200.png";
const locationIcon = "https://cdn-icons-png.flaticon.com/512/684/684809.png";
const timeIcon = "https://cdn-icons-png.flaticon.com/512/2088/2088617.png";
const whatsappIcon = "https://cdn-icons-png.flaticon.com/512/3670/3670051.png";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    product: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  
  const formRef = useRef(null);

  useEffect(() => {
    // Page load reveal
    setTimeout(() => document.body.classList.add('loaded'), 50);
  }, []);

  // Intersection Observer for fade-up animation
  useEffect(() => {
    const currentRef = formRef.current;

    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
    };
  }, []);

  // Clear success message after 5 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Format data for API
      const leadData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        company: formData.company || undefined,
        productInterest: formData.product || undefined,
        message: formData.message,
        source: 'website_contact_form'
      };

      await submitLead(leadData);
      
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        product: '',
        message: ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Product options for dropdown
  const productOptions = [
    { value: '', label: 'Select a product (optional)' },
    { value: 'paint-booth', label: 'Liquid Paint Booth' },
    { value: 'wet-dry-booth', label: 'Wet / Dry Paint Booth' },
    { value: 'compact-booth', label: 'Compact Paint Booth' },
    { value: 'bake-oven', label: 'Bake Oven' },
    { value: 'dry-off-oven', label: 'Dry-off Oven' },
    { value: 'pretreatment', label: 'Pretreatment System' },
    { value: 'ced-plant', label: 'CED Plant' },
    { value: 'ed-equipment', label: 'ED Equipment' },
    { value: 'powder-coating-plant', label: 'Powder Coating Plant' },
    { value: 'powder-coating-booth', label: 'Powder Coating Booth' },
    { value: 'component-washing', label: 'Component Washing Machine' },
    { value: 'piping', label: 'Utility & Process Piping' },
    { value: 'complete-system', label: 'Complete Paint Shop System' },
    { value: 'other', label: 'Other / Not sure' }
  ];

  return (
    <>
      {/* PAGE HERO */}
      <section className={styles.pageHero}>
        <div className={styles.container}>
          <div className={styles.pageHeroEyebrow}>
            <Link to="/">Home</Link> <span className={styles.sep}>/</span> Contact
          </div>
          <h1 className={styles.pageTitle}>
            Let's engineer<br /><span className={styles.accent}>your next project</span>
          </h1>
          <p className={styles.pageSubtitle}>
            Tell us about your requirements. Our engineers will respond within 24 hours with a tailored proposal.
          </p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div 
            ref={formRef}
            className={`${styles.contactGrid} ${styles.fadeUp} ${isVisible ? styles.fadeUpVisible : ''}`}
          >
            {/* Info Side */}
            <div className={styles.contactInfoBlock}>
              {/* Phone Card */}
              <div className={styles.contactCard}>
                <div className={styles.contactCardIcon}>
                  <img src={phoneIcon} alt="phone" />
                </div>
                <div>
                  <div className={styles.contactCardLabel}>Phone</div>
                  <div className={styles.contactCardVal}>
                    <a href="tel:+918527754455">+91 8527754455</a><br />
                    <a href="tel:+919999688621">+91 9999688621</a>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className={styles.contactCard}>
                <div className={styles.contactCardIcon}>
                  <img src={emailIcon} alt="email" />
                </div>
                <div>
                  <div className={styles.contactCardLabel}>Email</div>
                  <div className={styles.contactCardVal}>
                    <a href="mailto:info@burgeonengineering.com">info@burgeonengineering.com</a><br />
                    <a href="mailto:kunalkapoor@burgeonengineering.com">kunalkapoor@burgeonengineering.com</a>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className={styles.contactCard}>
                <div className={styles.contactCardIcon}>
                  <img src={locationIcon} alt="location" />
                </div>
                <div>
                  <div className={styles.contactCardLabel}>Office Address</div>
                  <div className={styles.contactCardVal}>
                    Unit No.-510, Eros Corporate Park,<br />
                    Sector-2, NH-8 IMT Manesar,<br />
                    Gurgaon-122052, India
                  </div>
                </div>
              </div>

              {/* Hours Card */}
              <div className={styles.contactCard}>
                <div className={styles.contactCardIcon}>
                  <img src={timeIcon} alt="time" />
                </div>
                <div>
                  <div className={styles.contactCardLabel}>Office Hours</div>
                  <div className={styles.contactCardVal}>
                    Monday – Friday: 9:00 – 18:00<br />
                    Saturday: 9:00 – 13:00
                  </div>
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className={`${styles.contactCard} ${styles.whatsappCard}`}>
                <div className={styles.contactCardIcon}>
                  <img src={whatsappIcon} alt="whatsapp" />
                </div>
                <div>
                  <div className={styles.contactCardLabel}>WhatsApp</div>
                  <div className={styles.contactCardVal}>
                    <a href="https://wa.me/918527754455" target="_blank" rel="noopener noreferrer">
                      Chat on WhatsApp →
                    </a><br />
                    <span>Fastest response for urgent enquiries</span>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className={styles.mapWrap}>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3510.393256890193!2d77.04556731507656!3d28.40805818250775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d228b6c3b9c8b%3A0x9b0c5e5e5e5e5e5e!2sEros%20Corporate%20Park!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                  title="Burgeon Engineering location map"
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* Form Side */}
            <div className={styles.contactFormWrap}>
              <h2 className={styles.formTitle}>Send us an enquiry</h2>

              {/* Success Message */}
              {success && (
                <div className={`${styles.alert} ${styles.alertSuccess}`}>
                  <span className={styles.alertIcon}>✓</span>
                  Thank you for your enquiry! We'll be in touch within 24 hours.
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className={`${styles.alert} ${styles.alertError}`}>
                  <span className={styles.alertIcon}>⚠</span>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className={styles.form} autoComplete="on">
                <div className={styles.formGrid}>
                  {/* Name Field */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="name">
                      Full name <span>*</span>
                    </label>
                    <input
                      className={`${styles.formInput} ${validationErrors.name ? styles.error : ''}`}
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      autoComplete="name"
                      disabled={loading}
                    />
                    {validationErrors.name && (
                      <div className={styles.errorMessage}>{validationErrors.name}</div>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="email">
                      Email address <span>*</span>
                    </label>
                    <input
                      className={`${styles.formInput} ${validationErrors.email ? styles.error : ''}`}
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      autoComplete="email"
                      disabled={loading}
                    />
                    {validationErrors.email && (
                      <div className={styles.errorMessage}>{validationErrors.email}</div>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="phone">
                      Phone number
                    </label>
                    <input
                      className={styles.formInput}
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      autoComplete="tel"
                      disabled={loading}
                    />
                  </div>

                  {/* Company Field */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="company">
                      Company
                    </label>
                    <input
                      className={styles.formInput}
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company name"
                      autoComplete="organization"
                      disabled={loading}
                    />
                  </div>

                  {/* Product Interest Dropdown */}
                  <div className={`${styles.formGroup} ${styles.full}`}>
                    <label className={styles.formLabel} htmlFor="product">
                      Product interest
                    </label>
                    <select
                      className={styles.formSelect}
                      id="product"
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      disabled={loading}
                    >
                      {productOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message Field */}
                  <div className={`${styles.formGroup} ${styles.full}`}>
                    <label className={styles.formLabel} htmlFor="message">
                      Tell us about your project <span>*</span>
                    </label>
                    <textarea
                      className={`${styles.formTextarea} ${validationErrors.message ? styles.error : ''}`}
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      placeholder="Describe your requirements: part sizes, production volumes, existing equipment, space constraints..."
                      disabled={loading}
                    ></textarea>
                    {validationErrors.message && (
                      <div className={styles.errorMessage}>{validationErrors.message}</div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className={styles.formSubmit}
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send enquiry →'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
