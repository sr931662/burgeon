import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './LiquidPaintBoothPage.module.css';

const LiquidPaintBoothPage = () => {
  const [isVisible, setIsVisible] = useState({
    detail: false,
    cta: false
  });
  
  const detailRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Page load reveal
    setTimeout(() => document.body.classList.add('loaded'), 50);
  }, []);

  // Intersection Observer for fade-up animations
  useEffect(() => {
    const observers = [];

    const setupObserver = (ref, stateKey) => {
      if (!ref.current) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [stateKey]: true }));
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -20px 0px' }
      );

      observer.observe(ref.current);
      observers.push(observer);
    };

    setupObserver(detailRef, 'detail');
    setupObserver(ctaRef, 'cta');

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  // Feature list
  const features = [
    "Perforated ceiling plenum for uniform airflow distribution",
    "Multistage filtration: pre-filter, bag filter, HEPA optional",
    "Explosion-proof LED lighting (800 lux minimum) and motors",
    "Modular panel construction for fast, precise site installation",
    "Stainless steel water wash options for high-volume operation",
    "Integrated exhaust fan and damper controls",
    "PLC-ready control panel with safety interlocks"
  ];

  // Technical specifications
  const specifications = [
    { label: "Air velocity", value: "0.3 – 0.6 m/s" },
    { label: "Filtration efficiency", value: "98% @ 5 microns" },
    { label: "Lighting", value: "LED, 800 lux minimum" },
    { label: "Construction", value: "MS/SS powder coated panels" },
    { label: "Airflow type", value: "Downdraft / Semi-downdraft / Crossflow" },
    { label: "Electrical", value: "As per site requirements" }
  ];

  // Application areas
  const applications = [
    "Automotive components",
    "Agricultural machinery",
    "General engineering",
    "Heavy equipment",
    "Aerospace parts",
    "Fabricated metal",
    "Job shops"
  ];

  return (
    <>
      {/* PAGE HERO */}
      <section className={styles.pageHero}>
        <div className={styles.container}>
          <div className={styles.pageHeroEyebrow}>
            <Link to="/">Home</Link> <span className={styles.sep}>/</span> 
            <Link to="/services">Services</Link> <span className={styles.sep}>/</span> 
            Liquid Paint Booth
          </div>
          <h1 className={styles.pageTitle}>
            Liquid Paint <span className={styles.accent}>Booth</span>
          </h1>
          <p className={styles.pageSubtitle}>
            Precision airflow engineering for flawless industrial finishes.
          </p>
        </div>
      </section>

      {/* PRODUCT DETAIL SECTION */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div 
            ref={detailRef}
            className={`${styles.productDetailGrid} ${styles.fadeUp} ${isVisible.detail ? styles.fadeUpVisible : ''}`}
          >
            {/* Left Column - Overview */}
            <div>
              <span className={styles.sectionEyebrow}>Overview</span>
              <h2 className={styles.sectionTitle} style={{ fontSize: '1.8rem', marginTop: '16px', marginBottom: '24px' }}>
                What we deliver
              </h2>
              <p className={styles.productOverview}>
                Burgeon liquid paint booths are engineered for optimal operator comfort and superior coating quality. Available in downdraft, semi-downdraft, and crossflow configurations to match your part geometry, production volume, and environmental requirements. Every booth features modular panel construction for rapid installation and future expansion.
              </p>
              <p className={styles.productFeaturesTitle}>Key features</p>
              <ul className={styles.featureList}>
                {features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <div className={styles.appChips}>
                {applications.map((app, index) => (
                  <Link 
                    key={index} 
                    to={`/services?application=${app.toLowerCase().replace(/\s+/g, '-')}`}
                    className={styles.appChip}
                  >
                    {app}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Column - Specs & CTA */}
            <div className={styles.productAside}>
              <div className={styles.specTableWrap}>
                <div className={styles.specTableHead}>Technical specifications</div>
                <table className={styles.specTable}>
                  <tbody>
                    {specifications.map((spec, index) => (
                      <tr key={index}>
                        <td>{spec.label}</td>
                        <td>{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={styles.productCta}>
                <h3>Configure your paint booth</h3>
                <p>Our engineers will design the perfect system for your requirements.</p>
                <Link 
                  to="/contact?product=liquid-paint-booth" 
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  style={{ marginTop: 0 }}
                >
                  Get a quote →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className={`${styles.section} ${styles.bgSurface}`}>
        <div className={styles.container}>
          <div 
            ref={ctaRef}
            className={`${styles.ctaBand} ${styles.fadeUp} ${isVisible.cta ? styles.fadeUpVisible : ''}`}
          >
            <div className={styles.ctaBandPattern} aria-hidden="true"></div>
            <div>
              <h2 className={styles.ctaBandTitle}>Ready to start<br />your project?</h2>
              <p className={styles.ctaBandSub}>Talk to our engineers — response within 24 hours.</p>
              <div style={{ marginTop: '32px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/contact" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`}>
                  Contact us →
                </Link>
                <Link to="/turnover" className={`${styles.btn} ${styles.btnOutline} ${styles.btnLg}`}>
                  See our installations
                </Link>
              </div>
            </div>
            <div className={styles.ctaBandActions}>
              <div className={styles.ctaContactItem}>
                📞 <a href="tel:+918527754455">+91 8527754455</a>
              </div>
              <div className={styles.ctaContactItem}>
                📞 <a href="tel:+919999688621">+91 9999688621</a>
              </div>
              <div className={styles.ctaContactItem}>
                ✉️ <a href="mailto:info@burgeonengineering.com">info@burgeonengineering.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LiquidPaintBoothPage;