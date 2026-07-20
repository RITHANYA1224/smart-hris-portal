import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Landing = () => {
  const { authState } = useContext(AuthContext);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem', paddingBottom: '5rem' }}>
      
      {/* Hero Section */}
      <section className="dashboard-content" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', paddingTop: '3rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <span style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary-dark)', padding: '0.35rem 0.75rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 600, width: 'fit-content' }}>
            ⭐ Rated #1 HR Platform — 2024
          </span>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.1, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
            Smart Human <br />
            <span style={{ background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Resource Management</span> <br />
            System
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Streamline the entire employee lifecycle — from hiring to retirement — with a unified HR platform built for modern teams of all sizes.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            {authState.isAuthenticated ? (
              <Link to="/dashboard" className="btn btn-primary" style={{ padding: '0.85rem 2rem', fontSize: '0.95rem' }}>
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary" style={{ padding: '0.85rem 2rem', fontSize: '0.95rem' }}>
                  Get Started Free →
                </Link>
                <Link to="/login" className="btn btn-secondary" style={{ padding: '0.85rem 2rem', fontSize: '0.95rem' }}>
                  Login to Dashboard
                </Link>
              </>
            )}
          </div>
          
          <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.5rem' }}>
            <span>✓ No credit card</span>
            <span>✓ 14-day free trial</span>
            <span>✓ Cancel anytime</span>
          </div>
        </div>

        {/* Hero Graphic Card */}
        <div style={{ position: 'relative' }}>
          <div className="card" style={{ padding: '1rem', position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ width: '100%', height: '300px', backgroundColor: '#e2e8f0', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', background: 'linear-gradient(135deg, #f1f5f9, #cbd5e1)' }}>
              👥
            </div>
            
            {/* Floating metrics badge */}
            <div className="card" style={{ position: 'absolute', top: '2rem', right: '2rem', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: 'var(--radius-sm)', border: 'none', boxShadow: 'var(--shadow-lg)' }}>
              <span style={{ fontSize: '1.25rem' }}>📈</span>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--success-color)' }}>+24%</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Retention rate</div>
              </div>
            </div>

            {/* Bottom avatars footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem', padding: '0 0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>🌟 4.9/5 G2</span>
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                🚀 2,400+ teams trust HRIS daily
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '2.5rem 0' }}>
        <div className="dashboard-content" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', textAlign: 'center', gap: '2rem' }}>
          <div>
            <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--primary-color)' }}>2,400+</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500, marginTop: '0.25rem' }}>Companies</div>
          </div>
          <div>
            <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--primary-color)' }}>180K+</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500, marginTop: '0.25rem' }}>Employees Managed</div>
          </div>
          <div>
            <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--primary-color)' }}>42</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500, marginTop: '0.25rem' }}>Countries</div>
          </div>
          <div>
            <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--primary-color)' }}>99.9%</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500, marginTop: '0.25rem' }}>Uptime SLA</div>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="dashboard-content" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ color: 'var(--primary-color)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Everything You Need</span>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800 }}>Built for the modern HR team</h2>
        </div>

        <div className="dashboard-grid-3">
          <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '2rem', padding: '0.5rem', backgroundColor: 'var(--primary-light)', borderRadius: '12px' }}>👤</span>
            <div>
              <h3 style={{ marginBottom: '0.35rem', fontSize: '1.05rem', fontWeight: 600 }}>Employee Lifecycle</h3>
              <p style={{ fontSize: '0.85rem' }}>Manage hiring, onboarding, and offboarding seamlessly.</p>
            </div>
          </div>

          <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '2rem', padding: '0.5rem', backgroundColor: '#fae8ff', borderRadius: '12px' }}>📅</span>
            <div>
              <h3 style={{ marginBottom: '0.35rem', fontSize: '1.05rem', fontWeight: 600 }}>Smart Leave Engine</h3>
              <p style={{ fontSize: '0.85rem' }}>Automated approvals, balances, and real-time calendars.</p>
            </div>
          </div>

          <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '2rem', padding: '0.5rem', backgroundColor: '#dcfce7', borderRadius: '12px' }}>💲</span>
            <div>
              <h3 style={{ marginBottom: '0.35rem', fontSize: '1.05rem', fontWeight: 600 }}>Payroll Processing</h3>
              <p style={{ fontSize: '0.85rem' }}>One-click payroll with tax, PF, and ESI compliance.</p>
            </div>
          </div>

          <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '2rem', padding: '0.5rem', backgroundColor: '#ffedd5', borderRadius: '12px' }}>📊</span>
            <div>
              <h3 style={{ marginBottom: '0.35rem', fontSize: '1.05rem', fontWeight: 600 }}>Deep Analytics</h3>
              <p style={{ fontSize: '0.85rem' }}>Actionable HR insights across departments and trends.</p>
            </div>
          </div>

          <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '2rem', padding: '0.5rem', backgroundColor: '#fef9c3', borderRadius: '12px' }}>📄</span>
            <div>
              <h3 style={{ marginBottom: '0.35rem', fontSize: '1.05rem', fontWeight: 600 }}>Document Hub</h3>
              <p style={{ fontSize: '0.85rem' }}>Centralized contracts, certificates, and ID management.</p>
            </div>
          </div>

          <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '2rem', padding: '0.5rem', backgroundColor: '#e0e7ff', borderRadius: '12px' }}>🛡️</span>
            <div>
              <h3 style={{ marginBottom: '0.35rem', fontSize: '1.05rem', fontWeight: 600 }}>Compliance & Security</h3>
              <p style={{ fontSize: '0.85rem' }}>Role-based access, audit logs, and data protection.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action section */}
      <section className="dashboard-content">
        <div style={{ background: 'linear-gradient(135deg, #eff6ff, #dbeafe)', borderRadius: 'var(--radius-lg)', padding: '3.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Ready to transform your HR?</h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>Join 2,400+ companies already using HRIS to empower their teams.</p>
          </div>
          <Link to="/register" className="btn btn-primary" style={{ padding: '0.85rem 2.5rem', fontSize: '0.95rem', borderRadius: 'var(--radius-sm)' }}>
            Start Free Trial →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
