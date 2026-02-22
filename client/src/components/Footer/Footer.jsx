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
              Precision industrial finishing systems. Delivered across India and 12 countries since 2015.
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
              <li><Link to="/liquid-paint-booth">Liquid Paint Booth</Link></li>
              <li><Link to="/wet-dry-booth">Wet & Dry Booth</Link></li>
              <li><Link to="/pretreatment-system">Pretreatment System</Link></li>
              <li><Link to="/ced-plant">CED Plant</Link></li>
              <li><Link to="/powder-coating-plant">Powder Coating Plant</Link></li>
            </ul>
          </div>

          {/* More Products Column */}
          <div>
            <div className={styles.footerNavTitle}>More Products</div>
            <ul className={styles.footerNavList}>
              <li><Link to="/bake-oven">Bake Oven</Link></li>
              <li><Link to="/dry-off-oven">Dry-off Oven</Link></li>
              <li><Link to="/compact-paint-booth">Compact Paint Booth</Link></li>
              <li><Link to="/component-washing-machine">Component Washing</Link></li>
              <li><Link to="/utility-process-piping">Utility Piping</Link></li>
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
              Unit No.-510, Eros Corporate Park,<br />
              Sector-2, NH-8 IMT Manesar,<br />
              Gurgaon-122052, India
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