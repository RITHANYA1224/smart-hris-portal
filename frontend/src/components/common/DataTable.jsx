import React from 'react';

const DataTable = ({ columns, data, emptyMessage = 'No records found.' }) => {
  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #f1f5f9', color: '#64748b', fontSize: '0.85rem', fontWeight: 600 }}>
            {columns.map((col, idx) => (
              <th key={idx} style={{ padding: '1rem 1.5rem', textAlign: col.align || 'left' }}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rIdx) => (
              <tr key={rIdx} style={{ borderBottom: '1px solid #f8fafc' }}>
                {columns.map((col, cIdx) => (
                  <td key={cIdx} style={{ padding: '1rem 1.5rem', textAlign: col.align || 'left' }}>
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
