import React from 'react';

const Analytics = () => {
  // Department headcount dataset
  const deptData = [
    { name: 'Eng 45%', color: 'var(--primary-color)' },
    { name: 'Design 15%', color: 'var(--accent-color)' },
    { name: 'Mktg 20%', color: 'var(--success-color)' },
    { name: 'Fin 20%', color: 'var(--warning-color)' },
  ];

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
        
        {/* Card 1: Avg Tenure */}
        <div className="card kpi-card pastel-card-1">
          <div className="kpi-icon pastel-icon-lavender">⏳</div>
          <div>
            <div className="kpi-value">2.8 yrs</div>
            <div className="kpi-label">Avg Tenure</div>
            <div className="kpi-change up" style={{ color: '#7e22ce' }}>▲ +0.3 vs last period</div>
          </div>
        </div>

        {/* Card 2: Attrition Rate */}
        <div className="card kpi-card pastel-card-2">
          <div className="kpi-icon pastel-icon-pink">📉</div>
          <div>
            <div className="kpi-value">3.1%</div>
            <div className="kpi-label">Attrition Rate</div>
            <div className="kpi-change down" style={{ color: '#be185d' }}>▼ -0.8% vs last period</div>
          </div>
        </div>

        {/* Card 3: Hire Rate */}
        <div className="card kpi-card pastel-card-3">
          <div className="kpi-icon pastel-icon-lilac">📈</div>
          <div>
            <div className="kpi-value">8.4%</div>
            <div className="kpi-label">Hire Rate</div>
            <div className="kpi-change up" style={{ color: '#86198f' }}>▲ +1.2% vs last period</div>
          </div>
        </div>

        {/* Card 4: Eng. Score */}
        <div className="card kpi-card pastel-card-4">
          <div className="kpi-icon pastel-icon-blush">⚡</div>
          <div>
            <div className="kpi-value">87/100</div>
            <div className="kpi-label">Eng. Score</div>
            <div className="kpi-change up" style={{ color: '#9f1239' }}>▲ +5 vs last period</div>
          </div>
        </div>

      </section>

      {/* Line Charts Grid Row */}
      <section className="dashboard-grid-2-1">
        
        {/* Employee Growth Chart */}
        <div className="card">
          <div className="card-title">Employee Growth</div>
          <div className="chart-container" style={{ height: '210px' }}>
            <svg viewBox="0 0 500 180" width="100%" height="100%">
              <defs>
                <linearGradient id="chartGrad1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="var(--primary-color)" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              
              <line x1="30" y1="30" x2="480" y2="30" stroke="var(--border-color)" strokeDasharray="3,3" />
              <line x1="30" y1="85" x2="480" y2="85" stroke="var(--border-color)" strokeDasharray="3,3" />
              <line x1="30" y1="140" x2="480" y2="140" stroke="var(--border-color)" strokeDasharray="3,3" />
              
              {/* Path area */}
              <path d="M 30 140 L 120 120 L 210 100 L 300 85 L 390 60 L 480 40 L 480 150 L 30 150 Z" fill="url(#chartGrad1)" />
              <path d="M 30 140 L 120 120 L 210 100 L 300 85 L 390 60 L 480 40" fill="none" stroke="var(--primary-color)" strokeWidth="3" strokeLinecap="round" />
              
              <circle cx="30" cy="140" r="4" fill="var(--primary-color)" />
              <circle cx="120" cy="120" r="4" fill="var(--primary-color)" />
              <circle cx="210" cy="100" r="4" fill="var(--primary-color)" />
              <circle cx="300" cy="85" r="4" fill="var(--primary-color)" />
              <circle cx="390" cy="60" r="4" fill="var(--primary-color)" />
              <circle cx="480" cy="40" r="4" fill="var(--primary-color)" />

              <text x="30" y="165" fill="var(--text-muted)" fontSize="10" textAnchor="middle">Jan</text>
              <text x="120" y="165" fill="var(--text-muted)" fontSize="10" textAnchor="middle">Feb</text>
              <text x="210" y="165" fill="var(--text-muted)" fontSize="10" textAnchor="middle">Mar</text>
              <text x="300" y="165" fill="var(--text-muted)" fontSize="10" textAnchor="middle">Apr</text>
              <text x="390" y="165" fill="var(--text-muted)" fontSize="10" textAnchor="middle">May</text>
              <text x="480" y="165" fill="var(--text-muted)" fontSize="10" textAnchor="middle">Jun</text>
            </svg>
          </div>
        </div>

        {/* Attrition Trend (%) Chart */}
        <div className="card">
          <div className="card-title">Attrition Trend (%)</div>
          <div className="chart-container" style={{ height: '210px' }}>
            <svg viewBox="0 0 500 180" width="100%" height="100%">
              <defs>
                <linearGradient id="chartGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--danger-color)" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="var(--danger-color)" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              <line x1="30" y1="30" x2="480" y2="30" stroke="var(--border-color)" strokeDasharray="3,3" />
              <line x1="30" y1="85" x2="480" y2="85" stroke="var(--border-color)" strokeDasharray="3,3" />
              <line x1="30" y1="140" x2="480" y2="140" stroke="var(--border-color)" strokeDasharray="3,3" />
              
              <path d="M 30 40 L 120 60 L 210 90 L 300 110 L 390 120 L 480 135 L 480 150 L 30 150 Z" fill="url(#chartGrad2)" />
              <path d="M 30 40 L 120 60 L 210 90 L 300 110 L 390 120 L 480 135" fill="none" stroke="var(--danger-color)" strokeWidth="3" strokeLinecap="round" />
              
              <circle cx="30" cy="40" r="4" fill="var(--danger-color)" />
              <circle cx="120" cy="60" r="4" fill="var(--danger-color)" />
              <circle cx="210" cy="90" r="4" fill="var(--danger-color)" />
              <circle cx="300" cy="110" r="4" fill="var(--danger-color)" />
              <circle cx="390" cy="120" r="4" fill="var(--danger-color)" />
              <circle cx="480" cy="135" r="4" fill="var(--danger-color)" />

              <text x="30" y="165" fill="var(--text-muted)" fontSize="10" textAnchor="middle">Jan</text>
              <text x="120" y="165" fill="var(--text-muted)" fontSize="10" textAnchor="middle">Feb</text>
              <text x="210" y="165" fill="var(--text-muted)" fontSize="10" textAnchor="middle">Mar</text>
              <text x="300" y="165" fill="var(--text-muted)" fontSize="10" textAnchor="middle">Apr</text>
              <text x="390" y="165" fill="var(--text-muted)" fontSize="10" textAnchor="middle">May</text>
              <text x="480" y="165" fill="var(--text-muted)" fontSize="10" textAnchor="middle">Jun</text>
            </svg>
          </div>
        </div>

      </section>

      {/* Bar & Donut Grid Row */}
      <section className="dashboard-grid-2-1">
        
        {/* Department Performance Score Bar Chart */}
        <div className="card">
          <div className="card-title">Department Performance Score</div>
          <div className="chart-container" style={{ height: '220px' }}>
            <svg viewBox="0 0 500 180" width="100%" height="100%">
              <line x1="30" y1="140" x2="480" y2="140" stroke="var(--border-color)" />
              
              {/* Engineering: 85% */}
              <rect x="50" y="30" width="42" height="110" rx="6" fill="var(--primary-color)" />
              <text x="71" y="24" fill="var(--text-primary)" fontSize="10" textAnchor="middle" fontWeight="bold">85%</text>
              
              {/* HR: 88% */}
              <rect x="160" y="26" width="42" height="114" rx="6" fill="var(--accent-color)" />
              <text x="181" y="20" fill="var(--text-primary)" fontSize="10" textAnchor="middle" fontWeight="bold">88%</text>
              
              {/* Marketing: 82% */}
              <rect x="270" y="34" width="42" height="106" rx="6" fill="var(--success-color)" />
              <text x="291" y="28" fill="var(--text-primary)" fontSize="10" textAnchor="middle" fontWeight="bold">82%</text>
              
              {/* Finance: 90% */}
              <rect x="380" y="20" width="42" height="120" rx="6" fill="var(--warning-color)" />
              <text x="401" y="14" fill="var(--text-primary)" fontSize="10" textAnchor="middle" fontWeight="bold">90%</text>
              
              {/* Labels */}
              <text x="71" y="160" fill="var(--text-secondary)" fontSize="10" textAnchor="middle" fontWeight="bold">Engineering</text>
              <text x="181" y="160" fill="var(--text-secondary)" fontSize="10" textAnchor="middle" fontWeight="bold">HR</text>
              <text x="291" y="160" fill="var(--text-secondary)" fontSize="10" textAnchor="middle" fontWeight="bold">Marketing</text>
              <text x="401" y="160" fill="var(--text-secondary)" fontSize="10" textAnchor="middle" fontWeight="bold">Finance</text>
            </svg>
          </div>
        </div>

        {/* Headcount Donut Chart */}
        <div className="card">
          <div className="card-title">Headcount by Dept</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '220px' }}>
            <svg width="140" height="140" viewBox="0 0 200 200">
              {/* Eng: 45% */}
              <circle cx="100" cy="100" r="70" fill="transparent" stroke="var(--primary-color)" strokeWidth="20" strokeDasharray="198 242" strokeDashoffset="0" />
              {/* Design: 15% */}
              <circle cx="100" cy="100" r="70" fill="transparent" stroke="var(--accent-color)" strokeWidth="20" strokeDasharray="66 374" strokeDashoffset="-198" />
              {/* Marketing: 20% */}
              <circle cx="100" cy="100" r="70" fill="transparent" stroke="var(--success-color)" strokeWidth="20" strokeDasharray="88 352" strokeDashoffset="-264" />
              {/* Finance: 20% */}
              <circle cx="100" cy="100" r="70" fill="transparent" stroke="var(--warning-color)" strokeWidth="20" strokeDasharray="88 352" strokeDashoffset="-352" />
              
              <circle cx="100" cy="100" r="55" fill="var(--bg-secondary)" />
            </svg>
            
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.85rem', fontSize: '0.75rem', fontWeight: 700 }}>
              {deptData.map((d, i) => (
                <span key={i} style={{ color: d.color }}>{d.name}</span>
              ))}
            </div>
          </div>
        </div>

      </section>
    </div>
  );
};

export default Analytics;
