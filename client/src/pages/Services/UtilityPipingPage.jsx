import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './UtilityPipingPage.module.css';

// Import icons (using CDN URLs as in the HTML)
const phoneIcon = "https://cdn-icons-png.flaticon.com/512/724/724664.png";
const emailIcon = "https://cdn-icons-png.flaticon.com/512/732/732200.png";

const UtilityPipingPage = () => {
  const [isVisible, setIsVisible] = useState({
    detail: false,
    capabilities: false,
    cta: false
  });
  
  const detailRef = useRef(null);
  const capabilitiesRef = useRef(null);
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
    setupObserver(capabilitiesRef, 'capabilities');
    setupObserver(ctaRef, 'cta');

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  // Services & applications list
  const applications = [
    "Paint circulation loops (stainless steel) with proper slope and drains",
    "Compressed air distribution networks",
    "Chilled water and cooling water systems",
    "Steam and condensate return lines",
    "Chemical dosing and transfer lines",
    "DI water and RO water systems",
    "Waste collection and treatment piping"
  ];

  // Materials & specifications
  const specifications = [
    { label: "Carbon steel", value: "Schedule 40 / 80, seamless / welded" },
    { label: "Stainless steel", value: "304 / 316L, sanitary finishes available" },
    { label: "PP / PPH", value: "For aggressive chemicals" },
    { label: "PVDF", value: "High-purity applications" },
    { label: "Copper", value: "Instrument air, small bore" },
    { label: "Joint types", value: "Butt weld, socket weld, threaded, flanged" },
    { label: "Design standards", value: "ASME B31.3, ISO, DIN" }
  ];

  // Industry applications chips
  const industryChips = [
    "Paint shops",
    "Chemical plants",
    "Automotive",
    "General manufacturing",
    "Food processing",
    "Pharmaceutical"
  ];

  // Capability steps
  const capabilities = [
    {
      number: "01",
      title: "Design & Engineering",
      description: "Pipe sizing, material selection, stress analysis, and isometric drawings. Optimized for flow, pressure drop, and accessibility."
    },
    {
      number: "02",
      title: "Fabrication",
      description: "In-house pipe spool fabrication with precision cutting, beveling, and welding. Quality control at every step."
    },
    {
      number: "03",
      title: "Installation",
      description: "Site installation by certified fitters and welders. Proper support, alignment, and bolt-up procedures."
    },
    {
      number: "04",
      title: "Testing & Commissioning",
      description: "Hydrostatic testing, flushing, passivation, and documentation. We don't leave until the system performs."
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
            Utility & Process Piping
          </div>
          <h1 className={styles.pageTitle}>
            Utility & Process <span className={styles.accent}>Piping</span>
          </h1>
          <p className={styles.pageSubtitle}>
            Reliable fluid transport systems for industrial plants — designed for efficiency, safety, and longevity.
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
                Complete piping solutions
              </h2>
              <p className={styles.productOverview}>
                Burgeon provides end-to-end piping solutions for industrial facilities. From design and material selection to fabrication, installation, and commissioning — we deliver systems that minimize pressure drop, prevent contamination, ensure safety, and meet your exact process requirements.
              </p>
              <p className={styles.productFeaturesTitle}>Services & applications</p>
              <ul className={styles.featureList}>
                {applications.map((app, index) => (
                  <li key={index}>{app}</li>
                ))}
              </ul>
              <div className={styles.appChips}>
                {industryChips.map((chip, index) => (
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

            {/* Right Column - Specs & CTA */}
            <div className={styles.productAside}>
              <div className={styles.specTableWrap}>
                <div className={styles.specTableHead}>Materials & specifications</div>
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
                <h3>Design your piping network</h3>
                <p>Our piping engineers will design a system that meets your flow, pressure, and material requirements.</p>
                <Link 
                  to="/contact?product=utility-piping" 
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  style={{ marginTop: 0 }}
                >
                  Talk to engineers →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES SECTION */}
      <section className={`${styles.section} ${styles.bgSurface}`}>
        <div className={styles.container}>
          <div 
            ref={capabilitiesRef}
            className={`${styles.fadeUp} ${isVisible.capabilities ? styles.fadeUpVisible : ''}`}
            style={{ marginBottom: '48px' }}
          >
            <span className={styles.sectionEyebrow}>Capabilities</span>
            <h2 className={styles.sectionTitle} style={{ marginTop: '16px' }}>
              What we <span className={styles.accent}>deliver</span>
            </h2>
          </div>
          
          <div className={`${styles.capabilitiesGrid} ${styles.fadeUp} ${isVisible.capabilities ? styles.fadeUpVisible : ''}`}>
            {capabilities.map((capability, index) => (
              <div key={index} className={styles.capabilityCard}>
                <div className={styles.capabilityNum}>{capability.number}</div>
                <div className={styles.capabilityTitle}>{capability.title}</div>
                <div className={styles.capabilityDesc}>{capability.description}</div>
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
              <h2 className={styles.ctaBandTitle}>Start your<br />piping project</h2>
              <p className={styles.ctaBandSub}>
                Tell us about your fluid handling requirements — we'll design and install the perfect system.
              </p>
              <div style={{ marginTop: '32px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/contact" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`}>
                  Contact us →
                </Link>
                <Link to="/turnover" className={`${styles.btn} ${styles.btnOutline} ${styles.btnLg}`}>
                  See projects
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

export default UtilityPipingPage;