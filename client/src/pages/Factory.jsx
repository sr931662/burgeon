import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Factory.module.css';

const Factory = () => {
  const [isVisible, setIsVisible] = useState({
    factory: false,
    process: false,
    cta: false
  });
  
  const factoryRef = useRef(null);
  const processRef = useRef(null);
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

    setupObserver(factoryRef, 'factory');
    setupObserver(processRef, 'process');
    setupObserver(ctaRef, 'cta');

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  // Capability list items
  const capabilities = [
    "CNC laser and plasma cutting — up to 25mm plate",
    "Press braking — up to 6 metre length",
    "MIG and TIG welding — certified welders",
    "Overhead cranes — up to 10 tonne capacity",
    "Sandblasting and primer coating",
    "Electrical panel assembly and wiring",
    "In-house quality control laboratory"
  ];

  // Process steps
  const processSteps = [
    {
      number: "①",
      title: "Cutting & Forming",
      description: "CNC laser and plasma cutting to ±0.5mm tolerance. 6-metre press brake forming. Sheet metal and structural steel sections."
    },
    {
      number: "②",
      title: "Welding & Assembly",
      description: "Certified MIG and TIG welding. Stainless steel, carbon steel, and aluminium. Structural and pressure-tested assemblies."
    },
    {
      number: "③",
      title: "Surface Finishing",
      description: "In-house sandblasting and primer coating. External finishing as required. All surfaces prepared to specification before dispatch."
    },
    {
      number: "④",
      title: "Electrical Integration",
      description: "Panel building, wiring, and PLC programming done in-house. Factory acceptance testing before delivery ensures zero surprises on site."
    }
  ];

  return (
    <>
      {/* PAGE HERO */}
      <section className={styles.pageHero}>
        <div className={styles.container}>
          <div className={styles.pageHeroEyebrow}>
            <Link to="/">Home</Link> <span className={styles.sep}>/</span> Factory
          </div>
          <h1 className={styles.pageTitle}>
            Where precision<br /><span className={styles.accent}>meets fabrication</span>
          </h1>
          <p className={styles.pageSubtitle}>
            Our 25,000 sq ft facility at IMT Manesar is where every system is built, assembled, and tested before it ever reaches your site.
          </p>
        </div>
      </section>

      {/* FACTORY SECTION */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div 
            ref={factoryRef}
            className={`${styles.factorySection} ${styles.fadeUp} ${isVisible.factory ? styles.fadeUpVisible : ''}`}
          >
            {/* Left Column - Content */}
            <div>
              <span className={styles.sectionEyebrow}>Manufacturing excellence</span>
              <h2 className={styles.sectionTitle}>Built in-house,<br />tested before delivery</h2>
              <p className={styles.sectionLead}>
                Located in IMT Manesar, our 25,000 sq ft facility is equipped with modern fabrication technology. Every system is fabricated, assembled, and tested before dispatch — we believe problems should be found at the factory, not at your site.
              </p>
              <p className={styles.sectionLead}>
                Our 45 skilled fabricators and fitters bring decades of combined experience in industrial sheet metal, structural steel, and precision assembly. Our in-house quality control lab ensures every component meets our exacting standards before it leaves the gate.
              </p>
              <ul className={styles.capabilityList}>
                {capabilities.map((capability, index) => (
                  <li key={index} className={styles.capabilityItem}>
                    {capability}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column - Specs Grid */}
            <div className={styles.factorySpecs}>
              <div className={styles.specCell}>
                <div className={styles.specCellVal}>25,<span>000</span></div>
                <div className={styles.specCellKey}>Sq ft production area</div>
              </div>
              <div className={styles.specCell}>
                <div className={styles.specCellVal}>45<span>+</span></div>
                <div className={styles.specCellKey}>Skilled fabricators</div>
              </div>
              <div className={styles.specCell}>
                <div className={styles.specCellVal}>10<span>T</span></div>
                <div className={styles.specCellKey}>Overhead crane capacity</div>
              </div>
              <div className={styles.specCell}>
                <div className={styles.specCellVal}>6<span>m</span></div>
                <div className={styles.specCellKey}>Press brake length</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className={`${styles.section} ${styles.bgSurface}`}>
        <div className={styles.container}>
          <div 
            ref={processRef}
            className={`${styles.fadeUp} ${isVisible.process ? styles.fadeUpVisible : ''}`}
          >
            <span className={styles.sectionEyebrow}>Full capabilities</span>
            <h2 className={styles.sectionTitle} style={{ marginTop: '16px', marginBottom: '48px' }}>
              What we can fabricate
            </h2>
            <div className={styles.processGrid}>
              {processSteps.map((step, index) => (
                <div key={index} className={styles.processStep}>
                  <div className={styles.processStepNum}>{step.number}</div>
                  <div className={styles.processStepTitle}>{step.title}</div>
                  <div className={styles.processStepDesc}>{step.description}</div>
                </div>
              ))}
            </div>
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
              <h2 className={styles.ctaBandTitle}>Visit our facility</h2>
              <p className={styles.ctaBandSub}>
                See the factory where your system will be built. We welcome client visits and factory tours.
              </p>
              <div style={{ marginTop: '32px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/contact" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`}>
                  Schedule a visit →
                </Link>
                <Link to="/about" className={`${styles.btn} ${styles.btnOutline} ${styles.btnLg}`}>
                  About us
                </Link>
              </div>
            </div>
            <div className={styles.ctaBandActions}>
              <div className={styles.ctaContactItem}>
                📞 <a href="tel:+918527754455">+91 8527754455</a>
              </div>
              <div className={styles.ctaContactItem}>
                📍 IMT Manesar, Gurgaon-122052
              </div>
              <div className={styles.ctaContactItem}>
                🕒 Mon–Fri: 9:00–18:00
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Factory;