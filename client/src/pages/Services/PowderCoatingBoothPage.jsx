import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './PowderCoatingBoothPage.module.css';

// Import icons (using CDN URLs as in the HTML)
const phoneIcon = "https://cdn-icons-png.flaticon.com/512/724/724664.png";
const emailIcon = "https://cdn-icons-png.flaticon.com/512/732/732200.png";

const PowderCoatingBoothPage = () => {
  const [isVisible, setIsVisible] = useState({
    detail: false,
    recovery: false,
    cta: false
  });
  
  const detailRef = useRef(null);
  const recoveryRef = useRef(null);
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
    setupObserver(recoveryRef, 'recovery');
    setupObserver(ctaRef, 'cta');

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  // Feature list
  const features = [
    "Cartridge filter recovery with automatic pulse-jet cleaning (>98% efficiency)",
    "Cyclone separator with secondary cartridge filter for fast color change (10-20 minutes)",
    "Anti-static booth walls to prevent powder attraction",
    "Integrated LED lighting for optimal visibility",
    "Explosion venting per international safety standards",
    "Modular panel construction for easy installation",
    "PLC-controlled airflow and pressure monitoring"
  ];

  // Technical specifications
  const specifications = [
    { label: "Air velocity", value: "0.5 – 0.7 m/s" },
    { label: "Recovery efficiency", value: ">98%" },
    { label: "Color change time", value: "10-20 min (cyclone)" },
    { label: "Filtration", value: "Cartridge / Cyclone + secondary" },
    { label: "Booth material", value: "MS epoxy coated / SS304" },
    { label: "Lighting", value: "LED, 800 lux minimum" },
    { label: "Explosion protection", value: "Venting panels per NFPA" }
  ];

  // Application areas
  const applications = [
    "Automotive parts",
    "White goods",
    "Furniture",
    "Architectural aluminium",
    "Electrical enclosures",
    "Multi-color operations"
  ];

  // Recovery system options
  const recoveryOptions = [
    {
      title: "Cartridge Filter System",
      description: "Best for single-color, high-volume production. Maximum recovery efficiency, automatic filter cleaning, compact footprint. Ideal for dedicated color lines."
    },
    {
      title: "Cyclone Recovery System",
      description: "Ideal for multiple colors and frequent changeovers. Primary cyclone separates >95% of powder, secondary cartridge ensures final filtration. Color change in under 20 minutes."
    },
    {
      title: "Hybrid Systems",
      description: "Custom configurations combining multiple cyclones or cartridge systems for specific production requirements. Designed for your unique application."
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
            Powder Coating Booth
          </div>
          <h1 className={styles.pageTitle}>
            Powder Coating <span className={styles.accent}>Booths</span>
          </h1>
          <p className={styles.pageSubtitle}>
            High-efficiency powder recovery systems with {'>'}98% recovery rate — cartridge or cyclone configurations for any production volume.
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
                Efficient powder recovery
              </h2>
              <p className={styles.productOverview}>
                Our powder coating booths feature advanced powder recovery systems designed to maximize material utilization and minimize waste. Choose between cartridge filter systems for maximum efficiency or cyclone separators for rapid color change capability. Both configurations ensure clean operation, operator safety, and consistent coating quality.
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
                <h3>Select your configuration</h3>
                <p>Our engineers will recommend the optimal recovery system for your production needs.</p>
                <Link 
                  to="/contact?product=powder-coating-booth" 
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

      {/* RECOVERY OPTIONS SECTION */}
      <section className={`${styles.section} ${styles.bgSurface}`}>
        <div className={styles.container}>
          <div 
            ref={recoveryRef}
            className={`${styles.fadeUp} ${isVisible.recovery ? styles.fadeUpVisible : ''}`}
            style={{ marginBottom: '48px' }}
          >
            <span className={styles.sectionEyebrow}>Recovery options</span>
            <h2 className={styles.sectionTitle} style={{ marginTop: '16px' }}>
              Choose your <span className={styles.accent}>recovery system</span>
            </h2>
          </div>
          
          <div className={`${styles.recoveryGrid} ${styles.fadeUp} ${isVisible.recovery ? styles.fadeUpVisible : ''}`}>
            {recoveryOptions.map((option, index) => (
              <div key={index} className={styles.recoveryCard}>
                <div className={styles.recoveryCardName}>{option.title}</div>
                <div className={styles.recoveryCardDesc}>{option.description}</div>
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
              <h2 className={styles.ctaBandTitle}>Configure your<br />powder booth</h2>
              <p className={styles.ctaBandSub}>
                Tell us your color change frequency and volume — we'll design the perfect system.
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

export default PowderCoatingBoothPage;