import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

const LeaveManagement = () => {
  const { authState } = useContext(AuthContext);
  const { token, role } = authState;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Leaves lists
  const [leavesList, setLeavesList] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  
  // Apply leave form state
  const [newLeave, setNewLeave] = useState({
    leaveType: 'Annual Leave',
    fromDate: '',
    toDate: '',
    reason: ''
  });

  useEffect(() => {
    fetchLeaves();
  }, [role]);

  const fetchLeaves = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:8080/api/leaves/pending', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setLeavesList(data);
      } else {
        setError('Failed to fetch leave requests.');
      }
    } catch (err) {
      setError('Connection failed while loading leaves.');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyLeave = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (new Date(newLeave.toDate) < new Date(newLeave.fromDate)) {
      setError('To date must be on or after From date.');
      return;
    }

    try {
      // Map view category back to API type
      const leaveTypeMapping = {
        'Annual Leave': 'CASUAL',
        'Sick Leave': 'SICK',
        'Personal Leave': 'EARNED',
        'Work From Home': 'COMP_OFF'
      };

      const response = await fetch('http://localhost:8080/api/leaves', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          leaveType: leaveTypeMapping[newLeave.leaveType] || 'CASUAL',
          fromDate: newLeave.fromDate,
          toDate: newLeave.toDate,
          reason: newLeave.reason
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Leave application successfully submitted.');
        setNewLeave({ leaveType: 'Annual Leave', fromDate: '', toDate: '', reason: '' });
        fetchLeaves();
      } else {
        setError(data.message || 'Failed to submit leave application.');
      }
    } catch (err) {
      setError('Connection failure.');
    }
  };

  const handleApprove = async (id, status) => {
    setError('');
    setSuccess('');
    try {
      const response = await fetch(`http://localhost:8080/api/leaves/${id}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(`Leave request successfully ${status.toLowerCase()}.`);
        fetchLeaves();
      } else {
        setError(data.message || 'Operation failed.');
      }
    } catch (err) {
      setError('Connection failure.');
    }
  };

  // Date formatter
  const formatDateRange = (from, to) => {
    const fDate = new Date(from).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const tDate = new Date(to).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${fDate} - ${tDate}`;
  };

  // Day count helper
  const getDaysCount = (from, to) => {
    const days = Math.round((new Date(to) - new Date(from)) / (1000 * 60 * 60 * 24)) + 1;
    return isNaN(days) ? 0 : days;
  };

  // Avatar initial
  const getInitials = (nameStr) => {
    if (!nameStr) return 'U';
    return nameStr.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  // Filter leaves based on active tab
  const filteredLeaves = leavesList.filter(l => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Pending') return l.status === 'PENDING';
    if (activeTab === 'Approved') return l.status === 'APPROVED';
    if (activeTab === 'Rejected') return l.status === 'REJECTED';
    return true;
  });

  // Map backend Enum to human readable
  const formatLeaveType = (type) => {
    const mapping = {
      'CASUAL': 'Annual Leave',
      'SICK': 'Sick Leave',
      'EARNED': 'Personal Leave',
      'COMP_OFF': 'Work From Home',
      'LOP': 'Loss of Pay'
    };
    return mapping[type] || type;
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-content">
      
      {/* Header Info */}
      <div className="dashboard-header-row">
        <div>
          <h1 style={{ background: 'none', WebkitTextFillColor: 'initial', fontSize: '1.75rem', fontWeight: 800 }}>
            Leave Management
          </h1>
          <div className="dashboard-subtitle">
            Apply for leave, view time-off statistics, and manage approvals.
          </div>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Leave Allowances Row */}
      <section className="kpi-grid">
        <div className="card kpi-card" style={{ display: 'block', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Annual Leave</span>
            <span style={{ fontSize: '1.5rem', padding: '0.35rem', backgroundColor: 'var(--primary-light)', borderRadius: '8px' }}>👤</span>
          </div>
          <div style={{ marginTop: '0.85rem' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>13</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>days remaining</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-color)', marginTop: '0.75rem', paddingTop: '0.5rem' }}>
              8 used of 21 total
            </div>
          </div>
        </div>

        <div className="card kpi-card" style={{ display: 'block', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Sick Leave</span>
            <span style={{ fontSize: '1.5rem', padding: '0.35rem', backgroundColor: '#d1fae5', borderRadius: '8px' }}>🤢</span>
          </div>
          <div style={{ marginTop: '0.85rem' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>7</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>days remaining</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-color)', marginTop: '0.75rem', paddingTop: '0.5rem' }}>
              3 used of 10 total
            </div>
          </div>
        </div>

        <div className="card kpi-card" style={{ display: 'block', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Personal Leave</span>
            <span style={{ fontSize: '1.5rem', padding: '0.35rem', backgroundColor: '#f3e8ff', borderRadius: '8px' }}>🏡</span>
          </div>
          <div style={{ marginTop: '0.85rem' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>3</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>days remaining</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-color)', marginTop: '0.75rem', paddingTop: '0.5rem' }}>
              2 used of 5 total
            </div>
          </div>
        </div>

        <div className="card kpi-card" style={{ display: 'block', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Work From Home</span>
            <span style={{ fontSize: '1.5rem', padding: '0.35rem', backgroundColor: '#fef3c7', borderRadius: '8px' }}>💻</span>
          </div>
          <div style={{ marginTop: '0.85rem' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>7</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>days remaining</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-color)', marginTop: '0.75rem', paddingTop: '0.5rem' }}>
              5 used of 12 total
            </div>
          </div>
        </div>
      </section>

      {/* Main Two-column Content Grid */}
      <section className="dashboard-grid-2-1">
        
        {/* Leaves Table Column */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Tabs row & button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['All', 'Pending', 'Approved', 'Rejected'].map(t => (
                <button 
                  key={t} 
                  className={`tab-btn ${activeTab === t ? 'active' : ''}`}
                  onClick={() => setActiveTab(t)}
                  style={{ padding: '0.5rem 0.75rem' }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Type</th>
                  <th>Duration</th>
                  <th>Days</th>
                  <th>Status</th>
                  {['Admin', 'HR BP', 'Manager', 'Dept Head'].includes(role) && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {filteredLeaves.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                      No leave requests found in this tab.
                    </td>
                  </tr>
                ) : (
                  filteredLeaves.map((leave) => (
                    <tr key={leave.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div className="user-avatar">{getInitials(leave.employee?.name || 'Self')}</div>
                          <div>
                            <div style={{ fontWeight: 600 }}>{leave.employee?.name || 'Self'}</div>
                          </div>
                        </div>
                      </td>
                      <td>{formatLeaveType(leave.leaveType)}</td>
                      <td>{formatDateRange(leave.fromDate, leave.toDate)}</td>
                      <td>
                        <span className="badge badge-info" style={{ borderRadius: 'var(--radius-sm)' }}>
                          {getDaysCount(leave.fromDate, leave.toDate)}d
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${leave.status === 'APPROVED' ? 'badge-success' : leave.status === 'PENDING' ? 'badge-warning' : 'badge-danger'}`}>
                          {leave.status}
                        </span>
                      </td>
                      {['Admin', 'HR BP', 'Manager', 'Dept Head'].includes(role) && (
                        <td>
                          {leave.status === 'PENDING' && (
                            <div style={{ display: 'flex', gap: '0.35rem' }}>
                              <button className="btn btn-primary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} onClick={() => handleApprove(leave.id, 'APPROVED')}>✓ Approve</button>
                              <button className="btn btn-danger" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} onClick={() => handleApprove(leave.id, 'REJECTED')}>✕ Reject</button>
                            </div>
                          )}
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Apply for Leave Form Column */}
        <div className="card">
          <div className="card-title">Apply for Leave</div>
          <form onSubmit={handleApplyLeave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Leave Type</label>
              <select 
                className="form-input" 
                value={newLeave.leaveType}
                onChange={(e) => setNewLeave({...newLeave, leaveType: e.target.value})}
              >
                <option value="Annual Leave">Annual Leave</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Personal Leave">Personal Leave</option>
                <option value="Work From Home">Work From Home</option>
              </select>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">From Date</label>
              <input 
                type="date" 
                className="form-input" 
                value={newLeave.fromDate}
                onChange={(e) => setNewLeave({...newLeave, fromDate: e.target.value})}
                required 
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">To Date</label>
              <input 
                type="date" 
                className="form-input" 
                value={newLeave.toDate}
                onChange={(e) => setNewLeave({...newLeave, toDate: e.target.value})}
                required 
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Reason</label>
              <textarea 
                className="form-input" 
                rows="3" 
                placeholder="Brief description of your reason..."
                value={newLeave.reason}
                onChange={(e) => setNewLeave({...newLeave, reason: e.target.value})}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.65rem' }}>
              Submit Request
            </button>
          </form>
        </div>

      </section>
    </div>
  );
};

export default LeaveManagement;
