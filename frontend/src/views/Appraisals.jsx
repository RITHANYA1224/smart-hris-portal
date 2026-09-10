import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import appraisalService from '../services/appraisalService';

const Appraisals = () => {
  const { authState } = useContext(AuthContext);
  const { role } = authState;
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Table filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [cycleFilter, setCycleFilter] = useState('All');

  const handleStartCycle = async () => {
    try {
      await appraisalService.startAppraisalCycle('2026');
      setSuccess('Performance appraisal cycle 2026 started successfully.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to start appraisal cycle.');
    }
  };

  // Master Appraisal List (preserving all original entries and enriching with department & increment metrics)
  const appraisals = [
    { id: 1, employeeName: 'Priya Sharma', department: 'Engineering', cycleYear: '2026', selfRating: 4.5, managerRating: 4.8, finalRating: 4.7, increment: '12%', status: 'CLOSED' },
    { id: 2, employeeName: 'Rithanya S', department: 'Product Design', cycleYear: '2026', selfRating: 4.2, managerRating: 4.5, finalRating: 4.4, increment: '10%', status: 'MANAGER_REVIEW' },
    { id: 3, employeeName: 'Ethan Vance', department: 'DevOps & Cloud', cycleYear: '2026', selfRating: 4.0, managerRating: 4.1, finalRating: 4.0, increment: '8%', status: 'SELF_REVIEW' },
    { id: 4, employeeName: 'Arun Kumar', department: 'Backend Engineering', cycleYear: '2026', selfRating: 4.6, managerRating: 4.9, finalRating: 4.8, increment: '15%', status: 'CLOSED' },
    { id: 5, employeeName: 'Amara Chen', department: 'Human Resources', cycleYear: '2026', selfRating: 4.3, managerRating: 4.6, finalRating: 4.5, increment: '11%', status: 'MANAGER_REVIEW' },
    { id: 6, employeeName: 'Devon Lane', department: 'Database Architecture', cycleYear: '2026', selfRating: 3.9, managerRating: 4.2, finalRating: 4.1, increment: '8%', status: 'CLOSED' }
  ];

  // Rating distribution overview metrics
  const ratingDistribution = [
    { label: 'Outstanding (4.5 - 5.0)', count: 8, percentage: 35, color: '#9333ea' },
    { label: 'Exceeds Expectations (4.0 - 4.4)', count: 10, percentage: 45, color: '#ec4899' },
    { label: 'Meets Expectations (3.5 - 3.9)', count: 4, percentage: 15, color: '#c084fc' },
    { label: 'Needs Improvement (< 3.5)', count: 2, percentage: 5, color: '#f472b6' }
  ];

  // Filter appraisals based on search & cycle dropdown
  const filteredAppraisals = appraisals.filter(app => {
    const matchesSearch = app.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCycle = cycleFilter === 'All' || app.cycleYear === cycleFilter;
    return matchesSearch && matchesCycle;
  });

  return (
    <div style={{ padding: '2rem 2.5rem', minHeight: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#2e1065', margin: 0 }}>
            Performance Appraisals & Rating Reviews
          </h1>
          <p style={{ fontSize: '0.95rem', color: '#6b21a8', marginTop: '0.25rem' }}>
            Track annual review cycles, manager evaluations, self-assessments, rating increments, and performance distributions.
          </p>
        </div>

        {['ADMIN', 'HR_BP', 'MANAGER'].includes(role) && (
          <button 
            onClick={handleStartCycle}
            style={{
              backgroundColor: '#9333ea',
              color: '#ffffff',
              padding: '0.65rem 1.25rem',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(147, 51, 234, 0.25)'
            }}
          >
            + Start Appraisal Cycle 2026
          </button>
        )}
      </div>

      {error && <div style={{ padding: '0.75rem', backgroundColor: '#fff1f2', color: '#9f1239', borderRadius: '8px', border: '1px solid #ffe4e6' }}>{error}</div>}
      {success && <div style={{ padding: '0.75rem', backgroundColor: '#f3e8ff', color: '#7e22ce', borderRadius: '8px', border: '1px solid #e9d5ff' }}>{success}</div>}

      {/* 1. Performance Summary KPI Cards (4 Cards Grid) */}
      <section className="kpi-grid">
        <div className="card kpi-card pastel-card-1">
          <div className="kpi-icon pastel-icon-lavender">🏆</div>
          <div>
            <div className="kpi-value">4.4 / 5.0</div>
            <div className="kpi-label">Avg Final Rating</div>
            <div style={{ fontSize: '0.75rem', color: '#6b21a8', marginTop: '0.2rem' }}>Company-wide performance average</div>
          </div>
        </div>

        <div className="card kpi-card pastel-card-2">
          <div className="kpi-icon pastel-icon-pink">⏳</div>
          <div>
            <div className="kpi-value">18 / 24</div>
            <div className="kpi-label">Reviews Completed</div>
            <div style={{ fontSize: '0.75rem', color: '#9d174d', marginTop: '0.2rem' }}>75% cycle completion rate</div>
          </div>
        </div>

        <div className="card kpi-card pastel-card-3">
          <div className="kpi-icon pastel-icon-lilac">📝</div>
          <div>
            <div className="kpi-value">6</div>
            <div className="kpi-label">Pending Reviews</div>
            <div style={{ fontSize: '0.75rem', color: '#701a75', marginTop: '0.2rem' }}>Awaiting manager evaluation</div>
          </div>
        </div>

        <div className="card kpi-card pastel-card-4">
          <div className="kpi-icon pastel-icon-blush">📈</div>
          <div>
            <div className="kpi-value">+10.2%</div>
            <div className="kpi-label">Avg Increment Rate</div>
            <div style={{ fontSize: '0.75rem', color: '#881337', marginTop: '0.2rem' }}>Performance-based salary adjustment</div>
          </div>
        </div>
      </section>

      {/* 2. Enhanced Performance Appraisals Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e9d5ff', backgroundColor: 'rgba(250, 245, 255, 0.3)' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#2e1065', margin: 0 }}>
            Employee Appraisal Records (Cycle 2026)
          </h2>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <input 
              type="text" 
              placeholder="Search employee or dept..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '0.55rem 0.9rem',
                borderRadius: '8px',
                border: '1px solid #e9d5ff',
                fontSize: '0.875rem',
                width: '240px',
                backgroundColor: '#ffffff',
                color: '#2e1065'
              }}
            />
            <select 
              value={cycleFilter}
              onChange={(e) => setCycleFilter(e.target.value)}
              style={{
                padding: '0.55rem 0.9rem',
                borderRadius: '8px',
                border: '1px solid #e9d5ff',
                fontSize: '0.875rem',
                backgroundColor: '#ffffff',
                color: '#2e1065'
              }}
            >
              <option value="All">All Cycles</option>
              <option value="2026">Cycle 2026</option>
              <option value="2025">Cycle 2025</option>
            </select>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#faf7ff', borderBottom: '1px solid #e9d5ff', color: '#581c87', fontSize: '0.85rem', fontWeight: 600 }}>
              <th style={{ padding: '1rem 1.5rem' }}>Employee</th>
              <th style={{ padding: '1rem 1.5rem' }}>Department</th>
              <th style={{ padding: '1rem 1.5rem' }}>Cycle</th>
              <th style={{ padding: '1rem 1.5rem' }}>Self Rating</th>
              <th style={{ padding: '1rem 1.5rem' }}>Manager Rating</th>
              <th style={{ padding: '1rem 1.5rem' }}>Final Rating</th>
              <th style={{ padding: '1rem 1.5rem' }}>Increment</th>
              <th style={{ padding: '1rem 1.5rem' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppraisals.length > 0 ? (
              filteredAppraisals.map((app) => (
                <tr key={app.id} style={{ borderBottom: '1px solid #f3e8ff' }}>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#2e1065' }}>{app.employeeName}</td>
                  <td style={{ padding: '1rem 1.5rem', color: '#6b21a8' }}>{app.department}</td>
                  <td style={{ padding: '1rem 1.5rem', color: '#6b21a8' }}>{app.cycleYear}</td>
                  <td style={{ padding: '1rem 1.5rem', color: '#6b21a8' }}>⭐ {app.selfRating}</td>
                  <td style={{ padding: '1rem 1.5rem', color: '#6b21a8' }}>⭐ {app.managerRating}</td>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: '#9333ea' }}>⭐ {app.finalRating}</td>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: '#16a34a' }}>📈 {app.increment}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      backgroundColor: app.status === 'CLOSED' ? '#f3e8ff' : app.status === 'MANAGER_REVIEW' ? '#fae8ff' : '#fce7f3',
                      color: app.status === 'CLOSED' ? '#7e22ce' : app.status === 'MANAGER_REVIEW' ? '#86198f' : '#be185d'
                    }}>
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ padding: '2rem', textAlign: 'center', color: '#6b21a8' }}>
                  No appraisal records match your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 3. Performance Rating Distribution & Cycle Timeline (2 Columns Grid) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        
        {/* Rating Distribution Breakdown */}
        <div className="card">
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#2e1065', marginBottom: '0.35rem' }}>
            Rating Bell Curve Distribution
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#6b21a8', marginBottom: '1.25rem' }}>
            Performance breakdown across current evaluation period
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {ratingDistribution.map((item, idx) => (
              <div key={idx} style={{ padding: '0.85rem 1rem', borderRadius: '10px', backgroundColor: 'rgba(250, 245, 255, 0.6)', border: '1px solid #e9d5ff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 700, color: '#2e1065', marginBottom: '0.4rem' }}>
                  <span>{item.label}</span>
                  <span style={{ fontSize: '0.8rem', color: '#86198f' }}>{item.count} Employees ({item.percentage}%)</span>
                </div>
                <div style={{ height: '8px', width: '100%', backgroundColor: '#e9d5ff', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${item.percentage}%`,
                    backgroundColor: item.color,
                    borderRadius: '999px'
                  }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Appraisal Cycle Milestones & Timeline */}
        <div className="card">
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#2e1065', marginBottom: '0.35rem' }}>
            Annual Appraisal Milestones 2026
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#6b21a8', marginBottom: '1.25rem' }}>
            Key schedule dates for performance review phase execution
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', borderRadius: '10px', backgroundColor: '#f3e8ff', border: '1px solid #e9d5ff' }}>
              <span style={{ fontSize: '1.2rem' }}>✅</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#2e1065' }}>Phase 1: Employee Self-Assessment</div>
                <div style={{ fontSize: '0.78rem', color: '#7e22ce' }}>Completed on June 10, 2026</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', borderRadius: '10px', backgroundColor: '#fae8ff', border: '1px solid #f5d0fe' }}>
              <span style={{ fontSize: '1.2rem' }}>🔄</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#2e1065' }}>Phase 2: Manager Evaluation & Rating</div>
                <div style={{ fontSize: '0.78rem', color: '#86198f' }}>In Progress — Target: June 25, 2026</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', borderRadius: '10px', backgroundColor: '#fce7f3', border: '1px solid #fbcfe8' }}>
              <span style={{ fontSize: '1.2rem' }}>⚖️</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#2e1065' }}>Phase 3: HR Calibration & Final Approval</div>
                <div style={{ fontSize: '0.78rem', color: '#be185d' }}>Upcoming — Target: July 05, 2026</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', borderRadius: '10px', backgroundColor: '#ffe4e6', border: '1px solid #ffe4e6' }}>
              <span style={{ fontSize: '1.2rem' }}>🎉</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#2e1065' }}>Phase 4: Increment Release & Payslip Update</div>
                <div style={{ fontSize: '0.78rem', color: '#9f1239' }}>Upcoming — Target: July 15, 2026</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 4. Bottom Section: Top Performers Spotlight & Rating Calibration Rules */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        
        {/* Top Performers Spotlight */}
        <div className="card">
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#2e1065', marginBottom: '1rem' }}>
            Top Performers Spotlight 🌟
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            <div className="pastel-card-1" style={{ padding: '1rem', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#2e1065' }}>Arun Kumar</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#7e22ce', margin: '0.2rem 0' }}>⭐ 4.8 Rating</div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, backgroundColor: '#e9d5ff', color: '#6b21a8', padding: '0.25rem 0.5rem', borderRadius: '999px' }}>+15% Increment</span>
            </div>

            <div className="pastel-card-2" style={{ padding: '1rem', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#500724' }}>Priya Sharma</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#be185d', margin: '0.2rem 0' }}>⭐ 4.7 Rating</div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, backgroundColor: '#fbcfe8', color: '#9d174d', padding: '0.25rem 0.5rem', borderRadius: '999px' }}>+12% Increment</span>
            </div>

            <div className="pastel-card-3" style={{ padding: '1rem', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#4a044e' }}>Amara Chen</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#86198f', margin: '0.2rem 0' }}>⭐ 4.5 Rating</div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, backgroundColor: '#f5d0fe', color: '#701a75', padding: '0.25rem 0.5rem', borderRadius: '999px' }}>+11% Increment</span>
            </div>
          </div>
        </div>

        {/* Rating Increment Tiers Guidelines */}
        <div className="card">
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#2e1065', marginBottom: '1rem' }}>
            Rating & Salary Increment Tiers
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0.85rem', borderRadius: '8px', backgroundColor: '#f3e8ff', border: '1px solid #e9d5ff' }}>
              <span style={{ fontWeight: 700, color: '#2e1065' }}>Rating 4.5 - 5.0 (Outstanding)</span>
              <span style={{ fontWeight: 800, color: '#7e22ce' }}>12% - 15% Increment</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0.85rem', borderRadius: '8px', backgroundColor: '#fae8ff', border: '1px solid #f5d0fe' }}>
              <span style={{ fontWeight: 700, color: '#2e1065' }}>Rating 4.0 - 4.4 (Exceeds Expectations)</span>
              <span style={{ fontWeight: 800, color: '#86198f' }}>8% - 11% Increment</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0.85rem', borderRadius: '8px', backgroundColor: '#fce7f3', border: '1px solid #fbcfe8' }}>
              <span style={{ fontWeight: 700, color: '#2e1065' }}>Rating 3.5 - 3.9 (Meets Expectations)</span>
              <span style={{ fontWeight: 800, color: '#be185d' }}>5% - 7% Increment</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Appraisals;
