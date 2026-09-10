import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import employeeService from '../services/employeeService';
import leaveService from '../services/leaveService';
import payrollService from '../services/payrollService';

const Dashboard = () => {
  const { authState } = useContext(AuthContext);
  const { role, name } = authState;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Domain states
  const [employees, setEmployees] = useState([]);
  const [leavesList, setLeavesList] = useState([]);
  const [payrolls, setPayrolls] = useState([]);
  
  // Modals toggle states
  const [showEmpForm, setShowEmpForm] = useState(false);
  const [showPayrollRun, setShowPayrollRun] = useState(false);

  // Form states
  const [newEmp, setNewEmp] = useState({
    employeeId: '',
    name: '',
    phoneNumber: '',
    email: '',
    departmentId: 1,
    designation: '',
    dateOfJoining: '',
    employmentType: 'FULL_TIME',
    status: 'ACTIVE'
  });

  const [payrollPeriod, setPayrollPeriod] = useState(new Date().toISOString().substring(0, 10));

  useEffect(() => {
    fetchDashboardData();
  }, [role]);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');
    try {
      // 1. Fetch live employee list from MySQL backend
      const empData = await employeeService.getAllEmployees();
      setEmployees(Array.isArray(empData) ? empData : []);

      // 2. Fetch pending leaves from MySQL backend
      const leavesData = await leaveService.getPendingLeaves();
      setLeavesList(Array.isArray(leavesData) ? leavesData : []);

      // 3. Fetch payroll records
      const payrollData = await payrollService.getAllPayroll();
      setPayrolls(Array.isArray(payrollData) ? payrollData : []);

    } catch (err) {
      setError('Error loading live backend statistics.');
    } finally {
      setLoading(false);
    }
  };

  // Create employee handler
  const handleCreateEmp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await employeeService.createEmployee({
        ...newEmp,
        departmentId: newEmp.departmentId || 1
      });
      
      setSuccess('Employee profile successfully created and saved in MySQL database.');
      setShowEmpForm(false);
      setNewEmp({
        employeeId: '',
        name: '',
        phoneNumber: '',
        email: '',
        departmentId: 1,
        designation: '',
        dateOfJoining: '',
        employmentType: 'FULL_TIME',
        status: 'ACTIVE'
      });
      fetchDashboardData();
    } catch (err) {
      const serverMsg = err.response?.data?.message;
      setError(serverMsg || 'Failed to create employee. Please verify phone (10 digits) and unique email/ID.');
    }
  };

  // Run payroll handler
  const handleRunPayroll = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await payrollService.runPayrollBatch(payrollPeriod);
      setSuccess('Payroll batch processed and updated in MySQL database.');
      setShowPayrollRun(false);
      fetchDashboardData();
    } catch (err) {
      setError(err.response?.data?.message || 'Error processing payroll batch.');
    }
  };

  const getFormattedDate = () => {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return new Date().toLocaleDateString('en-GB', options);
  };

  const getCalendarDays = () => {
    const days = [];
    for (let i = 1; i <= 31; i++) {
      days.push(i);
    }
    return days;
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  const totalPayrollValue = payrolls.reduce((sum, p) => sum + (p.gross || 0), 0);

  return (
    <div className="dashboard-content">
      
      {/* Header Info */}
      <div className="dashboard-header-row">
        <div>
          <h1 style={{ background: 'none', WebkitTextFillColor: 'initial', fontSize: '1.75rem', fontWeight: 800 }}>
            Good morning, {name && name !== 'User' ? name.split(' ')[0] : 'Rithanya'} 👋
          </h1>
          <div className="dashboard-subtitle">
            Here's what's happening with your team today, {getFormattedDate()}.
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/leaves" className="btn btn-secondary">
            <span>📅</span> Apply Leave
          </Link>
          {['ADMIN', 'HR_BP', 'MANAGER'].includes(role?.toUpperCase()) && (
            <button className="btn btn-primary" onClick={() => setShowEmpForm(true)}>
              <span>➕</span> Add Employee
            </button>
          )}
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Stats Cards Row */}
      <section className="kpi-grid">
        <div className="card kpi-card pastel-card-1">
          <div className="kpi-icon pastel-icon-lavender">👥</div>
          <div>
            <div className="kpi-value">{employees.length}</div>
            <div className="kpi-label">Total Employees</div>
            <div className="kpi-change up" style={{ color: '#7e22ce' }}>▲ Live from MySQL</div>
          </div>
        </div>

        <div className="card kpi-card pastel-card-2">
          <div className="kpi-icon pastel-icon-pink">✓</div>
          <div>
            <div className="kpi-value">{Math.max(0, employees.length - leavesList.length)}</div>
            <div className="kpi-label">Present Today</div>
            <div className="kpi-change up" style={{ color: '#be185d' }}>▲ Active Staff</div>
          </div>
        </div>

        <div className="card kpi-card pastel-card-3">
          <div className="kpi-icon pastel-icon-lilac">🕒</div>
          <div>
            <div className="kpi-value">{leavesList.length}</div>
            <div className="kpi-label">Pending Leaves</div>
            <div className="kpi-change down" style={{ color: '#86198f' }}>▼ Awaiting Approval</div>
          </div>
        </div>

        <div className="card kpi-card pastel-card-4">
          <div className="kpi-icon pastel-icon-blush">💵</div>
          <div>
            <div className="kpi-value">₹{(totalPayrollValue / 1000).toFixed(1)}K</div>
            <div className="kpi-label">Payroll Processed</div>
            <div className="kpi-change up" style={{ color: '#9f1239' }}>▲ Disbursed</div>
          </div>
        </div>
      </section>

      {/* Overview Graphs & Distribution */}
      <section className="dashboard-grid">
        <div className="card" style={{ gridColumn: 'span 8' }}>
          <div className="card-header">
            <div>
              <div className="card-title">Attendance Overview</div>
              <div className="card-subtitle">Monthly percentage benchmark</div>
            </div>
          </div>
          <div style={{ padding: '1rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 600 }}>
              <span>Engineering (96%)</span>
              <span>HR (98%)</span>
              <span>Finance (94%)</span>
            </div>
            <div style={{ height: '8px', backgroundColor: 'var(--bg-primary)', borderRadius: '9999px', overflow: 'hidden', display: 'flex' }}>
              <div style={{ width: '50%', backgroundColor: '#9333ea' }}></div>
              <div style={{ width: '30%', backgroundColor: '#ec4899' }}></div>
              <div style={{ width: '20%', backgroundColor: '#c084fc' }}></div>
            </div>
          </div>
        </div>

        <div className="card" style={{ gridColumn: 'span 4' }}>
          <div className="card-header">
            <div className="card-title">Dept. Distribution</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>🔹 Engineering</span>
              <span style={{ fontWeight: 700 }}>50%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>🟢 Human Resources</span>
              <span style={{ fontWeight: 700 }}>30%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>🟣 Finance</span>
              <span style={{ fontWeight: 700 }}>20%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Add Employee Modal Overlay */}
      {showEmpForm && (
        <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="card" style={{ maxWidth: '600px', width: '100%', background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, #faf5ff 60%, #fdf2f8 100%)', border: '1px solid #e9d5ff', borderRadius: '16px', padding: '2rem', boxShadow: '0 20px 40px rgba(147, 51, 234, 0.15)' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', color: '#1e293b', fontWeight: 800 }}>Create New Employee Profile</h3>
            <form onSubmit={handleCreateEmp}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label className="form-label" style={{ fontWeight: 600, fontSize: '0.85rem' }}>Employee ID</label>
                  <input type="text" className="form-input" placeholder="e.g. EMP100" value={newEmp.employeeId} onChange={(e) => setNewEmp({...newEmp, employeeId: e.target.value})} required />
                </div>
                <div>
                  <label className="form-label" style={{ fontWeight: 600, fontSize: '0.85rem' }}>Full Name</label>
                  <input type="text" className="form-input" placeholder="Letters & spaces only" value={newEmp.name} onChange={(e) => setNewEmp({...newEmp, name: e.target.value})} required />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label className="form-label" style={{ fontWeight: 600, fontSize: '0.85rem' }}>Phone Number</label>
                  <input type="text" className="form-input" placeholder="Exactly 10 digits" value={newEmp.phoneNumber} onChange={(e) => setNewEmp({...newEmp, phoneNumber: e.target.value})} required />
                </div>
                <div>
                  <label className="form-label" style={{ fontWeight: 600, fontSize: '0.85rem' }}>Email</label>
                  <input type="email" className="form-input" placeholder="Unique email address" value={newEmp.email} onChange={(e) => setNewEmp({...newEmp, email: e.target.value})} required />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label className="form-label" style={{ fontWeight: 600, fontSize: '0.85rem' }}>Designation</label>
                  <input type="text" className="form-input" placeholder="e.g. Architect" value={newEmp.designation} onChange={(e) => setNewEmp({...newEmp, designation: e.target.value})} required />
                </div>
                <div>
                  <label className="form-label" style={{ fontWeight: 600, fontSize: '0.85rem' }}>Date of Joining</label>
                  <input type="date" className="form-input" value={newEmp.dateOfJoining} onChange={(e) => setNewEmp({...newEmp, dateOfJoining: e.target.value})} required />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowEmpForm(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#7F56D9', color: '#ffffff' }}>Save Profile to MySQL</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
