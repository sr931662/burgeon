import React from 'react';
import styles from './FeaturedInstallation.module.css';

const FeaturedInstallation = ({
  eyebrow = 'Track record',
  title = 'Featured ',
  accentWord = 'installations',
  allProjectsLink = '/turnover.html',
  projects = [
    {
      year: '2025 · Delhi NCR',
      name: 'Automotive CED Plant',
      location: '50,000 L tank · Full pretreatment · Rectifier & controls',
    },
    {
      year: '2024 · Gujarat',
      name: 'Powder Coating Line',
      location: '6-stage pretreatment · Cartridge recovery booth · Curing oven',
    },
    {
      year: '2024 · Pune',
      name: 'Paint Shop Upgrade',
      location: '4 booths + curing ovens · Overhead conveyor integration',
    },
    {
      year: '2023 · Rajasthan',
      name: 'Utility Piping — Chemical Plant',
      location: 'SS316L & PPH piping · Steam & chemical dosing lines',
    },
    {
      year: '2023 · Haryana',
      name: '8-Stage Pretreatment Line',
      location: 'Full immersion · Zinc phosphate · DI water rinse',
    },
    {
      year: '2023 · Bangladesh (Export)',
      name: 'Complete Paint Shop',
      location: 'International turnkey delivery · Full commissioning',
    },
  ],
}) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header with eyebrow, title and "All projects" link */}
        <div className={styles.header}>
          <div>
            <span className={styles.eyebrow}>{eyebrow}</span>
            <h2 className={styles.title}>
              {title}
              <span className={styles.accent}>{accentWord}</span>
            </h2>
          </div>
          <a href={allProjectsLink} className={styles.btnOutline}>
            All projects →
          </a>
        </div>

        {/* Projects grid */}
        <div className={styles.grid}>
          {projects.map((project, index) => (
            <div className={styles.card} key={index}>
              <div className={styles.cardYear}>{project.year}</div>
              <div className={styles.cardName}>{project.name}</div>
              <div className={styles.cardLoc}>{project.location}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedInstallation;