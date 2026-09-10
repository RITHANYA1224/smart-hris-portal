import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import employeeService from '../../services/employeeService';
import leaveService from '../../services/leaveService';

const HRDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [leavesList, setLeavesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      employeeService.getAllEmployees().catch(() => []),
      leaveService.getPendingLeaves().catch(() => [])
    ]).then(([emps, leaves]) => {
      setEmployees(Array.isArray(emps) ? emps : []);
      setLeavesList(Array.isArray(leaves) ? leaves : []);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="spinner"></div>;

  return (
    <div style={{ padding: '2rem 2.5rem', backgroundColor: '#f8fafc' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>HR Business Partner Dashboard</h1>
          <p style={{ fontSize: '0.95rem', color: '#64748b', marginTop: '0.25rem' }}>Talent lifecycle, attendance verification, and recruitment metrics</p>
        </div>
        <Link to="/leaves" style={{ backgroundColor: '#7F56D9', color: '#fff', padding: '0.65rem 1.25rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>
          Review Leaves
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
        <div style={{ backgroundColor: '#fff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Total Workforce</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>{employees.length}</div>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: '0.85rem', color: '#ca8a04' }}>Pending Leave Applications</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>{leavesList.length}</div>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: '0.85rem', color: '#16a34a' }}>Onboarding Status</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>100% Verified</div>
        </div>
      </div>
    </div>
  );
};

export default HRDashboard;
