import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './PaintShopPage.module.css';
import { fetchProductBySlug } from '../../api/products';

const PaintShopPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [setLoading] = useState(true);
  const [setError] = useState(null);
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
        setLoading(true);
        // If slug is provided, fetch that specific product
        // Otherwise, fetch the paint-shop product by default
        const productSlug = slug || 'paint-shop';
        const response = await fetchProductBySlug(productSlug);
        setProduct(response.data.data);
        setError(null);
      } catch (err) {
        console.error('Error loading product:', err);
        setError(err.response?.data?.message || 'Failed to load product details');
        // Don't set error state, just log it - we'll use default content
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [slug]);

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

    setupObserver(introRef, 'intro');
    setupObserver(equipmentRef, 'equipment');
    setupObserver(ctaRef, 'cta');

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  // Equipment list data
  const equipmentList = [
    {
      id: 1,
      name: "Liquid Paint Booth",
      tag: "Downdraft · Semi-downdraft · Crossflow",
      slug: "/services/liquid-paint-booth"
    },
    {
      id: 2,
      name: "Wet & Dry Paint Booth",
      tag: "Water wash or dry filter — switchable configurations",
      slug: "/services/wet-dry-booth"
    },
    {
      id: 3,
      name: "Compact Paint Booth",
      tag: "Space-saving · Bench-top and walk-in designs",
      slug: "/services/compact-paint-booth"
    },
    {
      id: 4,
      name: "Bake Oven",
      tag: "Batch & continuous · 50–300°C · ±5°C uniformity",
      slug: "/services/bake-oven"
    },
    {
      id: 5,
      name: "Dry-off Oven",
      tag: "Post-pretreatment moisture removal · 80–150°C",
      slug: "/services/dry-off-oven"
    },
    {
      id: 6,
      name: "Pretreatment System",
      tag: "3–9 stages · Spray or immersion · SS or PP construction",
      slug: "/services/pretreatment-system"
    }
  ];

  // Industry applications
  const applications = [
    "Automotive OEM",
    "Agricultural machinery",
    "General fabrication",
    "Export projects"
  ];

  // Feature list
  const features = [
    "Custom-designed for your exact part geometries and volumes",
    "Energy-efficient oven and booth designs to reduce operating cost",
    "Modular, expandable layouts for future capacity growth",
    "PLC-controlled automation with touchscreen HMI",
    "Full commissioning support and operator training"
  ];

  return (
    <>
      {/* PAGE HERO */}
      <section className={styles.pageHero}>
        <div className={styles.container}>
          <div className={styles.pageHeroEyebrow}>
            <Link to="/">Home</Link> <span className={styles.sep}>/</span> 
            <Link to="/services">Services</Link> <span className={styles.sep}>/</span> 
            Paint Shop Systems
          </div>
          <h1 className={styles.pageTitle}>
            Paint Shop <span className={styles.accent}>Systems</span>
          </h1>
          <p className={styles.pageSubtitle}>
            {product?.shortDescription || 
              "Complete, integrated paint finishing lines — designed around your parts, your volumes, and your space. 50+ installations delivered."}
          </p>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div 
            ref={introRef}
            className={`${styles.introGrid} ${styles.fadeUp} ${isVisible.intro ? styles.fadeUpVisible : ''}`}
          >
            <div>
              <span className={styles.sectionEyebrow}>Integrated finishing</span>
              <h2 className={styles.sectionTitle}>
                End-to-end paint<br />finishing lines
              </h2>
              <p className={styles.sectionLead}>
                From pretreatment through curing, Burgeon designs and delivers fully integrated paint shop systems. Every component is sized, positioned, and controlled to work as one cohesive system — not a collection of separate machines.
              </p>
              <p className={styles.sectionLead}>
                Our designs prioritise energy efficiency, operator safety, coating quality, and minimal footprint — with PLC automation and modular layouts that can expand as your production grows.
              </p>
              <ul className={styles.featureList}>
                {features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className={styles.statsCard}>
              <div className={styles.statsNumber}>
                50<span>+</span>
              </div>
              <div className={styles.statsLabel}>Paint shop installations</div>
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

      {/* EQUIPMENT SECTION */}
      <section className={`${styles.section} ${styles.bgSurface}`}>
        <div className={styles.container}>
          <div 
            ref={equipmentRef}
            className={`${styles.productsHeader} ${styles.fadeUp} ${isVisible.equipment ? styles.fadeUpVisible : ''}`}
          >
            <span className={styles.sectionEyebrow}>Paint shop equipment</span>
            <h2 className={styles.sectionTitle}>All equipment we supply</h2>
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

      {/* CTA BAND */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div 
            ref={ctaRef}
            className={`${styles.ctaBand} ${styles.fadeUp} ${isVisible.cta ? styles.fadeUpVisible : ''}`}
          >
            <div className={styles.ctaBandPattern} aria-hidden="true"></div>
            <div>
              <h2 className={styles.ctaBandTitle}>Design your paint shop</h2>
              <p className={styles.ctaBandSub}>
                Tell us your parts, volumes, and space — we'll engineer the system.
              </p>
              <div style={{ marginTop: '32px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/contact" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`}>
                  Start planning →
                </Link>
                <Link to="/turnover" className={`${styles.btn} ${styles.btnOutline} ${styles.btnLg}`}>
                  See our installations
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
