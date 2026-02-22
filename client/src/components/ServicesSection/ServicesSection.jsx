import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './ServicesSection.module.css';
import { fetchServices } from '../../api/services';

const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        const response = await fetchServices({ limit: 6 }); // Get 6 services for the grid
        setServices(response.data.data || []);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load services');
        console.error('Error loading services:', err);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

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

  // Default services if API fails or returns empty
  const defaultServices = [
    {
      id: 1,
      title: "Paint Shop & Surface Treatment Systems",
      description: "Complete, integrated paint finishing lines. From pretreatment to curing — designed around your parts, your volumes, and your space. PLC-controlled, energy-efficient, expandable.",
      icon: "🎨",
      slug: "/services/paint-shop",
      isWide: true
    },
    {
      id: 2,
      title: "Pretreatment Systems",
      description: "3–9 stage spray or immersion systems. Alkaline cleaning, phosphate, passivation, and DI water rinse for maximum coating adhesion and corrosion resistance.",
      icon: "💧",
      slug: "/services/pretreatment-system"
    },
    {
      id: 3,
      title: "CED / Cataphoretic Plants",
      description: "Automated electrodeposition coating lines. Uniform 15–30μm film on all surfaces including recesses. 5,000–50,000L tank capacity.",
      icon: "⚡",
      slug: "/services/ced-plant"
    },
    {
      id: 4,
      title: "Powder Coating Plants",
      description: "Complete powder lines from pretreatment to curing. High transfer efficiency, rapid colour change, consistent film build.",
      icon: "🧪",
      slug: "/services/powder-coating-plant"
    },
    {
      id: 5,
      title: "Industrial Ovens",
      description: "Bake ovens (50–300°C) and dry-off ovens for every curing and drying application. Batch or continuous, gas/electric/oil.",
      icon: "🔥",
      slug: "/services/bake-oven"
    },
    {
      id: 6,
      title: "Liquid Paint Booths",
      description: "Downdraft, semi-downdraft, and crossflow booths with advanced filtration. Wet/dry and compact configurations available.",
      icon: "🖌️",
      slug: "/services/liquid-paint-booth"
    }
  ];

  // Use API data if available, otherwise use defaults
  const displayServices = services.length >= 6 
    ? [
        // First item is always the wide featured tile
        {
          id: services[0]._id,
          title: services[0].title,
          description: services[0].shortDescription || services[0].description,
          icon: "🎨",
          slug: `/services/${services[0].slug}`,
          isWide: true
        },
        // Then map remaining services to regular tiles
        ...services.slice(1, 6).map((service, index) => ({
          id: service._id,
          title: service.title,
          description: service.shortDescription || service.description,
          icon: getIconForIndex(index + 1),
          slug: `/services/${service.slug}`
        }))
      ]
    : defaultServices;

  // Helper function to assign icons
  function getIconForIndex(index) {
    const icons = ['💧', '⚡', '🧪', '🔥', '🖌️', '🔧'];
    return icons[index % icons.length];
  }

  return (
    <section className={`${styles.section} ${styles.bgSurface}`}>
      <div className={styles.container}>
        {/* Header with fade animation */}
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

        {loading ? (
          <div className={styles.loadingContainer}>Loading services...</div>
        ) : error ? (
          <div className={styles.errorContainer}>Error: {error}</div>
        ) : (
          <div className={`${styles.servicesMegaGrid} ${styles.fadeUp} ${isVisible ? styles.fadeUpVisible : ''}`}>
            {displayServices.map((service, index) => (
              <Link 
                to={service.slug} 
                key={service.id || index} 
                className={`${styles.serviceTile} ${service.isWide ? styles.wide : ''}`}
              >
                {service.isWide ? (
                  // Wide tile layout
                  <>
                    <div className={styles.tileContent}>
                      <div className={styles.serviceTileNum}>
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className={styles.serviceTileName}>{service.title}</div>
                      <div className={styles.serviceTileDesc}>{service.description}</div>
                      <div className={styles.serviceTileArrow}>Explore systems →</div>
                    </div>
                    <div className={styles.tileVisual}>{service.icon}</div>
                  </>
                ) : (
                  // Regular tile layout
                  <>
                    <div className={styles.serviceTileNum}>
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className={styles.serviceTileIcon}>{service.icon}</div>
                    <div className={styles.serviceTileName}>{service.title}</div>
                    <div className={styles.serviceTileDesc}>{service.description}</div>
                    <div className={styles.serviceTileArrow}>View details →</div>
                  </>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;