import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroGridBg}></div>
      <div className={styles.container}>
        <div className={styles.heroInner}>
          <div className={styles.heroLeft}>
            <div className={styles.heroEyebrow}>
              <span className={styles.heroEyebrowDot}></span>
              Delivering Excellence Since 2015
            </div>
            <h1 className={styles.heroTitle}>
              <span className={styles.line}><span>Industrial</span></span>
              <span className={styles.line}><span><em style={{ fontStyle: 'normal', color: 'var(--accent-hi)' }}>precision</em></span></span>
              <span className={styles.line}><span>engineering</span></span>
            </h1>
            <p className={styles.heroDesc}>
              We design, fabricate, and integrate industrial automation systems including paint booths, industrial ovens, washing machines, and conveyorised painting lines for automotive and manufacturing industries.
            </p>
            <div className={styles.heroActions}>
              <Link to="/contact" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`}>
                Engineer your project
                <svg className={styles.btnIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link to="/services" className={`${styles.btn} ${styles.btnOutline} ${styles.btnLg}`}>
                Our services
              </Link>
            </div>
            <div className={styles.heroTags}>
              <span className={styles.heroTag}>Paint Booth Systems</span>
              <span className={styles.heroTag}>Industrial Ovens</span>
              <span className={styles.heroTag}>Industrial Washing Machines</span>
              <span className={styles.heroTag}>Powder Coating Lines</span>
              <span className={styles.heroTag}>Conveyor Systems</span>
              <span className={styles.heroTag}>Automation Solutions</span>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.heroStatsCard}>
              <div className={styles.statBlock}>
                <div className={styles.statNum}>3<span className={styles.plus}>+</span></div>
                <div className={styles.statLabel}>Manufacturing Units</div>
              </div>
              <div className={styles.statBlock}>
                <div className={styles.statNum}>22<span className={styles.plus}>+</span></div>
                <div className={styles.statLabel}>Years Engineering Expertise</div>
              </div>
              <div className={styles.statBlock}>
                <div className={styles.statNum}>2015</div>
                <div className={styles.statLabel}>Established</div>
              </div>
              <div className={styles.statBlock}>
                <div className={styles.statNum}>ISO</div>
                <div className={styles.statLabel}>9001:2015 Certified</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.scrollIndicator}>
        <span>scroll</span>
        <div className={styles.scrollLine}></div>
      </div>
    </section>
  );
};

export default Hero;