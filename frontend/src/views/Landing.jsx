import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Landing = () => {
  const { authState } = useContext(AuthContext);

  // Interactive Showcase Tab State
  const [activeTab, setActiveTab] = useState('people');

  // Interactive ROI Calculator State
  const [teamSize, setTeamSize] = useState(150);

  // Interactive Pricing State
  const [billingCycle, setBillingCycle] = useState('annual'); // 'annual' or 'monthly'

  // Interactive FAQ State
  const [openFaq, setOpenFaq] = useState(0);

  // Dynamic ROI Calculations
  const hoursSavedPerMonth = Math.round(teamSize * 1.4);
  const costSavingsAnnual = Math.round(teamSize * 420);
  const payrollHoursOld = Math.max(2, Math.round(teamSize * 0.08));

  // FAQ items data
  const faqs = [
    {
      q: "How seamless is migration from spreadsheets or legacy HR software?",
      a: "Our 1-click intelligent CSV importer auto-maps your employee roster, salary structures, past leave balances, and documents in under 10 minutes. Our onboarding specialists provide complimentary white-glove migration for teams over 50 employees."
    },
    {
      q: "Does SmartHRIS support automated tax compliance, PF, and local deductions?",
      a: "Yes. SmartHRIS features built-in compliance engines that calculate federal, state, and statutory deductions (Provident Fund, ESI, TDS, Medicare, and Social Security) with automatic updates whenever regulatory tax codes change."
    },
    {
      q: "What security standards safeguard our sensitive HR and banking records?",
      a: "We implement SOC-2 Type II certified infrastructure, 256-bit AES encryption at rest and in transit, multi-factor authentication (MFA), role-based access control (RBAC), and immutable audit logs to ensure enterprise-grade confidentiality."
    },
    {
      q: "Can team members access payslips and request PTO on mobile devices?",
      a: "Absolutely. SmartHRIS is fully responsive with a dedicated employee self-service portal. Staff can submit time-off requests, view holiday calendars, download PDF payslips, and update personal profile details on any device."
    },
    {
      q: "What happens when our 14-day free trial concludes?",
      a: "You will receive full access to all Growth features throughout your 14-day trial without needing a credit card. At trial conclusion, you can choose the plan that best fits your headcount or transition without unexpected charges."
    }
  ];

  return (
    <div style={{ position: 'relative', overflowX: 'hidden' }}>
      
      {/* Ambient background glow orbs */}
      <div className="hero-glow-1"></div>
      <div className="hero-glow-2"></div>

      {/* ========================================================
          1. HERO SECTION
          ======================================================== */}
      <section className="landing-hero">
        <div className="hero-grid">
          
          {/* Left Column: Hero Pitch & CTAs */}
          <div>
            <div className="hero-announcement">
              <span className="pulse-status-dot"></span>
              <span>Next-Gen Workforce Intelligence — Platform v2.4</span>
            </div>

            <h1 className="hero-title">
              Every HR workflow, <br />
              <span className="gradient-text">unified in one operating system.</span>
            </h1>

            <p className="hero-description">
              Eliminate disconnected spreadsheets and siloed software. Automate global payroll, streamline PTO approvals, conduct 360° appraisals, and empower your workforce with a modern platform built for high-growth teams.
            </p>

            <div className="hero-cta-group">
              <Link to="/dashboard" className="btn-hero-primary">
                <span>Enter Your Dashboard</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              {!authState.isAuthenticated ? (
                <Link to="/register" className="btn-hero-secondary">
                  <span>Start 14-Day Free Trial</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
                  </svg>
                </Link>
              ) : (
                <a href="#showcase" className="btn-hero-secondary">
                  <span>Explore Live Tour</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
                  </svg>
                </a>
              )}
            </div>

            <div className="hero-guarantee">
              <div className="hero-guarantee-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>No credit card required</span>
              </div>
              <div className="hero-guarantee-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>SOC-2 Type II Certified</span>
              </div>
              <div className="hero-guarantee-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Setup in 5 minutes</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Hero Mockup Window */}
          <div style={{ position: 'relative' }}>
            
            {/* Floating Live Notification 1 */}
            <div className="floating-badge floating-badge-top animate-float">
              <div className="badge-avatar" style={{ background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)', color: '#166534' }}>
                ✓
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Leave Request Approved
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                  Sarah Connor • Vacation (4 days)
                </div>
              </div>
            </div>

            {/* Floating Live Notification 2 */}
            <div className="floating-badge floating-badge-bottom animate-float-reverse">
              <div className="badge-avatar" style={{ background: 'linear-gradient(135deg, #e0e7ff, #c7d2fe)', color: '#4338ca' }}>
                ⚡
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Direct Deposit Dispatched
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--success-color)', fontWeight: 600 }}>
                  $482,500.00 • 100% Tax Compliant
                </div>
              </div>
            </div>

            {/* Main Interactive Mockup Window */}
            <div className="mockup-window">
              <div className="mockup-header">
                <div className="mockup-dots">
                  <span className="mockup-dot dot-red"></span>
                  <span className="mockup-dot dot-yellow"></span>
                  <span className="mockup-dot dot-green"></span>
                </div>
                <div className="mockup-header-title">app.smarthris.io/workforce-intelligence</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Live SLA</span>
                </div>
              </div>

              <div className="mockup-inner">
                {/* Real-time KPI row */}
                <div className="mockup-stat-row">
                  <div className="mockup-stat-card">
                    <div className="lbl">Active Headcount</div>
                    <div className="val">1,420</div>
                    <div className="trend">
                      <span>↑ +12.4%</span>
                      <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>vs last qtr</span>
                    </div>
                  </div>

                  <div className="mockup-stat-card">
                    <div className="lbl">Monthly Payroll</div>
                    <div className="val">$482.5k</div>
                    <div className="trend">
                      <span style={{ color: 'var(--primary-color)' }}>✓ Processed</span>
                    </div>
                  </div>

                  <div className="mockup-stat-card">
                    <div className="lbl">eNPS Score</div>
                    <div className="val">78 / 100</div>
                    <div className="trend">
                      <span>★ 94% satisfied</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Employee Table */}
                <div style={{ background: 'var(--bg-primary)', borderRadius: '12px', padding: '0.75rem', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem', padding: '0 0.25rem' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)' }}>Recent Team Members</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--primary-color)', fontWeight: 600, cursor: 'pointer' }}>View all 1,420 →</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {[
                      { name: 'Sarah Connor', role: 'Staff Systems Architect', dept: 'Engineering', status: 'Active', avatar: 'SC', bg: '#0284c7' },
                      { name: 'Alex Chen', role: 'VP of Product Strategy', dept: 'Product', status: 'Active', avatar: 'AC', bg: '#6366f1' },
                      { name: 'Priya Patel', role: 'Lead Talent Operations', dept: 'People', status: 'On Leave', avatar: 'PP', bg: '#ec4899' },
                    ].map((emp, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.45rem 0.6rem', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: emp.bg, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700 }}>
                            {emp.avatar}
                          </div>
                          <div>
                            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)' }}>{emp.name}</div>
                            <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>{emp.role}</div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '0.65rem', padding: '0.15rem 0.45rem', borderRadius: '999px', background: 'var(--primary-light)', color: 'var(--primary-dark)', fontWeight: 600 }}>
                            {emp.dept}
                          </span>
                          <span style={{ 
                            fontSize: '0.65rem', 
                            padding: '0.15rem 0.45rem', 
                            borderRadius: '999px', 
                            background: emp.status === 'Active' ? 'var(--success-light)' : 'var(--warning-light)', 
                            color: emp.status === 'Active' ? 'var(--success-dark)' : '#b45309', 
                            fontWeight: 600 
                          }}>
                            {emp.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Micro mini-bar chart representation */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 0.85rem', background: 'var(--bg-primary)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.9rem' }}>📊</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Q3 Workforce Growth Trajectory</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '20px' }}>
                    {[35, 45, 40, 60, 55, 75, 70, 90, 85, 100].map((h, i) => (
                      <div 
                        key={i} 
                        style={{ 
                          width: '6px', 
                          height: `${h}%`, 
                          background: i === 9 ? 'var(--primary-color)' : 'rgba(2, 132, 199, 0.3)', 
                          borderRadius: '2px' 
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. TRUSTED BY INDUSTRY LEADERS
          ======================================================== */}
      <section className="trust-banner">
        <div className="trust-inner">
          <div className="trust-title">
            Empowering 2,500+ innovative companies across 42 countries
          </div>
          <div className="trust-logos">
            {[
              { name: 'Veloce Labs', icon: '⚡' },
              { name: 'Synthetix AI', icon: '🧠' },
              { name: 'Hyperion Bio', icon: '🧬' },
              { name: 'Lumina Cloud', icon: '☁️' },
              { name: 'Pulse Dynamics', icon: '📈' },
              { name: 'Apex Capital', icon: '💎' },
            ].map((company, i) => (
              <div key={i} className="trust-logo-item">
                <span style={{ fontSize: '1.2rem' }}>{company.icon}</span>
                <span>{company.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          3. INTERACTIVE PRODUCT SHOWCASE TABS
          ======================================================== */}
      <section id="showcase" className="showcase-section">
        <div className="section-header-center">
          <span className="section-pill">Unified Suite</span>
          <h2 className="section-h2">Everything your people team needs to scale</h2>
          <p className="section-lead">
            Explore our integrated modules engineered to replace dozens of fragile tools with one cohesive, secure operating system.
          </p>
        </div>

        {/* Tab switcher buttons */}
        <div className="showcase-tabs">
          {[
            { id: 'people', label: 'Employee Directory', icon: '👥' },
            { id: 'leaves', label: 'Smart Leave Engine', icon: '📅' },
            { id: 'payroll', label: 'Automated Payroll', icon: '💵' },
            { id: 'performance', label: '360° Appraisals', icon: '⭐' },
            { id: 'analytics', label: 'Workforce Analytics', icon: '📈' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`showcase-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Tab Content Display */}
        <div className="showcase-panel">
          
          {/* Tab Descriptions & Features */}
          {activeTab === 'people' && (
            <>
              <div className="showcase-panel-text">
                <h3>Centralized Employee System of Record</h3>
                <p>
                  Maintain an authoritative, real-time repository of all your personnel data. From contract documents and emergency contacts to role hierarchies and compensation history.
                </p>
                <ul className="feature-check-list">
                  <li className="feature-check-item">
                    <span className="feature-check-icon">✓</span>
                    <span>Self-service employee profile updates with approval workflows</span>
                  </li>
                  <li className="feature-check-item">
                    <span className="feature-check-icon">✓</span>
                    <span>Interactive visual organizational charts and reporting hierarchy</span>
                  </li>
                  <li className="feature-check-item">
                    <span className="feature-check-icon">✓</span>
                    <span>Automated birthday, anniversary, and milestone celebrations</span>
                  </li>
                  <li className="feature-check-item">
                    <span className="feature-check-icon">✓</span>
                    <span>Secure role-based permissions protecting sensitive personal records</span>
                  </li>
                </ul>
              </div>

              <div className="showcase-preview-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Employee Directory Snapshot</div>
                  <span className="badge badge-info">1,420 Active</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    { name: 'David Miller', title: 'Senior Full Stack Engineer', email: 'd.miller@company.io', dept: 'Engineering', avatar: 'DM' },
                    { name: 'Elena Rostova', title: 'Director of Product Design', email: 'e.rostova@company.io', dept: 'Design', avatar: 'ER' },
                    { name: 'Jordan Vance', title: 'VP of People & Culture', email: 'j.vance@company.io', dept: 'HR Ops', avatar: 'JV' },
                  ].map((user, idx) => (
                    <div key={idx} style={{ padding: '0.85rem 1rem', background: 'var(--bg-secondary)', borderRadius: '10px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #0284c7, #2563eb)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem' }}>
                          {user.avatar}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{user.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{user.title} • {user.email}</div>
                        </div>
                      </div>
                      <span className="badge badge-success">{user.dept}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'leaves' && (
            <>
              <div className="showcase-panel-text">
                <h3>Intelligent Leave & Attendance Engine</h3>
                <p>
                  Eliminate PTO calculation headaches. Define custom multi-tiered leave policies, enforce rollover limits, and enable 1-click approvals right from notifications.
                </p>
                <ul className="feature-check-list">
                  <li className="feature-check-item">
                    <span className="feature-check-icon">✓</span>
                    <span>Real-time leave balance calculations with accrual rules</span>
                  </li>
                  <li className="feature-check-item">
                    <span className="feature-check-icon">✓</span>
                    <span>Conflict-detection calendar prevents understaffed critical departments</span>
                  </li>
                  <li className="feature-check-item">
                    <span className="feature-check-icon">✓</span>
                    <span>1-Click manager approvals via email and in-app dashboard</span>
                  </li>
                  <li className="feature-check-item">
                    <span className="feature-check-icon">✓</span>
                    <span>Configurable policy tiers for casual, medical, maternity, and unpaid leaves</span>
                  </li>
                </ul>
              </div>

              <div className="showcase-preview-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Leave Balance & Approvals</div>
                  <span className="badge badge-success">Live Engine</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{ padding: '0.85rem', background: 'var(--bg-secondary)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Paid Time Off (PTO)</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-color)', marginTop: '0.2rem' }}>14 / 20</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>6 days used this year</div>
                  </div>
                  <div style={{ padding: '0.85rem', background: 'var(--bg-secondary)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Sick & Medical</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981', marginTop: '0.2rem' }}>9 / 10</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>1 day used this year</div>
                  </div>
                </div>

                <div style={{ padding: '0.85rem', background: 'var(--bg-secondary)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>Pending Approval</span>
                    <span style={{ fontSize: '0.7rem', color: '#b45309', background: 'var(--warning-light)', padding: '0.15rem 0.5rem', borderRadius: '999px', fontWeight: 600 }}>Needs Review</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    Marcus Thorne requested <strong>3 days Annual Leave</strong> (Sep 14 - Sep 17)
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                    <button className="btn btn-primary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}>Approve</button>
                    <button className="btn btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}>Decline</button>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'payroll' && (
            <>
              <div className="showcase-panel-text">
                <h3>One-Click Automated Payroll Processing</h3>
                <p>
                  Run flawless payroll in seconds, not days. Automatic calculations for gross wages, tax withholdings, retirement matching, and statutory compliance with direct payslip delivery.
                </p>
                <ul className="feature-check-list">
                  <li className="feature-check-item">
                    <span className="feature-check-icon">✓</span>
                    <span>Direct deposit execution with 100% tax and PF compliance</span>
                  </li>
                  <li className="feature-check-item">
                    <span className="feature-check-icon">✓</span>
                    <span>Automatic deduction sync from unpaid leave logs and overtime</span>
                  </li>
                  <li className="feature-check-item">
                    <span className="feature-check-icon">✓</span>
                    <span>Instant PDF payslip generation and employee self-download</span>
                  </li>
                  <li className="feature-check-item">
                    <span className="feature-check-icon">✓</span>
                    <span>Multi-entity and multi-currency payout support</span>
                  </li>
                </ul>
              </div>

              <div className="showcase-preview-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Digital Payslip Preview</div>
                  <span className="badge badge-success">Processed</span>
                </div>
                
                <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Alex Chen</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>VP of Product • Payroll #8402</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pay Period</div>
                      <div style={{ fontWeight: 600, fontSize: '0.8rem' }}>Aug 1 - Aug 31</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Base Salary</span>
                      <span style={{ fontWeight: 600 }}>$12,500.00</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Performance Bonus</span>
                      <span style={{ fontWeight: 600 }}>$1,800.00</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--danger-color)' }}>
                      <span>Taxes & Statutory Deductions</span>
                      <span style={{ fontWeight: 600 }}>-$3,420.00</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px dashed var(--border-color)', marginTop: '0.85rem', paddingTop: '0.85rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Net Take-Home Pay</span>
                    <span style={{ fontWeight: 850, fontSize: '1.3rem', color: 'var(--primary-color)' }}>$10,880.00</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'performance' && (
            <>
              <div className="showcase-panel-text">
                <h3>Continuous 360° Appraisals & Skills Matrix</h3>
                <p>
                  Transform subjective annual reviews into an objective, continuous feedback culture. Track competency growth, align team OKRs, and retain top talent.
                </p>
                <ul className="feature-check-list">
                  <li className="feature-check-item">
                    <span className="feature-check-icon">✓</span>
                    <span>Self, peer, and manager 360-degree evaluation cycles</span>
                  </li>
                  <li className="feature-check-item">
                    <span className="feature-check-icon">✓</span>
                    <span>Visual skill matrix identifying departmental capability gaps</span>
                  </li>
                  <li className="feature-check-item">
                    <span className="feature-check-icon">✓</span>
                    <span>Goal and milestone alignment connected directly to bonus pools</span>
                  </li>
                  <li className="feature-check-item">
                    <span className="feature-check-icon">✓</span>
                    <span>Customizable appraisal rubrics with 5-point rating scales</span>
                  </li>
                </ul>
              </div>

              <div className="showcase-preview-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Quarterly Performance Scorecard</div>
                  <span className="badge badge-success">Top 5% Performer</span>
                </div>
                
                <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 800 }}>
                      4.9
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Priya Patel • Lead Talent Operations</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Evaluated by 8 peers & management</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {[
                      { skill: 'Execution & Velocity', score: '98%' },
                      { skill: 'Cross-Functional Collaboration', score: '96%' },
                      { skill: 'Strategic Problem Solving', score: '94%' },
                    ].map((item, idx) => (
                      <div key={idx}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.2rem', fontWeight: 600 }}>
                          <span>{item.skill}</span>
                          <span>{item.score}</span>
                        </div>
                        <div style={{ width: '100%', height: '6px', background: 'var(--bg-primary)', borderRadius: '999px', overflow: 'hidden' }}>
                          <div style={{ width: item.score, height: '100%', background: 'linear-gradient(90deg, var(--primary-color), #10b981)', borderRadius: '999px' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'analytics' && (
            <>
              <div className="showcase-panel-text">
                <h3>Predictive People Analytics & Retention</h3>
                <p>
                  Make high-confidence workforce decisions backed by real-time data. Monitor voluntary turnover risk, forecast hiring budgets, and optimize departmental costs.
                </p>
                <ul className="feature-check-list">
                  <li className="feature-check-item">
                    <span className="feature-check-icon">✓</span>
                    <span>Early-warning flight risk indicators based on appraisal trends</span>
                  </li>
                  <li className="feature-check-item">
                    <span className="feature-check-icon">✓</span>
                    <span>Departmental compensation benchmarking against industry percentiles</span>
                  </li>
                  <li className="feature-check-item">
                    <span className="feature-check-icon">✓</span>
                    <span>Executive-ready reports exportable to PDF, Excel, and CSV</span>
                  </li>
                  <li className="feature-check-item">
                    <span className="feature-check-icon">✓</span>
                    <span>Diversity, equity, and inclusion (DEI) demographic tracking</span>
                  </li>
                </ul>
              </div>

              <div className="showcase-preview-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Workforce Retention Index</div>
                  <span className="badge badge-success">+96.4% Retention</span>
                </div>
                
                <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Annual Headcount & Retention Curve</div>
                  
                  {/* SVG Chart */}
                  <svg width="100%" height="120" viewBox="0 0 300 120" style={{ overflow: 'visible' }}>
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0284c7" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path d="M 0 100 Q 75 80 150 45 T 300 20 L 300 120 L 0 120 Z" fill="url(#chartGrad)" />
                    <path d="M 0 100 Q 75 80 150 45 T 300 20" fill="none" stroke="#0284c7" strokeWidth="3" />
                    <circle cx="150" cy="45" r="4" fill="#0284c7" />
                    <circle cx="300" cy="20" r="5" fill="#10b981" />
                  </svg>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.85rem', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                    <span>Q1 2024</span>
                    <span>Q2 2024</span>
                    <span>Q3 2024</span>
                    <span style={{ fontWeight: 700, color: 'var(--primary-color)' }}>Q4 Target: 1,800</span>
                  </div>
                </div>
              </div>
            </>
          )}

        </div>
      </section>

      {/* ========================================================
          4. INTERACTIVE ROI CALCULATOR
          ======================================================== */}
      <section id="roi" className="roi-section">
        <div className="section-header-center">
          <span className="section-pill">Interactive Estimator</span>
          <h2 className="section-h2">Calculate your ROI with SmartHRIS</h2>
          <p className="section-lead">
            See the exact hours, financial savings, and payroll speedups your team unlocks by consolidating on our intelligent platform.
          </p>
        </div>

        <div className="roi-card-wrapper">
          <div className="roi-slider-container">
            <div className="roi-slider-label">
              <span>Your Current Organization Headcount:</span>
              <span className="roi-headcount-badge">{teamSize} Employees</span>
            </div>
            
            <input
              type="range"
              min="10"
              max="1500"
              step="10"
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              className="roi-range-input"
            />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              <span>10 Employees (Seed)</span>
              <span>250 (Mid-Market)</span>
              <span>500 (Growth)</span>
              <span>1,500+ (Enterprise)</span>
            </div>
          </div>

          <div className="roi-metrics-grid">
            <div className="roi-metric-box">
              <div className="val">{hoursSavedPerMonth} hrs</div>
              <div className="lbl">Admin Hours Saved / Month</div>
              <div className="desc">Automated onboarding, approvals, and data sync</div>
            </div>

            <div className="roi-metric-box">
              <div className="val">${costSavingsAnnual.toLocaleString()}</div>
              <div className="lbl">Estimated Annual Savings</div>
              <div className="desc">Calculated via reduced software fees & admin overhead</div>
            </div>

            <div className="roi-metric-box">
              <div className="val">15 mins</div>
              <div className="lbl">Payroll Run Time</div>
              <div className="desc">Down from ~{payrollHoursOld} hours of manual spreadsheet reconciliation</div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/register" className="btn-hero-primary" style={{ padding: '0.85rem 2.25rem' }}>
              <span>Claim Your Free 14-Day Trial →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. ENTERPRISE BENTO GRID FEATURES
          ======================================================== */}
      <section id="features" className="bento-section">
        <div className="section-header-center">
          <span className="section-pill">Enterprise Ready</span>
          <h2 className="section-h2">Architected for security, scale, and compliance</h2>
          <p className="section-lead">
            Every layer of SmartHRIS is built with enterprise resilience so your IT and Legal teams can sleep peacefully.
          </p>
        </div>

        <div className="bento-grid">
          
          {/* Bento Item 1: Wide */}
          <div className="bento-card bento-span-2" style={{ background: 'linear-gradient(135deg, var(--bg-secondary) 0%, rgba(2, 132, 199, 0.05) 100%)' }}>
            <div className="bento-icon-badge" style={{ background: 'var(--primary-light)', color: 'var(--primary-dark)' }}>
              ⚡
            </div>
            <h3 className="bento-title">Autonomous Onboarding & Offboarding Workflows</h3>
            <p className="bento-desc">
              From welcome contracts and tax declarations to hardware requests and single sign-on (SSO) provisioning. Onboard new hires in under 15 minutes before their first morning standup.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
              <span className="badge badge-info">Document E-Sign</span>
              <span className="badge badge-info">Asset Tracking</span>
              <span className="badge badge-info">Google Workspace & Slack Sync</span>
            </div>
          </div>

          {/* Bento Item 2 */}
          <div className="bento-card">
            <div className="bento-icon-badge" style={{ background: 'var(--success-light)', color: 'var(--success-dark)' }}>
              🛡️
            </div>
            <h3 className="bento-title">SOC-2 Type II Certified</h3>
            <p className="bento-desc">
              End-to-end 256-bit AES encryption at rest, TLS 1.3 in flight, role-based access control, and complete audit logging for regulatory compliance.
            </p>
          </div>

          {/* Bento Item 3 */}
          <div className="bento-card">
            <div className="bento-icon-badge" style={{ background: '#fef3c7', color: '#b45309' }}>
              🌐
            </div>
            <h3 className="bento-title">Multi-Entity & Global Currencies</h3>
            <p className="bento-desc">
              Pay remote contractors and local subsidiaries across 40+ currencies with localized tax calculation compliance built right in.
            </p>
          </div>

          {/* Bento Item 4: Wide */}
          <div className="bento-card bento-span-2" style={{ background: 'linear-gradient(135deg, var(--bg-secondary) 0%, rgba(99, 102, 241, 0.05) 100%)' }}>
            <div className="bento-icon-badge" style={{ background: 'var(--accent-light)', color: 'var(--accent-color)' }}>
              📁
            </div>
            <h3 className="bento-title">Centralized Document Vault & E-Signatures</h3>
            <p className="bento-desc">
              Store employment contracts, non-disclosure agreements, certificates, and ID documents in a compliant, searchable digital repository with tamper-proof versioning.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
              <span className="badge badge-success">Audit-Proof Logs</span>
              <span className="badge badge-success">Automated Expiry Alerts</span>
              <span className="badge badge-success">GDPR & CCPA Compliant</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          6. TESTIMONIALS & SOCIAL PROOF
          ======================================================== */}
      <section className="testimonials-section">
        <div className="section-header-center">
          <span className="section-pill">Customer Stories</span>
          <h2 className="section-h2">Loved by HR leaders worldwide</h2>
          <p className="section-lead">
            Discover why people operations executives switch to SmartHRIS to supercharge their workflows.
          </p>
        </div>

        <div className="testimonials-grid">
          {[
            {
              quote: "SmartHRIS slashed our bi-weekly payroll processing from 3 days to under 20 minutes. Our employees love the transparent self-service leave portal.",
              metric: "-75% Payroll Admin Overhead",
              name: "Elena Rostova",
              role: "Chief People Officer, NexaCloud",
              avatar: "ER",
              stars: "★★★★★"
            },
            {
              quote: "Scaling from 80 to 450 people across 6 countries was effortless. The automated compliance engine handles statutory filings and documents without a hitch.",
              metric: "99.8% On-Time Global Compliance",
              name: "Marcus Thorne",
              role: "VP of Operations, Veloce Tech",
              avatar: "MT",
              stars: "★★★★★"
            },
            {
              quote: "The 360 appraisal matrix completely revitalized our quarterly review cycles. Performance feedback is continuous and meaningful rather than an annual chore.",
              metric: "+38% Employee Engagement",
              name: "Samantha Wu",
              role: "Head of Talent, Lumina Bio",
              avatar: "SW",
              stars: "★★★★★"
            }
          ].map((t, idx) => (
            <div key={idx} className="testimonial-card">
              <div>
                <div className="testimonial-stars">{t.stars}</div>
                <div className="testimonial-metric-chip">{t.metric}</div>
                <p className="testimonial-quote">"{t.quote}"</p>
              </div>

              <div className="testimonial-author">
                <div className="author-avatar">{t.avatar}</div>
                <div>
                  <div className="author-name">{t.name}</div>
                  <div className="author-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          7. PRICING TIERS
          ======================================================== */}
      <section id="pricing" className="pricing-section">
        <div className="section-header-center">
          <span className="section-pill">Transparent Pricing</span>
          <h2 className="section-h2">Predictable pricing that scales with you</h2>
          <p className="section-lead">
            Every plan includes our core platform features, automatic updates, and dedicated customer onboarding.
          </p>
        </div>

        {/* Monthly vs Annual Toggle */}
        <div className="pricing-billing-toggle">
          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: billingCycle === 'monthly' ? 'var(--text-primary)' : 'var(--text-muted)' }}>Monthly</span>
          <div className="pricing-toggle-pill">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`pricing-toggle-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`pricing-toggle-btn ${billingCycle === 'annual' ? 'active' : ''}`}
            >
              Annual
            </button>
          </div>
          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: billingCycle === 'annual' ? 'var(--text-primary)' : 'var(--text-muted)' }}>Annual</span>
          <span className="save-badge">Save 20%</span>
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing-grid">
          
          {/* Starter Plan */}
          <div className="pricing-card">
            <div>
              <div className="pricing-plan-name">Starter</div>
              <div className="pricing-plan-desc">For startups and boutique teams getting started with structured HR.</div>

              <div className="pricing-price-box">
                <span className="currency">$</span>
                <span className="amount">{billingCycle === 'annual' ? '6' : '8'}</span>
                <span className="period">/ employee / month</span>
              </div>

              <ul className="pricing-features-list">
                <li className="pricing-feature-item"><span>✓</span> Centralized Employee Directory</li>
                <li className="pricing-feature-item"><span>✓</span> Smart Leave & Time-Off Tracker</li>
                <li className="pricing-feature-item"><span>✓</span> Employee Self-Service Portal</li>
                <li className="pricing-feature-item"><span>✓</span> Standard PDF Document Vault</li>
                <li className="pricing-feature-item"><span>✓</span> Standard Email Support</li>
              </ul>
            </div>

            <Link to="/register" className="btn btn-secondary" style={{ width: '100%', padding: '0.85rem' }}>
              Start 14-Day Free Trial
            </Link>
          </div>

          {/* Growth Plan (Popular) */}
          <div className="pricing-card popular">
            <div className="popular-ribbon">Most Popular</div>

            <div>
              <div className="pricing-plan-name">Growth</div>
              <div className="pricing-plan-desc">For accelerating companies needing automated payroll and performance.</div>

              <div className="pricing-price-box">
                <span className="currency">$</span>
                <span className="amount">{billingCycle === 'annual' ? '12' : '15'}</span>
                <span className="period">/ employee / month</span>
              </div>

              <ul className="pricing-features-list">
                <li className="pricing-feature-item"><span>✓</span> Everything in Starter, plus:</li>
                <li className="pricing-feature-item"><span>✓</span> <strong>1-Click Automated Payroll & Tax Deductions</strong></li>
                <li className="pricing-feature-item"><span>✓</span> <strong>360° Appraisals & Skills Matrix</strong></li>
                <li className="pricing-feature-item"><span>✓</span> Custom Leave Policies & Accruals</li>
                <li className="pricing-feature-item"><span>✓</span> Deep Workforce Analytics Dashboard</li>
                <li className="pricing-feature-item"><span>✓</span> Priority 24/7 Chat & Ticket Support</li>
              </ul>
            </div>

            <Link to="/register" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem', background: 'linear-gradient(135deg, #0284c7, #2563eb)' }}>
              Start 14-Day Free Trial →
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="pricing-card">
            <div>
              <div className="pricing-plan-name">Enterprise</div>
              <div className="pricing-plan-desc">For global workforces requiring bespoke compliance, RBAC, and dedicated SLA.</div>

              <div className="pricing-price-box">
                <span className="currency">$</span>
                <span className="amount">{billingCycle === 'annual' ? '22' : '28'}</span>
                <span className="period">/ employee / month</span>
              </div>

              <ul className="pricing-features-list">
                <li className="pricing-feature-item"><span>✓</span> Everything in Growth, plus:</li>
                <li className="pricing-feature-item"><span>✓</span> Multi-Entity & Multi-Currency Payroll</li>
                <li className="pricing-feature-item"><span>✓</span> Custom SAML SSO & Active Directory</li>
                <li className="pricing-feature-item"><span>✓</span> Dedicated Customer Success Manager</li>
                <li className="pricing-feature-item"><span>✓</span> 99.99% Uptime Guarantee SLA</li>
                <li className="pricing-feature-item"><span>✓</span> Custom API Integrations</li>
              </ul>
            </div>

            <Link to="/register" className="btn btn-secondary" style={{ width: '100%', padding: '0.85rem' }}>
              Contact Enterprise Sales
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================
          8. FAQ ACCORDION
          ======================================================== */}
      <section id="faq" className="faq-section">
        <div className="section-header-center">
          <span className="section-pill">Clear Answers</span>
          <h2 className="section-h2">Frequently Asked Questions</h2>
          <p className="section-lead">
            Have questions about transitioning to SmartHRIS? We have answers.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, idx) => (
            <div key={idx} className={`faq-item ${openFaq === idx ? 'open' : ''}`}>
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                className="faq-question-btn"
              >
                <span>{faq.q}</span>
                <span className="faq-chevron">▾</span>
              </button>

              {openFaq === idx && (
                <div className="faq-answer">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          9. CONVERSION BOTTOM CTA BANNER
          ======================================================== */}
      <section className="cta-banner-section">
        <div className="cta-banner-card">
          <div className="cta-banner-glow"></div>
          
          <h2>Transform your HR operations today</h2>
          <p>
            Join over 2,500+ forward-thinking organizations who use SmartHRIS to automate payroll, empower employees, and eliminate administrative friction.
          </p>

          <div className="cta-actions">
            <Link to="/register" className="btn-cta-white">
              Start Free 14-Day Trial →
            </Link>
            <Link to="/login" className="btn-cta-ghost">
              Sign In to Your Workspace
            </Link>
          </div>

          <div style={{ marginTop: '2rem', fontSize: '0.825rem', color: '#94a3b8', position: 'relative', zIndex: 1 }}>
            ✓ No credit card required • Instant 5-minute setup • Cancel anytime
          </div>
        </div>
      </section>

    </div>
  );
};

export default Landing;

