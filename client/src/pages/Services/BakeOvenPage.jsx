import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './BakeOvenPage.module.css';

const BakeOvenPage = () => {
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
    "Temperature uniformity ±5°C across the work zone",
    "High-efficiency multi-layer mineral wool insulation",
    "PLC temperature control with touchscreen HMI and data logging",
    "Multi-zone temperature profiles for complex cure schedules",
    "Fast heat-up and recovery after door opening",
    "Recirculation fan design: horizontal or vertical airflow",
    "Explosion-proof construction for solvent-containing atmospheres"
  ];

  // Technical specifications
  const specifications = [
    { label: "Temperature range", value: "50°C – 300°C" },
    { label: "Heating options", value: "Electric, gas, oil, steam" },
    { label: "Uniformity", value: "±5°C across work zone" },
    { label: "Air circulation", value: "Horizontal / vertical" },
    { label: "Control", value: "PID with touchscreen HMI" },
    { label: "Construction", value: "MS insulated panels, SS interior optional" }
  ];

  // Application areas
  const applications = [
    "Automotive OEM paint lines",
    "General metal fabrication",
    "Powder coating curing",
    "Rubber & plastics",
    "Electrical enclosures",
    "Agricultural equipment"
  ];

  return (
    <>
      {/* PAGE HERO */}
      <section className={styles.pageHero}>
        <div className={styles.container}>
          <div className={styles.pageHeroEyebrow}>
            <Link to="/">Home</Link> <span className={styles.sep}>/</span> 
            <Link to="/services">Services</Link> <span className={styles.sep}>/</span> 
            Bake Oven
          </div>
          <h1 className={styles.pageTitle}>
            Industrial <span className={styles.accent}>Bake Ovens</span>
          </h1>
          <p className={styles.pageSubtitle}>
            Uniform curing for perfect, consistent finishes.
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
                Burgeon bake ovens deliver precise temperature uniformity across the entire work zone, ensuring consistent cure quality for painted or powder-coated components. Available as batch (box) ovens for flexible production or continuous conveyor ovens for high-volume lines. Gas, electric, oil-fired, or steam options are available, all with PLC temperature control and full data logging capability.
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
                <h3>Request oven specification</h3>
                <p>Our engineers will design the perfect system for your requirements.</p>
                <Link 
                  to="/contact?product=bake-oven" 
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

export default BakeOvenPage;