import React from 'react';

const Analytics = () => {
  return (
    <div className="dashboard-content">
      
      {/* Header Info */}
      <div className="dashboard-header-row">
        <div>
          <h1 style={{ background: 'none', WebkitTextFillColor: 'initial', fontSize: '1.75rem', fontWeight: 800 }}>
            Analytics & Reports
          </h1>
          <div className="dashboard-subtitle">
            Track key HR performance indicators, attrition trends, headcount distributions, and organizational health metrics.
          </div>
        </div>
      </div>

      {/* KPI statistics cards */}
      <section className="kpi-grid">
        <div className="card kpi-card">
          <div className="kpi-icon bg-blue">⏳</div>
          <div>
            <div className="kpi-value">2.8 yrs</div>
            <div className="kpi-label">Avg Tenure</div>
            <div className="kpi-change up">▲ +0.3 vs last period</div>
          </div>
        </div>

        <div className="card kpi-card">
          <div className="kpi-icon bg-orange">📉</div>
          <div>
            <div className="kpi-value">3.1%</div>
            <div className="kpi-label">Attrition Rate</div>
            <div className="kpi-change down">▼ -0.8% vs last period</div>
          </div>
        </div>

        <div className="card kpi-card">
          <div className="kpi-icon bg-green">📈</div>
          <div>
            <div className="kpi-value">8.4%</div>
            <div className="kpi-label">Hire Rate</div>
            <div className="kpi-change up">▲ +1.2% vs last period</div>
          </div>
        </div>

        <div className="card kpi-card">
          <div className="kpi-icon bg-purple">⚡</div>
          <div>
            <div className="kpi-value">87/100</div>
            <div className="kpi-label">Eng. Score</div>
            <div className="kpi-change up">▲ +5 vs last period</div>
          </div>
        </div>
      </section>

      {/* Middle Row (Line charts) */}
      <section className="dashboard-grid-2-1">
        
        {/* Employee Growth */}
        <div className="card">
          <div className="card-title">Employee Growth</div>
          <div className="chart-container" style={{ height: '200px' }}>
            <svg viewBox="0 0 500 180" width="100%" height="100%">
              <line x1="30" y1="30" x2="480" y2="30" stroke="var(--border-color)" strokeDasharray="3,3" />
              <line x1="30" y1="85" x2="480" y2="85" stroke="var(--border-color)" strokeDasharray="3,3" />
              <line x1="30" y1="140" x2="480" y2="140" stroke="var(--border-color)" strokeDasharray="3,3" />
              
              {/* Path area */}
              <path d="M 30 140 L 120 120 L 210 100 L 300 85 L 390 60 L 480 40 L 480 150 L 30 150 Z" fill="url(#chartGrad1)" opacity="0.15" />
              <defs>
                <linearGradient id="chartGrad1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary-color)" />
                  <stop offset="100%" stopColor="var(--primary-color)" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              <path d="M 30 140 L 120 120 L 210 100 L 300 85 L 390 60 L 480 40" fill="none" stroke="var(--primary-color)" strokeWidth="3" />
              
              <circle cx="30" cy="140" r="4" fill="var(--primary-color)" />
              <circle cx="120" cy="120" r="4" fill="var(--primary-color)" />
              <circle cx="210" cy="100" r="4" fill="var(--primary-color)" />
              <circle cx="300" cy="85" r="4" fill="var(--primary-color)" />
              <circle cx="390" cy="60" r="4" fill="var(--primary-color)" />
              <circle cx="480" cy="40" r="4" fill="var(--primary-color)" />

              <text x="30" y="165" fill="var(--text-muted)" fontSize="9" textAnchor="middle">Jan</text>
              <text x="120" y="165" fill="var(--text-muted)" fontSize="9" textAnchor="middle">Feb</text>
              <text x="210" y="165" fill="var(--text-muted)" fontSize="9" textAnchor="middle">Mar</text>
              <text x="300" y="165" fill="var(--text-muted)" fontSize="9" textAnchor="middle">Apr</text>
              <text x="390" y="165" fill="var(--text-muted)" fontSize="9" textAnchor="middle">May</text>
              <text x="480" y="165" fill="var(--text-muted)" fontSize="9" textAnchor="middle">Jun</text>
            </svg>
          </div>
        </div>

        {/* Attrition Trend */}
        <div className="card">
          <div className="card-title">Attrition Trend (%)</div>
          <div className="chart-container" style={{ height: '200px' }}>
            <svg viewBox="0 0 500 180" width="100%" height="100%">
              <line x1="30" y1="30" x2="480" y2="30" stroke="var(--border-color)" strokeDasharray="3,3" />
              <line x1="30" y1="85" x2="480" y2="85" stroke="var(--border-color)" strokeDasharray="3,3" />
              <line x1="30" y1="140" x2="480" y2="140" stroke="var(--border-color)" strokeDasharray="3,3" />
              
              <path d="M 30 40 L 120 60 L 210 90 L 300 110 L 390 120 L 480 135" fill="none" stroke="var(--danger-color)" strokeWidth="3" />
              
              <circle cx="30" cy="40" r="4" fill="var(--danger-color)" />
              <circle cx="120" cy="60" r="4" fill="var(--danger-color)" />
              <circle cx="210" cy="90" r="4" fill="var(--danger-color)" />
              <circle cx="300" cy="110" r="4" fill="var(--danger-color)" />
              <circle cx="390" cy="120" r="4" fill="var(--danger-color)" />
              <circle cx="480" cy="135" r="4" fill="var(--danger-color)" />

              <text x="30" y="165" fill="var(--text-muted)" fontSize="9" textAnchor="middle">Jan</text>
              <text x="120" y="165" fill="var(--text-muted)" fontSize="9" textAnchor="middle">Feb</text>
              <text x="210" y="165" fill="var(--text-muted)" fontSize="9" textAnchor="middle">Mar</text>
              <text x="300" y="165" fill="var(--text-muted)" fontSize="9" textAnchor="middle">Apr</text>
              <text x="390" y="165" fill="var(--text-muted)" fontSize="9" textAnchor="middle">May</text>
              <text x="480" y="165" fill="var(--text-muted)" fontSize="9" textAnchor="middle">Jun</text>
            </svg>
          </div>
        </div>

      </section>

      {/* Bottom Row (Bars & Donut) */}
      <section className="dashboard-grid-2-1">
        
        {/* Department performance score */}
        <div className="card">
          <div className="card-title">Department Performance Score</div>
          <div className="chart-container" style={{ height: '220px' }}>
            <svg viewBox="0 0 500 180" width="100%" height="100%">
              <line x1="30" y1="140" x2="480" y2="140" stroke="var(--border-color)" />
              
              {/* Engineering: 85 */}
              <rect x="50" y="30" width="40" height="110" rx="4" fill="var(--primary-color)" />
              <text x="70" y="24" fill="var(--text-primary)" fontSize="9" textAnchor="middle" fontWeight="bold">85%</text>
              
              {/* HR: 88 */}
              <rect x="160" y="26" width="40" height="114" rx="4" fill="var(--accent-color)" />
              <text x="180" y="20" fill="var(--text-primary)" fontSize="9" textAnchor="middle" fontWeight="bold">88%</text>
              
              {/* Marketing: 82 */}
              <rect x="270" y="34" width="40" height="106" rx="4" fill="var(--success-color)" />
              <text x="290" y="28" fill="var(--text-primary)" fontSize="9" textAnchor="middle" fontWeight="bold">82%</text>
              
              {/* Finance: 90 */}
              <rect x="380" y="20" width="40" height="120" rx="4" fill="var(--warning-color)" />
              <text x="400" y="14" fill="var(--text-primary)" fontSize="9" textAnchor="middle" fontWeight="bold">90%</text>
              
              {/* Labels */}
              <text x="70" y="160" fill="var(--text-secondary)" fontSize="9" textAnchor="middle" fontWeight="bold">Engineering</text>
              <text x="180" y="160" fill="var(--text-secondary)" fontSize="9" textAnchor="middle" fontWeight="bold">HR</text>
              <text x="290" y="160" fill="var(--text-secondary)" fontSize="9" textAnchor="middle" fontWeight="bold">Marketing</text>
              <text x="400" y="160" fill="var(--text-secondary)" fontSize="9" textAnchor="middle" fontWeight="bold">Finance</text>
            </svg>
          </div>
        </div>

        {/* Headcount donut */}
        <div className="card">
          <div className="card-title">Headcount by Dept</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '220px' }}>
            <svg width="150" height="150" viewBox="0 0 200 200">
              {/* Engineering: 45% */}
              <circle cx="100" cy="100" r="70" fill="transparent" stroke="var(--primary-color)" strokeWidth="20" strokeDasharray="198 242" strokeDashoffset="0" />
              {/* Design: 15% */}
              <circle cx="100" cy="100" r="70" fill="transparent" stroke="var(--accent-color)" strokeWidth="20" strokeDasharray="66 374" strokeDashoffset="-198" />
              {/* Marketing: 20% */}
              <circle cx="100" cy="100" r="70" fill="transparent" stroke="var(--success-color)" strokeWidth="20" strokeDasharray="88 352" strokeDashoffset="-264" />
              {/* Finance: 20% */}
              <circle cx="100" cy="100" r="70" fill="transparent" stroke="var(--warning-color)" strokeWidth="20" strokeDasharray="88 352" strokeDashoffset="-352" />
              
              <circle cx="100" cy="100" r="55" fill="var(--bg-secondary)" />
            </svg>
            
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.85rem', fontSize: '0.7rem', fontWeight: 600 }}>
              <span style={{ color: 'var(--primary-color)' }}>Eng 45%</span>
              <span style={{ color: 'var(--accent-color)' }}>Design 15%</span>
              <span style={{ color: 'var(--success-color)' }}>Mktg 20%</span>
              <span style={{ color: 'var(--warning-color)' }}>Fin 20%</span>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
};

export default Analytics;
