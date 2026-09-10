import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import employeeService from '../../services/employeeService';

const EmployeeDetailPage = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    employeeService.getEmployeeById(id)
      .then(data => setEmployee(data))
      .catch(() => setEmployee(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="spinner"></div>;
  if (!employee) return <div style={{ padding: '2rem' }}>Employee record not found.</div>;

  return (
    <div style={{ padding: '2rem 2.5rem', backgroundColor: '#f8fafc' }}>
      <Link to="/employees" style={{ color: '#7F56D9', textDecoration: 'none', fontWeight: 600 }}>← Back to Employee Directory</Link>
      <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '16px', border: '1px solid #f1f5f9', marginTop: '1rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e293b' }}>{employee.name}</h1>
        <p style={{ color: '#64748b' }}>{employee.designation} • {employee.departmentName || 'Engineering'}</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
          <div><strong>Employee ID:</strong> {employee.employeeId}</div>
          <div><strong>Email:</strong> {employee.email}</div>
          <div><strong>Phone:</strong> {employee.phoneNumber}</div>
          <div><strong>Status:</strong> {employee.status}</div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailPage;
