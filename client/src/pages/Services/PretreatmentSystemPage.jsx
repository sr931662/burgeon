import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './PretreatmentSystemPage.module.css';

const PretreatmentSystemPage = () => {
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
    "Custom-built automation systems engineered for specific manufacturing processes",
    "Integration with conveyors, robots, sensors, and PLC control systems",
    "Precision tooling and fixtures designed for repeatable operations",
    "Automated loading, machining, assembly, or testing capabilities",
    "Heavy-duty industrial construction for continuous production environments",
    "PLC-based machine control with HMI interface and safety interlocks",
    "Designed for high productivity, repeatability, and minimal operator intervention"
  ];

  const specifications = [
    { label: "Machine type", value: "Special Purpose Machine (SPM)" },
    { label: "Automation level", value: "Semi-automatic / Fully automatic" },
    { label: "Control system", value: "PLC with touchscreen HMI" },
    { label: "Operation", value: "Custom designed for process" },
    { label: "Production capacity", value: "Application dependent" },
    { label: "Integration", value: "Robotics / conveyors / sensors" }
  ];

  const applications = [
    "Automotive component manufacturing",
    "Assembly line automation",
    "Precision machining operations",
    "Industrial testing equipment",
    "Component handling automation",
    "Production line integration"
  ];

  return (
    <>
      {/* PAGE HERO */}
      <section className={styles.pageHero}>
        <div className={styles.container}>
          <div className={styles.pageHeroEyebrow}>
            <Link to="/">Home</Link> <span className={styles.sep}>/</span> 
            <Link to="/services">Services</Link> <span className={styles.sep}>/</span> 
            SPM Machines
          </div>

          <h1 className={styles.pageTitle}>
            SPM <span className={styles.accent}>Machines</span>
          </h1>

          <p className={styles.pageSubtitle}>
            Custom-engineered special purpose machines designed to automate and optimize complex industrial manufacturing processes.
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
            <div>

              <span className={styles.sectionEyebrow}>Overview</span>

              <h2 className={styles.sectionTitle} style={{ fontSize: '1.8rem', marginTop: '16px', marginBottom: '24px' }}>
                Custom automation solutions
              </h2>

              <p className={styles.productOverview}>
                Special Purpose Machines (SPMs) are custom-designed equipment developed to automate specific manufacturing operations. Unlike standard machines, SPMs are engineered around a particular production process, ensuring maximum efficiency, precision, and productivity.
              </p>

              <p className={styles.productOverview}>
                Burgeon designs and manufactures SPM machines tailored to each client's production requirements. From automated assembly stations to specialized machining and testing systems, every machine is developed with robust engineering, industrial-grade components, and reliable automation systems.
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
                <h3>Discuss your automation requirement</h3>

                <p>
                  Our engineering team will design a custom SPM machine for your manufacturing process.
                </p>

                <Link
                  to="/contact?product=spm-machine"
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

      {/* CTA BAND */}
      <section className={`${styles.section} ${styles.bgSurface}`}>
        <div className={styles.container}>

          <div 
            ref={ctaRef}
            className={`${styles.ctaBand} ${styles.fadeUp} ${isVisible.cta ? styles.fadeUpVisible : ''}`}
          >

            <div className={styles.ctaBandPattern} aria-hidden="true"></div>

            <div>
              <h2 className={styles.ctaBandTitle}>
                Need a custom<br />automation machine?
              </h2>

              <p className={styles.ctaBandSub}>
                Share your production process with our engineers and we will design the optimal SPM solution.
              </p>

              <div style={{ marginTop: '32px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/contact" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`}>
                  Contact us →
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

export default PretreatmentSystemPage;