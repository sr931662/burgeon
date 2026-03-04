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
    "Overhead conveyor systems for paint shop and assembly lines",
    "Chain, power & free, and skid conveyor configurations",
    "Designed for continuous material handling in automated production",
    "Integration with paint booths, ovens, washing systems, and robotics",
    "Heavy-duty construction for industrial environments",
    "Variable speed drives and PLC-controlled operation",
    "Modular layouts allowing easy expansion of production lines"
  ];

  const specifications = [
    { label: "Conveyor type", value: "Overhead / Floor mounted" },
    { label: "Load capacity", value: "Custom engineered" },
    { label: "Drive system", value: "Motorized chain / variable speed drive" },
    { label: "Control system", value: "PLC controlled automation" },
    { label: "Operating mode", value: "Continuous or indexed movement" },
    { label: "Integration", value: "Paint shops, assembly lines, ovens" }
  ];

  const applications = [
    "Paint shop production lines",
    "Automotive component assembly",
    "Powder coating plants",
    "Industrial manufacturing lines",
    "Material handling automation",
    "Heavy fabrication industries"
  ];

  return (
    <>
      <section className={styles.pageHero}>
        <div className={styles.container}>
          <div className={styles.pageHeroEyebrow}>
            <Link to="/">Home</Link> <span className={styles.sep}>/</span> 
            <Link to="/services">Services</Link> <span className={styles.sep}>/</span> 
            Industrial Conveyor Systems
          </div>

          <h1 className={styles.pageTitle}>
            Industrial <span className={styles.accent}>Conveyor Systems</span>
          </h1>

          <p className={styles.pageSubtitle}>
            Reliable material handling solutions designed for automated manufacturing and paint shop production lines.
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
                Efficient material handling
              </h2>

              <p className={styles.productOverview}>
                Industrial conveyor systems form the backbone of modern automated production lines. They transport components efficiently between process stations such as washing, coating, curing, assembly, and inspection.
              </p>

              <p className={styles.productOverview}>
                Burgeon designs conveyor systems tailored to each production layout. From overhead conveyors used in paint shops to heavy-duty floor conveyors for large components, every system is engineered for reliability, smooth operation, and seamless integration with the rest of the manufacturing process.
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
                <h3>Design your conveyor system</h3>

                <p>
                  Our engineers will design the ideal conveyor layout for your production line.
                </p>

                <Link 
                  to="/contact?product=industrial-conveyor" 
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
                Planning an automated<br />production line?
              </h2>

              <p className={styles.ctaBandSub}>
                Our team will design the optimal conveyor system for your facility.
              </p>

              <div style={{ marginTop: '32px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/contact" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`}>
                  Contact us →
                </Link>

                <Link to="/turnover" className={`${styles.btn} ${styles.btnOutline} ${styles.btnLg}`}>
                  See installations
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