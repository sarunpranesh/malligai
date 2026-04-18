import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProfileDashboard from './pages/ProfileDashboard';
import { ChefHat } from 'lucide-react';
import './App.css';

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <ChefHat size={40} color="var(--gold)" /> MALLIGAI
      </div>
      <div className="loading-bar-wrapper">
        <div className="loading-bar" />
      </div>
      <div className="loading-subtitle">Fresh Flavours. Timeless Taste.</div>
    </div>
  );
}

// A component to handle scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AnimatePresence>
            {loading && (
              <motion.div
                key="loader"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                <LoadingScreen />
              </motion.div>
            )}
          </AnimatePresence>

          {!loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Navbar />
              <CartDrawer />
              
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/profile" element={<ProfileDashboard />} />
                </Routes>
              </main>

              <Footer />
              <WhatsAppButton />
            </motion.div>
          )}
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
