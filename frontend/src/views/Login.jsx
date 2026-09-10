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

    const cleanEmail = identifier.trim().toLowerCase();
    const cleanPassword = password.trim();

    try {
      // Direct call to authentication backend
      let response;
      try {
        response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: cleanEmail, password: cleanPassword })
        });
      } catch (proxyErr) {
        response = await fetch('http://localhost:8080/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: cleanEmail, password: cleanPassword })
        });
      }

      if (response && response.ok) {
        const data = await response.json();
        login(data.token, data.role, data.name, data.email);
        navigate('/dashboard');
        return;
      } else {
        const errData = await response.json().catch(() => ({}));
        setError(errData.message || "Invalid email or password");
      }
    } catch (apiErr) {
      setError("Unable to connect to the authentication server. Please verify backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="split-container">
      {/* Left Form Panel */}
      <div className="split-left">
        <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.25rem' }}>
            <div className="nav-brand-logo">💼</div>
            <span>HRIS</span>
          </div>

          {/* Welcome Text */}
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Welcome back</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Sign in to your account with your work email to access your workspace.</p>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label className="form-label" htmlFor="identifier">Email address</label>
              <input 
                type="email" 
                id="identifier" 
                className="form-input" 
                placeholder="you@company.com" 
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <label className="form-label" htmlFor="password" style={{ margin: 0 }}>Password</label>
                <a href="#forgot" style={{ fontSize: '0.8rem', color: 'var(--primary-color)', fontWeight: 600 }}>Forgot password?</a>
              </div>
              <div className="password-input-container" style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center' }}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password" 
                  className="form-input" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
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
                <input type="checkbox" style={{ accentColor: 'var(--primary-color)' }} defaultChecked />
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

          <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Don't have an account? <Link to="/register" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Create one free</Link>
          </p>
        </div>
      </div>

      {/* Right Graphic/Enterprise Showcase Panel */}
      <div className="split-right" style={{ background: 'linear-gradient(145deg, #0f172a 0%, #1e1b4b 50%, #31104b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 2rem', position: 'relative', overflow: 'hidden' }}>
        
        {/* Ambient background glow orbs */}
        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '380px', height: '380px', background: 'radial-gradient(circle, rgba(147, 51, 234, 0.35) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none' }}></div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', maxWidth: '480px', width: '100%', position: 'relative', zIndex: 2 }}>
          
          {/* Main Glassmorphic Dashboard Showcase Card */}
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '24px', padding: '1.75rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
            
            {/* Window header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
                </div>
                <span style={{ fontSize: '0.8rem', color: '#e2e8f0', fontWeight: 600, letterSpacing: '0.02em' }}>HRIS Enterprise Operating System</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', backgroundColor: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.4)', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.72rem', color: '#34d399', fontWeight: 700 }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }}></span>
                LIVE v2.4
              </div>
            </div>

            {/* Showcase Metrics Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', padding: '1rem' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>Active Personnel</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginTop: '0.25rem' }}>500+</div>
                <div style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 600, marginTop: '0.2rem' }}>↑ 100% verified staff</div>
              </div>
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', padding: '1rem' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>Monthly Payroll</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginTop: '0.25rem' }}>₹353.5K</div>
                <div style={{ fontSize: '0.72rem', color: '#c084fc', fontWeight: 600, marginTop: '0.2rem' }}>⚡ 1-click payslips</div>
              </div>
            </div>

            {/* Feature Highlights Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              <span style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#cbd5e1', padding: '0.4rem 0.85rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                ✨ 360° Appraisals
              </span>
              <span style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#cbd5e1', padding: '0.4rem 0.85rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                🔒 AES-256 Security
              </span>
              <span style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#cbd5e1', padding: '0.4rem 0.85rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                📄 Instant PDF Payslips
              </span>
              <span style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#cbd5e1', padding: '0.4rem 0.85rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                ⚡ Automated Workflows
              </span>
            </div>

          </div>

          {/* Testimonial & Trust Footer */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{ display: 'flex', marginLeft: '0.5rem' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#6366f1', border: '2px solid #0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.7rem', fontWeight: 700 }}>PS</div>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#ec4899', border: '2px solid #0f172a', marginLeft: '-8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.7rem', fontWeight: 700 }}>AK</div>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#10b981', border: '2px solid #0f172a', marginLeft: '-8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.7rem', fontWeight: 700 }}>VP</div>
              </div>
              <span style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 600 }}>Trusted by 2,400+ enterprises</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>ISO 27001 Certified</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
