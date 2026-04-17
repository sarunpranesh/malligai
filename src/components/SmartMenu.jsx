import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuCategories, menuItems, WHATSAPP_NUMBER } from '../data/menuData';
import './SmartMenu.css';

const tabIcons = {
  'Veg': '🥗',
  'Non-Veg': '🍗',
  'Tiffin': '🫓',
  'Beverages': '☕',
  'Desserts': '🍮',
};

export default function SmartMenu() {
  const [activeTab, setActiveTab] = useState('Veg');
  const [cart, setCart] = useState([]);
  const [addedItems, setAddedItems] = useState({});

  const handleAdd = (item) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1 }];
    });
    setAddedItems(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => setAddedItems(prev => ({ ...prev, [item.id]: false })), 1200);
  };

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const waMsg = () => {
    const lines = cart.map(i => `• ${i.name} ×${i.qty} = ₹${i.price * i.qty}`).join('\n');
    const msg = `Hi! I'd like to order from Malligai Restaurant:\n\n${lines}\n\nTotal: ₹${cartTotal}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section className="smart-menu-section" id="menu">
      <div className="container">
        <div className="smart-menu-header">
          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Explore Our Menu
          </motion.span>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Smart Menu
          </motion.h2>
          <motion.p
            className="section-subtitle"
            style={{ margin: '0 auto' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Browse by category. Add your favourites and order in 30 seconds.
          </motion.p>
        </div>

        {/* Tabs */}
        <div className="menu-tabs">
          {menuCategories.map((cat) => (
            <motion.button
              key={cat}
              className={`menu-tab${activeTab === cat ? ' active' : ''}`}
              onClick={() => setActiveTab(cat)}
              whileTap={{ scale: 0.95 }}
            >
              <span className="menu-tab-icon">{tabIcons[cat]}</span> {cat}
            </motion.button>
          ))}
        </div>

        {/* Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="menu-items-grid"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            {menuItems[activeTab].map((item, i) => (
              <motion.div
                key={item.id}
                className="menu-item-row"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07, duration: 0.35 }}
              >
                <img className="menu-item-img" src={item.image} alt={item.name} loading="lazy" />
                <div className="menu-item-info">
                  <div className="menu-item-badges">
                    {item.hot && <span className="badge badge-hot">🔥 Hot</span>}
                    {item.popular && <span className="badge badge-popular">⭐ Popular</span>}
                  </div>
                  <div className="menu-item-name">{item.name}</div>
                  <div className="menu-item-desc">{item.description}</div>
                </div>
                <div className="menu-item-right">
                  <span className="menu-item-price">₹{item.price}</span>
                  <motion.button
                    className={`menu-item-add${addedItems[item.id] ? ' added' : ''}`}
                    onClick={() => handleAdd(item)}
                    whileTap={{ scale: 0.9 }}
                  >
                    {addedItems[item.id] ? '✓ Added!' : 'ADD+'}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Cart Bar */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.div
            className="menu-cart-bar"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
          >
            <span>🛒 {cartCount} item{cartCount > 1 ? 's' : ''} · ₹{cartTotal}</span>
            <a href={waMsg()} target="_blank" rel="noopener noreferrer" className="cart-wa-btn">
              Order via WhatsApp →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
