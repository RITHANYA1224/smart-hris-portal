import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    role: null,
    name: null,
    email: null,
    isAuthenticated: false,
    loading: true
  });

  useEffect(() => {
    // Validate credentials from localStorage on startup
    const token = localStorage.getItem('jwtToken') || localStorage.getItem('token');
    const role = localStorage.getItem('userRole') || localStorage.getItem('role');
    const name = localStorage.getItem('userName') || localStorage.getItem('name');
    const email = localStorage.getItem('userEmail') || localStorage.getItem('email');

    if (!token) {
      setAuthState({
        token: null,
        role: null,
        name: null,
        email: null,
        isAuthenticated: false,
        loading: false
      });
      return;
    }

    // Verify token validity with backend profile endpoint
    fetch('/api/users/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Invalid session');
      })
      .then((userData) => {
        setAuthState({
          token,
          role: userData.role || role,
          name: userData.name || name,
          email: userData.email || email,
          isAuthenticated: true,
          loading: false
        });
      })
      .catch(() => {
        // Clear invalid token session
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('role');
        localStorage.removeItem('userName');
        localStorage.removeItem('name');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('email');

        setAuthState({
          token: null,
          role: null,
          name: null,
          email: null,
          isAuthenticated: false,
          loading: false
        });
      });
  }, []);

  const login = (token, role, name, email) => {
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', role);
    localStorage.setItem('role', role);
    localStorage.setItem('userName', name);
    localStorage.setItem('name', name);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('email', email);

    setAuthState({
      token,
      role,
      name,
      email,
      isAuthenticated: true,
      loading: false
    });
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    localStorage.removeItem('name');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('email');

    setAuthState({
      token: null,
      role: null,
      name: null,
      email: null,
      isAuthenticated: false,
      loading: false
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
