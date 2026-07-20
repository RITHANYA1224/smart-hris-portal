import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ identifier, password })
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token, data.role, data.name, data.email);
        navigate('/dashboard');
      } else {
        setError(data.message || "Invalid credentials. Please check your email and password.");
      }
    } catch (err) {
      setError("Unable to connect to the server. Please verify the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="split-container">
      {/* Left Form Panel */}
      <div className="split-left">
        <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.25rem' }}>
            <div className="nav-brand-logo">💼</div>
            <span>HRIS</span>
          </div>

          {/* Welcome Text */}
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Welcome back</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Sign in to your account to continue managing your team.</p>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="identifier">Email address</label>
              <input 
                type="text" 
                id="identifier" 
                className="form-input" 
                placeholder="you@company.com" 
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <label className="form-label" htmlFor="password" style={{ margin: 0 }}>Password</label>
                <a href="#forgot" style={{ fontSize: '0.8rem', color: 'var(--primary-color)', fontWeight: 600 }}>Forgot password?</a>
              </div>
              <div className="password-input-container">
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password" 
                  className="form-input" 
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <label className="form-checkbox">
                <input type="checkbox" style={{ accentColor: 'var(--primary-color)' }} />
                <span>Remember me for 30 days</span>
              </label>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign in to HRIS"}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Don't have an account? <Link to="/register" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Create one free</Link>
          </p>
        </div>
      </div>

      {/* Right Graphic/Testimonial Panel */}
      <div className="split-right">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', maxWidth: '440px', width: '100%' }}>
          
          {/* Card Mockup */}
          <div className="card" style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ width: '100%', height: '260px', backgroundColor: '#94a3b8', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem', background: 'linear-gradient(135deg, #cbd5e1, #94a3b8)' }}>
              🏢
            </div>
            
            {/* Quote details */}
            <div style={{ marginTop: '1.5rem' }}>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.5, fontStyle: 'italic' }}>
                "HRIS transformed how we handle our 500-person team. Payroll used to take days, now it's minutes."
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1.25rem' }}>
                <div className="user-avatar" style={{ width: '32px', height: '32px' }}>JR</div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>James R.</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>VP Operations, TechCorp</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Subtitle brand */}
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Trusted by 2,400+ companies</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
