import React, { useState } from 'react';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('Last 6 Months');
  const [exportMessage, setExportMessage] = useState('');

  // Handle report export simulation
  const handleExport = (format) => {
    setExportMessage(`Preparing ${format.toUpperCase()} Analytics Report for ${timeRange}...`);
    setTimeout(() => {
      setExportMessage(`✅ Analytics Report (${format.toUpperCase()}) downloaded successfully!`);
      setTimeout(() => setExportMessage(''), 4000);
    }, 1200);
  };

  // Department metrics dataset
  const deptPerformance = [
    { name: 'Engineering', score: 85, color: '#9333ea', headcount: 144, label: '45%' },
    { name: 'HR', score: 88, color: '#ec4899', headcount: 48, label: '15%' },
    { name: 'Marketing', score: 82, color: '#c084fc', headcount: 64, label: '20%' },
    { name: 'Finance', score: 90, color: '#f472b6', headcount: 64, label: '20%' },
  ];

  // Turnover reasons dataset
  const turnoverReasons = [
    { reason: 'Career Advancement & Higher Role', percentage: 40, color: '#9333ea' },
    { reason: 'Compensation & Benefits Structure', percentage: 25, color: '#ec4899' },
    { reason: 'Work-Life Balance & Remote Flexibility', percentage: 20, color: '#c084fc' },
    { reason: 'Relocation & Personal Reasons', percentage: 15, color: '#f472b6' }
  ];

  return (
    <div style={{ padding: '2rem 2.5rem', minHeight: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header Info & Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#2e1065', margin: 0 }}>
            HR Analytics & Workforce Intelligence
          </h1>
          <p style={{ fontSize: '0.95rem', color: '#6b21a8', marginTop: '0.25rem', marginBottom: 0 }}>
            Real-time workforce insights, turnover forecasting, department benchmarks, and hiring efficiency.
          </p>
        </div>

        {/* Filter Controls & Export */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            style={{
              padding: '0.6rem 1rem',
              borderRadius: '12px',
              border: '1px solid rgba(147, 51, 234, 0.25)',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              color: '#3b0764',
              fontWeight: 600,
              fontSize: '0.875rem',
              outline: 'none',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(147, 51, 234, 0.08)'
            }}
          >
            <option value="Last 6 Months">Last 6 Months (Jan - Jun 2026)</option>
            <option value="YTD 2026">Year-to-Date (2026)</option>
            <option value="Full Year 2025">Full Year 2025</option>
            <option value="Q2 2026 Focus">Q2 2026 Focus</option>
          </select>

          <button 
            onClick={() => handleExport('pdf')}
            style={{
              padding: '0.6rem 1.25rem',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #9333ea 0%, #c084fc 100%)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.875rem',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(147, 51, 234, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'transform 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Export Report
          </button>
        </div>
      </div>

      {/* Export Notification Toast */}
      {exportMessage && (
        <div style={{
          padding: '0.85rem 1.25rem',
          borderRadius: '12px',
          backgroundColor: '#f3e8ff',
          border: '1px solid #c084fc',
          color: '#581c87',
          fontWeight: 600,
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          animation: 'fadeIn 0.3s ease-in-out'
        }}>
          <span>{exportMessage}</span>
        </div>
      )}

      {/* Top Executive KPI Cards */}
      <section className="kpi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.25rem' }}>
        
        {/* KPI 1: Avg Tenure */}
        <div className="card kpi-card pastel-card-1" style={{ padding: '1.25rem', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div className="kpi-icon pastel-icon-lavender" style={{ width: '42px', height: '42px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
              ⏳
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '20px', backgroundColor: 'rgba(147, 51, 234, 0.12)', color: '#7e22ce' }}>
              +0.3 yrs vs Q1
            </span>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <div className="kpi-value" style={{ fontSize: '1.75rem', fontWeight: 800, color: '#3b0764' }}>2.8 yrs</div>
            <div className="kpi-label" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#6b21a8' }}>Avg Tenure</div>
            <div style={{ fontSize: '0.75rem', color: '#7e22ce', marginTop: '0.25rem', opacity: 0.85 }}>Industry Benchmark: 2.4 yrs</div>
          </div>
        </div>

        {/* KPI 2: Attrition Rate */}
        <div className="card kpi-card pastel-card-2" style={{ padding: '1.25rem', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div className="kpi-icon pastel-icon-pink" style={{ width: '42px', height: '42px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
              📉
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '20px', backgroundColor: 'rgba(236, 72, 153, 0.12)', color: '#be185d' }}>
              ▼ -0.8% YoY
            </span>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <div className="kpi-value" style={{ fontSize: '1.75rem', fontWeight: 800, color: '#831843' }}>3.1%</div>
            <div className="kpi-label" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#9d174d' }}>Annual Attrition Rate</div>
            <div style={{ fontSize: '0.75rem', color: '#be185d', marginTop: '0.25rem', opacity: 0.85 }}>Target Ceiling: &lt; 5.0%</div>
          </div>
        </div>

        {/* KPI 3: Hire Rate */}
        <div className="card kpi-card pastel-card-3" style={{ padding: '1.25rem', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div className="kpi-icon pastel-icon-lilac" style={{ width: '42px', height: '42px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
              📈
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '20px', backgroundColor: 'rgba(192, 132, 252, 0.15)', color: '#7e22ce' }}>
              ▲ +1.2% Q-o-Q
            </span>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <div className="kpi-value" style={{ fontSize: '1.75rem', fontWeight: 800, color: '#4c1d95' }}>8.4%</div>
            <div className="kpi-label" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#6b21a8' }}>Hire Growth Rate</div>
            <div style={{ fontSize: '0.75rem', color: '#7e22ce', marginTop: '0.25rem', opacity: 0.85 }}>42 New Hires in 2026</div>
          </div>
        </div>

        {/* KPI 4: Engagement Index */}
        <div className="card kpi-card pastel-card-4" style={{ padding: '1.25rem', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div className="kpi-icon pastel-icon-blush" style={{ width: '42px', height: '42px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
              ⚡
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '20px', backgroundColor: 'rgba(244, 114, 182, 0.15)', color: '#9f1239' }}>
              ▲ +5 pts vs 2025
            </span>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <div className="kpi-value" style={{ fontSize: '1.75rem', fontWeight: 800, color: '#881337' }}>87 / 100</div>
            <div className="kpi-label" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#9f1239' }}>Engagement Index</div>
            <div style={{ fontSize: '0.75rem', color: '#be123c', marginTop: '0.25rem', opacity: 0.85 }}>94% Survey Response Rate</div>
          </div>
        </div>

      </section>

      {/* Middle Grid: Core Trends (Line charts) */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.5rem' }}>
        
        {/* Employee Growth Chart */}
        <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', backgroundColor: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.6)', boxShadow: '0 8px 32px rgba(147, 51, 234, 0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#2e1065' }}>Employee Growth Trajectory</h3>
              <span style={{ fontSize: '0.8rem', color: '#6b21a8' }}>Active headcount growth over 6 months</span>
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#7e22ce', backgroundColor: '#f3e8ff', padding: '0.25rem 0.75rem', borderRadius: '20px' }}>
              +12% Net Growth
            </span>
          </div>

          <div style={{ height: '210px', width: '100%' }}>
            <svg viewBox="0 0 500 180" width="100%" height="100%">
              <defs>
                <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#9333ea" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#c084fc" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Gridlines */}
              <line x1="40" y1="20" x2="480" y2="20" stroke="#f3e8ff" strokeDasharray="4,4" />
              <line x1="40" y1="70" x2="480" y2="70" stroke="#f3e8ff" strokeDasharray="4,4" />
              <line x1="40" y1="120" x2="480" y2="120" stroke="#f3e8ff" strokeDasharray="4,4" />

              {/* Gradient Area Under Curve */}
              <path d="M 40 140 L 120 120 L 210 98 L 300 82 L 390 55 L 480 32 L 480 150 L 40 150 Z" fill="url(#growthGrad)" />

              {/* Curve Line */}
              <path d="M 40 140 L 120 120 L 210 98 L 300 82 L 390 55 L 480 32" fill="none" stroke="#9333ea" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

              {/* Data Nodes */}
              {[
                { x: 40, y: 140, val: '275' },
                { x: 120, y: 120, val: '284' },
                { x: 210, y: 98, val: '295' },
                { x: 300, y: 82, val: '304' },
                { x: 390, y: 55, val: '315' },
                { x: 480, y: 32, val: '320' }
              ].map((pt, idx) => (
                <g key={idx}>
                  <circle cx={pt.x} cy={pt.y} r="5" fill="#ffffff" stroke="#9333ea" strokeWidth="3" />
                  <text x={pt.x} y={pt.y - 10} fill="#6b21a8" fontSize="9" fontWeight="bold" textAnchor="middle">{pt.val}</text>
                </g>
              ))}

              {/* Month Labels */}
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m, idx) => (
                <text key={idx} x={40 + idx * 88} y="170" fill="#6b21a8" fontSize="10" fontWeight="600" textAnchor="middle">{m}</text>
              ))}
            </svg>
          </div>
        </div>

        {/* Attrition Trend Chart */}
        <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', backgroundColor: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.6)', boxShadow: '0 8px 32px rgba(236, 72, 153, 0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#831843' }}>Monthly Attrition Trend (%)</h3>
              <span style={{ fontSize: '0.8rem', color: '#9d174d' }}>Turnover percentage vs 5% target ceiling</span>
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#be185d', backgroundColor: '#fce7f3', padding: '0.25rem 0.75rem', borderRadius: '20px' }}>
              Healthy & Controlled
            </span>
          </div>

          <div style={{ height: '210px', width: '100%' }}>
            <svg viewBox="0 0 500 180" width="100%" height="100%">
              <defs>
                <linearGradient id="attrGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ec4899" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#f472b6" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Gridlines */}
              <line x1="40" y1="20" x2="480" y2="20" stroke="#fce7f3" strokeDasharray="4,4" />
              <line x1="40" y1="70" x2="480" y2="70" stroke="#fce7f3" strokeDasharray="4,4" />
              <line x1="40" y1="120" x2="480" y2="120" stroke="#fce7f3" strokeDasharray="4,4" />

              {/* Target Threshold Line (5%) */}
              <line x1="40" y1="35" x2="480" y2="35" stroke="#f43f5e" strokeDasharray="3,3" strokeWidth="1.5" />
              <text x="475" y="30" fill="#f43f5e" fontSize="9" fontWeight="bold" textAnchor="end">5.0% Ceiling Target</text>

              {/* Gradient Area */}
              <path d="M 40 45 L 120 62 L 210 90 L 300 108 L 390 120 L 480 135 L 480 150 L 40 150 Z" fill="url(#attrGrad)" />

              {/* Trend Line */}
              <path d="M 40 45 L 120 62 L 210 90 L 300 108 L 390 120 L 480 135" fill="none" stroke="#be185d" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

              {/* Data Nodes */}
              {[
                { x: 40, y: 45, val: '4.5%' },
                { x: 120, y: 62, val: '4.1%' },
                { x: 210, y: 90, val: '3.8%' },
                { x: 300, y: 108, val: '3.4%' },
                { x: 390, y: 120, val: '3.2%' },
                { x: 480, y: 135, val: '3.1%' }
              ].map((pt, idx) => (
                <g key={idx}>
                  <circle cx={pt.x} cy={pt.y} r="5" fill="#ffffff" stroke="#be185d" strokeWidth="3" />
                  <text x={pt.x} y={pt.y - 10} fill="#9d174d" fontSize="9" fontWeight="bold" textAnchor="middle">{pt.val}</text>
                </g>
              ))}

              {/* Month Labels */}
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m, idx) => (
                <text key={idx} x={40 + idx * 88} y="170" fill="#9d174d" fontSize="10" fontWeight="600" textAnchor="middle">{m}</text>
              ))}
            </svg>
          </div>
        </div>

      </section>

      {/* Department Score & Headcount Distribution */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.5rem' }}>
        
        {/* Department Performance Bar Chart */}
        <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', backgroundColor: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.6)', boxShadow: '0 8px 32px rgba(147, 51, 234, 0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#2e1065' }}>Department Performance Index</h3>
              <span style={{ fontSize: '0.8rem', color: '#6b21a8' }}>Based on quarterly KPIs, deliverables & team appraisals</span>
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#7e22ce', backgroundColor: '#f3e8ff', padding: '0.25rem 0.75rem', borderRadius: '20px' }}>
              Target: 80%+
            </span>
          </div>

          <div style={{ height: '210px', width: '100%' }}>
            <svg viewBox="0 0 500 180" width="100%" height="100%">
              <line x1="40" y1="140" x2="480" y2="140" stroke="#e9d5ff" strokeWidth="1.5" />
              
              {/* Engineering: 85% */}
              <rect x="65" y="35" width="45" height="105" rx="8" fill="url(#barGradEng)" />
              <text x="87.5" y="27" fill="#6b21a8" fontSize="10" textAnchor="middle" fontWeight="bold">85%</text>

              {/* HR: 88% */}
              <rect x="175" y="28" width="45" height="112" rx="8" fill="url(#barGradHR)" />
              <text x="197.5" y="20" fill="#9d174d" fontSize="10" textAnchor="middle" fontWeight="bold">88%</text>

              {/* Marketing: 82% */}
              <rect x="285" y="42" width="45" height="98" rx="8" fill="url(#barGradMktg)" />
              <text x="307.5" y="34" fill="#6b21a8" fontSize="10" textAnchor="middle" fontWeight="bold">82%</text>

              {/* Finance: 90% */}
              <rect x="395" y="22" width="45" height="118" rx="8" fill="url(#barGradFin)" />
              <text x="417.5" y="14" fill="#881337" fontSize="10" textAnchor="middle" fontWeight="bold">90%</text>

              {/* Gradients */}
              <defs>
                <linearGradient id="barGradEng" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#9333ea" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
                <linearGradient id="barGradHR" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#f472b6" />
                </linearGradient>
                <linearGradient id="barGradMktg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#e9d5ff" />
                </linearGradient>
                <linearGradient id="barGradFin" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#fda4af" />
                </linearGradient>
              </defs>

              {/* Department X-Axis Labels */}
              <text x="87.5" y="162" fill="#3b0764" fontSize="11" textAnchor="middle" fontWeight="700">Engineering</text>
              <text x="197.5" y="162" fill="#831843" fontSize="11" textAnchor="middle" fontWeight="700">HR</text>
              <text x="307.5" y="162" fill="#581c87" fontSize="11" textAnchor="middle" fontWeight="700">Marketing</text>
              <text x="417.5" y="162" fill="#881337" fontSize="11" textAnchor="middle" fontWeight="700">Finance</text>
            </svg>
          </div>
        </div>

        {/* Headcount Donut Chart */}
        <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', backgroundColor: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.6)', boxShadow: '0 8px 32px rgba(192, 132, 252, 0.05)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#2e1065' }}>Headcount by Department</h3>
              <span style={{ fontSize: '0.8rem', color: '#6b21a8' }}>Total active workforce breakdown (320 employees)</span>
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#581c87', backgroundColor: '#e9d5ff', padding: '0.25rem 0.75rem', borderRadius: '20px' }}>
              320 Total
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flex: 1, flexWrap: 'wrap', gap: '1rem', marginTop: '0.5rem' }}>
            <div style={{ position: 'relative', width: '160px', height: '160px' }}>
              <svg width="160" height="160" viewBox="0 0 200 200">
                {/* Eng: 45% */}
                <circle cx="100" cy="100" r="70" fill="transparent" stroke="#9333ea" strokeWidth="22" strokeDasharray="198 242" strokeDashoffset="0" strokeLinecap="round" />
                {/* HR: 15% */}
                <circle cx="100" cy="100" r="70" fill="transparent" stroke="#ec4899" strokeWidth="22" strokeDasharray="66 374" strokeDashoffset="-203" strokeLinecap="round" />
                {/* Mktg: 20% */}
                <circle cx="100" cy="100" r="70" fill="transparent" stroke="#c084fc" strokeWidth="22" strokeDasharray="88 352" strokeDashoffset="-274" strokeLinecap="round" />
                {/* Fin: 20% */}
                <circle cx="100" cy="100" r="70" fill="transparent" stroke="#f472b6" strokeWidth="22" strokeDasharray="88 352" strokeDashoffset="-367" strokeLinecap="round" />
              </svg>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2e1065' }}>320</span>
                <span style={{ fontSize: '0.7rem', color: '#6b21a8', fontWeight: 600 }}>Staff</span>
              </div>
            </div>

            {/* Detailed Legend Pills */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', minWidth: '170px' }}>
              {deptPerformance.map((dept, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: dept.color, display: 'inline-block' }}></span>
                    <span style={{ color: '#3b0764' }}>{dept.name}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', color: '#6b21a8' }}>
                    <span>{dept.headcount}</span>
                    <span style={{ fontWeight: 800, color: dept.color }}>({dept.label})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* Recruitment Pipeline & Exit Reasons */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.5rem' }}>
        
        {/* Recruitment Pipeline Metrics */}
        <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', backgroundColor: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.6)', boxShadow: '0 8px 32px rgba(147, 51, 234, 0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#2e1065' }}>Recruitment & Hiring Efficiency</h3>
              <span style={{ fontSize: '0.8rem', color: '#6b21a8' }}>Acquisition speed, offer acceptance & cost per hire</span>
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#15803d', backgroundColor: '#dcfce7', padding: '0.25rem 0.75rem', borderRadius: '20px' }}>
              Optimal Performance
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            
            {/* Metric 1 */}
            <div style={{ padding: '1rem', borderRadius: '12px', backgroundColor: '#f3e8ff', border: '1px solid #e9d5ff', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6b21a8', textTransform: 'uppercase', tracking: '0.05em' }}>Time-to-Hire</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#3b0764', marginTop: '0.25rem' }}>22 Days</div>
              <div style={{ fontSize: '0.7rem', color: '#7e22ce', marginTop: '0.25rem', fontWeight: 600 }}>Target: 25 Days (-12%)</div>
            </div>

            {/* Metric 2 */}
            <div style={{ padding: '1rem', borderRadius: '12px', backgroundColor: '#fce7f3', border: '1px solid #fbcfe8', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9d174d', textTransform: 'uppercase', tracking: '0.05em' }}>Cost-per-Hire</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#831843', marginTop: '0.25rem' }}>₹42,000</div>
              <div style={{ fontSize: '0.7rem', color: '#be185d', marginTop: '0.25rem', fontWeight: 600 }}>Saved 16% via Referrals</div>
            </div>

            {/* Metric 3 */}
            <div style={{ padding: '1rem', borderRadius: '12px', backgroundColor: '#fae8ff', border: '1px solid #f5d0fe', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#86198f', textTransform: 'uppercase', tracking: '0.05em' }}>Acceptance Rate</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#701a75', marginTop: '0.25rem' }}>88%</div>
              <div style={{ fontSize: '0.7rem', color: '#a21caf', marginTop: '0.25rem', fontWeight: 600 }}>Target Threshold: 80%</div>
            </div>

          </div>

          {/* Hiring Funnel Summary */}
          <div style={{ marginTop: '1.25rem', padding: '0.85rem 1rem', borderRadius: '12px', backgroundColor: 'rgba(255, 255, 255, 0.7)', border: '1px solid rgba(147, 51, 234, 0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
            <span style={{ color: '#4c1d95', fontWeight: 600 }}>Hiring Funnel Status:</span>
            <div style={{ display: 'flex', gap: '1rem', fontWeight: 700, color: '#6b21a8' }}>
              <span>450 Applicants</span> →
              <span>85 Interviewed</span> →
              <span>42 Hired</span>
            </div>
          </div>
        </div>

        {/* Exit & Turnover Reasons Breakdown */}
        <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', backgroundColor: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.6)', boxShadow: '0 8px 32px rgba(236, 72, 153, 0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#831843' }}>Primary Turnover Drivers</h3>
              <span style={{ fontSize: '0.8rem', color: '#9d174d' }}>Exit interview insight analysis & retention priorities</span>
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#be185d', backgroundColor: '#fce7f3', padding: '0.25rem 0.75rem', borderRadius: '20px' }}>
              Exit Survey Data
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {turnoverReasons.map((item, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  <span style={{ color: '#3b0764' }}>{item.reason}</span>
                  <span style={{ color: item.color, fontWeight: 800 }}>{item.percentage}%</span>
                </div>
                <div style={{ width: '100%', height: '10px', backgroundColor: '#f3e8ff', borderRadius: '10px', overflow: 'hidden' }}>
                  <div 
                    style={{ 
                      width: `${item.percentage}%`, 
                      height: '100%', 
                      backgroundColor: item.color, 
                      borderRadius: '10px',
                      transition: 'width 0.8s ease-in-out'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Executive Summary & Insights Banner */}
      <section className="card pastel-card-1" style={{ padding: '1.5rem 2rem', borderRadius: '16px', border: '1px solid rgba(147, 51, 234, 0.2)', boxShadow: '0 8px 32px rgba(147, 51, 234, 0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#9333ea', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 800 }}>
            💡
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#2e1065' }}>Executive HR Intelligence Takeaways</h3>
            <span style={{ fontSize: '0.8rem', color: '#6b21a8' }}>Strategic actionable insights generated from Q2 analytics</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginTop: '1rem' }}>
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(147, 51, 234, 0.15)' }}>
            <div style={{ fontWeight: 700, color: '#3b0764', fontSize: '0.9rem', marginBottom: '0.25rem' }}>🚀 Engineering Retention Peak</div>
            <div style={{ fontSize: '0.825rem', color: '#581c87', lineHeight: 1.5 }}>
              Engineering retention improved by 14% post H1 appraisal reviews due to aligned promotion benchmarks and skill development stipends.
            </div>
          </div>

          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(236, 72, 153, 0.15)' }}>
            <div style={{ fontWeight: 700, color: '#831843', fontSize: '0.9rem', marginBottom: '0.25rem' }}>🎯 Hiring Speed Optimizations</div>
            <div style={{ fontSize: '0.825rem', color: '#9d174d', lineHeight: 1.5 }}>
              Average time-to-hire dropped to 22 days via automated resume filtering and structured 2-stage technical assessments.
            </div>
          </div>

          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(192, 132, 252, 0.15)' }}>
            <div style={{ fontWeight: 700, color: '#4c1d95', fontSize: '0.9rem', marginBottom: '0.25rem' }}>📈 Recommended Focus for Q3</div>
            <div style={{ fontSize: '0.825rem', color: '#6b21a8', lineHeight: 1.5 }}>
              Focus career pathing programs on mid-level roles to address the 40% career advancement exit driver identified in exit surveys.
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Analytics;
