import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './CompactPaintBoothPage.module.css';

// Import icons (using CDN URLs as in the HTML)
const phoneIcon = "https://cdn-icons-png.flaticon.com/512/724/724664.png";
const emailIcon = "https://cdn-icons-png.flaticon.com/512/732/732200.png";

const CompactPaintBoothPage = () => {
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
    "Modular design for tight spaces and easy installation",
    "Integrated exhaust and filtration system",
    "LED lighting for optimal visibility",
    "Quick installation — pre-assembled sections",
    "Optional curing capability with IR or hot air",
    "Crossflow or downdraft airflow configurations",
    "Explosion-proof electrical components as standard"
  ];

  // Technical specifications
  const specifications = [
    { label: "Width", value: "1.5m – 3.0m" },
    { label: "Depth", value: "1.5m – 2.5m" },
    { label: "Height", value: "2.0m – 2.5m" },
    { label: "Airflow type", value: "Crossflow / Downdraft" },
    { label: "Filtration", value: "Pre-filter + Bag filter" },
    { label: "Lighting", value: "LED, 800 lux" },
    { label: "Configuration", value: "Bench-top / Walk-in" }
  ];

  // Application areas
  const applications = [
    "Small engineering shops",
    "Prototype development",
    "Repair facilities",
    "Satellite coating cells",
    "R&D laboratories",
    "Educational institutions"
  ];

  // Configuration options
  const configurations = [
    {
      title: "Bench-top Booths",
      description: "Ideal for small components, prototypes, and laboratory use. Fits on standard workbench. Includes exhaust connection and basic filtration."
    },
    {
      title: "Walk-in Compact Booths",
      description: "For larger parts that still require minimal floor space. Operator can enter for manual spraying. Full industrial performance in compact package."
    },
    {
      title: "Modular Expandable",
      description: "Start small and expand as your production grows. Modular sections allow future capacity increase without replacing the entire system."
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
            Compact Paint Booth
          </div>
          <h1 className={styles.pageTitle}>
            Compact <span className={styles.accent}>Paint Booths</span>
          </h1>
          <p className={styles.pageSubtitle}>
            Big performance in a small footprint — perfect for limited floor space, small parts, and specialized applications.
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
                Space-efficient solutions
              </h2>
              <p className={styles.productOverview}>
                When space is at a premium, our compact paint booths deliver full industrial performance without compromise. Designed for smaller components, job shops, R&D facilities, and satellite coating cells. Available in bench-top and walk-in configurations, these booths pack all the features of full-sized systems into a minimal footprint.
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
                <h3>Maximize your floor space</h3>
                <p>Our engineers will design a compact booth that fits your exact space constraints.</p>
                <Link 
                  to="/contact?product=compact-paint-booth" 
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  style={{ marginTop: 0 }}
                >
                  Get dimensions →
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
              Choose your <span className={styles.accent}>compact design</span>
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
              <h2 className={styles.ctaBandTitle}>Design your<br />compact booth</h2>
              <p className={styles.ctaBandSub}>
                Tell us your available space and part sizes — we'll create the perfect fit.
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

export default CompactPaintBoothPage;