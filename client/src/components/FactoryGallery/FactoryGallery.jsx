import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './FactoryGallery.module.css';

const FactoryGallery = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const galleryItems = [
    {
      id: 1,
      tag: "Fabrication",
      title: "CNC Laser Cutting",
      desc: "High‑precision sheet metal cutting with zero‑defect standards.",
      size: "large", // Left tall image
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      tag: "Assembly",
      title: "Paint Booth Assembly",
      desc: "Modular paint booth systems being assembled in‑house.",
      size: "standard",
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      tag: "Welding",
      title: "Robotic MIG Welding",
      desc: "Automated welding for consistent, high‑strength joints.",
      size: "standard",
      image: "https://industrialcoatingsltd.com/cdn/shop/files/spraying_paint_banner_image.jpg?v=1669201684&width=1500"
    },
    {
      id: 4,
      tag: "Quality",
      title: "In‑house QC Lab",
      desc: "Film thickness, adhesion, and corrosion testing.",
      size: "standard",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80"
    },
    {
      id: 5,
      tag: "Coating",
      title: "Powder Coating Line",
      desc: "High‑efficiency cartridge booth with cyclone recovery.",
      size: "standard",
      image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Industrial_oven.jpg"
    }
  ];

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.fadeUp : ''}`}>
          <div>
            <span className={styles.eyebrow}>Our Factory</span>
            <h2 className={styles.title}>WHERE PRECISION<br /><span className={styles.accent}>takes shape</span></h2>
          </div>
          <Link to="/factory" className={styles.viewAllBtn}>
            VIEW FACILITY
          </Link>
        </div>

        <div className={`${styles.grid} ${isVisible ? styles.fadeUp : ''}`} style={{ transitionDelay: '0.2s' }}>
          {galleryItems.map((item) => (
            <div 
              key={item.id} 
              className={`${styles.card} ${styles[item.size]}`}
            >
              <div className={styles.imageWrapper}>
                <img src={item.image} alt={item.title} className={styles.image} />
                <div className={styles.overlay}>
                  <div className={styles.content}>
                    <span className={styles.itemTag}>{item.tag}</span>
                    <h3 className={styles.itemTitle}>{item.title}</h3>
                    <p className={styles.itemDesc}>{item.desc}</p>
                    <Link to="/contact" className={styles.exploreLink}>Inquire about this →</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FactoryGallery;