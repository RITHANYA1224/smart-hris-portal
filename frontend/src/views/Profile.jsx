import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import userService from '../services/userService';
import employeeService from '../services/employeeService';

const Profile = () => {
  const { authState } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fallback credentials from localStorage or context
  const currentEmail = authState.email || localStorage.getItem('userEmail') || localStorage.getItem('email') || 'rithanya@hris.com';
  const currentName = authState.name || localStorage.getItem('userName') || localStorage.getItem('name') || 'Rithanya S';
  const currentRole = authState.role || localStorage.getItem('userRole') || localStorage.getItem('role') || 'HR_BP';

  useEffect(() => {
    loadUserData();
  }, [currentEmail]);

  const loadUserData = async () => {
    setLoading(true);
    setError('');
    try {
      // 1. Fetch user account details
      let userData = null;
      try {
        userData = await userService.getUserProfile(currentEmail);
      } catch (e) {
        userData = {
          name: currentName,
          email: currentEmail,
          role: currentRole,
          isActive: true
        };
      }

      // 2. Fetch employee records to get department, designation, employee ID
      let matchedEmp = null;
      try {
        const empList = await employeeService.getAllEmployees();
        if (Array.isArray(empList)) {
          matchedEmp = empList.find(e => 
            (e.email && e.email.toLowerCase() === currentEmail.toLowerCase()) ||
            (e.name && currentName && e.name.toLowerCase().includes(currentName.toLowerCase())) ||
            (currentName && e.name && currentName.toLowerCase().includes(e.name.toLowerCase()))
          );
        }
      } catch (e) {
        console.warn("Could not fetch employee list for profile details:", e);
      }

      setProfile(userData);
      setEmployeeDetails(matchedEmp);
    } catch (err) {
      console.error("Profile load error:", err);
      setError("Unable to load complete profile. Showing cached user credentials.");
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (nameStr) => {
    if (!nameStr) return 'U';
    return nameStr.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  const displayName = profile?.name || currentName;
  const displayEmail = profile?.email || currentEmail;
  const displayRole = profile?.role || currentRole;
  const displayDepartment = employeeDetails?.departmentName || 
    (displayRole === 'HR_BP' ? 'Human Resources' : 
     displayRole === 'ADMIN' ? 'IT & System Administration' : 
     displayRole === 'MANAGER' ? 'Engineering & Management' : 'Operations');
  const displayDesignation = employeeDetails?.designation || 
    (displayRole === 'HR_BP' ? 'HR Business Partner' : 
     displayRole === 'ADMIN' ? 'System Administrator' : 
     displayRole === 'MANAGER' ? 'Engineering Manager' : 'Team Member');
  const displayEmpId = employeeDetails?.employeeId || (displayRole === 'ADMIN' ? 'ADM-001' : 'EMP-003');
  const displayPhone = employeeDetails?.phoneNumber || profile?.phoneNumber || '9876543212';
  const displayStatus = employeeDetails?.status || (profile?.isActive ? 'Active' : 'Active');

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem 2.5rem', backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 70px)' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
          User Profile
        </h1>
        <p style={{ fontSize: '0.95rem', color: '#64748b', marginTop: '0.25rem' }}>
          Manage your account credentials and system preferences
        </p>
      </div>

      {error && <div style={{ padding: '0.75rem', backgroundColor: '#fef2f2', color: '#b91c1c', borderRadius: '8px', marginBottom: '1rem' }}>{error}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
        {/* Left Profile Card */}
        <div style={{ background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, #faf5ff 60%, #fdf2f8 100%)', borderRadius: '16px', padding: '2rem', border: '1px solid #e9d5ff', textAlign: 'center', boxShadow: '0 8px 24px rgba(147, 51, 234, 0.06)' }}>
          <div style={{
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            backgroundColor: '#7F56D9',
            color: '#ffffff',
            fontSize: '2rem',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem auto',
            boxShadow: '0 10px 15px -3px rgba(127, 86, 217, 0.3)'
          }}>
            {getInitials(displayName)}
          </div>

          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#1e293b', margin: '0 0 0.35rem 0' }}>
            {displayName}
          </h2>
          <div style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1.25rem' }}>
            {displayEmail}
          </div>

          <div style={{ display: 'inline-block', marginBottom: '1.5rem' }}>
            <span style={{
              padding: '0.45rem 1.15rem',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: 700,
              backgroundColor: '#ede9fe',
              color: '#6d28d9',
              letterSpacing: '0.04em'
            }}>
              ROLE: {displayRole}
            </span>
          </div>

          <div style={{ borderTop: '1px solid #e9d5ff', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-around' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>EMPLOYEE ID</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', marginTop: '0.2rem' }}>{displayEmpId}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>STATUS</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#16a34a', marginTop: '0.2rem' }}>{displayStatus}</div>
            </div>
          </div>
        </div>

        {/* Right Details Grid */}
        <div style={{ background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, #faf5ff 60%, #f0fdf4 100%)', borderRadius: '16px', padding: '2rem', border: '1px solid #e9d5ff', boxShadow: '0 8px 24px rgba(147, 51, 234, 0.06)' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1e293b', marginBottom: '1.5rem', borderBottom: '1px solid #e9d5ff', paddingBottom: '0.75rem' }}>
            Account & Employment Details
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.75rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Full Name</label>
              <div style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1e293b', marginTop: '0.35rem' }}>{displayName}</div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email Address</label>
              <div style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1e293b', marginTop: '0.35rem' }}>{displayEmail}</div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Assigned Role</label>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#7F56D9', marginTop: '0.35rem' }}>{displayRole}</div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Designation / Title</label>
              <div style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1e293b', marginTop: '0.35rem' }}>{displayDesignation}</div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Department</label>
              <div style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1e293b', marginTop: '0.35rem' }}>{displayDepartment}</div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact Phone</label>
              <div style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1e293b', marginTop: '0.35rem' }}>{displayPhone}</div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Account Status</label>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#16a34a', marginTop: '0.35rem' }}>{displayStatus}</div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Security Protocol</label>
              <div style={{ fontSize: '1.05rem', fontWeight: 600, color: '#0284c7', marginTop: '0.35rem' }}>JWT Bearer Authentication</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
