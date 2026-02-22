import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './DryOffOvenPage.module.css';

// Import icons (using CDN URLs as in the HTML)
const phoneIcon = "https://cdn-icons-png.flaticon.com/512/724/724664.png";
const emailIcon = "https://cdn-icons-png.flaticon.com/512/732/732200.png";

const DryOffOvenPage = () => {
  const [isVisible, setIsVisible] = useState({
    detail: false,
    config: false,
    cta: false
  });
  
  const detailRef = useRef(null);
  const configRef = useRef(null);
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
    setupObserver(configRef, 'config');
    setupObserver(ctaRef, 'cta');

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  // Feature list
  const features = [
    "Rapid moisture evaporation with high-velocity air circulation",
    "Corrosion-resistant interior options (SS304) for wet environments",
    "Energy recovery systems to reduce operating costs",
    "Compact footprint with vertical or horizontal airflow configurations",
    "Compatible with overhead conveyors, mesh belts, or batch loading",
    "PLC temperature control with data logging capability",
    "Fast heat-up and recovery after loading"
  ];

  // Technical specifications
  const specifications = [
    { label: "Temperature range", value: "80°C – 150°C" },
    { label: "Heating options", value: "Electric, gas, steam, oil" },
    { label: "Air circulation", value: "Horizontal / Vertical" },
    { label: "Temperature uniformity", value: "±5°C across work zone" },
    { label: "Construction", value: "MS with insulation / SS304 interior" },
    { label: "Control system", value: "PID with touchscreen HMI" },
    { label: "Dwell time", value: "Custom calculated per part" }
  ];

  // Application areas
  const applications = [
    "Automotive parts",
    "Agricultural equipment",
    "Fabricated metal",
    "After spray wash",
    "Immersion pretreatment",
    "CED lines"
  ];

  // Oven configurations
  const configurations = [
    {
      title: "Batch Dry-off Ovens",
      description: "For low to medium volumes, flexible production. Manual or automatic door operation. Ideal for job shops and mixed part sizes."
    },
    {
      title: "Continuous Conveyor Ovens",
      description: "For high-volume production lines. Overhead or mesh belt conveyors. Consistent drying with minimal labor."
    },
    {
      title: "Multi-zone Ovens",
      description: "For complex drying profiles. Separate temperature zones for different part geometries or material types."
    }
  ];

  return (
    <>
      {/* PAGE HERO */}
      <section className={styles.pageHero}>
        <div className={styles.container}>
          <div className={styles.pageHeroEyebrow}>
            <Link to="/">Home</Link> <span className={styles.sep}>/</span> 
            <Link to="/services">Services</Link> <span className={styles.sep}>/</span> 
            Dry-off Oven
          </div>
          <h1 className={styles.pageTitle}>
            Dry-off <span className={styles.accent}>Ovens</span>
          </h1>
          <p className={styles.pageSubtitle}>
            Complete moisture removal after pretreatment — prevents water spots and flash rust before coating application.
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
                Critical drying stage
              </h2>
              <p className={styles.productOverview}>
                After aqueous pretreatment, components must be completely dry before paint or powder coating application. Burgeon dry-off ovens ensure thorough moisture removal without causing flash rust, using optimized airflow and precise temperature control. The result: perfect coating adhesion and flawless finish.
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
                <h3>Integrate with your line</h3>
                <p>Our engineers will design the perfect dry-off oven for your pretreatment system.</p>
                <Link 
                  to="/contact?product=dry-off-oven" 
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

      {/* CONFIGURATIONS SECTION */}
      <section className={`${styles.section} ${styles.bgSurface}`}>
        <div className={styles.container}>
          <div 
            ref={configRef}
            className={`${styles.fadeUp} ${isVisible.config ? styles.fadeUpVisible : ''}`}
            style={{ marginBottom: '48px' }}
          >
            <span className={styles.sectionEyebrow}>Configurations</span>
            <h2 className={styles.sectionTitle} style={{ marginTop: '16px' }}>
              Choose your <span className={styles.accent}>oven type</span>
            </h2>
          </div>
          
          <div className={`${styles.configGrid} ${styles.fadeUp} ${isVisible.config ? styles.fadeUpVisible : ''}`}>
            {configurations.map((config, index) => (
              <div key={index} className={styles.configCard}>
                <div className={styles.configCardName}>{config.title}</div>
                <div className={styles.configCardDesc}>{config.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div 
            ref={ctaRef}
            className={`${styles.ctaBand} ${styles.fadeUp} ${isVisible.cta ? styles.fadeUpVisible : ''}`}
          >
            <div className={styles.ctaBandPattern} aria-hidden="true"></div>
            <div>
              <h2 className={styles.ctaBandTitle}>Design your<br />dry-off system</h2>
              <p className={styles.ctaBandSub}>
                Tell us your parts and production volume — we'll engineer the optimal solution.
              </p>
              <div style={{ marginTop: '32px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/contact" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`}>
                  Start planning →
                </Link>
                <Link to="/turnover" className={`${styles.btn} ${styles.btnOutline} ${styles.btnLg}`}>
                  See installations
                </Link>
              </div>
            </div>
            <div className={styles.ctaBandActions}>
              <div className={styles.ctaContactItem}>
                <img src={phoneIcon} alt="phone" className={styles.contactIcon} />
                <a href="tel:+918527754455">+91 8527754455</a>
              </div>
              <div className={styles.ctaContactItem}>
                <img src={emailIcon} alt="email" className={styles.contactIcon} />
                <a href="mailto:info@burgeonengineering.com">info@burgeonengineering.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DryOffOvenPage;