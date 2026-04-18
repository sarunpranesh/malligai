import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext({});

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('malligai_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('malligai_cart', JSON.stringify(cartItems));
  }, [cartItems]);
  
  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        // Skip opening drawer if simply incrementing
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      
      // Open drawer on first fresh item addition
      setIsCartOpen(true);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCartItems((prev) => {
      const target = prev.find(i => i.id === id);
      if (target && target.quantity === 1 && delta === -1) {
        return prev.filter(i => i.id !== id);
      }
      return prev.map((i) => {
        if (i.id === id) {
          const newQty = i.quantity + delta;
          return { ...i, quantity: newQty > 0 ? newQty : 1 };
        }
        return i;
      });
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    toggleCart,
    cartTotal,
    cartCount,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
