import React, { useEffect, useRef, useState } from 'react';
import styles from './ProcessSection.module.css';

const ProcessSection = ({
  eyebrow = 'Our process',
  title = 'From concept to ',
  accentWord = 'commissioning',
  steps = [
    {
      number: '01',
      title: 'Consult & Design',
      description: 'Our engineers assess your part geometry, production volume, and space constraints to design the optimal system — no overengineering, no waste.',
    },
    {
      number: '02',
      title: 'Fabricate',
      description: 'Everything is fabricated in our 25,000 sq ft IMT Manesar facility. CNC cutting, press braking, MIG/TIG welding — all in-house with strict QC.',
    },
    {
      number: '03',
      title: 'Install & Commission',
      description: 'Our team handles full site installation, electrical integration, and commissioning. We don\'t leave until the system runs flawlessly.',
    },
    {
      number: '04',
      title: 'Support & AMC',
      description: 'Long-term Annual Maintenance Contracts and rapid-response support keep your production running at peak performance, year after year.',
    },
  ],
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