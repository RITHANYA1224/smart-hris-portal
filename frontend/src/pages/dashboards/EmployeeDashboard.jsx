import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import leaveService from '../../services/leaveService';
import payrollService from '../../services/payrollService';

const EmployeeDashboard = () => {
  const { authState } = useContext(AuthContext);
  const [myLeaves, setMyLeaves] = useState([]);
  const [myPayslips, setMyPayslips] = useState([]);

  useEffect(() => {
    leaveService.getAllLeaves().then(res => setMyLeaves(Array.isArray(res) ? res : []));
    payrollService.getAllPayroll().then(res => setMyPayslips(Array.isArray(res) ? res : []));
  }, []);

  return (
    <div style={{ padding: '2rem 2.5rem', backgroundColor: '#f8fafc' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e293b' }}>Employee Self-Service Portal</h1>
      <p style={{ color: '#64748b' }}>Welcome, {authState.name}! Manage your leaves, attendance, and salary slips.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginTop: '1.5rem' }}>
        <div style={{ backgroundColor: '#fff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Available Annual Leaves</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#16a34a' }}>18 Days</div>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Submitted Leave Applications</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{myLeaves.length}</div>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Latest Payslip Period</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#7F56D9' }}>June 2026</div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
