import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

// Import logo image
import logoImg from '../../assets/images/logo.png';

// Icon URLs (matching the HTML)
const phoneIcon = "https://cdn-icons-png.flaticon.com/512/724/724664.png";
const emailIcon = "https://cdn-icons-png.flaticon.com/512/732/732200.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.siteFooter}>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          {/* Brand Column */}
          <div className={styles.footerBrand}>
            <Link to="/" className={styles.logo}>
              <img src={logoImg} alt="Burgeon Engineering" className={styles.logoImg} />
              <span className={styles.logoText}>
                BURGEON<span className={styles.logoDot}>.</span>
                <span className={styles.logoSub}>Engineering</span>
              </span>
            </Link>
            <p className={styles.footerDesc}>
              Burgeon Engineering designs and manufactures industrial finishing systems including paint shops, powder coating lines, industrial ovens, washing machines, conveyors, and automation systems for modern manufacturing industries.
            </p>
            <div className={styles.footerContactMini}>
              <a href="tel:+918527754455">
                <img src={phoneIcon} alt="phone" className={styles.contactIcon} /> +91 8527754455
              </a>
              <a href="tel:+919999688621">
                <img src={phoneIcon} alt="phone" className={styles.contactIcon} /> +91 9999688621
              </a>
              <a href="mailto:info@burgeonengineering.com">
                <img src={emailIcon} alt="email" className={styles.contactIcon} /> info@burgeonengineering.com
              </a>
            </div>
          </div>

          {/* Products Column */}
          <div>
            <div className={styles.footerNavTitle}>Products</div>
            <ul className={styles.footerNavList}>
              <li>
                <Link to="/services/conveyorised-painting-lines">
                  Conveyorised Painting Lines
                </Link>
              </li>
              <li>
                <Link to="/services/industrial-paint-booth-systems">
                  Industrial Paint Booth Systems
                </Link>
              </li>
              <li>
                <Link to="/services/industrial-washing-machines">
                  Industrial Washing Machines
                </Link>
              </li>
              <li>
                <Link to="/services/powder-coating-systems">
                  Powder Coating Systems
                </Link>
              </li>
              <li>
                <Link to="/services/industrial-ovens">
                  Industrial Ovens
                </Link>
              </li>
            </ul>
          </div>

          {/* More Products Column */}
          <div>
            <div className={styles.footerNavTitle}>Engineering Systems</div>
            <ul className={styles.footerNavList}>
              <li>
                <Link to="/services/spm-machines">
                  SPM Machines
                </Link>
              </li>
              <li>
                <Link to="/services/industrial-conveyor-systems">
                  Industrial Conveyor Systems
                </Link>
              </li>
              <li>
                <Link to="/services/automation-and-control-systems">
                  Automation & Control Systems
                </Link>
              </li>
              <li>
                <Link to="/services/surface-treatment-lines">
                  Surface Treatment Lines
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Address Column */}
          <div>
            <div className={styles.footerNavTitle}>Company</div>
            <ul className={styles.footerNavList}>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/factory">Our Factory</Link></li>
              <li><Link to="/turnover">Projects</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
            
            <div className={styles.footerNavTitle} style={{ marginTop: '32px' }}>Address</div>
            <p className={styles.addressText}>
              1406, 14th Floor, 83 Metrostreet,<br />
              Sector-83, Gurugram – 122004,<br />
              Haryana, India
            </p>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={styles.container}>
        <div className={styles.footerBottom}>
          <span>© {currentYear} Burgeon Engineering Pvt. Ltd. All rights reserved.</span>
          <div className={styles.footerBottomLinks}>
            <Link to="/contact">Contact</Link>
            <Link to="/about">About</Link>
            <Link to="/turnover">Projects</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;