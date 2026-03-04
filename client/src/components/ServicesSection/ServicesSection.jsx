import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './ServicesSection.module.css';

// Professional CDN Icon URLs
const paintIcon = "https://cdn-icons-png.flaticon.com/512/2942/2942789.png";
const waterIcon = "https://cdn-icons-png.flaticon.com/512/3105/3105818.png";
const electricIcon = "https://cdn-icons-png.flaticon.com/512/2942/2942792.png";
const powderIcon = "https://cdn-icons-png.flaticon.com/512/10433/10433058.png";
const ovenIcon = "https://cdn-icons-png.flaticon.com/512/2163/2163820.png";
const brushIcon = "https://cdn-icons-png.flaticon.com/512/815/815523.png";
const washingIcon = "https://cdn-icons-png.flaticon.com/512/2954/2954881.png"; // Cleaning/Washing
const gearsIcon = "https://cdn-icons-png.flaticon.com/512/3039/3039343.png"; // Equipment/Gears

const ServicesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer for fade-up animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -20px 0px' }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Updated services data with CDN icons
  const displayServices = [
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
    }
  ];

  return (
    <section className={`${styles.section} ${styles.bgSurface}`}>
      <div className={styles.container}>
        {/* Header */}
        <div 
          ref={sectionRef}
          className={`${styles.servicesHeader} ${styles.fadeUp} ${isVisible ? styles.fadeUpVisible : ''}`}
        >
          <div>
            <span className={styles.sectionEyebrow}>What we build</span>
            <h2 className={styles.sectionTitle}>Core <span className={styles.accent}>services</span></h2>
          </div>
          <Link to="/services" className={`${styles.btn} ${styles.btnOutline}`}>
            All services
            <svg className={styles.btnIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Grid */}
        <div className={`${styles.servicesMegaGrid} ${styles.fadeUp} ${isVisible ? styles.fadeUpVisible : ''}`}>
          {displayServices.map((service, index) => (
            <Link 
              to={service.slug} 
              key={service.id || index} 
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
                    <div className={styles.serviceTileArrow}>Explore systems →</div>
                  </div>
                  <div className={styles.tileVisual}>
                    <img src={service.icon} alt={service.title} className={styles.iconImg} />
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.serviceTileNum}>
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className={styles.serviceTileIcon}>
                    <img src={service.icon} alt={service.title} className={styles.iconImg} />
                  </div>
                  <div className={styles.serviceTileName}>{service.title}</div>
                  <div className={styles.serviceTileDesc}>{service.description}</div>
                  <div className={styles.serviceTileArrow}>View details →</div>
                </>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;