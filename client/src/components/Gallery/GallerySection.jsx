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
      tag: "Automotive",
      title: "CED Plant Installation",
      desc: "Full-scale 50,000L tank setup for major automotive OEM.",
      size: "large", // Left tall image
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      tag: "Fabrication",
      title: "Precision Sheet Metal",
      desc: "Custom CNC laser cut enclosures with zero-defect standards.",
      size: "standard",
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      tag: "Coating",
      title: "Powder Coating Line",
      desc: "Automated recovery booth for high-volume production efficiency.",
      size: "standard",
      image: "https://industrialcoatingsltd.com/cdn/shop/files/spraying_paint_banner_image.jpg?v=1669201684&width=1500"
    },
    {
      id: 4,
      tag: "Automation",
      title: "PLC Control Systems",
      desc: "Smart HMI integration for real-time process monitoring.",
      size: "standard",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80"
    },
    {
      id: 5,
      tag: "Energy",
      title: "Industrial Bake Ovens",
      desc: "Multi-zone curing systems with high-efficiency heat exchangers.",
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
