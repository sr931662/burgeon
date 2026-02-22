import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './EDEquipmentPage.module.css';

// Import icons (using CDN URLs as in the HTML)
const phoneIcon = "https://cdn-icons-png.flaticon.com/512/724/724664.png";
const emailIcon = "https://cdn-icons-png.flaticon.com/512/732/732200.png";

const EDEquipmentPage = () => {
  const [isVisible, setIsVisible] = useState({
    detail: false,
    components: false,
    cta: false
  });
  
  const detailRef = useRef(null);
  const componentsRef = useRef(null);
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
    setupObserver(componentsRef, 'components');
    setupObserver(ctaRef, 'cta');

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  // Available equipment list
  const equipmentList = [
    "DC rectifiers: 50-500V, 100-5000A with >92% efficiency",
    "Ultrafiltration (UF) membrane modules and complete skids",
    "Stainless steel and titanium anodes (tubular, plate configurations)",
    "Plate heat exchangers for temperature control",
    "PLC control systems with touchscreen HMI",
    "Circulation pumps and filtration units",
    "Anode cells and membrane boxes"
  ];

  // Technical specifications
  const specifications = [
    { label: "Rectifier voltage", value: "50 – 500 V DC" },
    { label: "Rectifier current", value: "100 – 5000 A" },
    { label: "Rectifier efficiency", value: ">92%" },
    { label: "UF flux rate", value: "20 – 100 L/m²·h" },
    { label: "Anode types", value: "Tubular, plate, membrane" },
    { label: "Anode material", value: "SS304, SS316, Titanium" },
    { label: "Control system", value: "PLC with HMI" }
  ];

  // Application areas
  const applications = [
    "New CED plants",
    "System upgrades",
    "Retrofit projects",
    "Spare parts",
    "Capacity expansion"
  ];

  // Component categories with emoji icons
  const componentCategories = [
    {
      icon: "⚡",
      title: "Power Supply",
      description: "High-efficiency DC rectifiers with precise voltage and current control. IGBT-based technology for stable output and energy savings."
    },
    {
      icon: "💧",
      title: "Filtration",
      description: "Ultrafiltration membranes and skids for paint recovery and rinse water treatment. Complete UF systems or replacement modules."
    },
    {
      icon: "🔌",
      title: "Anodes",
      description: "Tubular and plate anodes in stainless steel or titanium. Complete with membrane boxes for optimal current distribution."
    },
    {
      icon: "🌡️",
      title: "Heat Transfer",
      description: "Plate heat exchangers for precise bath temperature control. Corrosion-resistant designs for CED paint applications."
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
            ED Equipment
          </div>
          <h1 className={styles.pageTitle}>
            ED <span className={styles.accent}>Equipment</span>
          </h1>
          <p className={styles.pageSubtitle}>
            High-quality components for electrodeposition coating systems — rectifiers, ultrafiltration, anodes, and controls.
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
                Complete ED components
              </h2>
              <p className={styles.productOverview}>
                We supply individual components for CED (Cathodic Electrodeposition) systems, allowing you to build new lines or upgrade existing ones with modern, efficient equipment. From power supplies to filtration, every component is engineered for reliability and performance.
              </p>
              <p className={styles.productFeaturesTitle}>Available equipment</p>
              <ul className={styles.featureList}>
                {equipmentList.map((item, index) => (
                  <li key={index}>{item}</li>
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
                <h3>Upgrade your CED line</h3>
                <p>Our engineers will help you select the right components for your system.</p>
                <Link 
                  to="/contact?product=ed-equipment" 
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

      {/* COMPONENT CATEGORIES SECTION */}
      <section className={`${styles.section} ${styles.bgSurface}`}>
        <div className={styles.container}>
          <div 
            ref={componentsRef}
            className={`${styles.fadeUp} ${isVisible.components ? styles.fadeUpVisible : ''}`}
            style={{ marginBottom: '48px' }}
          >
            <span className={styles.sectionEyebrow}>Component categories</span>
            <h2 className={styles.sectionTitle} style={{ marginTop: '16px' }}>
              Everything for your <span className={styles.accent}>CED system</span>
            </h2>
          </div>
          
          <div className={`${styles.componentGrid} ${styles.fadeUp} ${isVisible.components ? styles.fadeUpVisible : ''}`}>
            {componentCategories.map((category, index) => (
              <div key={index} className={styles.componentCard}>
                <div className={styles.componentIcon}>{category.icon}</div>
                <div className={styles.componentTitle}>{category.title}</div>
                <div className={styles.componentDesc}>{category.description}</div>
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
              <h2 className={styles.ctaBandTitle}>Need ED components?</h2>
              <p className={styles.ctaBandSub}>
                Tell us your requirements — we'll supply the exact equipment you need.
              </p>
              <div style={{ marginTop: '32px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/contact" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`}>
                  Contact us →
                </Link>
                <Link to="/ced-plant" className={`${styles.btn} ${styles.btnOutline} ${styles.btnLg}`}>
                  View CED plants
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

export default EDEquipmentPage;