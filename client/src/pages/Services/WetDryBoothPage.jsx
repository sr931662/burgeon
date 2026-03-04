import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './WetDryBoothPage.module.css';

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
    setupObserver(applicationsRef, 'applications');
    setupObserver(ctaRef, 'cta');

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  const features = [
    "Multi-stage industrial cleaning for degreasing, rinsing, and surface preparation",
    "Spray, immersion, and rotary basket washing configurations",
    "Heated washing chambers up to 80°C for effective oil and grease removal",
    "Stainless steel construction ensuring corrosion resistance and long service life",
    "High-pressure spray nozzles for thorough cleaning of complex components",
    "Integrated filtration and recirculation system to reduce water consumption",
    "PLC-based control systems for automated wash cycles",
    "Custom machine sizes designed for your component dimensions and throughput"
  ];

  const specifications = [
    { label: "Cleaning stages", value: "1 – 6 stages (wash, rinse, drying)" },
    { label: "Operating temperature", value: "Up to 80°C heated cleaning" },
    { label: "Pump capacity", value: "3 – 20 HP depending on system size" },
    { label: "Construction", value: "SS304 / SS316 industrial construction" },
    { label: "Cleaning method", value: "Spray / immersion / rotary basket" },
    { label: "Control system", value: "PLC controlled wash cycle" },
    { label: "Drying option", value: "Hot air blower drying system" }
  ];

  const applicationChips = [
    "Automotive components",
    "Precision machined parts",
    "Sheet metal components",
    "Fabricated assemblies",
    "Industrial machinery parts",
    "OEM component production"
  ];

  const applicationModes = [
    {
      title: "Spray Washing Systems",
      description: "High-pressure spray washing machines designed for cleaning large volumes of components in automated production lines."
    },
    {
      title: "Rotary Basket Washing Machines",
      description: "Rotating basket systems suitable for small and medium-sized parts requiring uniform cleaning from all angles."
    },
    {
      title: "Multi-Stage Cleaning Lines",
      description: "Integrated washing systems with degreasing, rinsing, and drying stages for high-quality surface preparation before coating or assembly."
    }
  ];

  return (
    <>
      <section className={styles.pageHero}>
        <div className={styles.container}>
          <div className={styles.pageHeroEyebrow}>
            <Link to="/">Home</Link> <span className={styles.sep}>/</span> 
            <Link to="/services">Services</Link> <span className={styles.sep}>/</span> 
            Industrial Washing Machines
          </div>
          <h1 className={styles.pageTitle}>
            Industrial <span className={styles.accent}>Washing Machines</span>
          </h1>
          <p className={styles.pageSubtitle}>
            Precision component cleaning systems designed for industrial manufacturing and surface preparation processes.
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
                Industrial component cleaning solutions
              </h2>

              <p className={styles.productOverview}>
                Industrial washing machines are essential for removing oil, grease, metal chips, and contaminants from manufactured components before further processing such as painting, coating, or assembly.
              </p>

              <p className={styles.productOverview}>
                Burgeon designs heavy-duty washing systems tailored to your component size, production volume, and cleaning requirements. Our machines combine high-pressure spray systems, heated washing chambers, and multi-stage filtration to deliver consistent and reliable cleaning performance.
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
                <h3>Configure your washing system</h3>
                <p>Our engineers will design the optimal industrial cleaning system for your production line.</p>

                <Link 
                  to="/contact?product=industrial-washing-machine" 
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
            ref={applicationsRef}
            className={`${styles.fadeUp} ${isVisible.applications ? styles.fadeUpVisible : ''}`}
            style={{ marginBottom: '48px' }}
          >
            <span className={styles.sectionEyebrow}>Applications</span>
            <h2 className={styles.sectionTitle} style={{ marginTop: '16px' }}>
              Industrial cleaning <span className={styles.accent}>applications</span>
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

      <section className={styles.section}>
        <div className={styles.container}>
          <div 
            ref={ctaRef}
            className={`${styles.ctaBand} ${styles.fadeUp} ${isVisible.cta ? styles.fadeUpVisible : ''}`}
          >
            <div className={styles.ctaBandPattern} aria-hidden="true"></div>
            <div>
              <h2 className={styles.ctaBandTitle}>Design your<br />washing system</h2>
              <p className={styles.ctaBandSub}>
                Share your component size and production volume — our engineers will design the right cleaning system.
              </p>

              <div style={{ marginTop: '32px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/contact" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`}>
                  Start planning →
                </Link>

                <Link to="/turnover" className={`${styles.btn} ${styles.btnOutline} ${styles.btnLg}`}>
                  View installations
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