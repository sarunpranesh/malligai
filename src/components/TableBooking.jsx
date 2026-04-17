import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { timeSlots } from '../data/menuData';
import './TableBooking.css';

const today = new Date().toISOString().split('T')[0];

export default function TableBooking() {
  const [date, setDate] = useState(today);
  const [timeSlot, setTimeSlot] = useState('');
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [booked, setBooked] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const handleBook = (e) => {
    e.preventDefault();
    if (!date || !timeSlot || !name) return;
    const ref = 'MLG-' + Math.random().toString(36).substring(2, 7).toUpperCase();
    setBookingRef(ref);
    setBooked(true);
  };

  const reset = () => {
    setBooked(false);
    setName('');
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
                ['🎉', '5% discount on booking online'],
                ['⚡', 'Instant confirmation, no waiting'],
                ['🌸', 'Complimentary filter coffee on arrival'],
                ['🪑', 'Reserved seating guaranteed'],
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
                  <div className="booking-offer-banner">
                    🎁 Book now &amp; get <strong style={{ marginLeft: 4 }}>5% OFF</strong> your entire bill!
                  </div>
                  <form className="booking-form" onSubmit={handleBook}>
                    <div className="booking-field">
                      <label>Your Name</label>
                      <input
                        className="booking-input"
                        type="text"
                        placeholder="e.g., Shankar Kumar"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="booking-field">
                      <label>Phone Number</label>
                      <input
                        className="booking-input"
                        type="tel"
                        placeholder="+91 00000 00000"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
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
                    >
                      🗓 Confirm Booking
                    </motion.button>
                  </form>
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
                  <span className="booking-success-icon">🎉</span>
                  <h3>Table Booked!</h3>
                  <p>
                    Thanks, <strong>{name}</strong>! Your table for <strong>{guests}</strong>{' '}
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
