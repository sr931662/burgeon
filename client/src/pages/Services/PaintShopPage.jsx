import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './PaintShopPage.module.css';
import { fetchProductBySlug } from '../../api/products';

const PaintShopPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [isVisible, setIsVisible] = useState({
    intro: false,
    equipment: false,
    cta: false
  });
  
  const introRef = useRef(null);
  const equipmentRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productSlug = slug || 'conveyorised-painting-lines';
        const response = await fetchProductBySlug(productSlug);
        setProduct(response.data.data);
      } catch (err) {
        console.error('Error loading product:', err);
      }
    };

    loadProduct();
  }, [slug]);

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

    setupObserver(introRef, 'intro');
    setupObserver(equipmentRef, 'equipment');
    setupObserver(ctaRef, 'cta');

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  const equipmentList = [
    {
      id: 1,
      name: "Overhead Conveyor System",
      tag: "Power & free · Continuous chain · Load capacities up to 1 tonne",
      slug: "/services/conveyor-systems"
    },
    {
      id: 2,
      name: "Industrial Washing Line",
      tag: "Multi-stage degreasing · Phosphating · DI rinse",
      slug: "/services/component-washing-machine"
    },
    {
      id: 3,
      name: "Surface Preparation Tunnel",
      tag: "Spray treatment · Rust removal · Coating adhesion preparation",
      slug: "/services/spm-machines"
    },
    {
      id: 4,
      name: "Automated Paint Booth",
      tag: "Wet / dry filtration · Robotic or manual spray",
      slug: "/services/industrial-paint-booth-systems"
    },
    {
      id: 5,
      name: "Curing & Bake Ovens",
      tag: "Electric / gas heated · Continuous conveyor operation",
      slug: "/services/powder-coating-systems"
    },
    {
      id: 6,
      name: "Control & Automation System",
      tag: "PLC control · Production synchronisation · HMI interface",
      slug: "/services/automation-systems"
    }
  ];

  const applications = [
    "Automotive component manufacturing",
    "Agricultural equipment",
    "Heavy engineering fabrication",
    "Industrial machinery production"
  ];

  const features = [
    "Fully automated conveyorised production flow from washing to curing",
    "Consistent coating quality across high production volumes",
    "Integrated conveyor movement eliminating manual handling",
    "Energy-efficient oven and booth design reducing operating cost",
    "PLC-controlled automation with real-time process monitoring",
    "Expandable modular layouts for future production scaling"
  ];

  return (
    <>
      <section className={styles.pageHero}>
        <div className={styles.container}>
          <div className={styles.pageHeroEyebrow}>
            <Link to="/">Home</Link> <span className={styles.sep}>/</span> 
            <Link to="/services">Services</Link> <span className={styles.sep}>/</span> 
            Conveyorised Painting Lines
          </div>
          <h1 className={styles.pageTitle}>
            Conveyorised <span className={styles.accent}>Painting Lines</span>
          </h1>
          <p className={styles.pageSubtitle}>
            {product?.shortDescription || 
              "Automated painting lines engineered for high-volume industrial production — integrating washing, surface preparation, coating, and curing into a continuous conveyorised workflow."}
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div 
            ref={introRef}
            className={`${styles.introGrid} ${styles.fadeUp} ${isVisible.intro ? styles.fadeUpVisible : ''}`}
          >
            <div>
              <span className={styles.sectionEyebrow}>Automated production</span>
              <h2 className={styles.sectionTitle}>
                Continuous conveyorised<br />painting systems
              </h2>
              <p className={styles.sectionLead}>
                Conveyorised painting lines are designed for manufacturers that require consistent coating quality across high production volumes. Components move automatically through washing, surface preparation, painting, and curing stages without manual handling.
              </p>
              <p className={styles.sectionLead}>
                Burgeon designs complete conveyorised systems tailored to your component size, production throughput, and plant layout. Every stage of the process is synchronised through industrial automation to ensure efficiency, reliability, and repeatable finishing quality.
              </p>
              <ul className={styles.featureList}>
                {features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className={styles.statsCard}>
              <div className={styles.statsNumber}>
                100<span>+</span>
              </div>
              <div className={styles.statsLabel}>Industrial systems delivered</div>
              <div className={styles.statsList}>
                {applications.map((app, index) => (
                  <div key={index} className={styles.statItem}>
                    <span>{app}</span>
                    <span>✓</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.bgSurface}`}>
        <div className={styles.container}>
          <div 
            ref={equipmentRef}
            className={`${styles.productsHeader} ${styles.fadeUp} ${isVisible.equipment ? styles.fadeUpVisible : ''}`}
          >
            <span className={styles.sectionEyebrow}>Line components</span>
            <h2 className={styles.sectionTitle}>Equipment in the system</h2>
          </div>
          <div 
            className={`${styles.productsList} ${styles.fadeUp} ${isVisible.equipment ? styles.fadeUpVisible : ''}`}
          >
            {equipmentList.map((item) => (
              <Link to={item.slug} key={item.id} className={styles.productRow}>
                <div className={styles.productRowNum}>
                  {String(item.id).padStart(2, '0')}
                </div>
                <div>
                  <div className={styles.productRowName}>{item.name}</div>
                  <div className={styles.productRowTag}>{item.tag}</div>
                </div>
                <div className={styles.productRowArrow}>→</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div 
            ref={ctaRef}
            className={`${styles.ctaBand} ${styles.fadeUp} ${isVisible.cta ? styles.fadeUpVisible : ''}`}
          >
            <div className={styles.ctaBandPattern} aria-hidden="true"></div>
            <div>
              <h2 className={styles.ctaBandTitle}>Plan your painting line</h2>
              <p className={styles.ctaBandSub}>
                Share your component size, throughput, and factory layout — our engineers will design the optimal conveyorised coating system.
              </p>
              <div style={{ marginTop: '32px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/contact" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`}>
                  Request engineering consultation →
                </Link>
                <Link to="/turnover" className={`${styles.btn} ${styles.btnOutline} ${styles.btnLg}`}>
                  View completed installations
                </Link>
              </div>
            </div>
            <div className={styles.ctaBandActions}>
              <div className={styles.ctaContactItem}>
                📞 <a href="tel:+918527754455">+91 8527754455</a>
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

export default PaintShopPage;