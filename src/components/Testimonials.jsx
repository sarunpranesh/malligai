import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { testimonials } from '../data/menuData';
import './Testimonials.css';

export default function Testimonials() {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % testimonials.length;
        if (trackRef.current) {
          trackRef.current.scrollTo({ left: next * 364, behavior: 'smooth' });
        }
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (i) => {
    setActive(i);
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: i * 364, behavior: 'smooth' });
    }
  };

  return (
    <section className="testimonials-section" id="reviews">
      <div className="container testimonials-header">
        <motion.span
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Guest Reviews
        </motion.span>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          What Our Guests Say
        </motion.h2>
        <motion.p
          className="section-subtitle"
          style={{ margin: '0 auto' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Real stories from our guests who love Malligai.
        </motion.p>
      </div>

      <div className="testimonials-track-wrapper">
        <motion.div
          className="testimonials-track"
          ref={trackRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              className="testimonial-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
            >
              <div className="testimonial-quote">"</div>
              <div className="testimonial-stars">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <span key={si}>★</span>
                ))}
              </div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.initials}</div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-location">📍 {t.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Dots */}
      <div className="testimonials-dots">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`testimonial-dot${active === i ? ' active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to review ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
