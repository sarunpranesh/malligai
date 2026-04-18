import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import SignatureDishes from '../components/SignatureDishes';
import SmartMenu from '../components/SmartMenu';
import TodaysSpecials from '../components/TodaysSpecials';
import TableBooking from '../components/TableBooking';
import LoyaltySystem from '../components/LoyaltySystem';
import Testimonials from '../components/Testimonials';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <SignatureDishes />
      <SmartMenu />
      <TodaysSpecials />
      <TableBooking />
      <LoyaltySystem />
      <Testimonials />
    </motion.div>
  );
}
