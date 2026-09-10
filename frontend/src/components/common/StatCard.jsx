import React from 'react';

const StatCard = ({ label, value, subText, color = '#7F56D9' }) => {
  return (
    <div style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
      <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginTop: '0.35rem' }}>{value}</div>
      {subText && (
        <div style={{ fontSize: '0.75rem', color, marginTop: '0.25rem', fontWeight: 600 }}>{subText}</div>
      )}
    </div>
  );
};

export default StatCard;
