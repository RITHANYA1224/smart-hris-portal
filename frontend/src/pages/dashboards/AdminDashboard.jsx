import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import employeeService from '../../services/employeeService';
import leaveService from '../../services/leaveService';
import payrollService from '../../services/payrollService';

const AdminDashboard = () => {
  const { authState } = useContext(AuthContext);
  const { name } = authState;

  const [employees, setEmployees] = useState([]);
  const [leavesList, setLeavesList] = useState([]);
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [empData, leavesData, payData] = await Promise.all([
        employeeService.getAllEmployees().catch(() => []),
        leaveService.getPendingLeaves().catch(() => []),
        payrollService.getAllPayroll().catch(() => [])
      ]);
      setEmployees(Array.isArray(empData) ? empData : []);
      setLeavesList(Array.isArray(leavesData) ? leavesData : []);
      setPayrolls(Array.isArray(payData) ? payData : []);
    } finally {
      setLoading(false);
    }
  };

  const totalPayroll = payrolls.reduce((sum, p) => sum + (p.gross || 0), 0);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-content" style={{ padding: '2rem 2.5rem', backgroundColor: '#f8fafc' }}>
      <div className="dashboard-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
            Good morning, {name && name !== 'User' ? name.split(' ')[0] : 'Rithanya'} 👋
          </h1>
          <div style={{ fontSize: '0.95rem', color: '#64748b', marginTop: '0.25rem' }}>
            System overview, organization metrics, and administrative controls.
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/employees" className="btn btn-primary" style={{ backgroundColor: '#7F56D9', color: '#fff', padding: '0.65rem 1.25rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>
            Manage Staff
          </Link>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Total Employees</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginTop: '0.35rem' }}>{employees.length}</div>
        </div>
        <div style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: '0.85rem', color: '#16a34a', fontWeight: 600 }}>Active Personnel</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginTop: '0.35rem' }}>{Math.max(0, employees.length - leavesList.length)}</div>
        </div>
        <div style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: '0.85rem', color: '#ca8a04', fontWeight: 600 }}>Pending Approvals</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginTop: '0.35rem' }}>{leavesList.length}</div>
        </div>
        <div style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: '0.85rem', color: '#7e22ce', fontWeight: 600 }}>Payroll Volume</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginTop: '0.35rem' }}>₹{(totalPayroll / 1000).toFixed(1)}K</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
