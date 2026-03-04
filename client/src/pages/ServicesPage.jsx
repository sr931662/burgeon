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
      title: "Conveyorised Painting Lines",
      description: "Complete automated painting lines for metal and plastic components including washing, coating, curing ovens, and conveyorised material handling systems.",
      icon: paintIcon,
      slug: "/services/conveyorised-painting-lines",
      specs: ["Turnkey Project Execution", "Custom Production Capacity", "Automotive & Industrial Applications"],
      isWide: true
    },
    {
      id: 2,
      title: "Industrial Paint Booth Systems",
      description: "Robotic, wet-type, and dry-type paint booths designed for controlled coating environments and consistent finishing quality.",
      icon: brushIcon,
      slug: "/services/industrial-paint-booth-systems",
      specs: ["Robotic Paint Booths", "Wet & Dry Booth Options", "High-Efficiency Filtration"]
    },
    {
      id: 3,
      title: "Industrial Washing Machines",
      description: "Heavy-duty washing systems for cleaning and surface preparation of metal components before coating or finishing processes.",
      icon: washingIcon,
      slug: "/services/industrial-washing-machines",
      specs: ["Rotary Washing Systems", "Conveyorised Washing Lines", "Industrial Degreasing Solutions"]
    },
    {
      id: 4,
      title: "Powder Coating Systems",
      description: "Complete powder coating setups including spray booths, recovery systems, curing ovens, and integrated material handling.",
      icon: powderIcon,
      slug: "/services/powder-coating-systems",
      specs: ["High Transfer Efficiency", "Consistent Film Thickness", "Industrial Production Ready"]
    },
    {
      id: 5,
      title: "Industrial Ovens",
      description: "Electric heater and IR lamp type ovens designed for curing, drying, and heating processes in coating and manufacturing lines.",
      icon: ovenIcon,
      slug: "/services/industrial-ovens",
      specs: ["Electric Heater Ovens", "IR Lamp Ovens", "Continuous & Batch Systems"]
    },
    {
      id: 6,
      title: "SPM Machines",
      description: "Special purpose machines engineered for custom industrial processes and automated manufacturing operations.",
      icon: gearsIcon,
      slug: "/services/spm-machines",
      specs: ["Custom Industrial Machinery", "Automation Integration", "Process-Specific Engineering"]
    },
    {
      id: 7,
      title: "Industrial Conveyor Systems",
      description: "Material handling conveyor systems designed to integrate seamlessly with automated manufacturing and finishing lines.",
      icon: electricIcon,
      slug: "/services/industrial-conveyor-systems",
      specs: ["Overhead Conveyors", "Production Line Integration", "Custom Layout Design"]
    },
    {
      id: 8,
      title: "Automation & Control Systems",
      description: "Industrial automation solutions including electrical control panels and system integration for efficient production processes.",
      icon: electricIcon,
      slug: "/services/automation-and-control-systems",
      specs: ["Control Panels", "System Integration", "Industrial Automation"]
    },
    {
      id: 9,
      title: "Surface Treatment Lines",
      description: "Integrated surface finishing systems designed for industrial components requiring reliable coating and finishing processes.",
      icon: waterIcon,
      slug: "/services/surface-treatment-lines",
      specs: ["Industrial Finishing Lines", "Production Line Integration", "High-Performance Coating"]
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