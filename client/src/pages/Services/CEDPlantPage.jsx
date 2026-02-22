import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './CEDPlantPage.module.css';

const CEDPlantPage = () => {
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
    "Pretreatment integration: degrease, phosphate, DI rinse stages",
    "CED dip tank with precision circulation and temperature control",
    "Ultrafiltration (UF) rinse system for paint recovery and quality",
    "High-efficiency DC rectifier system (50–400V, custom amperage)",
    "Curing oven sized to throughput requirements",
    "PLC automation with complete process monitoring and data logging",
    "Full electrical and automation panel integration"
  ];

  // Technical specifications
  const specifications = [
    { label: "Tank volume", value: "5,000 – 50,000 L" },
    { label: "DC voltage", value: "50–400 V" },
    { label: "Film thickness", value: "15–30 μm" },
    { label: "Salt spray resistance", value: "500+ hours" },
    { label: "Process automation", value: "Full PLC control" },
    { label: "Production rate", value: "Custom designed" }
  ];

  // Application areas
  const applications = [
    "Automotive chassis",
    "Suspension components",
    "Brackets & fasteners",
    "Agricultural machinery",
    "Electrical enclosures",
    "General engineering"
  ];

  return (
    <>
      {/* PAGE HERO */}
      <section className={styles.pageHero}>
        <div className={styles.container}>
          <div className={styles.pageHeroEyebrow}>
            <Link to="/">Home</Link> <span className={styles.sep}>/</span> 
            <Link to="/services">Services</Link> <span className={styles.sep}>/</span> 
            CED Plant
          </div>
          <h1 className={styles.pageTitle}>
            CED <span className={styles.accent}>Plants</span>
          </h1>
          <p className={styles.pageSubtitle}>
            Cataphoretic coating for ultimate, uniform corrosion protection.
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
                Burgeon CED (Cathodic Electrodeposition) plants apply a uniform, pinhole-free primer to every surface — including deep recesses and complex geometries that spray painting cannot reach. The process is fully automated: parts are immersed in the paint bath, DC voltage is applied, and the coating deposits uniformly. The result is unrivalled corrosion resistance with consistent 15–30μm film build. Ideal for automotive chassis, suspension components, agricultural machinery, and any part requiring long-term protection.
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
                <h3>Engineer your CED line</h3>
                <p>Our engineers will design the perfect system for your requirements.</p>
                <Link 
                  to="/contact?product=ced-plant" 
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

export default CEDPlantPage;