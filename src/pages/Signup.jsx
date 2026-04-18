import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: signUpError } = await signUp(email, password, name);
    
    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
    } else {
      // Supabase auto-logins after signup if email confirmations are disabled.
      // Assuming auto-login here, redirect to home.
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
          <img src="https://images.unsplash.com/photo-1626804475297-4160ec060c23?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Beautiful South Indian Thali" />
          <div className="auth-image-overlay">
            <h2>Join Malligai</h2>
            <p>Unlock exclusive rewards and faster ordering</p>
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
              <h2 className="section-title">Sign Up</h2>
            </div>

            {error && <div className="auth-error">{error}</div>}

            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                placeholder="Ex. Karthik R"
              />
            </div>

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
                placeholder="Create a password"
              />
            </div>

            <button type="submit" className="btn btn-primary btn-submit" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            <p className="auth-redirect">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
