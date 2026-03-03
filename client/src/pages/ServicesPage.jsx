import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './ServicesPage.module.css';

// Icon URLs
const paintIcon = "https://cdn-icons-png.flaticon.com/512/2942/2942789.png";
const waterIcon = "https://cdn-icons-png.flaticon.com/512/3105/3105818.png";
const electricIcon = "https://cdn-icons-png.flaticon.com/512/2942/2942792.png";
const powderIcon = "https://cdn-icons-png.flaticon.com/512/10433/10433058.png"; // Powder/Chemical
const ovenIcon = "https://cdn-icons-png.flaticon.com/512/2163/2163820.png"; // Industrial Oven
const brushIcon = "https://cdn-icons-png.flaticon.com/512/815/815523.png"; // Spray/Liquid
const washingIcon = "https://cdn-icons-png.flaticon.com/512/2954/2954881.png"; // Cleaning/Washing
const gearsIcon = "https://cdn-icons-png.flaticon.com/512/3039/3039343.png"; // Equipment/Gears
const pipingIcon = "https://cdn-icons-png.flaticon.com/512/3251/3251508.png"; // Piping/Plumbing

const Services = () => {
  const [isVisible, setIsVisible] = useState({
    grid: false,
    cta: false
  });
  
  const gridRef = useRef(null);
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

    setupObserver(gridRef, 'grid');
    setupObserver(ctaRef, 'cta');

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  const services = [
    {
      id: 1,
      title: "Paint Shop & Surface Treatment Systems",
      description: "Complete, integrated paint finishing lines engineered around your parts, volumes, and space. From pretreatment through curing — PLC-controlled, energy-efficient, fully expandable.",
      icon: paintIcon,
      slug: "/paint-shop",
      specs: ["Turnkey Execution", "Custom Capacity Design", "Automotive Grade Standards"],
      isWide: true
    },
    {
      id: 2,
      title: "Pretreatment Systems",
      description: "3–9 stage spray or immersion systems. Alkaline degreasing, phosphate conversion, passivation, and DI water rinse. The foundation of any coating process.",
      icon: waterIcon,
      slug: "/pretreatment-system",
      specs: ["Turnkey Execution", "Custom Capacity Design", "Automotive Grade Standards"]
    },
    {
      id: 3,
      title: "CED / Cataphoretic Plants",
      description: "Automated electrodeposition coating lines. Uniform 15–30μm film on all surfaces including recesses. 5,000–50,000L tank capacity for automotive and industrial use.",
      icon: electricIcon,
      slug: "/ced-plant",
      specs: ["Turnkey Execution", "Custom Capacity Design", "Automotive Grade Standards"]
    },
    {
      id: 4,
      title: "Powder Coating Plants",
      description: "Complete powder lines from pretreatment to curing. High transfer efficiency, rapid colour change, consistent film build. 50 to 1,000+ parts per shift.",
      icon: powderIcon,
      slug: "/powder-coating-plant",
      specs: ["Turnkey Execution", "Custom Capacity Design", "Automotive Grade Standards"]
    },
    {
      id: 5,
      title: "Industrial Ovens",
      description: "Bake ovens (50–300°C) and dry-off ovens for every curing and drying application. Batch or continuous, gas/electric/oil, with PLC control and data logging.",
      icon: ovenIcon,
      slug: "/bake-oven",
      specs: ["Turnkey Execution", "Custom Capacity Design", "Automotive Grade Standards"]
    },
    {
      id: 6,
      title: "Liquid Paint Booths",
      description: "Downdraft, semi-downdraft, and crossflow booths with advanced filtration. Wet/dry and compact configurations available for every application and budget.",
      icon: brushIcon,
      slug: "/liquid-paint-booth",
      specs: ["Turnkey Execution", "Custom Capacity Design", "Automotive Grade Standards"]
    },
    {
      id: 7,
      title: "Component Washing Machines",
      description: "Spray, immersion, rotating basket, and ultrasonic washing machines. 1 to 6 stages, heated to 80°C. For precision parts cleaning before any coating process.",
      icon: washingIcon,
      slug: "/component-washing-machine",
      specs: ["Turnkey Execution", "Custom Capacity Design", "Automotive Grade Standards"]
    },
    {
      id: 8,
      title: "ED Equipment",
      description: "Individual CED system components: rectifiers, UF modules, anodes, heat exchangers, and control panels. For new builds or upgrading existing electrodeposition lines.",
      icon: gearsIcon,
      slug: "/ed-equipment",
      specs: ["Turnkey Execution", "Custom Capacity Design", "Automotive Grade Standards"]
    },
    {
      id: 9,
      title: "Utility & Process Piping",
      description: "Complete piping solutions for paint circulation, compressed air, cooling water, steam, and chemical lines. SS304/316L, carbon steel, PP — design through commissioning.",
      icon: pipingIcon,
      slug: "/utility-process-piping",
      specs: ["Turnkey Execution", "Custom Capacity Design", "Automotive Grade Standards"]
    }
  ];

  return (
    <>
      <section className={styles.pageHero}>
        <div className={styles.container}>
          <div className={styles.pageHeroEyebrow}>
            <Link to="/">Home</Link> <span className={styles.sep}>/</span> Services
          </div>
          <h1 className={styles.pageTitle}>
            Comprehensive industrial<br /><span className={styles.accent}>finishing solutions</span>
          </h1>
          <p className={styles.pageSubtitle}>
            From single equipment supply to complete turnkey paint shop systems — every solution is engineered for your specific production requirements.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div 
            ref={gridRef}
            className={`${styles.servicesMegaGrid} ${styles.fadeUp} ${isVisible.grid ? styles.fadeUpVisible : ''}`}
          >
            {services.map((service, index) => (
              <Link 
                to={service.slug} 
                key={service.id} 
                className={`${styles.serviceTile} ${service.isWide ? styles.wide : ''}`}
              >
                {service.isWide ? (
                  <>
                    <div className={styles.tileContent}>
                      <div className={styles.serviceTileNum}>
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className={styles.serviceTileName}>{service.title}</div>
                      <div className={styles.serviceTileDesc}>{service.description}</div>
                      {service.specs && (
                        <ul className={styles.serviceSpecs}>
                          {service.specs.map((spec, idx) => (
                            <li key={idx}>{spec}</li>
                          ))}
                        </ul>
                      )}
                      <div className={styles.serviceTileArrow}>Explore →</div>
                    </div>
                    <div className={styles.tileVisual}>
                      <img src={service.icon} alt={service.title} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.serviceTileNum}>
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className={styles.serviceTileIcon}>
                      <img src={service.icon} alt={service.title} />
                    </div>
                    <div className={styles.serviceTileName}>{service.title}</div>
                    <div className={styles.serviceTileDesc}>{service.description}</div>
                    {service.specs && (
                      <ul className={styles.serviceSpecs}>
                        {service.specs.map((spec, idx) => (
                          <li key={idx}>{spec}</li>
                        ))}
                      </ul>
                    )}
                    <div className={styles.serviceTileArrow}>View →</div>
                  </>
                )}
              </Link>
            ))}
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
              <h2 className={styles.ctaBandTitle}>Need a custom solution?</h2>
              <p className={styles.ctaBandSub}>
                Our engineers design systems tailored to your exact production requirements.
              </p>
              <div style={{ marginTop: '32px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/contact" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`}>
                  Request consultation →
                </Link>
                <Link to="/turnover" className={`${styles.btn} ${styles.btnOutline} ${styles.btnLg}`}>
                  See our projects
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

export default Services;