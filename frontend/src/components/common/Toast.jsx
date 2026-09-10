import React from 'react';

const Toast = ({ type = 'success', message, onClose }) => {
  if (!message) return null;

  const isSuccess = type === 'success';
  return (
    <div style={{
      padding: '0.85rem 1.25rem',
      borderRadius: '8px',
      marginBottom: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: isSuccess ? '#f0fdf4' : '#fef2f2',
      color: isSuccess ? '#15803d' : '#b91c1c',
      border: `1px solid ${isSuccess ? '#bbf7d0' : '#fecdd3'}`
    }}>
      <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{message}</span>
      {onClose && (
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', fontWeight: 700 }}>✕</button>
      )}
    </div>
  );
};

export default Toast;
