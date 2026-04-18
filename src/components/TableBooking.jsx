import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { timeSlots } from '../data/menuData';
import { useAuth } from '../context/AuthContext';
import { bookingService } from '../services/bookingService';
import { PartyPopper, Zap, Coffee, CalendarPlus, Gift, Lock, Calendar as CalendarIcon, X } from 'lucide-react';
import './TableBooking.css';

const today = new Date().toISOString().split('T')[0];

export default function TableBooking() {
  const [date, setDate] = useState(today);
  const [timeSlot, setTimeSlot] = useState('');
  const [guests, setGuests] = useState(2);
  const [phone, setPhone] = useState('');
  const [booked, setBooked] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { user } = useAuth();

  const handleBook = async (e) => {
    e.preventDefault();
    if (!date || !timeSlot || !phone) return;
    if (!user) {
      setError('You must be signed in to reserve a table.');
      return;
    }
    
    const userName = user?.user_metadata?.full_name || 'Guest';
    
    setLoading(true);
    setError(null);

    const ref = 'MLG-' + Math.random().toString(36).substring(2, 7).toUpperCase();

    try {
      await bookingService.reserveTable(user.id, {
        date,
        time: timeSlot,
        guests,
        phone
      });

      setBookingRef(ref);
      setBooked(true);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to reserve table. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setBooked(false);
    setIsFormOpen(false);
    setPhone('');
    setDate(today);
    setTimeSlot('');
    setGuests(2);
  };

  return (
    <section className="booking-section" id="booking">
      <div className="container">
        <div className="booking-inner">
          {/* Left */}
          <motion.div
            className="booking-left"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Reserve Your Table</span>
            <h2 className="section-title">Book a Table,<br />Skip the Wait</h2>
            <p className="section-subtitle" style={{ marginBottom: 28 }}>
              Secure your spot at Malligai and enjoy a premium South Indian dining experience.
              Book now and receive an exclusive 5% discount on your meal.
            </p>
            <div className="booking-perks">
              {[
                [<PartyPopper size={20} color="var(--gold)" />, '5% discount on booking online'],
                [<Zap size={20} color="var(--gold)" />, 'Instant confirmation, no waiting'],
                [<Coffee size={20} color="var(--gold)" />, 'Complimentary filter coffee on arrival'],
                [<CalendarPlus size={20} color="var(--gold)" />, 'Reserved seating guaranteed'],
              ].map(([icon, text]) => (
                <div className="booking-perk" key={text}>
                  <span className="booking-perk-icon">{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right – Form */}
          <motion.div
            className="booking-form-card"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <AnimatePresence mode="wait">
              {!booked ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="booking-offer-banner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <Gift size={20} /> Book now &amp; get <strong>5% OFF</strong> your entire bill!
                  </div>
                  {!user ? (
                    <div style={{ textAlign: 'center', padding: '40px 20px', background: 'var(--jasmine)', borderRadius: 'var(--radius-md)' }}>
                      <Lock size={48} color="var(--gold)" style={{ margin: '0 auto 16px' }} />
                      <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--green-deep)', marginBottom: '12px' }}>Sign In Required</h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px' }}>
                        To secure your table and unlock exclusive discounts, please log in to your Malligai account.
                      </p>
                      <a href="/login" className="btn btn-primary" style={{ width: '100%', textDecoration: 'none' }}>
                        Go to Sign In
                      </a>
                    </div>
                  ) : !isFormOpen ? (
                    <div style={{ textAlign: 'center', padding: '40px 20px', background: 'var(--jasmine)', borderRadius: 'var(--radius-md)' }}>
                      <CalendarIcon size={48} color="var(--gold)" style={{ margin: '0 auto 16px' }} />
                      <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--green-deep)', marginBottom: '12px' }}>Ready to Book?</h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px' }}>
                        Welcome back, {user?.user_metadata?.full_name || 'Guest'}! Select a time and date below.
                      </p>
                      <button onClick={() => setIsFormOpen(true)} className="btn btn-primary" style={{ width: '100%' }}>
                        Book a Table
                      </button>
                    </div>
                  ) : (
                  <form className="booking-form" onSubmit={handleBook}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <h3 style={{ margin: 0, fontFamily: 'var(--font-serif)', color: 'var(--green-deep)' }}>Booking Details</h3>
                      <button type="button" onClick={() => setIsFormOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        <X size={24} />
                      </button>
                    </div>
                    {error && (
                      <div style={{ color: '#FF4444', marginBottom: 16, fontSize: '0.9rem' }}>
                        {error}
                      </div>
                    )}
                    <div className="booking-field">
                      <label>Phone Number</label>
                      <input
                        className="booking-input"
                        type="tel"
                        placeholder="+91 00000 00000"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        required
                      />
                    </div>
                    <div className="booking-field">
                      <label>Select Date</label>
                      <input
                        className="booking-input"
                        type="date"
                        value={date}
                        min={today}
                        onChange={e => setDate(e.target.value)}
                        required
                      />
                    </div>
                    <div className="booking-field">
                      <label>Time Slot</label>
                      <div className="time-slots">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            className={`time-slot-btn${timeSlot === slot ? ' active' : ''}`}
                            onClick={() => setTimeSlot(slot)}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="booking-field">
                      <label>Number of Guests</label>
                      <div className="guest-counter">
                        <button
                          type="button"
                          className="guest-btn"
                          onClick={() => setGuests(g => Math.max(1, g - 1))}
                        >−</button>
                        <span className="guest-count">{guests}</span>
                        <button
                          type="button"
                          className="guest-btn"
                          onClick={() => setGuests(g => Math.min(20, g + 1))}
                        >+</button>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                          guests
                        </span>
                      </div>
                    </div>
                    <motion.button
                      className="booking-submit-btn"
                      type="submit"
                      whileTap={{ scale: 0.97 }}
                      disabled={loading || !timeSlot}
                    >
                      {loading ? 'Confirming...' : <><CalendarPlus size={18} className="inline mr-2" /> Confirm Booking</>}
                    </motion.button>
                  </form>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  className="booking-success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                >
                  <PartyPopper size={48} color="var(--gold)" style={{ margin: '0 auto 16px' }} />
                  <h3>Table Booked!</h3>
                  <p>
                    Thanks, <strong>{user?.user_metadata?.full_name || 'Guest'}</strong>! Your table for <strong>{guests}</strong>{' '}
                    is reserved on <strong>{date}</strong> at <strong>{timeSlot}</strong>.
                    <br />Show this code at the counter for your 5% discount.
                  </p>
                  <div className="booking-success-code">{bookingRef}</div>
                  <br />
                  <button className="booking-submit-btn" onClick={reset}>
                    Book Another Table
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
