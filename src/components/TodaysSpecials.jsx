import { motion } from 'framer-motion';
import { todaysSpecials } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { ShoppingBag } from 'lucide-react';
import './TodaysSpecials.css';

export default function TodaysSpecials() {
  const { addToCart } = useCart();

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
                <button 
                  onClick={() => addToCart({ id: sp.id, name: sp.name, price: sp.offerPrice, image: sp.image })} 
                  className="special-order-btn" 
                  style={{ border: 'none', cursor: 'pointer', width: '100%' }}
                >
                  <ShoppingBag size={16} className="inline mr-2" /> Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
