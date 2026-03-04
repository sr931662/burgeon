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
    "Multi-stage chemical pretreatment lines for superior surface preparation",
    "Degreasing, rinsing, phosphating, and passivation stages",
    "Spray tunnel or immersion tank configurations",
    "Automated chemical dosing and sludge management systems",
    "Corrosion-resistant construction using SS304, PP, or coated steel",
    "Integration with drying ovens and coating systems",
    "PLC-based process control with monitoring and safety interlocks"
  ];

  const specifications = [
    { label: "Process stages", value: "3–9 stage configurations" },
    { label: "Process type", value: "Spray tunnel / Immersion tank" },
    { label: "Tank material", value: "SS304 / Polypropylene / MS coated" },
    { label: "Heating system", value: "Electric / Steam / Gas" },
    { label: "Automation", value: "PLC controlled chemical management" },
    { label: "Production capacity", value: "Custom engineered" }
  ];

  const applications = [
    "Automotive components",
    "Industrial fabrication",
    "Electrical enclosures",
    "Agricultural equipment",
    "Architectural metal products",
    "Heavy machinery components"
  ];

  return (
    <>
      <section className={styles.pageHero}>
        <div className={styles.container}>
          <div className={styles.pageHeroEyebrow}>
            <Link to="/">Home</Link> <span className={styles.sep}>/</span> 
            <Link to="/services">Services</Link> <span className={styles.sep}>/</span> 
            Surface Treatment Lines
          </div>

          <h1 className={styles.pageTitle}>
            Surface Treatment <span className={styles.accent}>Lines</span>
          </h1>

          <p className={styles.pageSubtitle}>
            Advanced multi-stage chemical treatment systems for superior coating adhesion and corrosion resistance.
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
                Reliable surface preparation
              </h2>

              <p className={styles.productOverview}>
                Surface treatment lines are critical in preparing metal components before painting, powder coating, or other finishing processes. Proper surface preparation removes oils, contaminants, and oxides while creating a chemical conversion layer that improves coating adhesion and long-term corrosion protection.
              </p>

              <p className={styles.productOverview}>
                Burgeon designs multi-stage surface treatment systems tailored to your material type, production volume, and coating requirements. Our solutions ensure consistent chemical treatment, optimized water usage, and seamless integration with downstream coating or finishing systems.
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
                <h3>Engineer your surface treatment line</h3>

                <p>
                  Our engineers will design the optimal system for your coating process requirements.
                </p>

                <Link 
                  to="/contact?product=surface-treatment-line" 
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  style={{ marginTop: 0 }}
                >
                  Request consultation →
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
              <h2 className={styles.ctaBandTitle}>
                Planning a surface<br />treatment system?
              </h2>

              <p className={styles.ctaBandSub}>
                Our engineers will design a complete surface treatment line tailored to your manufacturing needs.
              </p>

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