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
              We design and manufacture complete surface treatment and coating systems — from pretreatment to final curing — engineered for automotive and industrial production lines.
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
              <span className={styles.heroTag}>Paint Booths</span>
              <span className={styles.heroTag}>CED Plants</span>
              <span className={styles.heroTag}>Pretreatment</span>
              <span className={styles.heroTag}>Powder Coating</span>
              <span className={styles.heroTag}>Process Piping</span>
              <span className={styles.heroTag}>Bake Ovens</span>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.heroStatsCard}>
              <div className={styles.statBlock}>
                <div className={styles.statNum}>500<span className={styles.plus}>+</span></div>
                <div className={styles.statLabel}>Projects Delivered</div>
              </div>
              <div className={styles.statBlock}>
                <div className={styles.statNum}>45<span className={styles.plus}>+</span></div>
                <div className={styles.statLabel}>Specialist Engineers</div>
              </div>
              <div className={styles.statBlock}>
                <div className={styles.statNum}>12</div>
                <div className={styles.statLabel}>Countries Served</div>
              </div>
              <div className={styles.statBlock}>
                <div className={styles.statNum}>9<span className={styles.plus}>+</span></div>
                <div className={styles.statLabel}>Years Experience</div>
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