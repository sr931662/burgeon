import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './DryOffOvenPage.module.css';

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
    setupObserver(configRef, 'config');
    setupObserver(ctaRef, 'cta');

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  const features = [
    "Uniform heat distribution across the entire working chamber",
    "High-efficiency insulation to minimize energy consumption",
    "PLC-based temperature control with touchscreen HMI",
    "Fast heat-up and stable temperature maintenance",
    "Custom chamber sizes for small components to heavy industrial parts",
    "Compatible with batch loading, trolleys, or conveyorised lines",
    "Industrial-grade construction for continuous operation environments"
  ];

  const specifications = [
    { label: "Temperature range", value: "50°C – 300°C" },
    { label: "Heating methods", value: "Electric, gas, oil or steam" },
    { label: "Temperature uniformity", value: "±5°C across chamber" },
    { label: "Air circulation", value: "Horizontal / vertical forced air" },
    { label: "Insulation", value: "High-density mineral wool panels" },
    { label: "Control system", value: "PID / PLC with HMI interface" },
    { label: "Chamber size", value: "Custom designed per application" }
  ];

  const applications = [
    "Powder coating curing",
    "Industrial paint baking",
    "Metal heat treatment",
    "Component drying",
    "Electrical equipment manufacturing",
    "Automotive component production"
  ];

  const configurations = [
    {
      title: "Batch Industrial Ovens",
      description:
        "Flexible ovens designed for batch production environments. Components are loaded manually or using trolleys, making them ideal for mixed product manufacturing and medium production volumes."
    },
    {
      title: "Continuous Conveyor Ovens",
      description:
        "High-capacity ovens integrated into conveyorised production lines. Parts move through controlled heating zones, ensuring consistent processing for large production volumes."
    },
    {
      title: "Multi-Zone Industrial Ovens",
      description:
        "Advanced oven systems with multiple temperature zones. Suitable for complex thermal processes where controlled heating profiles are required."
    }
  ];

  return (
    <>
      <section className={styles.pageHero}>
        <div className={styles.container}>
          <div className={styles.pageHeroEyebrow}>
            <Link to="/">Home</Link> <span className={styles.sep}>/</span> 
            <Link to="/services">Services</Link> <span className={styles.sep}>/</span> 
            Industrial Ovens
          </div>

          <h1 className={styles.pageTitle}>
            Industrial <span className={styles.accent}>Ovens</span>
          </h1>

          <p className={styles.pageSubtitle}>
            Precision thermal processing solutions for curing, drying, and heat treatment in modern manufacturing environments.
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
                Reliable thermal processing
              </h2>

              <p className={styles.productOverview}>
                Industrial ovens are essential for controlled heating processes used across a wide range of manufacturing industries. Whether used for curing coatings, drying components, or performing heat treatment processes, these ovens deliver consistent thermal performance and reliable production results.
              </p>

              <p className={styles.productOverview}>
                Burgeon industrial ovens are engineered with efficient air circulation, advanced temperature control systems, and robust insulation. Each oven is designed specifically around the customer’s product size, process temperature requirements, and production capacity.
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
                <h3>Specify your industrial oven</h3>

                <p>
                  Our engineers will design the optimal oven configuration for your process requirements.
                </p>

                <Link
                  to="/contact?product=industrial-oven"
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
            ref={configRef}
            className={`${styles.fadeUp} ${isVisible.config ? styles.fadeUpVisible : ''}`}
            style={{ marginBottom: '48px' }}
          >

            <span className={styles.sectionEyebrow}>Configurations</span>

            <h2 className={styles.sectionTitle} style={{ marginTop: '16px' }}>
              Industrial oven <span className={styles.accent}>types</span>
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

      <section className={styles.section}>
        <div className={styles.container}>

          <div
            ref={ctaRef}
            className={`${styles.ctaBand} ${styles.fadeUp} ${isVisible.cta ? styles.fadeUpVisible : ''}`}
          >

            <div className={styles.ctaBandPattern} aria-hidden="true"></div>

            <div>

              <h2 className={styles.ctaBandTitle}>
                Planning an industrial<br />oven system?
              </h2>

              <p className={styles.ctaBandSub}>
                Share your process requirements and our engineering team will design the optimal solution.
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
                <img src={phoneIcon} alt="phone" className={styles.contactIcon}/>
                <a href="tel:+918527754455">+91 8527754455</a>
              </div>

              <div className={styles.ctaContactItem}>
                <img src={emailIcon} alt="email" className={styles.contactIcon}/>
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