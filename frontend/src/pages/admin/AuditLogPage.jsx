import React, { useState } from 'react';

const AuditLogPage = () => {
  const [logs] = useState([
    { id: 1, action: 'USER_LOGIN', user: 'admin@hris.com', timestamp: '2026-09-02 10:15:30', status: 'SUCCESS' },
    { id: 2, action: 'EMPLOYEE_CREATE', user: 'admin@hris.com', timestamp: '2026-09-02 10:20:12', status: 'SUCCESS' },
    { id: 3, action: 'PAYROLL_RUN', user: 'rithanya.s@company.com', timestamp: '2026-09-02 11:00:00', status: 'SUCCESS' },
    { id: 4, action: 'LEAVE_APPROVE', user: 'priya.sharma@company.com', timestamp: '2026-09-02 11:45:19', status: 'SUCCESS' }
  ]);

  return (
    <div style={{ padding: '2rem 2.5rem', backgroundColor: '#f8fafc' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e293b' }}>Security & Audit Logs</h1>
      <p style={{ color: '#64748b' }}>Comprehensive system access and transactional event traceability.</p>

      <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', marginTop: '1.5rem', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #f1f5f9', color: '#64748b', fontSize: '0.85rem' }}>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left' }}>Event ID</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left' }}>Action Performed</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left' }}>Initiated By</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left' }}>Timestamp</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left' }}>Outcome</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(l => (
              <tr key={l.id} style={{ borderBottom: '1px solid #f8fafc', fontSize: '0.9rem' }}>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>LOG-00{l.id}</td>
                <td style={{ padding: '1rem 1.5rem', color: '#7F56D9', fontWeight: 600 }}>{l.action}</td>
                <td style={{ padding: '1rem 1.5rem' }}>{l.user}</td>
                <td style={{ padding: '1rem 1.5rem', color: '#64748b' }}>{l.timestamp}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '0.25rem 0.65rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>
                    {l.status}
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

export default AuditLogPage;
