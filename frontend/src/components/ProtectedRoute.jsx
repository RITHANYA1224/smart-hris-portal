import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { authState } = useContext(AuthContext);

  if (authState.loading) {
    return (
      <div className="main-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (!authState.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(authState.role)) {
    return (
      <div className="main-content">
        <div className="card" style={{ maxWidth: '600px', margin: '2rem auto', textAlign: 'center' }}>
          <span style={{ fontSize: '3rem' }}>🚫</span>
          <h2 style={{ marginTop: '1rem' }}>Unauthorized Access</h2>
          <p>You do not have permissions to view this resource. Contact system administrator if this is an error.</p>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
