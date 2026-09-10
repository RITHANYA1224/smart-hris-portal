import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import employeeService from '../../services/employeeService';
import leaveService from '../../services/leaveService';

const ManagerDashboard = () => {
  const { authState } = useContext(AuthContext);
  const [teamMembers, setTeamMembers] = useState([]);
  const [pendingApprovals, setPendingApprovals] = useState([]);

  useEffect(() => {
    employeeService.getAllEmployees().then(res => setTeamMembers(Array.isArray(res) ? res : []));
    leaveService.getPendingLeaves().then(res => setPendingApprovals(Array.isArray(res) ? res : []));
  }, []);

  return (
    <div style={{ padding: '2rem 2.5rem', backgroundColor: '#f8fafc' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e293b' }}>Team Manager Dashboard</h1>
      <p style={{ color: '#64748b' }}>Team performance management and leave approval workflows.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginTop: '1.5rem' }}>
        <div style={{ backgroundColor: '#fff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Direct Reports</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{teamMembers.length}</div>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: '0.85rem', color: '#ca8a04' }}>Team Leave Requests</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{pendingApprovals.length}</div>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: '0.85rem', color: '#16a34a' }}>Appraisal Reviews</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>3 Pending</div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
