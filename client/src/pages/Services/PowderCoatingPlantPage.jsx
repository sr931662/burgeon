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
    "PLC-based automation systems for industrial production lines",
    "Touchscreen HMI interfaces for intuitive machine control",
    "Integration with conveyors, paint shops, ovens, and robotic systems",
    "Sensor-based process monitoring for improved reliability",
    "Industrial electrical panels designed as per safety standards",
    "Recipe management and production parameter storage",
    "Remote diagnostics and system monitoring capabilities"
  ];

  const specifications = [
    { label: "Control platform", value: "PLC based automation" },
    { label: "Interface", value: "Touchscreen HMI panels" },
    { label: "Communication", value: "Industrial fieldbus / Ethernet" },
    { label: "System integration", value: "Robotics / conveyors / machines" },
    { label: "Safety systems", value: "Emergency stop & interlock systems" },
    { label: "Monitoring", value: "Real-time diagnostics & data logging" }
  ];

  const applications = [
    "Paint shop automation",
    "Manufacturing production lines",
    "Material handling systems",
    "Industrial ovens and curing lines",
    "Assembly automation",
    "Custom machinery control"
  ];

  return (
    <>
      <section className={styles.pageHero}>
        <div className={styles.container}>
          <div className={styles.pageHeroEyebrow}>
            <Link to="/">Home</Link> <span className={styles.sep}>/</span> 
            <Link to="/services">Services</Link> <span className={styles.sep}>/</span> 
            Automation & Control Systems
          </div>

          <h1 className={styles.pageTitle}>
            Automation & <span className={styles.accent}>Control Systems</span>
          </h1>

          <p className={styles.pageSubtitle}>
            Intelligent automation solutions for modern industrial manufacturing.
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
                Smart industrial automation
              </h2>

              <p className={styles.productOverview}>
                Automation and control systems are the core of modern industrial production lines. They coordinate machines, conveyors, sensors, and processing equipment to deliver consistent, efficient, and safe operations.
              </p>

              <p className={styles.productOverview}>
                Burgeon designs and integrates PLC-based automation systems that provide full control over complex manufacturing processes. Our solutions include industrial electrical panels, operator interfaces, safety systems, and intelligent monitoring tools that ensure reliable production and simplified plant management.
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
                <h3>Design your automation system</h3>

                <p>
                  Our engineers will design a control system tailored to your production requirements.
                </p>

                <Link 
                  to="/contact?product=automation-control-system" 
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
                Need automation for<br />your production line?
              </h2>

              <p className={styles.ctaBandSub}>
                Our automation engineers will design a reliable control system for your facility.
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