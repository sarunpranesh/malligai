import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, LogOut, ChefHat, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const navLinks = [
  { label: 'Home', href: '#home', isAnchor: true },
  { label: 'Menu', href: '#menu', isAnchor: true },
  { label: 'Book Table', href: '#booking', isAnchor: true },
  { label: 'Rewards', href: '#loyalty', isAnchor: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount, toggleCart } = useCart();
  const { user, signOut } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60 || !isHomePage);
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const handleNavClick = (href, isAnchor) => {
    setMobileOpen(false);
    if (isAnchor && isHomePage) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        className={`navbar${scrolled || !isHomePage ? ' scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo" onClick={() => handleNavClick('#home', true)}>
            <div className="navbar-logo-icon"><ChefHat size={26} color="var(--gold)" /></div>
            <span className="navbar-logo-text">MALLIGAI</span>
          </Link>

          {/* Links */}
          <ul className="navbar-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                {link.isAnchor && isHomePage ? (
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href, true); }}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link to={`/${link.isAnchor ? link.href : ''}`}>
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Right Area (Cart & Auth) */}
          <div className="navbar-actions">
            <button className="nav-cart-btn" onClick={toggleCart}>
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <motion.span 
                  className="cart-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={cartCount}
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {user ? (
              <div className="nav-profile">
                <Link to="/profile" className="nav-profile-icon" style={{ textDecoration: 'none' }}>
                  {user.user_metadata?.full_name?.charAt(0).toUpperCase() || <User size={18} />}
                </Link>
                <button className="nav-logout-btn" onClick={signOut} aria-label="Sign Out">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn-nav-auth">
                Sign In
              </Link>
            )}

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
            <button className="mobile-close" onClick={() => setMobileOpen(false)}><X size={24} /></button>
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                {link.isAnchor && isHomePage ? (
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href, true); }}
                    className="mobile-link"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link to={`/${link.isAnchor ? link.href : ''}`} className="mobile-link" onClick={() => setMobileOpen(false)}>
                    {link.label}
                  </Link>
                )}
              </motion.div>
            ))}

            {user ? (
               <motion.button
                onClick={() => { signOut(); setMobileOpen(false); }}
                className="mobile-auth-btn"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Sign Out
              </motion.button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link to="/login" className="mobile-auth-btn" onClick={() => setMobileOpen(false)}>
                  Sign In
                </Link>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
