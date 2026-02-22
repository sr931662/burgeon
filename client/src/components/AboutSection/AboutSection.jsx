import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AboutSection.module.css';

// Icon components
const FactoryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 20L22 20" />
    <path d="M4 20L4 8L10 8L10 20" />
    <path d="M14 20L14 12L20 12L20 20" />
    <path d="M8 5L8 8" />
    <path d="M16 5L16 8" />
  </svg>
);

const GlobalIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12H22" />
    <path d="M12 2C14.5 4 16 7.5 16 12C16 16.5 14.5 20 12 22C9.5 20 8 16.5 8 12C8 7.5 9.5 4 12 2Z" />
  </svg>
);

const EngineeringIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14.7 6.3C15.1 6.1 15.5 6 16 6C17.1 6 18 6.9 18 8C18 8.5 17.9 8.9 17.7 9.3" />
    <path d="M9.3 17.7C8.9 17.9 8.5 18 8 18C6.9 18 6 17.1 6 16C6 15.5 6.1 15.1 6.3 14.7" />
    <circle cx="12" cy="12" r="3" />
    <circle cx="12" cy="12" r="10" />
  </svg>
);

const QualityIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2L15.1 8.5L22 9.3L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.3L8.9 8.5L12 2Z" />
  </svg>
);

const AboutSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.introSection}>
          <div>
            <span className={styles.sectionEyebrow}>Who we are</span>
            <h2 className={styles.sectionTitle}>Built on<br />engineering depth</h2>
            <p className={styles.sectionLead}>Burgeon Engineering is a fast-growing industrial systems firm driven by experienced professionals. We deliver cost-effective, customized solutions that meet the most demanding client requirements in paint finishing and surface treatment.</p>
            <p className={styles.sectionLead}>Our team brings 18+ years of paint shop industry experience. Our vision: quality work, safety-first delivery, and on-time completion — every project, every time.</p>
            <div className={styles.yearPill}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              Delivering Excellence Since 2015
            </div>
            <br /><br />
            <Link to="/about" className={`${styles.btn} ${styles.btnOutline}`}>
              Our story
              <svg className={styles.btnIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className={styles.introTagStack}>
            <div className={styles.introTag}>
              <span className={styles.introTagIcon}><FactoryIcon /></span>
              <div className={styles.introTagText}>
                <strong>25,000 sq ft Factory</strong>
                <span>IMT Manesar, Gurgaon — fully equipped fabrication facility</span>
              </div>
            </div>
            <div className={styles.introTag}>
              <span className={styles.introTagIcon}><GlobalIcon /></span>
              <div className={styles.introTagText}>
                <strong>International Reach</strong>
                <span>Projects across India, Middle East, Southeast Asia, Bangladesh</span>
              </div>
            </div>
            <div className={styles.introTag}>
              <span className={styles.introTagIcon}><EngineeringIcon /></span>
              <div className={styles.introTagText}>
                <strong>Turnkey Capability</strong>
                <span>Design → Fabricate → Install → Commission → Support</span>
              </div>
            </div>
            <div className={styles.introTag}>
              <span className={styles.introTagIcon}><QualityIcon /></span>
              <div className={styles.introTagText}>
                <strong>Quality Assured</strong>
                <span>In-house QC lab, zero-defect production standards</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;