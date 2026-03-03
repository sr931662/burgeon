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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const galleryItems = [
    {
      id: 1,
      tag: "CNC Machining",
      title: "5‑Axis CNC Center",
      desc: "Precision machining of large structural components with ±0.01mm tolerance.",
      size: "wide",
      image: "https://i.ytimg.com/vi/CqePrbeAQoM/maxresdefault.jpg"
    },
    {
      id: 2,
      tag: "Welding",
      title: "Robotic MIG Station",
      desc: "Automated welding cells for consistent, high‑strength joints.",
      size: "tall",
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=85&w=800"
    },
    {
      id: 3,
      tag: "Fabrication",
      title: "Laser Cutting",
      desc: "Fiber laser cutting up to 25mm mild steel, 20mm stainless.",
      size: "standard",
      image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&q=85&w=800"
    },
    {
      id: 4,
      tag: "Assembly",
      title: "Paint Booth Build",
      desc: "Modular paint booth systems under final assembly.",
      size: "standard",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=85&w=800"
    },
    {
      id: 5,
      tag: "Quality",
      title: "CMM Inspection",
      desc: "Coordinate measuring machine for dimensional verification.",
      size: "standard",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=85&w=800"
    },
    {
      id: 6,
      tag: "Finishing",
      title: "Powder Coating Line",
      desc: "High‑efficiency cartridge booth with cyclone recovery.",
      size: "standard",
      image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&q=85&w=800"
    }
  ];

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.fadeUp : ''}`}>
          <div>
            <span className={styles.eyebrow}>Our Manufacturing Facility</span>
            <h2 className={styles.title}>
              WHERE PRECISION<br />
              <span className={styles.accent}>takes shape</span>
            </h2>
          </div>
          <Link to="/factory" className={styles.viewAllBtn}>
            EXPLORE FACILITY →
          </Link>
        </div>

        <div className={`${styles.grid} ${isVisible ? styles.fadeUpActive : ''}`}>
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className={`${styles.card} ${styles[item.size]}`}
              style={{ transitionDelay: `${0.1 * index}s` }}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.image}
                  loading="lazy"
                />
                <div className={styles.overlay}>
                  <div className={styles.content}>
                    <span className={styles.itemTag}>{item.tag}</span>
                    <h3 className={styles.itemTitle}>{item.title}</h3>
                    <p className={styles.itemDesc}>{item.desc}</p>
                    <Link to="/contact" className={styles.exploreLink}>
                      Request Technical Specs →
                    </Link>
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