import React, { useEffect, useRef } from 'react';
import styles from './CountersSection.module.css';

const CountersSection = () => {
  const countersRef = useRef([]);

  useEffect(() => {
    const counters = countersRef.current;
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
            const numEl = el.querySelector(`.${styles.counter}`);
            if (numEl) {
              numEl.textContent = Math.round(eased * target);
            }
            if (progress < 1) {
              requestAnimationFrame(update);
            } else {
              if (numEl) numEl.textContent = target;
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
  }, []);

  return (
  <section className={`${styles.section} ${styles.bgSurface}`}>
    <div className={styles.container}>
      <div className={styles.countersRow}>
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
);
};

export default CountersSection;