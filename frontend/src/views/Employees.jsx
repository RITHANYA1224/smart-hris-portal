import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import employeeService from '../services/employeeService';

const Employees = () => {
  const { authState } = useContext(AuthContext);
  const { role } = authState;

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal toggle state
  const [showAddModal, setShowAddModal] = useState(false);
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

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await employeeService.getAllEmployees();
      setEmployees(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch employees list.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await employeeService.createEmployee(newEmp);
      setSuccess('Employee profile successfully created.');
      setShowAddModal(false);
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
      fetchEmployees();
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating employee.');
    }
  };

  const handleDeleteEmployee = async (empId) => {
    if (window.confirm('Are you sure you want to delete this employee profile?')) {
      try {
        await employeeService.deleteEmployee(empId);
        setSuccess('Employee deleted successfully.');
        fetchEmployees();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete employee.');
      }
    }
  };

  // Get Initials for avatars
  const getInitials = (nameStr) => {
    if (!nameStr) return 'U';
    return nameStr.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  // Filtered List
  const filteredEmployees = employees.filter(emp => {
    const name = emp.name || '';
    const email = emp.email || '';
    const desig = emp.designation || '';
    const empId = emp.employeeId || '';

    const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      desig.toLowerCase().includes(searchQuery.toLowerCase()) ||
      empId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || 
      (statusFilter === 'Active' && emp.status === 'ACTIVE') ||
      (statusFilter === 'On Leave' && emp.status === 'ON_NOTICE') ||
      (statusFilter === 'Inactive' && emp.status === 'SEPARATED');

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  // Count totals for cards
  const totalCount = employees.length;
  const activeCount = employees.filter(e => e.status === 'ACTIVE').length;
  const leaveCount = employees.filter(e => e.status === 'ON_NOTICE').length;
  const separatedCount = employees.filter(e => e.status === 'SEPARATED').length;

  return (
    <div className="dashboard-content" style={{ padding: '2rem 2.5rem', backgroundColor: '#f8fafc' }}>
      
      {/* Header Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
            Employees
          </h1>
          <p style={{ fontSize: '0.95rem', color: '#64748b', marginTop: '0.25rem' }}>
            Manage all employees in your organization
          </p>
        </div>

        {['ADMIN', 'HR_BP', 'MANAGER'].includes(role) && (
          <button 
            className="btn btn-primary" 
            onClick={() => setShowAddModal(true)}
            style={{
              backgroundColor: '#7F56D9',
              color: '#ffffff',
              padding: '0.65rem 1.25rem',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            + Add Employee
          </button>
        )}
      </div>

      {error && <div style={{ padding: '0.75rem', backgroundColor: '#fef2f2', color: '#b91c1c', borderRadius: '8px', marginBottom: '1rem' }}>{error}</div>}
      {success && <div style={{ padding: '0.75rem', backgroundColor: '#f0fdf4', color: '#15803d', borderRadius: '8px', marginBottom: '1rem' }}>{success}</div>}

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '1.5rem' }}>
        <div className="pastel-card-1" style={{ padding: '1.25rem', borderRadius: '14px' }}>
          <div className="kpi-label">Total Employees</div>
          <div className="kpi-value" style={{ marginTop: '0.35rem' }}>{totalCount}</div>
        </div>
        <div className="pastel-card-2" style={{ padding: '1.25rem', borderRadius: '14px' }}>
          <div className="kpi-label">Active Staff</div>
          <div className="kpi-value" style={{ marginTop: '0.35rem' }}>{activeCount}</div>
        </div>
        <div className="pastel-card-3" style={{ padding: '1.25rem', borderRadius: '14px' }}>
          <div className="kpi-label">On Notice</div>
          <div className="kpi-value" style={{ marginTop: '0.35rem' }}>{leaveCount}</div>
        </div>
        <div className="pastel-card-4" style={{ padding: '1.25rem', borderRadius: '14px' }}>
          <div className="kpi-label">Inactive</div>
          <div className="kpi-value" style={{ marginTop: '0.35rem' }}>{separatedCount}</div>
        </div>
      </div>

      {/* Filter and Table Container */}
      <div style={{ background: 'linear-gradient(145deg, #ffffff 0%, #faf5ff 100%)', borderRadius: '16px', border: '1px solid #e9d5ff', overflow: 'hidden', boxShadow: '0 6px 22px rgba(147, 51, 234, 0.05)' }}>
        <div style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f3e8ff', backgroundColor: 'rgba(250, 245, 255, 0.3)' }}>
          <input 
            type="text" 
            placeholder="Search employee..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: '0.6rem 1rem',
              borderRadius: '8px',
              border: '1px solid #e9d5ff',
              fontSize: '0.9rem',
              width: '280px',
              backgroundColor: '#ffffff',
              color: '#2e1065'
            }}
          />
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '0.6rem 1rem', borderRadius: '8px', border: '1px solid #e9d5ff', fontSize: '0.9rem', backgroundColor: '#ffffff', color: '#2e1065' }}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="On Leave">On Notice</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Employees Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #f1f5f9', color: '#64748b', fontSize: '0.85rem', fontWeight: 600 }}>
              <th style={{ padding: '1rem 1.5rem' }}>ID</th>
              <th style={{ padding: '1rem 1.5rem' }}>Name</th>
              <th style={{ padding: '1rem 1.5rem' }}>Department</th>
              <th style={{ padding: '1rem 1.5rem' }}>Email</th>
              <th style={{ padding: '1rem 1.5rem' }}>Status</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                  No employee records found.
                </td>
              </tr>
            ) : (
              filteredEmployees.map((emp) => (
                <tr key={emp.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.9rem', fontWeight: 600, color: '#64748b' }}>
                    {emp.employeeId || `EMP00${emp.id}`}
                  </td>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.95rem', fontWeight: 600, color: '#1e293b' }}>
                    {emp.name}
                  </td>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.9rem', color: '#64748b' }}>
                    {emp.departmentName || (emp.department ? emp.department.deptName : 'IT')}
                  </td>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.9rem', color: '#64748b' }}>
                    {emp.email}
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      backgroundColor: emp.status === 'ACTIVE' ? '#dcfce7' : '#fee2e2',
                      color: emp.status === 'ACTIVE' ? '#15803d' : '#b91c1c'
                    }}>
                      {emp.status === 'ACTIVE' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    <button
                      onClick={() => handleDeleteEmployee(emp.id)}
                      style={{
                        padding: '0.4rem 0.85rem',
                        backgroundColor: '#ef4444',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        marginRight: '0.5rem'
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '2rem',
            maxWidth: '480px',
            width: '100%',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1.25rem', color: '#1e293b' }}>
              Add New Employee
            </h2>

            <form onSubmit={handleAddEmployee} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem', color: '#334155' }}>Employee ID</label>
                <input
                  type="text"
                  required
                  value={newEmp.employeeId}
                  onChange={(e) => setNewEmp({ ...newEmp, employeeId: e.target.value })}
                  placeholder="EMP005"
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem', color: '#334155' }}>Name</label>
                <input
                  type="text"
                  required
                  value={newEmp.name}
                  onChange={(e) => setNewEmp({ ...newEmp, name: e.target.value })}
                  placeholder="Full Name"
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem', color: '#334155' }}>Phone Number</label>
                <input
                  type="text"
                  required
                  value={newEmp.phoneNumber}
                  onChange={(e) => setNewEmp({ ...newEmp, phoneNumber: e.target.value })}
                  placeholder="9876543210"
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem', color: '#334155' }}>Email</label>
                <input
                  type="email"
                  required
                  value={newEmp.email}
                  onChange={(e) => setNewEmp({ ...newEmp, email: e.target.value })}
                  placeholder="name@company.com"
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem', color: '#334155' }}>Designation</label>
                <input
                  type="text"
                  required
                  value={newEmp.designation}
                  onChange={(e) => setNewEmp({ ...newEmp, designation: e.target.value })}
                  placeholder="Software Engineer"
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem', color: '#334155' }}>Date of Joining</label>
                <input
                  type="date"
                  required
                  value={newEmp.dateOfJoining}
                  onChange={(e) => setNewEmp({ ...newEmp, dateOfJoining: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{ padding: '0.65rem 1.25rem', backgroundColor: '#e2e8f0', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '0.65rem 1.25rem', backgroundColor: '#7F56D9', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Create Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
