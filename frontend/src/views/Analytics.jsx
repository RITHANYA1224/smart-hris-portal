import React, { useState } from 'react';

const Analytics = () => {
  const [selectedRange, setSelectedRange] = useState('Full Year 2026');

  // Department headcount dataset
  const deptData = [
    { name: 'Eng 45%', color: 'var(--primary-color)' },
    { name: 'Design 15%', color: 'var(--accent-color)' },
    { name: 'Mktg 20%', color: 'var(--success-color)' },
    { name: 'Fin 20%', color: 'var(--warning-color)' },
  ];

  // Full 12 Months Master Dataset
  const fullGrowthData = [
    { month: 'Jan', val: 275, valStr: '275', y: 140, isForecast: false },
    { month: 'Feb', val: 284, valStr: '284', y: 125, isForecast: false },
    { month: 'Mar', val: 295, valStr: '295', y: 110, isForecast: false },
    { month: 'Apr', val: 304, valStr: '304', y: 98, isForecast: false },
    { month: 'May', val: 315, valStr: '315', y: 85, isForecast: false },
    { month: 'Jun', val: 320, valStr: '320', y: 78, isForecast: false },
    { month: 'Jul', val: 328, valStr: '328', y: 70, isForecast: false },
    { month: 'Aug', val: 335, valStr: '335', y: 62, isForecast: false },
    { month: 'Sep', val: 342, valStr: '342', y: 54, isForecast: false },
    { month: 'Oct', val: 350, valStr: '350', y: 45, isForecast: true },
    { month: 'Nov', val: 358, valStr: '358', y: 36, isForecast: true },
    { month: 'Dec', val: 365, valStr: '365', y: 28, isForecast: true },
  ];

  const fullAttritionData = [
    { month: 'Jan', valStr: '4.5%', y: 40, isForecast: false },
    { month: 'Feb', valStr: '4.1%', y: 55, isForecast: false },
    { month: 'Mar', valStr: '3.8%', y: 70, isForecast: false },
    { month: 'Apr', valStr: '3.4%', y: 88, isForecast: false },
    { month: 'May', valStr: '3.2%', y: 96, isForecast: false },
    { month: 'Jun', valStr: '3.1%', y: 102, isForecast: false },
    { month: 'Jul', valStr: '2.9%', y: 110, isForecast: false },
    { month: 'Aug', valStr: '2.8%', y: 116, isForecast: false },
    { month: 'Sep', valStr: '2.7%', y: 120, isForecast: false },
    { month: 'Oct', valStr: '2.6%', y: 125, isForecast: true },
    { month: 'Nov', valStr: '2.5%', y: 130, isForecast: true },
    { month: 'Dec', valStr: '2.4%', y: 135, isForecast: true },
  ];

  // Filter dataset based on selected range
  const getFilteredPoints = (data) => {
    if (selectedRange === 'H1 Historical') {
      return data.slice(0, 6);
    }
    if (selectedRange === 'H2 Forecast (Jul-Dec)') {
      return data.slice(6, 12);
    }
    return data; // Full Year 2026
  };

  const currentGrowth = getFilteredPoints(fullGrowthData);
  const currentAttrition = getFilteredPoints(fullAttritionData);

  // Compute X positions dynamically based on filtered length
  const computeX = (index, total) => {
    const startX = 35;
    const endX = 465;
    if (total <= 1) return (startX + endX) / 2;
    return startX + index * ((endX - startX) / (total - 1));
  };

  return (
    <div className="dashboard-content">
      
      {/* Header Info & Time Selector */}
      <div className="dashboard-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ background: 'none', WebkitTextFillColor: 'initial', fontSize: '1.75rem', fontWeight: 800 }}>
            Analytics & Reports
          </h1>
          <div className="dashboard-subtitle">
            Track key HR metrics, workforce growth, attrition trends, and predictive projections for upcoming months.
          </div>
        </div>

        {/* Range Selector Options */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '0.35rem', borderRadius: '12px', border: '1px solid rgba(147, 51, 234, 0.2)' }}>
          {['Full Year 2026', 'H2 Forecast (Jul-Dec)', 'H1 Historical'].map((range) => (
            <button
              key={range}
              onClick={() => setSelectedRange(range)}
              style={{
                padding: '0.45rem 0.85rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: selectedRange === range ? 'var(--primary-color)' : 'transparent',
                color: selectedRange === range ? '#ffffff' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '0.75rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {range}
            </button>
          ))}
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
            <div className="kpi-value">2.7%</div>
            <div className="kpi-label">Current Attrition</div>
            <div className="kpi-change down" style={{ color: '#be185d' }}>▼ -0.8% YoY (Forecast: 2.4%)</div>
          </div>
        </div>

        {/* Card 3: Hire Rate */}
        <div className="card kpi-card pastel-card-3">
          <div className="kpi-icon pastel-icon-lilac">📈</div>
          <div>
            <div className="kpi-value">8.4%</div>
            <div className="kpi-label">Hire Rate</div>
            <div className="kpi-change up" style={{ color: '#86198f' }}>▲ +1.2% Q-o-Q</div>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <div className="card-title" style={{ margin: 0 }}>Employee Growth ({selectedRange})</div>
            <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.7rem', fontWeight: 700 }}>
              <span style={{ color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary-color)' }}></span> Actuals (Jan-Sep)
              </span>
              <span style={{ color: '#a855f7', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#a855f7', opacity: 0.6 }}></span> Forecast (Oct-Dec)
              </span>
            </div>
          </div>

          <div className="chart-container" style={{ height: '215px' }}>
            <svg viewBox="0 0 500 180" width="100%" height="100%">
              <defs>
                <linearGradient id="chartGrad1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="var(--primary-color)" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              
              <line x1="30" y1="30" x2="470" y2="30" stroke="var(--border-color)" strokeDasharray="3,3" />
              <line x1="30" y1="85" x2="470" y2="85" stroke="var(--border-color)" strokeDasharray="3,3" />
              <line x1="30" y1="140" x2="470" y2="140" stroke="var(--border-color)" strokeDasharray="3,3" />

              {/* Shaded Area Under Path */}
              {currentGrowth.length > 0 && (
                <path
                  d={`M ${computeX(0, currentGrowth.length)} 140 ` +
                    currentGrowth.map((pt, idx) => `L ${computeX(idx, currentGrowth.length)} ${pt.y}`).join(' ') +
                    ` L ${computeX(currentGrowth.length - 1, currentGrowth.length)} 150 L ${computeX(0, currentGrowth.length)} 150 Z`}
                  fill="url(#chartGrad1)"
                />
              )}

              {/* Line Curve */}
              {currentGrowth.length > 0 && (
                <path
                  d={currentGrowth.map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${computeX(idx, currentGrowth.length)} ${pt.y}`).join(' ')}
                  fill="none"
                  stroke="var(--primary-color)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              )}

              {/* Data Nodes & Month Labels */}
              {currentGrowth.map((pt, i) => {
                const posX = computeX(i, currentGrowth.length);
                return (
                  <g key={i}>
                    <circle cx={posX} cy={pt.y} r="3.5" fill={pt.isForecast ? '#f3e8ff' : 'var(--primary-color)'} stroke="var(--primary-color)" strokeWidth="2" />
                    <text x={posX} y={pt.y - 8} fill={pt.isForecast ? '#7e22ce' : 'var(--text-secondary)'} fontSize="8" fontWeight="bold" textAnchor="middle">{pt.valStr}</text>
                    <text x={posX} y="165" fill={pt.isForecast ? '#9333ea' : 'var(--text-muted)'} fontSize="9" fontWeight={pt.isForecast ? 'bold' : 'normal'} textAnchor="middle">{pt.month}</text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Attrition Trend (%) Chart */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <div className="card-title" style={{ margin: 0 }}>Attrition Trend ({selectedRange})</div>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--danger-color)' }}>
              Target Ceiling: &lt; 5.0%
            </span>
          </div>

          <div className="chart-container" style={{ height: '215px' }}>
            <svg viewBox="0 0 500 180" width="100%" height="100%">
              <defs>
                <linearGradient id="chartGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--danger-color)" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="var(--danger-color)" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              <line x1="30" y1="30" x2="470" y2="30" stroke="var(--border-color)" strokeDasharray="3,3" />
              <line x1="30" y1="85" x2="470" y2="85" stroke="var(--border-color)" strokeDasharray="3,3" />
              <line x1="30" y1="140" x2="470" y2="140" stroke="var(--border-color)" strokeDasharray="3,3" />
              
              {/* Target 5% Line */}
              <line x1="30" y1="35" x2="470" y2="35" stroke="#f43f5e" strokeDasharray="2,2" strokeWidth="1" />

              {/* Shaded Area Under Path */}
              {currentAttrition.length > 0 && (
                <path
                  d={`M ${computeX(0, currentAttrition.length)} 140 ` +
                    currentAttrition.map((pt, idx) => `L ${computeX(idx, currentAttrition.length)} ${pt.y}`).join(' ') +
                    ` L ${computeX(currentAttrition.length - 1, currentAttrition.length)} 150 L ${computeX(0, currentAttrition.length)} 150 Z`}
                  fill="url(#chartGrad2)"
                />
              )}

              {/* Line Curve */}
              {currentAttrition.length > 0 && (
                <path
                  d={currentAttrition.map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${computeX(idx, currentAttrition.length)} ${pt.y}`).join(' ')}
                  fill="none"
                  stroke="var(--danger-color)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              )}

              {/* Nodes & Labels */}
              {currentAttrition.map((pt, i) => {
                const posX = computeX(i, currentAttrition.length);
                return (
                  <g key={i}>
                    <circle cx={posX} cy={pt.y} r="3.5" fill={pt.isForecast ? '#fce7f3' : 'var(--danger-color)'} stroke="var(--danger-color)" strokeWidth="2" />
                    <text x={posX} y={pt.y - 8} fill={pt.isForecast ? '#9d174d' : 'var(--text-secondary)'} fontSize="8" fontWeight="bold" textAnchor="middle">{pt.valStr}</text>
                    <text x={posX} y="165" fill={pt.isForecast ? '#be185d' : 'var(--text-muted)'} fontSize="9" fontWeight={pt.isForecast ? 'bold' : 'normal'} textAnchor="middle">{pt.month}</text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

      </section>

      {/* Bar & Donut Grid Row */}
      <section className="dashboard-grid-2-1">
        
        {/* Department Performance Score Bar Chart */}
        <div className="card">
          <div className="card-title">Department Performance Score</div>
          <div className="chart-container" style={{ height: '210px' }}>
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
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '210px' }}>
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

      {/* Balanced Summary Section with Upcoming Projections */}
      <section className="dashboard-grid-2-1">
        
        {/* Recruitment & Upcoming Projections */}
        <div className="card pastel-card-1" style={{ padding: '1.25rem' }}>
          <div className="card-title" style={{ color: '#2e1065', marginBottom: '0.85rem' }}>Hiring Efficiency & Upcoming Targets</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', textAlign: 'center' }}>
            <div style={{ padding: '0.75rem', backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '10px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6b21a8' }}>Time-to-Hire</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#3b0764', marginTop: '0.2rem' }}>22 Days</div>
            </div>
            <div style={{ padding: '0.75rem', backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '10px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#9d174d' }}>Dec 2026 Target</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#831843', marginTop: '0.2rem' }}>365 Staff</div>
            </div>
            <div style={{ padding: '0.75rem', backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '10px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#86198f' }}>Acceptance Rate</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#701a75', marginTop: '0.2rem' }}>88%</div>
            </div>
          </div>
        </div>

        {/* Upcoming Months Predictive Insights */}
        <div className="card pastel-card-2" style={{ padding: '1.25rem' }}>
          <div className="card-title" style={{ color: '#831843', marginBottom: '0.85rem' }}>Upcoming Months Projection (Oct - Dec)</div>
          <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.825rem', color: '#9d174d', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontWeight: 600 }}>
            <li>Headcount projected to reach 365 employees by year-end (+23 hires).</li>
            <li>Attrition rate forecasted to drop further to 2.4% in Q4.</li>
            <li>Q4 recruitment focus: Engineering & Cloud Infrastructure talent.</li>
          </ul>
        </div>

      </section>

    </div>
  );
};

export default Analytics;
