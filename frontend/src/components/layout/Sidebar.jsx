import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Sidebar = () => {
  const { authState, logout } = useContext(AuthContext);

  const getInitials = (nameStr) => {
    if (!nameStr) return 'U';
    return nameStr.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="nav-brand-logo">💼</div>
        <span className="sidebar-header-text" style={{ fontWeight: 700, fontSize: '1.1rem' }}>HRIS</span>
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
          <NavLink to="/appraisals" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
            <span>⭐</span> <span className="sidebar-link-text">Appraisals</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/skills" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
            <span>💡</span> <span className="sidebar-link-text">Skills</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
            <span>👤</span> <span className="sidebar-link-text">Profile</span>
          </NavLink>
        </li>
      </ul>

      <div className="sidebar-footer">
        <div className="user-avatar">{getInitials(authState.name)}</div>
        <div className="sidebar-footer-info" style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{authState.name}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{authState.role}</div>
        </div>
        <button onClick={logout} className="icon-btn" title="Logout" style={{ color: 'var(--danger-color)' }}>
          <span>🚪</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
