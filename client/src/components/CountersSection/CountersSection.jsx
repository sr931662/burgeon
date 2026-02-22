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
          <div className={styles.counterCell} ref={el => countersRef.current[0] = el} data-target="500">
            <div className={styles.counterVal}>
              <span className={styles.counter}>0</span><span className={styles.suf}>+</span>
            </div>
            <div className={styles.counterLbl}>Projects Delivered</div>
          </div>
          <div className={styles.counterCell} ref={el => countersRef.current[1] = el} data-target="45">
            <div className={styles.counterVal}>
              <span className={styles.counter}>0</span><span className={styles.suf}>+</span>
            </div>
            <div className={styles.counterLbl}>Specialist Engineers</div>
          </div>
          <div className={styles.counterCell} ref={el => countersRef.current[2] = el} data-target="12">
            <div className={styles.counterVal}>
              <span className={styles.counter}>0</span>
            </div>
            <div className={styles.counterLbl}>Countries Served</div>
          </div>
          <div className={styles.counterCell} ref={el => countersRef.current[3] = el} data-target="9">
            <div className={styles.counterVal}>
              <span className={styles.counter}>0</span><span className={styles.suf}>+</span>
            </div>
            <div className={styles.counterLbl}>Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountersSection;