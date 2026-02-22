import React from 'react';
import styles from './MarqueeStrip.module.css';

const MarqueeStrip = () => {
  return (
    <div className={styles.marqueeStrip} aria-hidden="true">
      <div className={styles.marqueeTrack}>
        {[...Array(2)].map((_, idx) => (
          <React.Fragment key={idx}>
            <span className={styles.marqueeItem}>Paint Shop Systems <span className={styles.sep}>✦</span></span>
            <span className={styles.marqueeItem}>CED / Cataphoretic Coating <span className={styles.sep}>✦</span></span>
            <span className={styles.marqueeItem}>Pretreatment Lines <span className={styles.sep}>✦</span></span>
            <span className={styles.marqueeItem}>Powder Coating Plants <span className={styles.sep}>✦</span></span>
            <span className={styles.marqueeItem}>Bake Ovens & Dry-off Ovens <span className={styles.sep}>✦</span></span>
            <span className={styles.marqueeItem}>Process & Utility Piping <span className={styles.sep}>✦</span></span>
            <span className={styles.marqueeItem}>Turnkey Industrial Systems <span className={styles.sep}>✦</span></span>
            <span className={styles.marqueeItem}>Sheet Metal Fabrication <span className={styles.sep}>✦</span></span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default MarqueeStrip;