import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import leaveService from '../services/leaveService';

const LeaveManagement = () => {
  const { authState } = useContext(AuthContext);
  const { role } = authState;

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
      const data = await leaveService.getAllLeaves();
      setLeavesList(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch leave requests.');
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
      const leaveTypeMapping = {
        'Annual Leave': 'CASUAL',
        'Sick Leave': 'SICK',
        'Personal Leave': 'EARNED',
        'Work From Home': 'COMP_OFF'
      };

      await leaveService.applyLeave({
        employeeId: 1,
        leaveType: leaveTypeMapping[newLeave.leaveType] || 'CASUAL',
        fromDate: newLeave.fromDate,
        toDate: newLeave.toDate,
        reason: newLeave.reason
      });

      setSuccess('Leave application successfully submitted.');
      setNewLeave({ leaveType: 'Annual Leave', fromDate: '', toDate: '', reason: '' });
      fetchLeaves();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit leave application.');
    }
  };

  const handleApprove = async (id) => {
    setError('');
    setSuccess('');
    try {
      await leaveService.approveLeave(id, 2);
      setSuccess('Leave application successfully approved.');
      fetchLeaves();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update leave status.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this leave request?')) {
      try {
        await leaveService.deleteLeave(id);
        setSuccess('Leave request deleted.');
        fetchLeaves();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete leave request.');
      }
    }
  };

  // Filtered List based on tabs
  const filteredLeaves = leavesList.filter(item => {
    if (activeTab === 'Pending') return item.status === 'PENDING';
    if (activeTab === 'Approved') return item.status === 'APPROVED';
    if (activeTab === 'Rejected') return item.status === 'REJECTED';
    return true;
  });

  const pendingCount = leavesList.filter(l => l.status === 'PENDING').length;
  const approvedCount = leavesList.filter(l => l.status === 'APPROVED').length;
  const rejectedCount = leavesList.filter(l => l.status === 'REJECTED').length;

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem 2.5rem', backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 70px)' }}>
      
      {/* Header Info */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
          Leave Management
        </h1>
        <p style={{ fontSize: '0.95rem', color: '#64748b', marginTop: '0.25rem' }}>
          Manage employee leave requests
        </p>
      </div>

      {error && <div style={{ padding: '0.75rem', backgroundColor: '#fef2f2', color: '#b91c1c', borderRadius: '8px', marginBottom: '1rem' }}>{error}</div>}
      {success && <div style={{ padding: '0.75rem', backgroundColor: '#f0fdf4', color: '#15803d', borderRadius: '8px', marginBottom: '1rem' }}>{success}</div>}

      {/* 3 Stat Cards in a Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Pending */}
        <div className="pastel-card-1" style={{ borderRadius: '16px', padding: '1.5rem' }}>
          <div className="kpi-label" style={{ marginBottom: '0.35rem' }}>Pending</div>
          <div className="kpi-value" style={{ fontSize: '2.25rem', lineHeight: 1 }}>{pendingCount}</div>
          <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', fontWeight: 600, color: '#9333ea' }}>Awaiting Approval</div>
        </div>

        {/* Approved */}
        <div className="pastel-card-2" style={{ borderRadius: '16px', padding: '1.5rem' }}>
          <div className="kpi-label" style={{ marginBottom: '0.35rem' }}>Approved</div>
          <div className="kpi-value" style={{ fontSize: '2.25rem', lineHeight: 1 }}>{approvedCount}</div>
          <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', fontWeight: 600, color: '#ec4899' }}>This Month</div>
        </div>

        {/* Rejected */}
        <div className="pastel-card-3" style={{ borderRadius: '16px', padding: '1.5rem' }}>
          <div className="kpi-label" style={{ marginBottom: '0.35rem' }}>Rejected</div>
          <div className="kpi-value" style={{ fontSize: '2.25rem', lineHeight: 1 }}>{rejectedCount}</div>
          <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', fontWeight: 600, color: '#c084fc' }}>Declined Requests</div>
        </div>
      </div>

      {/* Leave Application Form + List */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
        
        {/* Form Container */}
        <div style={{ background: 'linear-gradient(145deg, #f5f3ff 0%, #faf5ff 50%, #fdf2f8 100%)', borderRadius: '16px', padding: '1.5rem', border: '1px solid #e9d5ff', boxShadow: '0 6px 22px rgba(147, 51, 234, 0.08)' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#2e1065', marginBottom: '1.25rem' }}>
            Apply for Leave
          </h2>

          <form onSubmit={handleApplyLeave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#581c87', marginBottom: '0.35rem' }}>Leave Type</label>
              <select
                value={newLeave.leaveType}
                onChange={(e) => setNewLeave({ ...newLeave, leaveType: e.target.value })}
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #d8b4fe', backgroundColor: '#f5f3ff', color: '#2e1065' }}
              >
                <option value="Annual Leave">Annual Leave</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Personal Leave">Personal Leave</option>
                <option value="Work From Home">Work From Home</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#581c87', marginBottom: '0.35rem' }}>From Date</label>
              <input
                type="date"
                required
                value={newLeave.fromDate}
                onChange={(e) => setNewLeave({ ...newLeave, fromDate: e.target.value })}
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #d8b4fe', backgroundColor: '#f5f3ff', color: '#2e1065' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#581c87', marginBottom: '0.35rem' }}>To Date</label>
              <input
                type="date"
                required
                value={newLeave.toDate}
                onChange={(e) => setNewLeave({ ...newLeave, toDate: e.target.value })}
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #d8b4fe', backgroundColor: '#f5f3ff', color: '#2e1065' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#581c87', marginBottom: '0.35rem' }}>Reason</label>
              <textarea
                rows="3"
                required
                value={newLeave.reason}
                onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
                placeholder="Reason for leave..."
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #d8b4fe', backgroundColor: '#f5f3ff', color: '#2e1065', resize: 'vertical' }}
              ></textarea>
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'linear-gradient(135deg, #9333ea, #7c3aed)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(147, 51, 234, 0.22)'
              }}
            >
              Submit Application
            </button>
          </form>
        </div>

        {/* Requests Table Container */}
        <div style={{ background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, #faf5ff 60%, #fdf2f8 100%)', borderRadius: '16px', padding: '1.5rem', border: '1px solid #e9d5ff', boxShadow: '0 4px 20px -2px rgba(147, 51, 234, 0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#2e1065', margin: 0 }}>
              Recent Leave Requests
            </h2>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['All', 'Pending', 'Approved', 'Rejected'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    backgroundColor: activeTab === tab ? '#7F56D9' : '#f1f5f9',
                    color: activeTab === tab ? '#ffffff' : '#64748b'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#faf7ff', borderBottom: '1px solid #e9d5ff', color: '#581c87', fontSize: '0.85rem', fontWeight: 600 }}>
                <th style={{ padding: '0.75rem 0' }}>Employee</th>
                <th style={{ padding: '0.75rem 0' }}>Leave Type</th>
                <th style={{ padding: '0.75rem 0' }}>Duration</th>
                <th style={{ padding: '0.75rem 0' }}>Status</th>
                {['ADMIN', 'HR_BP', 'MANAGER'].includes(role) && <th style={{ padding: '0.75rem 0', textAlign: 'right' }}>Action</th>}
              </tr>
            </thead>
            <tbody>
              {filteredLeaves.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ padding: '2rem 0', textAlign: 'center', color: '#94a3b8' }}>
                    No leave requests found.
                  </td>
                </tr>
              ) : (
                filteredLeaves.map((leave) => (
                  <tr key={leave.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                    <td style={{ padding: '0.85rem 0', fontSize: '0.9rem', fontWeight: 600, color: '#334155' }}>
                      {leave.employeeName || 'John David'}
                    </td>
                    <td style={{ padding: '0.85rem 0', fontSize: '0.85rem', color: '#64748b' }}>
                      {leave.leaveType}
                    </td>
                    <td style={{ padding: '0.85rem 0', fontSize: '0.85rem', color: '#64748b' }}>
                      {leave.fromDate} to {leave.toDate}
                    </td>
                    <td style={{ padding: '0.85rem 0' }}>
                      <span style={{
                        padding: '0.25rem 0.65rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        backgroundColor: leave.status === 'APPROVED' ? '#dcfce7' : leave.status === 'PENDING' ? '#fef9c3' : '#fee2e2',
                        color: leave.status === 'APPROVED' ? '#15803d' : leave.status === 'PENDING' ? '#a16207' : '#b91c1c'
                      }}>
                        {leave.status}
                      </span>
                    </td>
                    {['ADMIN', 'HR_BP', 'MANAGER'].includes(role) && (
                      <td style={{ padding: '0.85rem 0', textAlign: 'right' }}>
                        {leave.status === 'PENDING' && (
                          <button
                            onClick={() => handleApprove(leave.id)}
                            style={{ padding: '0.35rem 0.65rem', backgroundColor: '#16a34a', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer', marginRight: '0.35rem' }}
                          >
                            Approve
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(leave.id)}
                          style={{ padding: '0.35rem 0.65rem', backgroundColor: '#ef4444', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer' }}
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;
