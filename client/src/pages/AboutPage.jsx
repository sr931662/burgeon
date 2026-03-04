import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './About.module.css';
import managingdirector from '../assets/images/MD.png'

// Icon URLs from the HTML
const targetIcon = "https://cdn-icons-png.flaticon.com/512/1040/1040244.png";
const microscopeIcon = "https://cdn-icons-png.flaticon.com/512/2942/2942800.png";
const handshakeIcon = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState({
    counters: false,
    story: false,
    cta: false
  });
  
  const countersRef = useRef(null);
  const storyRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Page load reveal
    setTimeout(() => document.body.classList.add('loaded'), 50);
  }, []);

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

    setupObserver(countersRef, 'counters');
    setupObserver(storyRef, 'story');
    setupObserver(ctaRef, 'cta');

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  // Vision tiles data
  const visionTiles = [
    {
      icon: targetIcon,
      title: "Management Vision",
      description: "To achieve total customer satisfaction by understanding client requirements and delivering engineering solutions with the highest value addition while building long-term trusted partnerships."
    },
    {
      icon: microscopeIcon,
      title: "Business Vision",
      description: "To be a trusted leader in the design, engineering, fabrication, and integration of industrial machines by adopting global standards and advanced technologies."
    },
    {
      icon: handshakeIcon,
      title: "Company Policy",
      description: "All projects are executed with strict safety practices, quality assurance, and continuous improvement to ensure reliable performance and customer satisfaction."
    }
  ];

  // Certifications data
  const certifications = [
    {
      title: "ISO 9001:2015",
      description: "Quality Management System Certification"
    },
    {
      title: "Industrial Safety Standards",
      description: "Equipment designed with strict safety practices"
    },
    {
      title: "Process Quality Assurance",
      description: "Continuous quality control across engineering and manufacturing"
    }
  ];

  return (
    <>
      {/* PAGE HERO */}
      <section className={styles.pageHero}>
        <div className={styles.container}>
          <div className={styles.pageHeroEyebrow}>
            <Link to="/">Home</Link> <span className={styles.sep}>/</span> About
          </div>
          <h1 className={styles.pageTitle}>
            Engineering precision<br /><span className={styles.accent}>since 2015</span>
          </h1>
          <p className={styles.pageSubtitle}>
            A fast-growing engineering organization specializing in industrial automation systems, paint finishing equipment, and surface treatment solutions. We deliver reliable, high-performance production systems tailored to the needs of modern manufacturing industries.
          </p>
        </div>
      </section>

      {/* COUNTERS SECTION (STATIC CONTENT) */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div 
            ref={countersRef}
            className={`${styles.countersRow} ${styles.fadeUp} ${isVisible.counters ? styles.fadeUpVisible : ''}`}
          >
            <div className={styles.counterCell}>
              <div className={styles.counterVal}>
                <span className={styles.counter}>3</span><span className={styles.suf}>+</span>
              </div>
              <div className={styles.counterLbl}>Manufacturing Units</div>
            </div>

            <div className={styles.counterCell}>
              <div className={styles.counterVal}>
                <span className={styles.counter}>22</span><span className={styles.suf}>+</span>
              </div>
              <div className={styles.counterLbl}>Years of Engineering Expertise</div>
            </div>

            <div className={styles.counterCell}>
              <div className={styles.counterVal}>
                <span className={styles.counter}>20</span><span className={styles.suf}>+</span>
              </div>
              <div className={styles.counterLbl}>Major Industrial Clients</div>
            </div>

            <div className={styles.counterCell}>
              <div className={styles.counterVal}>
                <span className={styles.counter}>2015</span>
              </div>
              <div className={styles.counterLbl}>Delivering Excellence Since</div>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS SECTION */}
      <section className={`${styles.section} ${styles.bgSurface}`}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Certifications & Compliance</h2>
          <p className={styles.sectionLead}>
            Our engineering and manufacturing processes follow strict quality management standards to ensure reliable performance, safety, and long-term operational efficiency.
          </p>
          <div className={styles.projectsGrid}>
            {certifications.map((cert, index) => (
              <div key={index} className={styles.projectCard}>
                <div className={styles.projectCardName}>{cert.title}</div>
                <div className={styles.projectCardLoc}>{cert.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY & VISION SECTION */}
      <section className={`${styles.section} ${styles.bgSurface}`}>
        <div className={styles.container}>
          <div 
            ref={storyRef}
            className={`${styles.storyGrid} ${styles.fadeUp} ${isVisible.story ? styles.fadeUpVisible : ''}`}
          >
            {/* Left Column - Story */}
            <div>
              <span className={styles.sectionEyebrow}>Our story</span>
              <h2 className={styles.sectionTitle} style={{ marginTop: '16px', marginBottom: '28px' }}>
                Company with tradition
              </h2>
              <p className={styles.sectionLead} style={{ marginBottom: '20px' }}>
                Burgeon Engineering Pvt. Ltd. is a fast-growing engineering organization delivering cost-effective and customized industrial solutions for modern manufacturing facilities.
              </p>

              <p className={styles.sectionLead} style={{ marginBottom: '20px' }}>
                With more than 22 years of engineering expertise within our team, we specialize in the design, fabrication, and integration of industrial automation systems including ovens, paint booths, washing machines, and conveyorised production lines.
              </p>

              <p className={styles.sectionLead}>
                Our commitment is to deliver reliable equipment, superior performance, and complete turnkey solutions — executed safely, efficiently, and on schedule.
              </p>
            </div>

            {/* Right Column - Vision Tiles */}
            <div>
              <div className={styles.visionGrid}>
                {visionTiles.map((tile, index) => (
                  <div key={index} className={styles.visionTile}>
                    <div className={styles.visionTileIcon}>
                      <img src={tile.icon} alt={tile.title} />
                    </div>
                    <div className={styles.visionTileName}>{tile.title}</div>
                    <div className={styles.visionTileDesc}>{tile.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP SECTION */}
      <section className={styles.section}>
        <div className={`${styles.container} ${styles.fadeUp} ${isVisible.story ? styles.fadeUpVisible : ''}`}>
          <span className={styles.sectionEyebrow}>Leadership</span>
          <h2 className={styles.sectionTitle} style={{ marginTop: '16px', marginBottom: '48px' }}>
            The team behind the work
          </h2>
          <div className={styles.leadershipGrid}>

            {/* Managing Director */}
            <div className={styles.leaderCard}>
              <div className={styles.leaderPhoto}>
                <img src={managingdirector} alt="Mr. Amit Arora" />
              </div>

              <div className={styles.leaderInfo}>
                <div className={styles.leaderRole}>Managing Director</div>

                <h3 className={styles.leaderName}>Mr. Amit Arora</h3>

                <p className={styles.leaderDesc}>
                  Experienced industrial engineering professional with deep expertise in
                  paint finishing systems, automation equipment, and turnkey manufacturing
                  line integration.
                </p>

                <a
                  href="mailto:amit@burgeonengineering.com"
                  className={styles.leaderEmail}
                >
                  amit@burgeonengineering.com
                </a>
              </div>
            </div>


            {/* Director */}
            <div className={styles.leaderCard}>
              <div className={styles.leaderPhoto}>
                <img
                  src="https://ui-avatars.com/api/?name=Atul+Kumar&size=400&background=fbbf24&color=000&bold=true"
                  alt="Mr. Atul Kumar"
                />
              </div>

              <div className={styles.leaderInfo}>
                <div className={styles.leaderRole}>Director</div>

                <h3 className={styles.leaderName}>Mr. Atul Kumar</h3>

                <p className={styles.leaderDesc}>
                  Specialist in pretreatment and industrial finishing systems.
                  Oversees technical engineering, fabrication coordination,
                  and full project delivery from design to commissioning.
                </p>

                <a
                  href="mailto:atul@burgeonengineering.com"
                  className={styles.leaderEmail}
                >
                  atul@burgeonengineering.com
                </a>
              </div>
            </div>

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
              <h2 className={styles.ctaBandTitle}>Let's work together</h2>
              <p className={styles.ctaBandSub}>Schedule a consultation with our engineering team.</p>
              <div style={{ marginTop: '32px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/contact" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`}>
                  Contact us →
                </Link>
                <Link to="/factory" className={`${styles.btn} ${styles.btnOutline} ${styles.btnLg}`}>
                  Tour our factory
                </Link>
              </div>
            </div>
            <div className={styles.ctaBandActions}>
              <div className={styles.ctaContactItem}>
                📞 <a href="tel:+918527754455">+91 8527754455</a>
              </div>
              <div className={styles.ctaContactItem}>
                📞 <a href="tel:+919999688621">+91 9999688621</a>
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

export default AboutPage;