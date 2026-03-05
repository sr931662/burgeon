import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './FactoryGallery.module.css';
import oven1 from "../../assets/images/oven1.png"
import Bending from '../../assets/images/bending-machine.png'
import LCM from '../../assets/images/LCM.png'
import Shearing from '../../assets/images/shearing.png'
import Notch from '../../assets/images/notch.png'
import Facility from '../../assets/images/facility.png'
import Duct from '../../assets/images/duct.png'
import Heavy from '../../assets/images/heavy.png'
import Expansion from '../../assets/images/expansion.png'


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
      tag: "Factory Assembly",
      title: "Booth & Oven Assembly Area",
      desc: "Dedicated assembly section where industrial paint booths, curing ovens, and finishing systems are assembled and tested before installation.",
      size: "wide",
      image: oven1
    },
    {
      id: 2,
      tag: "CNC Fabrication",
      title: "CNC Bending Machine",
      desc: "High-precision CNC bending machines used for forming sheet metal components required in paint booths, ducting systems, and enclosures.",
      size: "tall",
      image: Bending
    },
    {
      id: 3,
      tag: "Metal Processing",
      title: "Laser Cutting Machine",
      desc: "Advanced laser cutting technology enabling accurate and efficient cutting of industrial sheet metal parts for fabrication and assembly.",
      size: "standard",
      image: LCM
    },
    {
      id: 4,
      tag: "Fabrication",
      title: "Shearing Machine",
      desc: "Industrial shearing machines used for high-volume sheet metal cutting operations during fabrication of booths, ovens, and structures.",
      size: "standard",
      image: Shearing
    },
    {
      id: 5,
      tag: "Manufacturing",
      title: "Press, Welding & Notching",
      desc: "Fabrication equipment including press machines, welding stations, and notching tools used for structural and mechanical assembly.",
      size: "standard",
      image: Notch
    },
    {
      id: 6,
      tag: "Infrastructure",
      title: "Factory Manufacturing Floor",
      desc: "Modern fabrication and manufacturing facility designed for production of industrial automation equipment and paint shop systems.",
      size: "standard",
      image: Facility
    },
    {
      id: 7,
      tag: "Manufacturing Facility",
      title: "Fabrication Workshop",
      desc: "Dedicated workshop area for fabrication of ducts, conveyors, enclosures, and structural components for industrial finishing lines.",
      size: "standard",
      image: Duct
    },
    {
      id: 8,
      tag: "Production Capability",
      title: "Heavy Equipment Fabrication",
      desc: "Production infrastructure supporting fabrication of large industrial equipment including ovens, paint booths, and conveyors.",
      size: "standard",
      image: Heavy
    },
    {
      id: 9,
      tag: "Facility Expansion",
      title: "Expansion of Factory Setup",
      desc: "Continuous expansion of manufacturing infrastructure to support growing demand for automation systems and finishing equipment.",
      size: "wide",
      image: Expansion
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