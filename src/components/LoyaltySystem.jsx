import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { loyaltyService } from '../services/loyaltyService';
import { CakeSlice, TicketPercent, Coffee, Cookie, Gift, RefreshCw, PartyPopper, Check, Lock } from 'lucide-react';
import './LoyaltySystem.css';

const REWARDS = [
  { label: 'Free\nDessert', icon: <CakeSlice size={20} />, code: 'MLG-DESSERT' },
  { label: '10%\nOFF', icon: <TicketPercent size={20} />, code: 'MLG-10OFF' },
  { label: 'Free\nDrink', icon: <Coffee size={20} />, code: 'MLG-DRINK' },
  { label: 'Free\nVada', icon: <Cookie size={20} />, code: 'MLG-VADA' },
  { label: '15%\nOFF', icon: <Gift size={20} />, code: 'MLG-15OFF' },
  { label: 'Try\nAgain', icon: <RefreshCw size={20} />, code: null },
];

const MILESTONE = 4;

export default function LoyaltySystem() {
  const { user } = useAuth();
  const [spinning, setSpinning] = useState(false);
  const [spunOnce, setSpunOnce] = useState(false);
  const [reward, setReward] = useState(null);
  const [visits, setVisits] = useState(0);
  const [loading, setLoading] = useState(true);
  const controls = useAnimation();

  const UNLOCKED = visits >= MILESTONE;

  useEffect(() => {
    if (!user) {
      setLoading(false);
      setVisits(0);
      return;
    }
    loyaltyService.getLoyaltyState(user.id).then(data => {
      setVisits(data?.visits || 0);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [user]);

  const handleSpin = async () => {
    if (spinning || spunOnce || !UNLOCKED) return;
    setSpinning(true);
    const winIdx = Math.floor(Math.random() * (REWARDS.length - 1)); // avoid "Try Again" as guaranteed win
    const degrees = 360 * 6 + (winIdx * 60) + 30; // 6 full spins + land on segment
    await controls.start({
      rotate: degrees,
      transition: { duration: 4.5, ease: [0.17, 0.67, 0.24, 1] },
    });
    setSpinning(false);
    setSpunOnce(true);
    setReward(REWARDS[winIdx]);
  };

  const progressPct = Math.min((visits / MILESTONE) * 100, 100);

  return (
    <section className="loyalty-section" id="loyalty">
      <div className="container">
        <div className="loyalty-inner">
          {/* Left */}
          <motion.div
            className="loyalty-left"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Member Rewards</span>
            <h2 className="section-title">Malligai Rewards</h2>
            <p className="section-subtitle" style={{ marginBottom: 32 }}>
              Every visit counts. Unlock exclusive rewards, discounts, and free treats as you keep coming back.
            </p>

            <div className="loyalty-status-card">
              {/* Visit Counter */}
              <div className="loyalty-visits">
                {loading ? <div className="loyalty-visits-badge">...</div> : <div className="loyalty-visits-badge">{visits}</div>}
                <div className="loyalty-visits-text">
                  <h4>You've Visited {visits} Times!</h4>
                  <p>
                    {!user ? "Sign in to track your visits!" : UNLOCKED
                      ? <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><PartyPopper size={16} /> Spin the wheel to claim your reward!</span>
                      : `${MILESTONE - visits} more visit${MILESTONE - visits > 1 ? 's' : ''} to unlock FREE DESSERT!`}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="loyalty-progress-wrapper">
                <div className="loyalty-progress-track">
                  <motion.div
                    className="loyalty-progress-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${progressPct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
                  />
                </div>
                <div className="loyalty-progress-labels">
                  <span>0 visits</span>
                  <span>1 visit</span>
                  <span>2 visits</span>
                  <span style={{ color: UNLOCKED ? 'var(--gold)' : undefined, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {MILESTONE} visits <Gift size={14} />
                  </span>
                </div>
              </div>

              {UNLOCKED && (
                <div className="loyalty-milestone-text" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <PartyPopper size={16} /> Milestone reached! Spin the wheel to claim your surprise reward!
                </div>
              )}
            </div>

            {/* Rewards */}
            <div className="loyalty-rewards">
              {[
                { icon: <CakeSlice size={16} />, label: 'Free Dessert', earned: visits >= 2 },
                { icon: <TicketPercent size={16} />, label: '10% OFF', earned: visits >= 3 },
                { icon: <Coffee size={16} />, label: 'Free Drink', earned: UNLOCKED },
              ].map((r) => (
                <div key={r.label} className={`loyalty-reward-pill ${r.earned ? 'earned' : 'locked'}`}>
                  <span className="reward-icon" style={{ display: 'flex', alignItems: 'center' }}>{r.icon}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {r.earned ? <Check size={14} /> : <Lock size={14} />} {r.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right – Spin Wheel */}
          <motion.div
            className="loyalty-right"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="spin-wheel-wrapper">
              <span className="spin-pointer">▼</span>
              <motion.div className="spin-wheel" animate={controls}>
                {REWARDS.map((seg, i) => (
                  <div
                    key={i}
                    className="spin-segment-label"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${i * 60 + 30}deg) translateY(-90px) translateX(-30px)`,
                    }}
                  >
                    <span style={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>{seg.icon}</span>
                    {seg.label.split('\n').map((l, li) => <span key={li} style={{ display: 'block', fontSize: '0.65rem' }}>{l}</span>)}
                  </div>
                ))}
              </motion.div>
              <button
                className="spin-center-btn"
                onClick={handleSpin}
                disabled={spinning || spunOnce || !UNLOCKED}
              >
                {spunOnce ? 'CLAIMED!' : spinning ? '...' : 'SPIN'}
              </button>

              {!user ? (
                <div className="spin-locked-overlay">
                  <Lock size={28} />
                  <p>Sign In to unlock rewards</p>
                </div>
              ) : !UNLOCKED && (
                <div className="spin-locked-overlay">
                  <Lock size={28} />
                  <p>Visit {MILESTONE - visits} more time{MILESTONE - visits > 1 ? 's' : ''} to unlock</p>
                </div>
              )}
            </div>

            <div style={{ textAlign: 'center' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: 260 }}>
                {UNLOCKED ? (
                  <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}>
                    Spin the wheel to reveal your exclusive reward! <Gift size={16} />
                  </span>
                ) : `Visit ${MILESTONE} times to unlock the spin wheel and win exciting rewards!`}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Reward Modal */}
      <AnimatePresence>
        {reward && (
          <motion.div
            className="reward-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setReward(null)}
          >
            <motion.div
              className="reward-modal"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="reward-modal-icon">{reward.icon}</span>
              <h3>You Won!</h3>
              <p>Congratulations! You've unlocked <strong>{reward.label.replace('\n', ' ')}</strong>. Show this code at the counter to redeem.</p>
              {reward.code && <span className="reward-code">{reward.code}</span>}
              <button className="reward-close-btn" onClick={() => setReward(null)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <PartyPopper size={18} /> Awesome, Thanks!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
