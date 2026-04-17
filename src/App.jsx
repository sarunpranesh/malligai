import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SignatureDishes from './components/SignatureDishes';
import SmartMenu from './components/SmartMenu';
import TodaysSpecials from './components/TodaysSpecials';
import TableBooking from './components/TableBooking';
import LoyaltySystem from './components/LoyaltySystem';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import './App.css';

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-logo">🌸 MALLIGAI</div>
      <div className="loading-bar-wrapper">
        <div className="loading-bar" />
      </div>
      <div className="loading-subtitle">Fresh Flavours. Timeless Taste.</div>
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
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
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar />
          <Hero />
          <SignatureDishes />
          <SmartMenu />
          <TodaysSpecials />
          <TableBooking />
          <LoyaltySystem />
          <Testimonials />
          <Footer />
          <WhatsAppButton />
        </motion.main>
      )}
    </>
  );
}
