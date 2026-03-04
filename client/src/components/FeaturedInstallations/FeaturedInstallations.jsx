import React from 'react';
import styles from './FeaturedInstallation.module.css';

const FeaturedInstallation = ({
  eyebrow = 'Track record',
  title = 'Featured ',
  accentWord = 'installations',
  allProjectsLink = '/turnover',
  projects = [
    {
      year: '2025 · Haryana',
      name: 'Conveyorised Painting Line',
      location: 'Automated line for heavy components · Integrated washing, painting & curing systems',
    },
    {
      year: '2024 · Gujarat',
      name: 'Powder Coating System',
      location: 'Complete powder coating setup with spray booth, curing oven, and conveyor automation',
    },
    {
      year: '2024 · Pune',
      name: 'Industrial Paint Booth Installation',
      location: 'Robotic paint booth with controlled airflow and filtration systems',
    },
    {
      year: '2023 · Delhi NCR',
      name: 'Industrial Oven System',
      location: 'Electric heater type curing ovens for continuous production line operations',
    },
    {
      year: '2023 · Rajasthan',
      name: 'Industrial Washing Machine',
      location: 'Rotary and conveyorised washing system for metal component surface preparation',
    },
    {
      year: '2023 · Haryana',
      name: 'Automation & Conveyor System',
      location: 'Material handling conveyors with integrated control panels for automated production',
    },
  ]
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