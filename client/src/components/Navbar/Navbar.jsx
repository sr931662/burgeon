import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

// Logo image - replace with your actual logo path
import logoImg from '../../assets/images/logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial scroll position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  }, [location]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  // Service dropdown items
  const serviceItems = [
    { name: 'Conveyorised Painting Lines', path: '/services/conveyorised-painting-lines' },
    { name: 'Industrial Paint Booth Systems', path: '/services/industrial-paint-booth-systems' },
    { name: 'Industrial Washing Machines', path: '/services/industrial-washing-machines' },
    { name: 'Powder Coating Systems', path: '/services/powder-coating-systems' },
    { name: 'Industrial Ovens', path: '/services/industrial-ovens' },
    { name: 'SPM Machines', path: '/services/spm-machines' },
    { name: 'Industrial Conveyor Systems', path: '/services/industrial-conveyor-systems' },
    { name: 'Automation & Control Systems', path: '/services/automation-and-control-systems' },
    { name: 'Surface Treatment Lines', path: '/services/surface-treatment-lines' }
  ];
  // Mobile sub-menu items (condensed for mobile)
  const mobileServiceItems = [
    { name: 'Conveyorised Painting Lines', path: '/services/conveyorised-painting-lines' },
    { name: 'Industrial Paint Booth Systems', path: '/services/industrial-paint-booth-systems' },
    { name: 'Industrial Washing Machines', path: '/services/industrial-washing-machines' },
    { name: 'Powder Coating Systems', path: '/services/powder-coating-systems' },
    { name: 'Industrial Ovens', path: '/services/industrial-ovens' },
    { name: 'SPM Machines', path: '/services/spm-machines' },
    { name: 'Industrial Conveyor Systems', path: '/services/industrial-conveyor-systems' },
    { name: 'Automation & Control Systems', path: '/services/automation-and-control-systems' },
    { name: 'Surface Treatment Lines', path: '/services/surface-treatment-lines' }
  ];

  return (
    <>
      <header className={`${styles.siteHeader} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={`${styles.container} ${styles.headerInner}`}>
          {/* Logo */}
          <Link to="/" className={styles.logo}>
            <img src={logoImg} alt="Burgeon Engineering" className={styles.logoImg} />
            <span className={styles.logoText}>
              BURGEON
              <span className={styles.logoSub}>Engineering</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.mainNav} aria-label="Primary navigation">
            <ul>
              <li>
                <NavLink 
                  to="/" 
                  className={({ isActive }) => isActive ? styles.active : ''}
                  end
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/about" 
                  className={({ isActive }) => isActive ? styles.active : ''}
                >
                  About
                </NavLink>
              </li>
              <li className={styles.hasDropdown}>
                <NavLink 
                  to="/services" 
                  className={({ isActive }) => isActive ? styles.active : ''}
                >
                  Services
                </NavLink>
                <div className={styles.dropdown}>
                  {serviceItems.map((item, index) => (
                    /* ADDED: NavLink for active dropdown styling */
                    <NavLink 
                      key={index} 
                      to={item.path}
                      className={({ isActive }) => isActive ? styles.activeDropdownItem : ''}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </li>
              <li>
                <NavLink 
                  to="/factory" 
                  className={({ isActive }) => isActive ? styles.active : ''}
                >
                  Factory
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/turnover" 
                  className={({ isActive }) => isActive ? styles.active : ''}
                >
                  Turnover
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/contact" 
                  className={`${styles.navCta} ${({ isActive }) => isActive ? styles.active : ''}`}
                >
                  Contact us
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Hamburger Button */}
          <button 
            className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ''}`} 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu" 
            aria-expanded={isMobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.open : ''}`} aria-label="Mobile navigation">
        <ul>
          <li>
            <Link to="/" onClick={closeMobileMenu}>Home</Link>
          </li>
          <li>
            <Link to="/about" onClick={closeMobileMenu}>About</Link>
          </li>
          <li>
            <Link to="/services" onClick={closeMobileMenu}>Services</Link>
          </li>
          {/* Service sub-items */}
          {mobileServiceItems.map((item, index) => (
            <li key={index} className={styles.subItem}>
              {/* ADDED: NavLink for active mobile sub-item styling */}
              <NavLink 
                to={item.path} 
                onClick={closeMobileMenu}
                className={({ isActive }) => isActive ? styles.activeMobileSub : ''}
              >
                → {item.name}
              </NavLink>
            </li>
          ))}
          <li>
            <Link to="/factory" onClick={closeMobileMenu}>Factory</Link>
          </li>
          <li>
            <Link to="/turnover" onClick={closeMobileMenu}>Projects</Link>
          </li>
          <li>
            <Link to="/contact" onClick={closeMobileMenu}>Contact</Link>
          </li>
        </ul>
        <Link to="/contact" className={styles.mobileCta} onClick={closeMobileMenu}>
          Engineer your project →
        </Link>
      </nav>

      {/* Overlay for mobile menu (optional) */}
      {isMobileMenuOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 485,
            display: 'none'
          }}
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
};

export default Navbar;