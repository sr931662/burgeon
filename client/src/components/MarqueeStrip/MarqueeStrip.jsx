import React from 'react';
import styles from './MarqueeStrip.module.css';

const MarqueeStrip = () => {
  return (
    <div className={styles.marqueeStrip} aria-hidden="true">
      <div className={styles.marqueeTrack}>
        {[...Array(2)].map((_, idx) => (
          <React.Fragment key={idx}>
            <span className={styles.marqueeItem}>Paint Booth Systems <span className={styles.sep}>✦</span></span>
            <span className={styles.marqueeItem}>Industrial Ovens <span className={styles.sep}>✦</span></span>
            <span className={styles.marqueeItem}>Industrial Washing Machines <span className={styles.sep}>✦</span></span>
            <span className={styles.marqueeItem}>Powder Coating Systems <span className={styles.sep}>✦</span></span>
            <span className={styles.marqueeItem}>Conveyorised Painting Lines <span className={styles.sep}>✦</span></span>
            <span className={styles.marqueeItem}>SPM Machines <span className={styles.sep}>✦</span></span>
            <span className={styles.marqueeItem}>Industrial Conveyor Systems <span className={styles.sep}>✦</span></span>
            <span className={styles.marqueeItem}>Automation Solutions <span className={styles.sep}>✦</span></span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default MarqueeStrip;