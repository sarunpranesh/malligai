import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Leaf, Drumstick, Croissant, Coffee, CakeSlice, ArrowRight, Flame, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { menuCategories, menuItems } from '../data/menuData';
import './SmartMenu.css';

const tabIcons = {
  'Veg': <Leaf size={16} />,
  'Non-Veg': <Drumstick size={16} />,
  'Tiffin': <Croissant size={16} />,
  'Beverages': <Coffee size={16} />,
  'Desserts': <CakeSlice size={16} />,
};

export default function SmartMenu() {
  const [activeTab, setActiveTab] = useState('Veg');
  const [addedItems, setAddedItems] = useState({});
  const { addToCart, cartTotal, cartCount, toggleCart } = useCart();

  const handleAdd = (item) => {
    addToCart(item);
    setAddedItems(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => setAddedItems(prev => ({ ...prev, [item.id]: false })), 1200);
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
            Browse by category. Add your favourites and place your order.
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
                <img className="menu-item-img" src={item.image || item.img} alt={item.name} loading="lazy" />
                <div className="menu-item-info">
                  <div className="menu-item-badges">
                    {item.hot && <span className="badge badge-hot"><Flame size={12} className="inline mr-1" /> Hot</span>}
                    {item.popular && <span className="badge badge-popular"><Star size={12} fill="currentColor" className="inline mr-1" /> Popular</span>}
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
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
          >
            <div className="menu-cart-summary">
              <ShoppingBag size={20} />
              <span>{cartCount} item{cartCount > 1 ? 's' : ''} · ₹{cartTotal}</span>
            </div>
            <button className="cart-wa-btn" onClick={toggleCart} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              View Cart <ArrowRight size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
