import React, { useState } from 'react';

const UserManagementPage = () => {
  const [users] = useState([
    { id: 102, name: 'Priya Sharma', email: 'priya.sharma@company.com', role: 'MANAGER', status: 'ACTIVE' },
    { id: 103, name: 'Rithanya S', email: 'rithanya.s@company.com', role: 'HR_BP', status: 'ACTIVE' },
    { id: 104, name: 'Sophia Martinez', email: 'sophia.martinez@hriscorp.com', role: 'ADMIN', status: 'ACTIVE' },
    { id: 105, name: 'Admin User', email: 'admin@hris.com', role: 'ADMIN', status: 'ACTIVE' }
  ]);

  return (
    <div style={{ padding: '2rem 2.5rem', backgroundColor: '#f8fafc' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e293b' }}>User Account Management</h1>
      <p style={{ color: '#64748b' }}>Manage authentication credentials and system role assignments.</p>

      <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', marginTop: '1.5rem', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #f1f5f9', color: '#64748b', fontSize: '0.85rem' }}>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left' }}>User ID</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left' }}>Email</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left' }}>Assigned Role</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} style={{ borderBottom: '1px solid #f8fafc', fontSize: '0.9rem' }}>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>USR-{u.id}</td>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#1e293b' }}>{u.name}</td>
                <td style={{ padding: '1rem 1.5rem', color: '#64748b' }}>{u.email}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{ backgroundColor: '#ede9fe', color: '#6d28d9', padding: '0.25rem 0.65rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700 }}>
                    {u.role}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '0.25rem 0.65rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>
                    {u.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagementPage;
