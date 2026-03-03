import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Turnover.module.css';

// Professional CDN Icon URLs
const autoIcon = "https://cdn-icons-png.flaticon.com/512/3202/3202926.png";
const agriIcon = "https://cdn-icons-png.flaticon.com/512/2760/2760333.png";
const fabIcon = "https://cdn-icons-png.flaticon.com/512/2954/2954893.png";
const chemIcon = "https://cdn-icons-png.flaticon.com/512/2954/2954813.png";
const exportIcon = "https://cdn-icons-png.flaticon.com/512/2942/2942852.png";

const Turnover = () => {
  const [isVisible, setIsVisible] = useState({
    counters: false,
    projects: false,
    industries: false,
    cta: false
  });
  
  const countersRef = useRef(null);
  const projectsRef = useRef(null);
  const industriesRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    setTimeout(() => document.body.classList.add('loaded'), 50);
  }, []);

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
    setupObserver(projectsRef, 'projects');
    setupObserver(industriesRef, 'industries');
    setupObserver(ctaRef, 'cta');

    return () => observers.forEach(observer => observer.disconnect());
  }, []);

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
    counters.forEach(c => c && counterIO.observe(c));
    return () => counters.forEach(c => c && counterIO.unobserve(c));
  }, [isVisible.counters]);

  const projects = [
    {
      year: "2025 · Delhi NCR",
      title: "Automotive CED Plant",
      description: "50,000 L cataphoretic bath · Full 7-stage pretreatment · DC rectifier system · PLC automation · Curing oven"
    },
    {
      year: "2024 · Gujarat",
      title: "Powder Coating Line",
      description: "6-stage pretreatment tunnel · High-efficiency cartridge recovery booth · Gas-fired curing oven · Overhead conveyor"
    },
    {
      year: "2024 · Pune",
      title: "Paint Shop Upgrade",
      description: "4 downdraft paint booths · 2 batch bake ovens · Dry-off oven · Conveyor integration · PLC master control"
    },
    {
      year: "2023 · Rajasthan",
      title: "Utility Piping — Chemical Plant",
      description: "SS316L process piping · PPH chemical lines · Steam and condensate system · Pressure-tested and commissioned"
    },
    {
      year: "2023 · Haryana",
      title: "8-Stage Pretreatment Line",
      description: "Full immersion tunnel · Zinc phosphate · Chromate-free passivation · DI water final rinse · Automated dosing"
    },
    {
      year: "2023 · Bangladesh",
      title: "Export: Complete Paint Shop",
      description: "International turnkey delivery · Pretreatment + booths + ovens · Full site commissioning and operator training"
    },
    {
      year: "2023 · Maharashtra",
      title: "Agricultural Equipment Finishing",
      description: "5-stage spray pretreatment · 2 wet/dry booths · Continuous bake oven · Power-and-free overhead conveyor"
    },
    {
      year: "2022 · Punjab",
      title: "Powder Coating Booth Retrofit",
      description: "Cyclone recovery system upgrade · Reduced colour change time from 45 to 15 minutes · 98%+ recovery efficiency"
    },
    {
      year: "2022 · Uttar Pradesh",
      title: "CED Equipment Upgrade",
      description: "New DC rectifier installation · UF membrane system replacement · PLC control system upgrade · Recommissioning"
    }
  ];

  const industries = [
    { icon: autoIcon, title: "Automotive OEM & Tier 1", description: "Chassis, body components, suspension parts, brackets" },
    { icon: agriIcon, title: "Agricultural Machinery", description: "Tractors, implements, structural components" },
    { icon: fabIcon, title: "General Metal Fabrication", description: "Enclosures, panels, structural steel, sheet metal" },
    { icon: chemIcon, title: "Chemical & Process Plants", description: "Utility piping, chemical-resistant systems" },
    { icon: exportIcon, title: "International Export Projects", description: "Bangladesh, Middle East, Southeast Asia — complete turnkey delivery" }
  ];

  return (
    <>
      <section className={styles.pageHero}>
        <div className={styles.container}>
          <div className={styles.pageHeroEyebrow}>
            <Link to="/">Home</Link> <span className={styles.sep}>/</span> Projects
          </div>
          <h1 className={styles.pageTitle}>
            Delivered &amp; <span className={styles.accent}>commissioned</span>
          </h1>
          <p className={styles.pageSubtitle}>
            500+ industrial systems delivered across India and 20+ states. Every project listed below was designed, fabricated, installed, and commissioned by our team.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div ref={countersRef} className={`${styles.countersRow} ${styles.fadeUp} ${isVisible.counters ? styles.fadeUpVisible : ''}`}>
            <div className={styles.counterCell}>
              <div className={styles.counterVal}>
                <span className={styles.counter} data-target="500">0</span><span className={styles.suf}>+</span>
              </div>
              <div className={styles.counterLbl}>Projects delivered</div>
            </div>
            <div className={styles.counterCell}>
              <div className={styles.counterVal}>
                <span className={styles.counter} data-target="45">0</span><span className={styles.suf}>+</span>
              </div>
              <div className={styles.counterLbl}>Repeat clients</div>
            </div>
            <div className={styles.counterCell}>
              <div className={styles.counterVal}>
                <span className={styles.counter} data-target="20">0</span>
              </div>
              <div className={styles.counterLbl}>States Served</div>
            </div>
            <div className={styles.counterCell}>
              <div className={styles.counterVal}>
                <span className={styles.counter} data-target="9">0</span><span className={styles.suf}>+</span>
              </div>
              <div className={styles.counterLbl}>Years of delivery</div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.bgSurface}`}>
        <div className={styles.container}>
          <div ref={projectsRef} className={`${styles.fadeUp} ${isVisible.projects ? styles.fadeUpVisible : ''}`} style={{ marginBottom: '48px' }}>
            <span className={styles.sectionEyebrow}>Track record</span>
            <h2 className={styles.sectionTitle}>Featured <span className={styles.accent}>installations</span></h2>
          </div>
          <div className={`${styles.projectsGrid} ${styles.fadeUp} ${isVisible.projects ? styles.fadeUpVisible : ''}`}>
            {projects.map((project, index) => (
              <div key={index} className={styles.projectCard}>
                <div className={styles.projectCardYear}>{project.year}</div>
                <div className={styles.projectCardName}>{project.title}</div>
                <div className={styles.projectCardLoc}>{project.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div ref={industriesRef} className={`${styles.fadeUp} ${isVisible.industries ? styles.fadeUpVisible : ''}`}>
            <span className={styles.sectionEyebrow}>Industries served</span>
            <h2 className={styles.sectionTitle} style={{ marginTop: '16px', marginBottom: '40px' }}>Who we work with</h2>
          </div>
          <div className={`${styles.productsList} ${styles.fadeUp} ${isVisible.industries ? styles.fadeUpVisible : ''}`}>
            {industries.map((industry, index) => (
              <div key={index} className={styles.productRow} style={{ pointerEvents: 'none' }}>
                <div className={styles.productRowNum}>
                  <img src={industry.icon} alt={industry.title} className={styles.industryIcon} />
                </div>
                <div>
                  <div className={styles.productRowName}>{industry.title}</div>
                  <div className={styles.productRowTag}>{industry.description}</div>
                </div>
                <div className={styles.productRowArrow} style={{ color: 'var(--accent-hi)' }}>✓</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div ref={ctaRef} className={`${styles.ctaBand} ${styles.fadeUp} ${isVisible.cta ? styles.fadeUpVisible : ''}`}>
            <div className={styles.ctaBandPattern} aria-hidden="true"></div>
            <div>
              <h2 className={styles.ctaBandTitle}>Start your project journey</h2>
              <p className={styles.ctaBandSub}>Client references available on request. Let's add your project to this list.</p>
              <div style={{ marginTop: '32px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/contact" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`}>Contact us →</Link>
                <Link to="/services" className={`${styles.btn} ${styles.btnOutline} ${styles.btnLg}`}>Our services</Link>
              </div>
            </div>
            <div className={styles.ctaBandActions}>
              <div className={styles.ctaContactItem}>📞 <a href="tel:+918527754455">+91 8527754455</a></div>
              <div className={styles.ctaContactItem}>📞 <a href="tel:+919999688621">+91 9999688621</a></div>
              <div className={styles.ctaContactItem}>✉️ <a href="mailto:info@burgeonengineering.com">info@burgeonengineering.com</a></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Turnover;