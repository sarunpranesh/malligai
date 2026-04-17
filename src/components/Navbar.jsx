import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '../data/menuData';
import './Navbar.css';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '#menu' },
  { label: 'Book Table', href: '#booking' },
  { label: 'Rewards', href: '#loyalty' },
  { label: 'Contact', href: '#footer' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        className={`navbar${scrolled ? ' scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="navbar-inner">
          {/* Logo */}
          <a href="#home" className="navbar-logo" onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}>
            <div className="navbar-logo-icon">🌸</div>
            <span className="navbar-logo-text">MALLIGAI</span>
          </a>

          {/* Links */}
          <ul className="navbar-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="navbar-cta">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-nav-cta"
            >
              Order Online
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="navbar-hamburger"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu open"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <button className="mobile-close" onClick={() => setMobileOpen(false)}>✕</button>
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginTop: 24, backgroundColor: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.4)', borderRadius: '999px', padding: '12px 40px', fontSize: '1rem' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Order Online
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
