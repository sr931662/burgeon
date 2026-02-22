import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './About.module.css';

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

  // Animated counters
  useEffect(() => {
    if (!isVisible.counters) return;

    const counters = document.querySelectorAll(`.${styles.counter}`);
    const counterIO = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          const duration = 1800;
          const start = performance.now();

          const update = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out quad
            const eased = 1 - (1 - progress) * (1 - progress);
            el.textContent = Math.round(eased * target);
            if (progress < 1) {
              requestAnimationFrame(update);
            } else {
              el.textContent = target;
            }
          };

          requestAnimationFrame(update);
          counterIO.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(c => {
      if (c) counterIO.observe(c);
    });

    return () => {
      counters.forEach(c => {
        if (c) counterIO.unobserve(c);
      });
    };
  }, [isVisible.counters]);

  // Vision tiles data
  const visionTiles = [
    {
      icon: targetIcon,
      title: "Management Vision",
      description: "Total satisfaction of customers by understanding their requirements, delivering with highest value addition possible — establishing strong, long-standing relations for mutual benefit."
    },
    {
      icon: microscopeIcon,
      title: "Business Vision",
      description: "Design engineering and manufacturing of high-end products by adopting global standards. Zero-defect products, on time — with continuous improvement in all areas of operations."
    },
    {
      icon: handshakeIcon,
      title: "Company Policy",
      description: "Safety and environment compliance, high respect and trust among all members, and working in harmony — contributing to the society and providing joy to all employees."
    }
  ];

  // Certifications data
  const certifications = [
    {
      title: "ISO 9001:2015",
      description: "Quality Management System"
    },
    {
      title: "CE Ready Systems",
      description: "European Compliance Ready"
    },
    {
      title: "Environmental Compliance",
      description: "Emission & Waste Standards"
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
            A fast-growing industrial systems firm driven by experienced professionals. We exist to deliver world-class paint finishing and surface treatment systems — cost-effectively and on time.
          </p>
        </div>
      </section>

      {/* COUNTERS SECTION */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div 
            ref={countersRef}
            className={`${styles.countersRow} ${styles.fadeUp} ${isVisible.counters ? styles.fadeUpVisible : ''}`}
          >
            <div className={styles.counterCell}>
              <div className={styles.counterVal}>
                <span className={styles.counter} data-target="500">0</span><span className={styles.suf}>+</span>
              </div>
              <div className={styles.counterLbl}>Projects completed</div>
            </div>
            <div className={styles.counterCell}>
              <div className={styles.counterVal}>
                <span className={styles.counter} data-target="45">0</span><span className={styles.suf}>+</span>
              </div>
              <div className={styles.counterLbl}>Specialist engineers</div>
            </div>
            <div className={styles.counterCell}>
              <div className={styles.counterVal}>
                <span className={styles.counter} data-target="12">0</span>
              </div>
              <div className={styles.counterLbl}>Countries served</div>
            </div>
            <div className={styles.counterCell}>
              <div className={styles.counterVal}>
                <span className={styles.counter} data-target="9">0</span><span className={styles.suf}>+</span>
              </div>
              <div className={styles.counterLbl}>Years of excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS SECTION */}
      <section className={`${styles.section} ${styles.bgSurface}`}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Certifications & Compliance</h2>
          <p className={styles.sectionLead}>
            All systems are engineered following ISO quality standards and industrial safety regulations.
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
                We are a fast-growing organization driven by experienced professionals providing cost-effective and customized solutions to meet our clients' requirements.
              </p>
              <p className={styles.sectionLead} style={{ marginBottom: '20px' }}>
                Our team has rich experience in the paint shop industry of more than 18 years. We've built our reputation on three pillars: safety, quality, and on-time delivery.
              </p>
              <p className={styles.sectionLead}>
                Our vision is to deliver quality work with the best performance of equipment — every single project, without exception.
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
            {/* Kunal Kapoor */}
            <div className={styles.leaderCard}>
              <div className={styles.leaderImage}>
                <img 
                  src="https://ui-avatars.com/api/?name=Kunal+Kapoor&size=200&background=2b8c3e&color=fff&bold=true" 
                  alt="Kunal Kapoor" 
                />
              </div>
              <div className={styles.leaderContent}>
                <div className={styles.leaderYear}>Director</div>
                <div className={styles.leaderName}>Kunal Kapoor</div>
                <div className={styles.leaderDesc}>
                  18+ years in industrial finishing systems. Specialist in CED plants and complete paint shop design.
                </div>
                <div className={styles.leaderEmail}>
                  <a href="mailto:kunalkapoor@burgeonengineering.com">kunalkapoor@burgeonengineering.com</a>
                </div>
              </div>
            </div>

            {/* Rajeev Mehta */}
            <div className={styles.leaderCard}>
              <div className={styles.leaderImage}>
                <img 
                  src="https://ui-avatars.com/api/?name=Rajeev+Mehta&size=200&background=fbbf24&color=000&bold=true" 
                  alt="Rajeev Mehta" 
                />
              </div>
              <div className={styles.leaderContent}>
                <div className={styles.leaderYear}>Head of Engineering</div>
                <div className={styles.leaderName}>Rajeev Mehta</div>
                <div className={styles.leaderDesc}>
                  Specialist in pretreatment and CED plant design. Oversees all technical project delivery from fabrication through commissioning.
                </div>
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