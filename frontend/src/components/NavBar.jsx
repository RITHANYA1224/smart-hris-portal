import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const { authState, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call backend logout endpoint
      await fetch('http://localhost:8080/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authState.token}`
        }
      });
    } catch (err) {
      console.error('Logout error:', err);
    }
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-brand">
        <span>💼</span> Human Resource Information System
      </NavLink>
      
      <ul className="nav-links">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-link nav-active" : "nav-link"}>
            Home
          </NavLink>
        </li>
        
        {!authState.isAuthenticated ? (
          <>
            <li>
              <NavLink to="/login" className={({ isActive }) => isActive ? "nav-link nav-active" : "nav-link"}>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className={({ isActive }) => isActive ? "nav-link nav-active" : "nav-link"}>
                Register
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-link nav-active" : "nav-link"}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/leaves" className={({ isActive }) => isActive ? "nav-link nav-active" : "nav-link"}>
                Leaves
              </NavLink>
            </li>
            <li className="nav-user-info">
              <span>{authState.name} ({authState.role})</span>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
