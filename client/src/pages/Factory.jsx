import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Factory.module.css';
import FactoryGallery from '../components/FactoryGallery/FactoryGallery'; // Import the gallery component

const Factory = () => {
  const [isVisible, setIsVisible] = useState({
    factory: false,
    gallery: false,   // Added for gallery
    process: false,
    cta: false
  });
  
  const factoryRef = useRef(null);
  const galleryRef = useRef(null);   // Ref for gallery
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
    setupObserver(galleryRef, 'gallery');   // Observe gallery
    setupObserver(processRef, 'process');
    setupObserver(ctaRef, 'cta');

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  // Capability list items
  const capabilities = [
    "Fabrication of industrial equipment and machine structures",
    "Assembly of paint booths, ovens, and washing systems",
    "Integration of conveyor and automation systems",
    "Electrical control panel assembly and system wiring",
    "Industrial equipment testing before dispatch",
    "Engineering inspection and quality assurance",
    "Preparation of systems for site installation and commissioning"
  ];

  // Process steps
  const processSteps = [
    {
      number: "①",
      title: "Engineering Design",
      description: "Our engineers design industrial systems based on production requirements, component specifications, and plant layout."
    },
    {
      number: "②",
      title: "Fabrication & Assembly",
      description: "Industrial equipment and system components are fabricated and assembled at our manufacturing facilities."
    },
    {
      number: "③",
      title: "System Integration",
      description: "Mechanical equipment, conveyors, and control systems are integrated and prepared for installation."
    },
    {
      number: "④",
      title: "Testing & Dispatch",
      description: "All systems are inspected and tested before being dispatched for installation and commissioning at client facilities."
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
            Our manufacturing units in Gurugram and MET City Jhajjar support the fabrication, assembly, and testing of industrial automation systems before installation at client facilities.
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
                Our manufacturing facilities support the fabrication and assembly of industrial equipment including paint booths, industrial ovens, washing machines, conveyor systems, and automation solutions.
              </p>

              <p className={styles.sectionLead}>
                Every system is engineered, assembled, and inspected before dispatch to ensure reliable performance and seamless installation at the client’s production facility.
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
                <div className={styles.specCellVal}>3<span>+</span></div>
                <div className={styles.specCellKey}>Manufacturing Units</div>
              </div>

              <div className={styles.specCell}>
                <div className={styles.specCellVal}>22<span>+</span></div>
                <div className={styles.specCellKey}>Years Engineering Expertise</div>
              </div>

              <div className={styles.specCell}>
                <div className={styles.specCellVal}>ISO</div>
                <div className={styles.specCellKey}>9001:2015 Certified</div>
              </div>

              <div className={styles.specCell}>
                <div className={styles.specCellVal}>2015</div>
                <div className={styles.specCellKey}>Established</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FACTORY GALLERY SECTION */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div
            ref={galleryRef}
            className={`${styles.fadeUp} ${isVisible.gallery ? styles.fadeUpVisible : ''}`}
          >
            <FactoryGallery />
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
                📍 Sector-83, Gurugram, Haryana
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