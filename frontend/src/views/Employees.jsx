import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

const Employees = () => {
  const { authState } = useContext(AuthContext);
  const { token, role } = authState;

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
      const response = await fetch('http://localhost:8080/api/employees/search?query=', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
      } else {
        setError('Failed to fetch employees list.');
      }
    } catch (err) {
      setError('Connection failure.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmployee = async (e) => {
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
      } else {
        setError(data.message || 'Error creating employee.');
      }
    } catch (err) {
      setError('Connection failure.');
    }
  };

  const handleDeleteEmployee = (empId) => {
    if (window.confirm('Are you sure you want to delete this employee profile?')) {
      const list = JSON.parse(localStorage.getItem('hris_employees') || '[]');
      const updated = list.filter(e => e.id !== empId);
      localStorage.setItem('hris_employees', JSON.stringify(updated));
      setSuccess('Employee deleted successfully.');
      fetchEmployees();
    }
  };

  // Get Initials for avatars
  const getInitials = (nameStr) => {
    if (!nameStr) return 'U';
    return nameStr.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  // Filtered List
  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
    
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
    <div className="dashboard-content">
      
      {/* Header Info */}
      <div className="dashboard-header-row">
        <div>
          <h1 style={{ background: 'none', WebkitTextFillColor: 'initial', fontSize: '1.75rem', fontWeight: 800 }}>
            Employee Management
          </h1>
          <div className="dashboard-subtitle">
            Manage your organization's employee directory, roles, and status levels.
          </div>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Stats row cards */}
      <section className="kpi-grid">
        <div className="card kpi-card">
          <div className="kpi-icon bg-blue">👥</div>
          <div>
            <div className="kpi-value">{totalCount}</div>
            <div className="kpi-label">Total Employees</div>
          </div>
        </div>
        <div className="card kpi-card">
          <div className="kpi-icon bg-green">✓</div>
          <div>
            <div className="kpi-value">{activeCount}</div>
            <div className="kpi-label">Active Staff</div>
          </div>
        </div>
        <div className="card kpi-card">
          <div className="kpi-icon bg-orange">🕒</div>
          <div>
            <div className="kpi-value">{leaveCount}</div>
            <div className="kpi-label">On Leave / notice</div>
          </div>
        </div>
        <div className="card kpi-card">
          <div className="kpi-icon bg-pink">✕</div>
          <div>
            <div className="kpi-value">{separatedCount}</div>
            <div className="kpi-label">Inactive / Separated</div>
          </div>
        </div>
      </section>

      {/* Filter and Action Controls */}
      <section className="card" style={{ padding: '1rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', flex: 1, minWidth: '300px' }}>
          <div className="search-container" style={{ flex: 1 }}>
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Search employees..." 
              className="search-input" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select 
            className="form-input" 
            style={{ width: '150px', padding: '0.5rem' }} 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {['Admin', 'HR BP'].includes(role) && (
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            <span>➕</span> Add Employee
          </button>
        )}
      </section>

      {/* Directory Table */}
      <section className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Department</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined Date</th>
              {['Admin', 'HR BP'].includes(role) && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                  No employee records match your search criteria.
                </td>
              </tr>
            ) : (
              filteredEmployees.map((emp) => (
                <tr key={emp.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div className="user-avatar">{getInitials(emp.name)}</div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{emp.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{emp.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{emp.departmentId === 2 ? 'Human Resources' : (emp.departmentId === 3 ? 'Finance' : 'Engineering')}</td>
                  <td>{emp.designation}</td>
                  <td>
                    <span className={`badge ${emp.status === 'ACTIVE' ? 'badge-success' : (emp.status === 'ON_NOTICE' ? 'badge-warning' : 'badge-danger')}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td>{emp.dateOfJoining}</td>
                  {['Admin', 'HR BP'].includes(role) && (
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="icon-btn" title="Delete Profile" style={{ color: 'var(--danger-color)' }} onClick={() => handleDeleteEmployee(emp.id)}>
                          <span>🗑️</span>
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      {/* Add Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="card" style={{ maxWidth: '600px', width: '100%' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Create New Employee Profile</h3>
            <form onSubmit={handleAddEmployee}>
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
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Profile</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Employees;
