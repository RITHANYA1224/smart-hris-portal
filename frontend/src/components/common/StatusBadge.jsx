import React from 'react';

const StatusBadge = ({ status }) => {
  const isGood = ['ACTIVE', 'APPROVED', 'DISBURSED', 'SUCCESS'].includes(status?.toUpperCase());
  const isPending = ['PENDING', 'PROCESSED', 'ON_NOTICE'].includes(status?.toUpperCase());

  const bg = isGood ? '#dcfce7' : isPending ? '#fef9c3' : '#fee2e2';
  const text = isGood ? '#15803d' : isPending ? '#a16207' : '#b91c1c';

  return (
    <span style={{
      padding: '0.35rem 0.75rem',
      borderRadius: '9999px',
      fontSize: '0.8rem',
      fontWeight: 700,
      backgroundColor: bg,
      color: text
    }}>
      {status}
    </span>
  );
};

export default StatusBadge;
