import React, { useContext, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const { authState, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8080/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authState.token}`
        }
      });
    } catch (err) {
      console.error('Logout error:', err);
    }
    logout();
    navigate('/login');
  };

  const isLanding = location.pathname === '/';

  return (
    <nav className="navbar">
      {/* Brand logo & version */}
      <NavLink to="/" className="nav-brand">
        <div className="nav-brand-logo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="3" ry="3"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
        </div>
        <span style={{ fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
          Smart<span style={{ color: 'var(--primary-color)' }}>HRIS</span>
        </span>
        <span className="nav-version-badge">v2.4</span>
      </NavLink>

      {/* Public anchor navigation links on landing page */}
      <ul className="nav-links">
        {isLanding ? (
          <>
            <li><a href="#features" className="nav-link">Features</a></li>
            <li><a href="#showcase" className="nav-link">Platform</a></li>
            <li><a href="#roi" className="nav-link">ROI Calculator</a></li>
            <li><a href="#pricing" className="nav-link">Pricing</a></li>
            <li><a href="#faq" className="nav-link">FAQ</a></li>
          </>
        ) : (
          <li>
            <NavLink to="/" className="nav-link">Home</NavLink>
          </li>
        )}
      </ul>

      {/* Action buttons / Auth status */}
      <div className="nav-actions">
        {!authState.isAuthenticated ? (
          <>
            <NavLink to="/login" className="nav-btn-text">
              Sign In
            </NavLink>
            <NavLink to="/dashboard" className="nav-btn-cta">
              <span>Dashboard</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </NavLink>
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <NavLink to="/dashboard" className="nav-btn-cta">
              <span>Dashboard</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </NavLink>
            <button 
              onClick={handleLogout} 
              className="icon-btn" 
              title="Sign Out" 
              style={{ color: 'var(--danger-color)', padding: '0.5rem', borderRadius: '8px' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </button>
          </div>
        )}

        <button 
          className="nav-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;

