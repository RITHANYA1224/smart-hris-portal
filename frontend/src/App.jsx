import React, { useContext } from 'react';
import { Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

import Landing from './views/Landing';
import Login from './views/Login';
import Register from './views/Register';
import Dashboard from './views/Dashboard';
import LeaveManagement from './views/LeaveManagement';
import Employees from './views/Employees';
import Payroll from './views/Payroll';
import Analytics from './views/Analytics';
import Documents from './views/Documents';

const App = () => {
  const { authState, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Paths that render the Dashboard layout with sidebar
  const isDashboardRoute = ['/dashboard', '/employees', '/leaves', '/payroll', '/analytics', '/documents'].includes(location.pathname);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Get user avatar initials
  const getInitials = (nameStr) => {
    if (!nameStr) return 'U';
    return nameStr.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  // Resolve current user designation
  const getDesignation = () => {
    if (!authState.isAuthenticated) return '';
    try {
      const employees = JSON.parse(localStorage.getItem('hris_employees') || '[]');
      const emp = employees.find(e => e.email === authState.email);
      return emp ? emp.designation : authState.role;
    } catch (e) {
      return authState.role;
    }
  };

  if (authState.loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  // Dashboard layout with Sidebar and Header
  if (authState.isAuthenticated && isDashboardRoute) {
    const isSidebarCompact = localStorage.getItem('sidebarStyle') === 'compact';
    
    return (
      <ErrorBoundary>
        <div className="dashboard-container">
          {/* Sidebar */}
          <aside className={`sidebar ${isSidebarCompact ? 'compact' : ''}`}>
            <div className="sidebar-header">
              <div className="nav-brand-logo">💼</div>
              <span className="sidebar-header-text" style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>HRIS</span>
            </div>

            <ul className="sidebar-menu">
              <li>
                <NavLink to="/dashboard" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
                  <span>📊</span> <span className="sidebar-link-text">Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/employees" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
                  <span>👥</span> <span className="sidebar-link-text">Employees</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/leaves" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
                  <span>📅</span> <span className="sidebar-link-text">Leave</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/payroll" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
                  <span>💵</span> <span className="sidebar-link-text">Payroll</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/analytics" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
                  <span>📈</span> <span className="sidebar-link-text">Analytics</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/documents" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
                  <span>📁</span> <span className="sidebar-link-text">Documents</span>
                </NavLink>
              </li>
            </ul>

            <div className="sidebar-footer">
              <div className="user-avatar">{getInitials(authState.name)}</div>
              <div className="sidebar-footer-info" style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: '0.875rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--text-primary)' }}>
                  {authState.name}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {getDesignation()}
                </div>
              </div>
              <button onClick={handleLogout} className="icon-btn" title="Logout" style={{ color: 'var(--danger-color)' }}>
                <span>🚪</span>
              </button>
            </div>
          </aside>

          {/* Main Panel */}
          <div className="main-panel">
            {/* Top Header */}
            <header className="header-bar">
              <div className="search-container">
                <span className="search-icon">🔍</span>
                <input type="text" placeholder="Search anything..." className="search-input" />
              </div>

              <div className="header-actions">
                <button className="icon-btn" title="Notifications">
                  <span>🔔</span>
                </button>
                <div className="user-avatar" title={authState.name}>{getInitials(authState.name)}</div>
              </div>
            </header>

            {/* View Content */}
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/employees" element={<ProtectedRoute><Employees /></ProtectedRoute>} />
                <Route path="/leaves" element={<ProtectedRoute><LeaveManagement /></ProtectedRoute>} />
                <Route path="/payroll" element={<ProtectedRoute><Payroll /></ProtectedRoute>} />
                <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
                <Route path="/documents" element={<ProtectedRoute><Documents /></ProtectedRoute>} />
                <Route path="*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              </Routes>
            </main>
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  // Public layouts (Landing, Login, Register)
  return (
    <ErrorBoundary>
      <div className="app-container">
        <NavBar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Landing />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default App;
