import { motion } from 'framer-motion';
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '../data/menuData';
import './Footer.css';

const hours = [
  { day: 'Mon – Fri', time: '7:00 AM – 10:00 PM' },
  { day: 'Saturday', time: '7:00 AM – 11:00 PM' },
  { day: 'Sunday', time: '8:00 AM – 11:00 PM' },
];

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-inner">
          {/* Brand */}
          <motion.div
            className="footer-brand"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="footer-logo">
              <div className="footer-logo-icon">🌸</div>
              <span className="footer-logo-text">MALLIGAI</span>
            </div>
            <p className="footer-tagline">
              Authentic South Indian premium dining. Every meal prepared with passion, served with warmth.
            </p>
            <div className="footer-socials">
              {[
                { icon: '📘', label: 'Facebook', href: '#' },
                { icon: '📸', label: 'Instagram', href: '#' },
                { icon: '🐦', label: 'Twitter', href: '#' },
                { icon: '▶️', label: 'YouTube', href: '#' },
              ].map((s) => (
                <a key={s.label} href={s.href} className="social-link" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="footer-col"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4>Quick Links</h4>
            <ul className="footer-links">
              {[
                { label: 'Home', href: '#home' },
                { label: 'Menu', href: '#menu' },
                { label: 'Signature Dishes', href: '#dishes' },
                { label: "Today's Specials", href: '#specials' },
                { label: 'Book a Table', href: '#booking' },
                { label: 'Rewards', href: '#loyalty' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  >
                    → {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Opening Hours */}
          <motion.div
            className="footer-col"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4>Opening Hours</h4>
            {hours.map((h) => (
              <div className="hours-row" key={h.day}>
                <span>{h.day}</span>
                <span>{h.time}</span>
              </div>
            ))}
            <div style={{ marginTop: 20 }}>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: '#25D366',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '999px',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
              >
                📱 Order in 30 secs
              </a>
            </div>
          </motion.div>

          {/* Contact + Map */}
          <motion.div
            className="footer-col"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4>Contact</h4>
            <div className="footer-contact-items">
              <div className="footer-contact-item">
                <span className="footer-contact-icon">📍</span>
                <span>Copper Creek Tirunelveli,<br />Tamil Nadu – 627006</span>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-icon">📞</span>
                <a href="tel:+919363060343">+91 93630 60343</a>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-icon">✉️</span>
                <a href="mailto:hello@malligai.in">hello@malligai.in</a>
              </div>
            </div>

            <div className="footer-map">
              <span>📍</span>
              <span>Copper Creek, Tirunelveli</span>
              <a
                href="https://maps.google.com/?q=Tirunelveli+Tamil+Nadu"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Google Maps →
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Malligai Restaurant. All rights reserved.</p>
          <div className="footer-bottom-right">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
