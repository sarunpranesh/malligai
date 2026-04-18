import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/orderService';
import { useState } from 'react';
import { WHATSAPP_NUMBER } from '../data/menuData';
import './CartDrawer.css';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState(null);

  const handleCheckout = async () => {
    if (!user) {
      setCheckoutMessage({ type: 'error', text: 'Sign in to checkout.' });
      return;
    }
    
    setIsCheckingOut(true);
    setCheckoutMessage(null);

    try {
      await orderService.placeOrder(user.id, cartItems, cartTotal);

      // Upgrade WhatsApp message
      const userName = user.user_metadata?.full_name || 'Customer';
      const lines = cartItems.map(i => `▫️ *${i.name}* (x${i.quantity}) - ₹${i.price * i.quantity}`).join('\n');
      const msg = `Hi Malligai! I'd like to place an order:\n\n${lines}\n\n*Total:* ₹${cartTotal}\n\n*Customer:* ${userName} (${user.email})\n*Status:* Pending Online`;
      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

      window.open(waUrl, '_blank');

      clearCart();
      setCheckoutMessage({ type: 'success', text: 'Opening WhatsApp to confirm...' });
      setTimeout(() => {
        setIsCartOpen(false);
        setCheckoutMessage(null);
      }, 3000);
    } catch (err) {
      console.error(err);
      setCheckoutMessage({ type: 'error', text: err.message || 'Failed to place order.' });
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            className="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div
            className="cart-drawer glass-card-white"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="cart-header">
              <h2>Your Cart</h2>
              <button className="cart-close" onClick={() => setIsCartOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="cart-body">
              {cartItems.length === 0 ? (
                <div className="cart-empty">
                  <ShoppingBag size={52} className="empty-icon" />
                  <h3>Your cart is empty</h3>
                  <p>Add delicious dishes from our menu to get started.</p>
                  <button className="btn btn-primary" style={{marginTop: 8}} onClick={() => setIsCartOpen(false)}>
                    Browse Menu
                  </button>
                </div>
              ) : (
                <div className="cart-items">
                  {cartItems.map((item) => (
                    <motion.div layout key={item.id} className="cart-item">
                      <img src={item.image || item.img} alt={item.name} className="cart-item-img" />
                      <div className="cart-item-details">
                        <h4>{item.name}</h4>
                        <div className="cart-item-price">₹{item.price}</div>
                        <div className="cart-item-controls">
                          <button onClick={() => updateQuantity(item.id, -1)}><Minus size={16} /></button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)}><Plus size={16} /></button>
                        </div>
                      </div>
                      <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>
                        <X size={20} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total">
                  <span>Total</span>
                  <span>₹{cartTotal}</span>
                </div>
                {checkoutMessage && (
                  <div className={`checkout-msg ${checkoutMessage.type}`}>
                    {checkoutMessage.text}
                  </div>
                )}
                <button
                  className="btn btn-primary cart-checkout-btn"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? 'Processing...' : 'Checkout'}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
