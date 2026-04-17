import { motion } from 'framer-motion';
import { todaysSpecials, WHATSAPP_NUMBER } from '../data/menuData';
import './TodaysSpecials.css';

export default function TodaysSpecials() {
  const waUrl = (sp) => {
    const msg = encodeURIComponent(`Hi! I'd like to grab the "${sp.name}" offer (₹${sp.offerPrice}) from Malligai Restaurant 🍛`);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
  };

  return (
    <section className="specials-section" id="specials">
      <div className="container">
        <div className="specials-header">
          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Limited Time
          </motion.span>
          <motion.h2
            className="section-title white"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Today's Specials
          </motion.h2>
          <motion.p
            className="section-subtitle"
            style={{ color: 'rgba(255,255,255,0.65)', margin: '0 auto' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Exclusive combos and offers available for a limited time only. Don't miss out!
          </motion.p>
        </div>

        <div className="specials-grid">
          {todaysSpecials.map((sp, i) => (
            <motion.div
              key={sp.id}
              className="special-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.14, duration: 0.55 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="special-card-img-wrapper">
                <img className="special-card-img" src={sp.image} alt={sp.name} loading="lazy" />
                <div className="special-badges">
                  <motion.span
                    className={`badge badge-${sp.badge}`}
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    {sp.badgeLabel}
                  </motion.span>
                </div>
                <span className="special-discount-badge">{sp.discount}</span>
                <span className="special-valid">{sp.validUntil}</span>
              </div>
              <div className="special-card-body">
                <h3 className="special-card-name">{sp.name}</h3>
                <p className="special-card-desc">{sp.description}</p>
                <div className="special-card-pricing">
                  <span className="special-offer-price">₹{sp.offerPrice}</span>
                  <span className="special-original-price">₹{sp.originalPrice}</span>
                </div>
                <a href={waUrl(sp)} target="_blank" rel="noopener noreferrer" className="special-order-btn">
                  🛒 Grab This Deal
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
