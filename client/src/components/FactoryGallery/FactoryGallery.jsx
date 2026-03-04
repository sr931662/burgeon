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
      tag: "Industrial Ovens",
      title: "Curing & Drying Ovens",
      desc: "Heavy-duty industrial ovens designed for curing paint, powder coatings, and heat treatment processes with precise temperature control.",
      size: "wide",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=85&w=1200"
    },
    {
      id: 2,
      tag: "Material Handling",
      title: "Industrial Conveyor Systems",
      desc: "Overhead and floor-mounted conveyor systems engineered for reliable material handling in automated finishing and production lines.",
      size: "tall",
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=85&w=800"
    },
    {
      id: 3,
      tag: "Surface Preparation",
      title: "Industrial Washing Machines",
      desc: "Multi-stage component washing systems designed for degreasing, cleaning, and preparing metal parts before coating or finishing.",
      size: "standard",
      image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&q=85&w=800"
    },
    {
      id: 4,
      tag: "Paint Booth Systems",
      title: "Industrial Paint Booth",
      desc: "Precision-engineered paint booth systems ensuring uniform airflow, efficient filtration, and high-quality industrial coating results.",
      size: "standard",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=85&w=800"
    },
    {
      id: 5,
      tag: "Automation & Controls",
      title: "Electrical Control Panels",
      desc: "Custom-built industrial control panels for PLC automation, process monitoring, and reliable operation of automated manufacturing systems.",
      size: "standard",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=85&w=800"
    },
    {
      id: 6,
      tag: "Production Systems",
      title: "Conveyorised Painting Line",
      desc: "Complete automated finishing lines integrating washing, coating, curing ovens, and conveyor systems for high-volume production.",
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