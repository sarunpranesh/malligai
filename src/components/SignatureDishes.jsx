import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { signatureDishes } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Star, ChevronLeft, ChevronRight, X } from 'lucide-react';
import './SignatureDishes.css';

export default function SignatureDishes() {
  const [selectedDish, setSelectedDish] = useState(null);
  const trackRef = useRef(null);
  const { addToCart } = useCart();

  const scroll = (dir) => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: dir * 310, behavior: 'smooth' });
    }
  };

  return (
    <section className="signature-section" id="dishes">
      <div className="signature-header container">
        <motion.span
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Chef's Picks
        </motion.span>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Signature Dishes
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Handcrafted with the finest ingredients, these are the dishes that define Malligai.
        </motion.p>
      </div>

      <div className="signature-track-wrapper">
        <motion.div
          className="signature-track"
          ref={trackRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {signatureDishes.map((dish, i) => (
            <motion.div
              key={dish.id}
              className="dish-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              onClick={() => setSelectedDish(dish)}
            >
              <div className="dish-card-img-wrapper">
                <img src={dish.image} alt={dish.name} loading="lazy" />
                <span className="dish-tag">{dish.tag}</span>

                <div className="dish-card-overlay">
                  <button
                    className="dish-order-btn"
                    onClick={(e) => { e.stopPropagation(); addToCart(dish); }}
                  >
                    <ShoppingCart size={16} /> Add to Order
                  </button>
                </div>
              </div>

              <div className="dish-card-info">
                <div className="dish-card-name">{dish.name}</div>
                <div className="dish-card-meta">
                  <span className="dish-card-price">₹{dish.price}</span>
                  <span className="dish-card-rating">
                    <Star size={14} fill="currentColor" color="var(--gold)" /> {dish.rating} · {dish.orders}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="signature-arrows">
        <button className="arrow-btn" onClick={() => scroll(-1)} aria-label="Scroll left"><ChevronLeft size={24} /></button>
        <button className="arrow-btn" onClick={() => scroll(1)} aria-label="Scroll right"><ChevronRight size={24} /></button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedDish && (
          <motion.div
            className="dish-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDish(null)}
          >
            <motion.div
              className="dish-modal"
              initial={{ opacity: 0, scale: 0.88, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 30 }}
              transition={{ type: 'spring', stiffness: 280, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              style={{ position: 'relative' }}
            >
              <button className="dish-modal-close" onClick={() => setSelectedDish(null)}><X size={20} /></button>
              <img className="dish-modal-img" src={selectedDish.image} alt={selectedDish.name} />
              <div className="dish-modal-body">
                <div className="dish-modal-tag">{selectedDish.tag} · {selectedDish.orders}</div>
                <h3 className="dish-modal-name">{selectedDish.name}</h3>
                <p className="dish-modal-desc">{selectedDish.description}</p>
                <div className="dish-modal-footer">
                  <span className="dish-modal-price">₹{selectedDish.price}</span>
                  <button onClick={() => { addToCart(selectedDish); setSelectedDish(null); }} className="dish-modal-wa-btn" style={{ border: 'none', cursor: 'pointer' }}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
