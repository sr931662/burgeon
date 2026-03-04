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
    setTimeout(() => document.body.classList.add('loaded'), 50);
  }, []);

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

  const features = [
    "Complete powder coating line including pretreatment, coating booth, and curing oven",
    "High-efficiency powder recovery systems with cyclone and cartridge filtration",
    "Uniform powder application for consistent coating thickness",
    "Electrostatic powder spray guns for high transfer efficiency",
    "Conveyorised systems for automated continuous production",
    "Energy-efficient curing ovens with precise temperature control",
    "PLC-based automation with production monitoring",
    "Modular plant design allowing easy expansion of production capacity"
  ];

  const specifications = [
    { label: "Coating thickness", value: "40 – 120 microns typical" },
    { label: "Powder recovery efficiency", value: "> 95%" },
    { label: "Curing temperature", value: "160°C – 220°C" },
    { label: "Application system", value: "Electrostatic powder spray guns" },
    { label: "Line configuration", value: "Batch or conveyorised system" },
    { label: "Control system", value: "PLC based automation" }
  ];

  const applications = [
    "Automotive components",
    "Electrical enclosures",
    "Industrial machinery",
    "Metal furniture",
    "Architectural aluminium",
    "Agricultural equipment"
  ];

  return (
    <>
      <section className={styles.pageHero}>
        <div className={styles.container}>
          <div className={styles.pageHeroEyebrow}>
            <Link to="/">Home</Link> <span className={styles.sep}>/</span> 
            <Link to="/services">Services</Link> <span className={styles.sep}>/</span> 
            Powder Coating Systems
          </div>
          <h1 className={styles.pageTitle}>
            Powder Coating <span className={styles.accent}>Systems</span>
          </h1>
          <p className={styles.pageSubtitle}>
            Complete industrial powder coating lines engineered for consistent finishes and high production efficiency.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div 
            ref={detailRef}
            className={`${styles.productDetailGrid} ${styles.fadeUp} ${isVisible.detail ? styles.fadeUpVisible : ''}`}
          >
            <div>
              <span className={styles.sectionEyebrow}>Overview</span>
              <h2 className={styles.sectionTitle} style={{ fontSize: '1.8rem', marginTop: '16px', marginBottom: '24px' }}>
                Complete powder coating solutions
              </h2>

              <p className={styles.productOverview}>
                Powder coating systems provide a durable and environmentally friendly finishing process for metal components. The electrostatic powder application process creates uniform coatings with excellent corrosion resistance and long service life.
              </p>

              <p className={styles.productOverview}>
                Burgeon designs complete powder coating plants including pretreatment systems, powder spray booths, curing ovens, and conveyorised material handling systems. Each system is engineered around your production volume, component size, and plant layout to deliver reliable performance and consistent coating quality.
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
                <p>Our engineers will configure the optimal system for your manufacturing requirements.</p>

                <Link 
                  to="/contact?product=powder-coating-system" 
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  style={{ marginTop: 0 }}
                >
                  Request quotation →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.bgSurface}`}>
        <div className={styles.container}>
          <div 
            ref={ctaRef}
            className={`${styles.ctaBand} ${styles.fadeUp} ${isVisible.cta ? styles.fadeUpVisible : ''}`}
          >
            <div className={styles.ctaBandPattern} aria-hidden="true"></div>

            <div>
              <h2 className={styles.ctaBandTitle}>Planning a powder<br />coating plant?</h2>
              <p className={styles.ctaBandSub}>
                Our engineering team will design a system tailored to your production requirements.
              </p>

              <div style={{ marginTop: '32px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/contact" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`}>
                  Contact our engineers →
                </Link>

                <Link to="/turnover" className={`${styles.btn} ${styles.btnOutline} ${styles.btnLg}`}>
                  View installations
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