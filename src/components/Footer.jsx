import { motion } from 'framer-motion';
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '../data/menuData';
import { ChefHat, ChevronRight, MapPin, Phone, Mail, Smartphone } from 'lucide-react';
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
              <div className="footer-logo-icon"><ChefHat size={32} color="var(--gold)" /></div>
              <span className="footer-logo-text">MALLIGAI</span>
            </div>
            <p className="footer-tagline">
              Authentic South Indian premium dining. Every meal prepared with passion, served with warmth.
            </p>
            <div className="footer-socials">
              {[
                { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>, label: 'Facebook', href: '#' },
                { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>, label: 'Instagram', href: '#' },
                { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>, label: 'Twitter', href: '#' },
                { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>, label: 'YouTube', href: '#' },
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
                    <ChevronRight size={14} style={{ display: 'inline', marginRight: '4px' }} /> {link.label}
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
                <Smartphone size={16} /> Order in 30 secs
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
                <span className="footer-contact-icon"><MapPin size={18} /></span>
                <span>Copper Creek Tirunelveli,<br />Tamil Nadu – 627006</span>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-icon"><Phone size={18} /></span>
                <a href="tel:+919363060343">+91 93630 60343</a>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-icon"><Mail size={18} /></span>
                <a href="mailto:hello@malligai.in">hello@malligai.in</a>
              </div>
            </div>

            <div className="footer-map">
              <span style={{ display: 'flex', alignItems: 'center' }}><MapPin size={18} /></span>
              <span>Copper Creek, Tirunelveli</span>
              <a
                href="https://maps.google.com/?q=Tirunelveli+Tamil+Nadu"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                Open in Google Maps <ChevronRight size={14} />
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
