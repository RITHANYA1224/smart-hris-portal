import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { authState } = useContext(AuthContext);
  const { role, name, token, email } = authState;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Domain states
  const [employees, setEmployees] = useState([]);
  const [leavesList, setLeavesList] = useState([]);
  const [payrolls, setPayrolls] = useState([]);
  const [attritionData, setAttritionData] = useState(null);
  
  // Modals toggle states
  const [showEmpForm, setShowEmpForm] = useState(false);
  const [showPayrollRun, setShowPayrollRun] = useState(false);

  // Form states
  const [newEmp, setNewEmp] = useState({
    employeeId: '',
    name: '',
    phoneNumber: '',
    email: '',
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
      // 1. Fetch employee list for statistics
      const empRes = await fetch('http://localhost:8080/api/employees/search?query=', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (empRes.ok) {
        const data = await empRes.json();
        setEmployees(data);
      }

      // 2. Fetch pending leaves
      const leavesRes = await fetch('http://localhost:8080/api/leaves/pending', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (leavesRes.ok) {
        const data = await leavesRes.json();
        setLeavesList(data);
      }

      // 3. Fetch attrition rates
      const attRes = await fetch('http://localhost:8080/api/analytics/attrition', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (attRes.ok) {
        const data = await attRes.json();
        setAttritionData(data);
      }

      // 4. Fetch payroll for stats
      const payrollData = JSON.parse(localStorage.getItem('hris_payroll') || '[]');
      setPayrolls(payrollData);

    } catch (err) {
      setError('Error loading dashboard analytics.');
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
      const response = await fetch('http://localhost:8080/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newEmp)
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess('Employee profile successfully created.');
        setShowEmpForm(false);
        setNewEmp({
          employeeId: '',
          name: '',
          phoneNumber: '',
          email: '',
          designation: '',
          dateOfJoining: '',
          employmentType: 'FULL_TIME',
          status: 'ACTIVE'
        });
        fetchDashboardData();
      } else {
        setError(data.message || 'Error creating employee.');
      }
    } catch (err) {
      setError('Connection failure.');
    }
  };

  // Run payroll handler
  const handleRunPayroll = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await fetch('http://localhost:8080/api/payroll/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ payPeriod: payrollPeriod })
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(data.message || 'Payroll run successfully.');
        setShowPayrollRun(false);
        fetchDashboardData();
      } else {
        setError(data.message || 'Payroll processing failed.');
      }
    } catch (err) {
      setError('Connection failure.');
    }
  };

  // Start appraisal cycle handler
  const handleStartAppraisals = async () => {
    setError('');
    setSuccess('');
    try {
      const response = await fetch('http://localhost:8080/api/appraisals/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ cycleYear: new Date().getFullYear() })
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(data.message || 'Appraisal cycle initiated.');
      } else {
        setError(data.message || 'Failed to start cycle.');
      }
    } catch (err) {
      setError('Connection failure.');
    }
  };

  // Calculate current date string
  const getFormattedDate = () => {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return new Date().toLocaleDateString('en-GB', options);
  };

  // Calendar dates helper
  const getCalendarDays = () => {
    // Generate dates for current month (assume July 2024 to match spec screenshot)
    const days = [];
    // July 2024 starts on Monday (1)
    // 31 days
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

  // Get total gross processed payroll
  const totalPayrollValue = payrolls.reduce((sum, p) => sum + p.gross, 0);

  return (
    <div className="dashboard-content">
      
      {/* Header Info */}
      <div className="dashboard-header-row">
        <div>
          <h1 style={{ background: 'none', WebkitTextFillColor: 'initial', fontSize: '1.75rem', fontWeight: 800 }}>
            Good morning, {name ? name.split(' ')[0] : 'User'} 👋
          </h1>
          <div className="dashboard-subtitle">
            Here's what's happening with your team today, {getFormattedDate()}.
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/leaves" className="btn btn-secondary">
            <span>📅</span> Apply Leave
          </Link>
          {['Admin', 'HR BP'].includes(role) && (
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
        <div className="card kpi-card">
          <div className="kpi-icon bg-blue">👥</div>
          <div>
            <div className="kpi-value">{employees.length}</div>
            <div className="kpi-label">Total Employees</div>
            <div className="kpi-change up">▲ +12 vs last month</div>
          </div>
        </div>

        <div className="card kpi-card">
          <div className="kpi-icon bg-green">✓</div>
          <div>
            <div className="kpi-value">{Math.max(0, employees.length - leavesList.length)}</div>
            <div className="kpi-label">Present Today</div>
            <div className="kpi-change up">▲ +5 vs last month</div>
          </div>
        </div>

        <div className="card kpi-card">
          <div className="kpi-icon bg-orange">🕒</div>
          <div>
            <div className="kpi-value">{leavesList.length}</div>
            <div className="kpi-label">Pending Leaves</div>
            <div className="kpi-change down">▼ -3 vs last month</div>
          </div>
        </div>

        <div className="card kpi-card">
          <div className="kpi-icon bg-purple">💵</div>
          <div>
            <div className="kpi-value">₹{(totalPayrollValue / 1000).toFixed(1)}K</div>
            <div className="kpi-label">Payroll Processed</div>
            <div className="kpi-change up">▲ +8% vs last month</div>
          </div>
        </div>
      </section>

      {/* Middle Row (Charts) */}
      <section className="dashboard-grid-2-1">
        
        {/* Attendance overview SVG Chart */}
        <div className="card">
          <div className="card-title">
            <span>Attendance Overview</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Last 6 months</span>
          </div>
          <div className="chart-container" style={{ height: '200px' }}>
            <svg viewBox="0 0 500 180" width="100%" height="100%">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="0.25"/>
                  <stop offset="100%" stopColor="var(--primary-color)" stopOpacity="0.0"/>
                </linearGradient>
              </defs>
              {/* Gridlines */}
              <line x1="30" y1="30" x2="480" y2="30" stroke="var(--border-color)" strokeDasharray="3,3" />
              <line x1="30" y1="80" x2="480" y2="80" stroke="var(--border-color)" strokeDasharray="3,3" />
              <line x1="30" y1="130" x2="480" y2="130" stroke="var(--border-color)" strokeDasharray="3,3" />
              
              {/* Path Area */}
              <path d="M 30 130 L 100 110 L 190 60 L 280 85 L 370 70 L 480 50 L 480 150 L 30 150 Z" fill="url(#chartGrad)" />
              {/* Main Line */}
              <path d="M 30 130 L 100 110 L 190 60 L 280 85 L 370 70 L 480 50" fill="none" stroke="var(--primary-color)" strokeWidth="3" />
              
              {/* Dots */}
              <circle cx="30" cy="130" r="5" fill="var(--primary-color)" />
              <circle cx="100" cy="110" r="5" fill="var(--primary-color)" />
              <circle cx="190" cy="60" r="5" fill="var(--primary-color)" />
              <circle cx="280" cy="85" r="5" fill="var(--primary-color)" />
              <circle cx="370" cy="70" r="5" fill="var(--primary-color)" />
              <circle cx="480" cy="50" r="5" fill="var(--primary-color)" />
              
              {/* Hover Badge at Mar */}
              <rect x="155" y="15" width="70" height="30" rx="6" fill="var(--text-primary)" />
              <text x="190" y="34" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">Mar: 92%</text>
              <line x1="190" y1="45" x2="190" y2="60" stroke="var(--text-primary)" strokeWidth="2" />

              {/* Labels */}
              <text x="30" y="170" fill="var(--text-muted)" fontSize="10" textAnchor="middle">Feb</text>
              <text x="100" y="170" fill="var(--text-muted)" fontSize="10" textAnchor="middle">Mar</text>
              <text x="190" y="170" fill="var(--text-muted)" fontSize="10" textAnchor="middle">Apr</text>
              <text x="280" y="170" fill="var(--text-muted)" fontSize="10" textAnchor="middle">May</text>
              <text x="370" y="170" fill="var(--text-muted)" fontSize="10" textAnchor="middle">Jun</text>
              <text x="480" y="170" fill="var(--text-muted)" fontSize="10" textAnchor="middle">Jul</text>
            </svg>
          </div>
        </div>

        {/* Dept Distribution Donut Chart */}
        <div className="card">
          <div className="card-title">Dept. Distribution</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px' }}>
            <svg width="150" height="150" viewBox="0 0 200 200">
              {/* Donut sectors */}
              {/* Eng: 50% */}
              <circle cx="100" cy="100" r="70" fill="transparent" stroke="var(--primary-color)" strokeWidth="20" strokeDasharray="220 220" strokeDashoffset="0" />
              {/* HR: 20% */}
              <circle cx="100" cy="100" r="70" fill="transparent" stroke="var(--accent-color)" strokeWidth="20" strokeDasharray="88 352" strokeDashoffset="-220" />
              {/* Finance: 30% */}
              <circle cx="100" cy="100" r="70" fill="transparent" stroke="var(--success-color)" strokeWidth="20" strokeDasharray="132 308" strokeDashoffset="-308" />
              
              {/* Center cutout */}
              <circle cx="100" cy="100" r="55" fill="var(--bg-secondary)" />
              <text x="100" y="105" fill="var(--text-primary)" fontSize="18" textAnchor="middle" fontWeight="bold">Depts</text>
            </svg>
            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1rem', fontSize: '0.75rem', fontWeight: 600 }}>
              <span style={{ color: 'var(--primary-color)' }}>● Eng</span>
              <span style={{ color: 'var(--accent-color)' }}>● HR</span>
              <span style={{ color: 'var(--success-color)' }}>● Finance</span>
            </div>
          </div>
        </div>

      </section>

      {/* Bottom Grid Rows */}
      <section className="dashboard-grid-3">
        
        {/* Recent Activity */}
        <div className="card">
          <div className="card-title">Recent Activity</div>
          <div className="activity-feed">
            <div className="activity-item">
              <div className="activity-icon-container" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary-color)' }}>AP</div>
              <div className="activity-details">
                <div className="activity-text"><strong>Aisha Patel</strong> submitted a sick leave request</div>
                <div className="activity-time">2m ago</div>
              </div>
            </div>
            
            <div className="activity-item">
              <div className="activity-icon-container" style={{ backgroundColor: 'var(--success-light)', color: 'var(--success-color)' }}>MW</div>
              <div className="activity-details">
                <div className="activity-text"><strong>Marcus Webb</strong> approved leave for Jordan Kim</div>
                <div className="activity-time">18m ago</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon-container" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary-color)' }}>PS</div>
              <div className="activity-details">
                <div className="activity-text"><strong>Priya Sharma</strong> added new employee Kai Nakamura</div>
                <div className="activity-time">1h ago</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon-container" style={{ backgroundColor: '#fef3c7', color: '#d97706' }}>JK</div>
              <div className="activity-details">
                <div className="activity-text"><strong>Jordan Kim</strong> updated department settings</div>
                <div className="activity-time">2h ago</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <div className="card-title">Quick Actions</div>
          <div className="quick-actions-grid">
            <Link to="/leaves" className="quick-action-btn">
              <span className="quick-action-btn-icon">📅</span>
              <span>Apply Leave</span>
            </Link>
            {['Admin', 'HR BP'].includes(role) && (
              <button className="quick-action-btn" onClick={() => setShowEmpForm(true)}>
                <span className="quick-action-btn-icon">👥</span>
                <span>Add Employee</span>
              </button>
            )}
            {['Admin', 'HR BP', 'Finance Officer'].includes(role) && (
              <button className="quick-action-btn" onClick={() => setShowPayrollRun(true)}>
                <span className="quick-action-btn-icon">💵</span>
                <span>Run Payroll</span>
              </button>
            )}
            <Link to="/analytics" className="quick-action-btn">
              <span className="quick-action-btn-icon">📊</span>
              <span>View Reports</span>
            </Link>
          </div>
        </div>

        {/* Calendar widget & birthdays */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="calendar-widget">
            <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
              <span>July 2024</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>➔</span>
            </div>
            
            <div className="calendar-grid">
              <span className="calendar-day-header">S</span>
              <span className="calendar-day-header">M</span>
              <span className="calendar-day-header">T</span>
              <span className="calendar-day-header">W</span>
              <span className="calendar-day-header">T</span>
              <span className="calendar-day-header">F</span>
              <span className="calendar-day-header">S</span>
              
              {/* Offset days (July 1st 2024 is a Monday, so offset 1 day) */}
              <span className="calendar-day muted">30</span>
              {getCalendarDays().map(d => (
                <span key={d} className={`calendar-day ${d === 14 ? 'active' : ''}`}>{d}</span>
              ))}
            </div>
          </div>
          
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>Upcoming Birthdays</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>🎂 Sophia Chen</span>
                <span style={{ color: 'var(--text-muted)' }}>Jul 16</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>🎂 Liam Torres</span>
                <span style={{ color: 'var(--text-muted)' }}>Jul 22</span>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Interactive Forms (Modals overlay) */}
      {showEmpForm && (
        <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="card" style={{ maxWidth: '600px', width: '100%' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Create New Employee Profile</h3>
            <form onSubmit={handleCreateEmp}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Employee ID</label>
                  <input type="text" className="form-input" placeholder="e.g. EMP100" value={newEmp.employeeId} onChange={(e) => setNewEmp({...newEmp, employeeId: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-input" placeholder="Letters & spaces only" value={newEmp.name} onChange={(e) => setNewEmp({...newEmp, name: e.target.value})} required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input type="text" className="form-input" placeholder="Exactly 10 digits" value={newEmp.phoneNumber} onChange={(e) => setNewEmp({...newEmp, phoneNumber: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-input" placeholder="Unique email address" value={newEmp.email} onChange={(e) => setNewEmp({...newEmp, email: e.target.value})} required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Designation</label>
                  <input type="text" className="form-input" placeholder="e.g. Architect" value={newEmp.designation} onChange={(e) => setNewEmp({...newEmp, designation: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Date of Joining</label>
                  <input type="date" className="form-input" value={newEmp.dateOfJoining} onChange={(e) => setNewEmp({...newEmp, dateOfJoining: e.target.value})} required />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowEmpForm(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Profile</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showPayrollRun && (
        <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.15rem' }}>Run Payroll Process</h3>
            <form onSubmit={handleRunPayroll}>
              <div className="form-group">
                <label className="form-label">Select Pay Period Date</label>
                <input type="date" className="form-input" value={payrollPeriod} onChange={(e) => setPayrollPeriod(e.target.value)} required />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowPayrollRun(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Process and Disburse</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
