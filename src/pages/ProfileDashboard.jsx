import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/orderService';
import { bookingService } from '../services/bookingService';
import { LogOut, MapPin, Package, Calendar } from 'lucide-react';
import './ProfileDashboard.css';

export default function ProfileDashboard() {
  const { user, profile, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    Promise.all([
      orderService.fetchUserOrders(user.id),
      bookingService.fetchUserBookings(user.id)
    ])
    .then(([fetchedOrders, fetchedBookings]) => {
      setOrders(fetchedOrders);
      setBookings(fetchedBookings);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [user]);

  if (!user) {
    return (
      <div className="dashboard-page auth-redirect-wrap">
        <h2>Please Sign In</h2>
        <a href="/login" className="btn btn-primary">Go to Login</a>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="container dashboard-container">
        
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-card">
            <div className="sidebar-profile">
              <div className="profile-avatar">
                {profile?.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
              </div>
              <h3>{profile?.name || 'Valued Customer'}</h3>
              <p>{user.email}</p>
            </div>

            <nav className="sidebar-nav">
              <button 
                className={activeTab === 'orders' ? 'active' : ''} 
                onClick={() => setActiveTab('orders')}
              >
                <Package size={18} /> My Orders
              </button>
              <button 
                className={activeTab === 'bookings' ? 'active' : ''} 
                onClick={() => setActiveTab('bookings')}
              >
                <Calendar size={18} /> Reservations
              </button>
              <button className="logout-btn" onClick={signOut}>
                <LogOut size={18} /> Sign Out
              </button>
            </nav>
          </div>
        </aside>

        {/* Content Area */}
        <main className="dashboard-content">
          <div className="dashboard-header">
            <h2>{activeTab === 'orders' ? 'Order History' : 'Reservations'}</h2>
          </div>

          <div className="dashboard-lists">
            {loading ? (
              <div className="loading-placeholder">Loading your data...</div>
            ) : (
              <AnimatePresence mode="wait">
                {activeTab === 'orders' && (
                  <motion.div 
                    key="orders"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {orders.length === 0 ? (
                      <div className="empty-state">
                        <Package size={48} opacity={0.3} />
                        <h3>No orders yet</h3>
                        <p>Looks like you haven't placed an online order.</p>
                        <a href="/#menu" className="btn btn-primary" style={{marginTop: 16}}>Explore Menu</a>
                      </div>
                    ) : (
                      orders.map(order => (
                        <div key={order.id} className="history-card">
                          <div className="history-header">
                            <span className="history-id">Order ID: {order.id.slice(0,8).toUpperCase()}</span>
                            <span className={`status-badge ${order.status === 'pending_whatsapp' ? 'pending' : ''}`}>
                              {order.status === 'pending_whatsapp' ? 'Pending' : order.status}
                            </span>
                          </div>
                          <div className="history-details">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="invoice-item">
                                {item.quantity}x {item.name}
                              </div>
                            ))}
                          </div>
                          <div className="history-footer">
                            <span className="date-stamp">{new Date(order.created_at).toLocaleDateString()}</span>
                            <span className="total-stamp">₹{order.total_price}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </motion.div>
                )}

                {activeTab === 'bookings' && (
                  <motion.div 
                    key="bookings"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {bookings.length === 0 ? (
                      <div className="empty-state">
                        <Calendar size={48} opacity={0.3} />
                        <h3>No reservations</h3>
                        <p>You have not secured any table bookings yet.</p>
                        <a href="/#booking" className="btn btn-primary" style={{marginTop: 16}}>Book a Table</a>
                      </div>
                    ) : (
                      bookings.map(booking => (
                        <div key={booking.id} className="history-card">
                          <div className="history-header">
                            <span className="history-id">For: {booking.name || 'Customer'}</span>
                            <span className="status-badge success">Confirmed</span>
                          </div>
                          <div className="history-details booking-specs">
                            <span><Calendar size={16}/> {booking.date} at {booking.time}</span>
                            <span><MapPin size={16}/> {booking.guests} Guests</span>
                          </div>
                        </div>
                      ))
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </main>

      </div>
    </div>
  );
}
