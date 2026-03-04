import React, { useEffect, useRef, useState } from 'react';
import styles from './ProcessSection.module.css';

const ProcessSection = ({
  eyebrow = 'Our process',
  title = 'From concept to ',
  accentWord = 'commissioning',
  steps = [
    {
      number: '01',
      title: 'Consult & Engineering Design',
      description: 'Our engineering team studies your production requirements, component specifications, and plant layout to design efficient industrial systems tailored to your manufacturing process.',
    },
    {
      number: '02',
      title: 'Engineering & Fabrication',
      description: 'All equipment is engineered and fabricated using high-quality materials and precision manufacturing practices to ensure reliable performance and long service life.',
    },
    {
      number: '03',
      title: 'Installation & Commissioning',
      description: 'Our team manages on-site installation, system integration, and commissioning to ensure every machine and production line operates efficiently and safely.',
    },
    {
      number: '04',
      title: 'Service & Technical Support',
      description: 'We provide ongoing technical support, maintenance assistance, and system optimization to keep your production lines operating at peak efficiency.',
    },
  ]
}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className={`${styles.section} ${styles.bgSurface}`}
    >
      <div className={styles.container}>
        <div className={`${styles.fadeUp} ${isIntersecting ? styles.fadeUpActive : ''}`}>
          <span className={styles.sectionEyebrow}>{eyebrow}</span>
          <h2 className={styles.sectionTitle}>
            {title}
            <span className={styles.accent}>{accentWord}</span>
          </h2>
        </div>

        <div className={`${styles.processGrid} ${styles.fadeUp} ${isIntersecting ? styles.fadeUpActive : ''}`}>
          {steps.map((step, index) => (
            <div className={styles.processStep} key={index}>
              <div className={styles.processStepNum}>{step.number}</div>
              <div className={styles.processStepTitle}>{step.title}</div>
              <div className={styles.processStepDesc}>{step.description}</div>
              {/* Connector arrow - Hidden on small screens via CSS */}
              {index < steps.length - 1 && (
                <div className={styles.processConnector} aria-hidden="true">→</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;