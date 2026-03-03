import React from 'react';
import styles from './ProductsList.module.css';

const ProductsList = ({
  eyebrow = 'Full product range',
  title = 'Every system we ',
  accentWord = 'deliver',
  products = [
    {
      href: '/services/liquid-paint-booth',
      number: '01',
      name: 'Liquid Paint Booth',
      tags: 'Downdraft · Semi-downdraft · Crossflow',
    },
    {
      href: '/services/wet-dry-booth.html',
      number: '02',
      name: 'Wet & Dry Paint Booth',
      tags: 'Water wash · Dry filter configurations',
    },
    {
      href: '/services/compact-paint-booth.html',
      number: '03',
      name: 'Compact Paint Booth',
      tags: 'Space-saving · Modular · Bench-top or walk-in',
    },
    {
      href: '/services/bake-oven.html',
      number: '04',
      name: 'Industrial Bake Oven',
      tags: 'Batch & continuous · 50–300°C · Gas, electric, oil',
    },
    {
      href: '/services/dry-off-oven.html',
      number: '05',
      name: 'Dry-off Oven',
      tags: 'Post-pretreatment moisture removal · 80–150°C',
    },
    {
      href: '/services/pretreatment-system.html',
      number: '06',
      name: 'Pretreatment System',
      tags: '3–9 stages · Spray or immersion',
    },
    {
      href: '/services/ced-plant.html',
      number: '07',
      name: 'CED Plant',
      tags: 'Cataphoretic coating · 5,000–50,000L · 15–30μm film',
    },
    {
      href: '/services/ed-equipment.html',
      number: '08',
      name: 'ED Equipment',
      tags: 'Rectifiers · UF modules · Anodes · Heat exchangers',
    },
    {
      href: '/services/powder-coating-plant.html',
      number: '09',
      name: 'Powder Coating Plant',
      tags: 'Complete turnkey line · Pretreatment to curing',
    },
    {
      href: '/services/powder-coating-booth.html',
      number: '10',
      name: 'Powder Coating Booth',
      tags: 'Cartridge & cyclone recovery · >98% efficiency',
    },
    {
      href: '/services/component-washing-machine.html',
      number: '11',
      name: 'Component Washing Machine',
      tags: 'Spray · Immersion · Ultrasonic · Rotating basket',
    },
    {
      href: '/services/utility-process-piping.html',
      number: '12',
      name: 'Utility & Process Piping',
      tags: 'Paint circulation · Compressed air · Steam · Chemical lines',
    },
  ],
}) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2 className={styles.title}>
            {title}
            <span className={styles.accent}>{accentWord}</span>
          </h2>
        </div>

        {/* Products list */}
        <div className={styles.productsList}>
          {products.map((product, index) => (
            <a
              key={index}
              href={product.href}
              className={styles.productRow}
            >
              <div className={styles.productRowNum}>{product.number}</div>
              <div>
                <div className={styles.productRowName}>{product.name}</div>
                <div className={styles.productRowTag}>{product.tags}</div>
              </div>
              <div className={styles.productRowArrow}>→</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsList;