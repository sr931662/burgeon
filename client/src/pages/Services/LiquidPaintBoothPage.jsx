import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './LiquidPaintBoothPage.module.css';

const LiquidPaintBoothPage = () => {
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
    "Optimised airflow design ensuring uniform paint distribution and minimal overspray",
    "Downdraft, semi-downdraft, and crossflow booth configurations",
    "Multi-stage filtration system for clean exhaust and environmental compliance",
    "Explosion-proof lighting and electrical components for operator safety",
    "Integrated exhaust and ventilation system maintaining stable airflow",
    "Modular steel panel construction enabling quick installation and expansion",
    "Compatible with manual, robotic, or automatic spray applications",
    "PLC-ready control systems for automation integration"
  ];

  const specifications = [
    { label: "Air velocity", value: "0.3 – 0.5 m/s controlled airflow" },
    { label: "Filtration system", value: "Multi-stage filtration up to 98% efficiency" },
    { label: "Lighting level", value: "LED lighting, 800–1000 lux" },
    { label: "Construction material", value: "MS / SS modular panel structure" },
    { label: "Booth types", value: "Downdraft · Semi-downdraft · Crossflow" },
    { label: "Control system", value: "PLC-ready electrical panel" }
  ];

  const applications = [
    "Automotive component coating",
    "Industrial machinery parts",
    "Heavy fabrication structures",
    "Agricultural equipment",
    "Metal furniture production",
    "Engineering job-work units",
    "OEM component manufacturing"
  ];

  return (
    <>
      <section className={styles.pageHero}>
        <div className={styles.container}>
          <div className={styles.pageHeroEyebrow}>
            <Link to="/">Home</Link> <span className={styles.sep}>/</span> 
            <Link to="/services">Services</Link> <span className={styles.sep}>/</span> 
            Industrial Paint Booth Systems
          </div>
          <h1 className={styles.pageTitle}>
            Industrial Paint <span className={styles.accent}>Booth Systems</span>
          </h1>
          <p className={styles.pageSubtitle}>
            Controlled airflow environments engineered for high-quality industrial coating and finishing.
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
                Industrial coating environments engineered for precision
              </h2>

              <p className={styles.productOverview}>
                Industrial paint booth systems provide a controlled environment for applying liquid coatings on metal components, fabricated structures, and industrial assemblies. Proper airflow management ensures consistent paint film thickness, improved surface finish, and reduced contamination during the coating process.
              </p>

              <p className={styles.productOverview}>
                Burgeon designs custom paint booth systems tailored to your production workflow. Our booths integrate advanced airflow engineering, high-efficiency filtration, and durable modular construction to deliver reliable performance across demanding manufacturing environments.
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
                <h3>Design your paint booth</h3>
                <p>Our engineers will configure the optimal booth system for your production requirements.</p>

                <Link 
                  to="/contact?product=paint-booth-system" 
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
              <h2 className={styles.ctaBandTitle}>Planning a coating line?</h2>
              <p className={styles.ctaBandSub}>Our engineering team will help design the right paint booth system for your facility.</p>

              <div style={{ marginTop: '32px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/contact" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`}>
                  Contact our engineers →
                </Link>

                <Link to="/turnover" className={`${styles.btn} ${styles.btnOutline} ${styles.btnLg}`}>
                  View completed projects
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

export default LiquidPaintBoothPage;