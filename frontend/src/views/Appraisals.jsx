import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import appraisalService from '../services/appraisalService';

const Appraisals = () => {
  const { authState } = useContext(AuthContext);
  const { role } = authState;
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleStartCycle = async () => {
    try {
      await appraisalService.startAppraisalCycle('2026');
      setSuccess('Performance appraisal cycle 2026 started successfully.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to start appraisal cycle.');
    }
  };

  const appraisals = [
    { id: 1, employeeName: 'Priya Sharma', cycleYear: '2026', selfRating: 4.5, managerRating: 4.8, finalRating: 4.7, status: 'CLOSED' },
    { id: 2, employeeName: 'Rithanya S', cycleYear: '2026', selfRating: 4.2, managerRating: 4.5, finalRating: 4.4, status: 'MANAGER_REVIEW' },
    { id: 3, employeeName: 'Ethan Vance', cycleYear: '2026', selfRating: 4.0, managerRating: 4.1, finalRating: 4.0, status: 'SELF_REVIEW' }
  ];

  return (
    <div style={{ padding: '2rem 2.5rem', minHeight: 'calc(100vh - 70px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#2e1065', margin: 0 }}>
            Performance Appraisals
          </h1>
          <p style={{ fontSize: '0.95rem', color: '#6b21a8', marginTop: '0.25rem' }}>
            Manage performance reviews, self-assessments, and rating increments
          </p>
        </div>

        {['ADMIN', 'HR_BP', 'MANAGER'].includes(role) && (
          <button 
            onClick={handleStartCycle}
            style={{
              backgroundColor: '#9333ea',
              color: '#ffffff',
              padding: '0.65rem 1.25rem',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            + Start Appraisal Cycle 2026
          </button>
        )}
      </div>

      {error && <div style={{ padding: '0.75rem', backgroundColor: '#fff1f2', color: '#9f1239', borderRadius: '8px', marginBottom: '1rem', border: '1px solid #ffe4e6' }}>{error}</div>}
      {success && <div style={{ padding: '0.75rem', backgroundColor: '#f3e8ff', color: '#7e22ce', borderRadius: '8px', marginBottom: '1rem', border: '1px solid #e9d5ff' }}>{success}</div>}

      <div style={{ background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, #faf5ff 60%, #fdf2f8 100%)', borderRadius: '16px', border: '1px solid #e9d5ff', overflow: 'hidden', boxShadow: '0 4px 20px -2px rgba(147, 51, 234, 0.06)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#faf7ff', borderBottom: '1px solid #e9d5ff', color: '#581c87', fontSize: '0.85rem', fontWeight: 600 }}>
              <th style={{ padding: '1rem 1.5rem' }}>Employee</th>
              <th style={{ padding: '1rem 1.5rem' }}>Cycle</th>
              <th style={{ padding: '1rem 1.5rem' }}>Self Rating</th>
              <th style={{ padding: '1rem 1.5rem' }}>Manager Rating</th>
              <th style={{ padding: '1rem 1.5rem' }}>Final Rating</th>
              <th style={{ padding: '1rem 1.5rem' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {appraisals.map((app) => (
              <tr key={app.id} style={{ borderBottom: '1px solid #f3e8ff' }}>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#2e1065' }}>{app.employeeName}</td>
                <td style={{ padding: '1rem 1.5rem', color: '#6b21a8' }}>{app.cycleYear}</td>
                <td style={{ padding: '1rem 1.5rem', color: '#6b21a8' }}>⭐ {app.selfRating}</td>
                <td style={{ padding: '1rem 1.5rem', color: '#6b21a8' }}>⭐ {app.managerRating}</td>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: '#9333ea' }}>⭐ {app.finalRating}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    backgroundColor: app.status === 'CLOSED' ? '#f3e8ff' : app.status === 'MANAGER_REVIEW' ? '#fae8ff' : '#fce7f3',
                    color: app.status === 'CLOSED' ? '#7e22ce' : app.status === 'MANAGER_REVIEW' ? '#86198f' : '#be185d'
                  }}>
                    {app.status}
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

export default Appraisals;
