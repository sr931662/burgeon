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
      year: "2025 · Haryana",
      title: "Conveyorised Painting Line",
      description: "7-stage surface treatment · Power-and-free conveyor · Liquid paint booth · Gas-fired curing oven · PLC automation"
    },
    {
      year: "2025 · Gujarat",
      title: "Powder Coating System",
      description: "6-stage spray pretreatment · Cyclone powder recovery booth · Continuous curing oven · Overhead conveyor system"
    },
    {
      year: "2024 · Maharashtra",
      title: "Industrial Washing Machine",
      description: "Multi-stage component washing machine · Hot alkaline degreasing · High-pressure spray system · Closed-loop filtration"
    },
    {
      year: "2024 · Rajasthan",
      title: "Surface Treatment Line",
      description: "8-stage phosphating system · Spray tunnel · Chemical dosing automation · DI water rinse system"
    },
    {
      year: "2024 · Delhi NCR",
      title: "Industrial Conveyor System",
      description: "Overhead chain conveyor · Load capacity 500 kg per hanger · Variable speed drive · Integrated paint shop handling"
    },
    {
      year: "2023 · Punjab",
      title: "Industrial Oven Installation",
      description: "Gas-fired curing oven · Temperature uniformity ±5°C · Energy-efficient insulation · Automated temperature control"
    },
    {
      year: "2023 · Uttar Pradesh",
      title: "Automation & Control System",
      description: "PLC-based process control · HMI interface · Conveyor synchronization · Remote diagnostics capability"
    },
    {
      year: "2023 · Karnataka",
      title: "SPM Machine Development",
      description: "Custom special-purpose machine · Automated material handling · Precision control system · Integrated safety interlocks"
    },
    {
      year: "2022 · Export Project",
      title: "Complete Paint Shop Installation",
      description: "Pretreatment + paint booths + curing ovens · Conveyor integration · Full site commissioning and operator training"
    }
  ];

  const industries = [
    {
      icon: autoIcon,
      title: "Automotive OEM & Tier Suppliers",
      description: "Chassis parts, brackets, suspension components, structural assemblies"
    },
    {
      icon: agriIcon,
      title: "Agricultural Equipment",
      description: "Tractors, implements, heavy-duty fabricated components"
    },
    {
      icon: fabIcon,
      title: "General Engineering & Fabrication",
      description: "Electrical panels, sheet metal enclosures, structural fabrication"
    },
    {
      icon: chemIcon,
      title: "Industrial Manufacturing",
      description: "Production equipment, material handling systems, process machinery"
    },
    {
      icon: exportIcon,
      title: "Export & Turnkey Projects",
      description: "Complete finishing lines delivered with installation and commissioning support"
    }
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
            Industrial finishing systems delivered across automotive, fabrication, and heavy engineering sectors. From surface treatment lines to conveyorised paint shops — every project is engineered, installed, and commissioned by our team.
          </p>
        </div>
      </section>

      <section className={styles.section}>
  <div className={styles.container}>
    <div 
      ref={countersRef} 
      className={`${styles.countersRow} ${styles.fadeUp} ${isVisible.counters ? styles.fadeUpVisible : ''}`}
    >

      <div className={styles.counterCell}>
        <div className={styles.counterVal}>
          <span className={styles.counter} data-target="2015">0</span>
        </div>
        <div className={styles.counterLbl}>Operating since</div>
      </div>

      <div className={styles.counterCell}>
        <div className={styles.counterVal}>
          <span className={styles.counter} data-target="22">0</span>
          <span className={styles.suf}>+</span>
        </div>
        <div className={styles.counterLbl}>Years engineering experience</div>
      </div>

      <div className={styles.counterCell}>
        <div className={styles.counterVal}>
          <span className={styles.counter} data-target="9">0</span>
          <span className={styles.suf}>+</span>
        </div>
        <div className={styles.counterLbl}>Major industrial clients</div>
      </div>

      <div className={styles.counterCell}>
        <div className={styles.counterVal}>
          <span className={styles.counter} data-target="5">0</span>
          <span className={styles.suf}>+</span>
        </div>
        <div className={styles.counterLbl}>Core equipment categories</div>
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