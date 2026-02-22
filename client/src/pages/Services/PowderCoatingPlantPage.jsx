import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './PowderCoatingPlantPage.module.css';

const PowderCoatingPlantPage = () => {
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
    "Pretreatment stages: wash, rinse, phosphate, passivation",
    "Dry-off oven with energy recovery",
    "High-efficiency powder booth with cartridge or cyclone recovery",
    "Curing oven (gas or electric) with ±5°C uniformity",
    "Overhead or floor-mounted conveyor systems",
    "Colour change in under 20 minutes with cyclone system",
    "PLC automation with recipe management"
  ];

  // Technical specifications
  const specifications = [
    { label: "Small batch", value: "50–200 parts/shift" },
    { label: "Medium volume", value: "200–1,000 parts/shift" },
    { label: "High volume", value: "1,000+ parts/shift" },
    { label: "Film thickness", value: "60–120 μm" },
    { label: "Recovery efficiency", value: ">98%" },
    { label: "Colour change", value: "10–20 min (cyclone)" }
  ];

  // Application areas
  const applications = [
    "Automotive",
    "White goods",
    "Furniture",
    "Architectural aluminium",
    "Electrical enclosures",
    "Agricultural equipment",
    "Steel shelving"
  ];

  return (
    <>
      {/* PAGE HERO */}
      <section className={styles.pageHero}>
        <div className={styles.container}>
          <div className={styles.pageHeroEyebrow}>
            <Link to="/">Home</Link> <span className={styles.sep}>/</span> 
            <Link to="/services">Services</Link> <span className={styles.sep}>/</span> 
            Powder Coating Plant
          </div>
          <h1 className={styles.pageTitle}>
            Powder Coating <span className={styles.accent}>Plants</span>
          </h1>
          <p className={styles.pageSubtitle}>
            Turnkey systems for superior, consistent powder finish.
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
                Burgeon powder coating plants integrate every stage of the process into one optimized line: pretreatment, dry-off, powder application, powder recovery, and curing. Our system designs maximize transfer efficiency, minimize color change time, and ensure consistent film build across every part — batch or continuous, single-color or multi-color.
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
                <h3>Design your powder coating line</h3>
                <p>Our engineers will design the perfect system for your requirements.</p>
                <Link 
                  to="/contact?product=powder-coating-plant" 
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

export default PowderCoatingPlantPage;