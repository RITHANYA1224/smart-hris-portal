import React from 'react';
import Sidebar from './Sidebar';

const AppLayout = ({ children }) => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-panel">
        <header className="header-bar">
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search anything..." className="search-input" />
          </div>
        </header>
        <main style={{ flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
