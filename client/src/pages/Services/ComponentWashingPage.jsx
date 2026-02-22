import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './ComponentWashingPage.module.css';

// Import icons (using CDN URLs as in the HTML)
const phoneIcon = "https://cdn-icons-png.flaticon.com/512/724/724664.png";
const emailIcon = "https://cdn-icons-png.flaticon.com/512/732/732200.png";

const ComponentWashingPage = () => {
  const [isVisible, setIsVisible] = useState({
    detail: false,
    tech: false,
    cta: false
  });
  
  const detailRef = useRef(null);
  const techRef = useRef(null);
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
    setupObserver(techRef, 'tech');
    setupObserver(ctaRef, 'cta');

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  // Feature list
  const features = [
    "Spray wash, immersion, rotating basket, or ultrasonic technologies",
    "Heated wash tanks (gas/electric/steam) up to 80°C",
    "Integrated oil skimming and continuous filtration",
    "Rust protection options for ferrous components",
    "Conveyorized or batch designs available",
    "1-6 stage configurations with intermediate rinses",
    "SS304/316 construction for corrosion resistance"
  ];

  // Technical specifications
  const specifications = [
    { label: "Process stages", value: "1-6 as required" },
    { label: "Wash temperature", value: "Up to 80°C" },
    { label: "Technology options", value: "Spray / Immersion / Ultrasonic / Rotating basket" },
    { label: "Tank material", value: "SS304 / SS316" },
    { label: "Heating options", value: "Electric, gas, steam" },
    { label: "Filtration", value: "Bag filters, magnetic separators" },
    { label: "Oil removal", value: "Skimmers, coalescers" }
  ];

  // Application areas
  const applications = [
    "Automotive parts",
    "Machined components",
    "Stampings",
    "Fasteners",
    "Hydraulic parts",
    "Before coating"
  ];

  // Washing technologies
  const technologies = [
    {
      number: "01",
      title: "Spray Wash",
      description: "High-impact spray nozzles remove oils and loose soils. Ideal for simple geometries and high-volume production. Available in conveyorized or rotary drum configurations."
    },
    {
      number: "02",
      title: "Immersion",
      description: "Components are submerged in heated cleaning solution with agitation. Perfect for complex geometries, blind holes, and heavily soiled parts."
    },
    {
      number: "03",
      title: "Ultrasonic",
      description: "High-frequency sound waves create cavitation bubbles that clean microscopic particles. Ideal for precision components and critical cleaning requirements."
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
            Component Washing Machine
          </div>
          <h1 className={styles.pageTitle}>
            Component <span className={styles.accent}>Washing Machines</span>
          </h1>
          <p className={styles.pageSubtitle}>
            Effective cleaning is the foundation of quality coating — remove oils, grease, and soils with precision washing technology.
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
                Clean parts, perfect adhesion
              </h2>
              <p className={styles.productOverview}>
                Burgeon component washing machines remove oils, grease, machining fluids, and soils using advanced spray, immersion, or ultrasonic technology. Available in single or multi-stage configurations with heated wash tanks, oil skimming, and filtration systems. Designed for integration with pretreatment lines or as standalone cleaning stations.
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
                <h3>Clean your parts effectively</h3>
                <p>Our engineers will design the perfect washing system for your components.</p>
                <Link 
                  to="/contact?product=component-washing-machine" 
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

      {/* TECHNOLOGY SECTION */}
      <section className={`${styles.section} ${styles.bgSurface}`}>
        <div className={styles.container}>
          <div 
            ref={techRef}
            className={`${styles.fadeUp} ${isVisible.tech ? styles.fadeUpVisible : ''}`}
            style={{ marginBottom: '48px' }}
          >
            <span className={styles.sectionEyebrow}>Washing technologies</span>
            <h2 className={styles.sectionTitle} style={{ marginTop: '16px' }}>
              Choose your <span className={styles.accent}>cleaning method</span>
            </h2>
          </div>
          
          <div className={`${styles.techGrid} ${styles.fadeUp} ${isVisible.tech ? styles.fadeUpVisible : ''}`}>
            {technologies.map((tech, index) => (
              <div key={index} className={styles.techCard}>
                <div className={styles.techNum}>{tech.number}</div>
                <div className={styles.techTitle}>{tech.title}</div>
                <div className={styles.techDesc}>{tech.description}</div>
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
              <h2 className={styles.ctaBandTitle}>Design your<br />washing system</h2>
              <p className={styles.ctaBandSub}>
                Tell us your parts and contamination — we'll recommend the optimal cleaning technology.
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

export default ComponentWashingPage;