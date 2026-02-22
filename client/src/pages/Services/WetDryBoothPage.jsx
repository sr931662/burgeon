import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './WetDryBoothPage.module.css';

// Import icons (using CDN URLs as in the HTML)
const phoneIcon = "https://cdn-icons-png.flaticon.com/512/724/724664.png";
const emailIcon = "https://cdn-icons-png.flaticon.com/512/732/732200.png";

const WetDryBoothPage = () => {
  const [isVisible, setIsVisible] = useState({
    detail: false,
    applications: false,
    cta: false
  });
  
  const detailRef = useRef(null);
  const applicationsRef = useRef(null);
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
    setupObserver(applicationsRef, 'applications');
    setupObserver(ctaRef, 'cta');

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  // Feature list
  const features = [
    "Removable dry filter modules for quick mode switching",
    "Stainless steel water wash chamber with corrosion-resistant construction",
    "Automatic sludge removal and water circulation system",
    "Dual-mode control panel with preset configurations",
    "Meets local environmental regulations for VOC emissions",
    "Explosion-proof lighting and electrical components",
    "Modular panel design for easy installation and expansion"
  ];

  // Technical specifications
  const specifications = [
    { label: "Operating mode", value: "Water wash / Dry filter" },
    { label: "Air velocity", value: "0.3 – 0.6 m/s" },
    { label: "Filtration efficiency", value: ">98% @ 5 microns" },
    { label: "Water wash pump", value: "5-15 HP as required" },
    { label: "Tank material", value: "SS304 / MS epoxy coated" },
    { label: "Lighting", value: "Explosion-proof LED, 800 lux" },
    { label: "Switchover time", value: "< 30 minutes" }
  ];

  // Application chips
  const applicationChips = [
    "High-solids coatings",
    "Solvent-based paints",
    "Waterborne coatings",
    "Job shops",
    "Multi-product lines",
    "R&D facilities"
  ];

  // Application modes
  const applicationModes = [
    {
      title: "Water Wash Mode",
      description: "Best for high-volume production with high-solids coatings. Self-cleaning action, minimal filter maintenance, suitable for continuous operation."
    },
    {
      title: "Dry Filter Mode",
      description: "Ideal for solvent-based paints, low-volume runs, and color change applications. Quick filter replacement, lower water consumption."
    },
    {
      title: "Hybrid Operation",
      description: "Switch between modes based on production schedule. Maximum flexibility for job shops and contract manufacturers."
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
            Wet & Dry Booth
          </div>
          <h1 className={styles.pageTitle}>
            Wet & Dry <span className={styles.accent}>Paint Booths</span>
          </h1>
          <p className={styles.pageSubtitle}>
            Flexible operation for varied coating requirements — switch between water wash and dry filter configurations.
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
                Dual-mode flexibility
              </h2>
              <p className={styles.productOverview}>
                Our wet/dry paint booths offer maximum operational flexibility. Configure as a water wash booth for high-volume solids application or convert to dry filter operation for solvent-based paints. Ideal for job shops with diverse coating needs, R&D facilities, and multi-product manufacturing lines.
              </p>
              <p className={styles.productFeaturesTitle}>Key features</p>
              <ul className={styles.featureList}>
                {features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <div className={styles.appChips}>
                {applicationChips.map((chip, index) => (
                  <Link 
                    key={index} 
                    to={`/services?application=${chip.toLowerCase().replace(/\s+/g, '-')}`}
                    className={styles.appChip}
                  >
                    {chip}
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
                <h3>Need a flexible paint booth?</h3>
                <p>Our engineers will design the perfect configuration for your specific requirements.</p>
                <Link 
                  to="/contact?product=wet-dry-booth" 
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

      {/* APPLICATIONS SECTION */}
      <section className={`${styles.section} ${styles.bgSurface}`}>
        <div className={styles.container}>
          <div 
            ref={applicationsRef}
            className={`${styles.fadeUp} ${isVisible.applications ? styles.fadeUpVisible : ''}`}
            style={{ marginBottom: '48px' }}
          >
            <span className={styles.sectionEyebrow}>Applications</span>
            <h2 className={styles.sectionTitle} style={{ marginTop: '16px' }}>
              Ideal for diverse <span className={styles.accent}>coating needs</span>
            </h2>
          </div>
          
          <div className={`${styles.applicationsGrid} ${styles.fadeUp} ${isVisible.applications ? styles.fadeUpVisible : ''}`}>
            {applicationModes.map((mode, index) => (
              <div key={index} className={styles.appCard}>
                <div className={styles.appCardName}>{mode.title}</div>
                <div className={styles.appCardDesc}>{mode.description}</div>
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
              <h2 className={styles.ctaBandTitle}>Configure your<br />wet/dry booth</h2>
              <p className={styles.ctaBandSub}>
                Tell us your application — we'll recommend the optimal configuration.
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

export default WetDryBoothPage;