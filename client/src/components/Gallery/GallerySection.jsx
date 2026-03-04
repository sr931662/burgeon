import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './GallerySection.module.css';

const GallerySection = () => {
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
      tag: "Production Lines",
      title: "Conveyorised Painting Line",
      desc: "Fully integrated painting line combining washing, coating, curing ovens, and automated material handling.",
      size: "large",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      tag: "Surface Treatment",
      title: "Industrial Washing System",
      desc: "Heavy-duty washing machines designed for effective cleaning and surface preparation of industrial components.",
      size: "standard",
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      tag: "Coating Systems",
      title: "Powder Coating Setup",
      desc: "Complete powder coating system with spray booths, curing ovens, and conveyorised production flow.",
      size: "standard",
      image: "https://industrialcoatingsltd.com/cdn/shop/files/spraying_paint_banner_image.jpg?v=1669201684&width=1500"
    },
    {
      id: 4,
      tag: "Automation",
      title: "Industrial Conveyor System",
      desc: "Material handling conveyors integrated with automated manufacturing lines for efficient production flow.",
      size: "standard",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80"
    },
    {
      id: 5,
      tag: "Thermal Systems",
      title: "Industrial Curing Ovens",
      desc: "Electric heater and IR lamp type ovens engineered for drying and curing processes in coating applications.",
      size: "standard",
      image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Industrial_oven.jpg"
    }
  ];

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.fadeUp : ''}`}>
          <div>
            <span className={styles.eyebrow}>Our Portfolio</span>
            <h2 className={styles.title}>PROJECTS THAT<br /><span className={styles.accent}>define precision</span></h2>
          </div>
          <Link to="/turnover" className={styles.viewAllBtn}>
            VIEW ALL PROJECTS
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
                    <Link to="/contact" className={styles.exploreLink}>Explore details →</Link>
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

export default GallerySection;
