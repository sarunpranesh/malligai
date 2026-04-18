import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: signInError } = await signIn(email, password);
    
    if (signInError) {
      setError(signInError.message);
      setLoading(false);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <motion.div 
          className="auth-image"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img src="https://images.unsplash.com/photo-1589302168068-964664d93cb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Authentic South Indian Food" />
          <div className="auth-image-overlay">
            <h2>Welcome Back</h2>
            <p>Experience the timeless taste of Malligai</p>
          </div>
        </motion.div>

        <motion.div 
          className="auth-form-wrapper"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form className="auth-form glass-card-white" onSubmit={handleSubmit}>
            <div className="auth-header">
              <span className="section-label">ACCOUNT</span>
              <h2 className="section-title">Sign In</h2>
            </div>

            {error && <div className="auth-error">{error}</div>}

            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                placeholder="Ex. karthik@example.com"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                placeholder="Enter your password"
              />
            </div>

            <button type="submit" className="btn btn-primary btn-submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <p className="auth-redirect">
              Don't have an account? <Link to="/signup">Create an account</Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
