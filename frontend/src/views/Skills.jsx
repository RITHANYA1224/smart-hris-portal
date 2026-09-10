import React from 'react';

const Skills = () => {
  const skills = [
    { id: 1, name: 'Java & Spring Boot', category: 'Backend Development', proficiency: 'EXPERT' },
    { id: 2, name: 'React.js & JavaScript', category: 'Frontend Development', proficiency: 'ADVANCED' },
    { id: 3, name: 'MySQL & Database Architecture', category: 'Database Systems', proficiency: 'ADVANCED' },
    { id: 4, name: 'Docker & Kubernetes', category: 'DevOps & Cloud', proficiency: 'INTERMEDIATE' }
  ];

  return (
    <div style={{ padding: '2rem 2.5rem', minHeight: 'calc(100vh - 70px)' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#2e1065', margin: 0 }}>
          Skills Matrix
        </h1>
        <p style={{ fontSize: '0.95rem', color: '#6b21a8', marginTop: '0.25rem' }}>
          Organization skill taxonomy and employee competency mapping
        </p>
      </div>

      <div style={{ background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, #faf5ff 60%, #fdf2f8 100%)', borderRadius: '16px', border: '1px solid #e9d5ff', overflow: 'hidden', boxShadow: '0 4px 20px -2px rgba(147, 51, 234, 0.06)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#faf7ff', borderBottom: '1px solid #e9d5ff', color: '#581c87', fontSize: '0.85rem', fontWeight: 600 }}>
              <th style={{ padding: '1rem 1.5rem' }}>Skill Name</th>
              <th style={{ padding: '1rem 1.5rem' }}>Category</th>
              <th style={{ padding: '1rem 1.5rem' }}>Proficiency Benchmark</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((sk) => (
              <tr key={sk.id} style={{ borderBottom: '1px solid #f3e8ff' }}>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#2e1065' }}>{sk.name}</td>
                <td style={{ padding: '1rem 1.5rem', color: '#6b21a8' }}>{sk.category}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    backgroundColor: sk.proficiency === 'EXPERT' ? '#f3e8ff' : sk.proficiency === 'ADVANCED' ? '#fae8ff' : '#fce7f3',
                    color: sk.proficiency === 'EXPERT' ? '#7e22ce' : sk.proficiency === 'ADVANCED' ? '#86198f' : '#be185d'
                  }}>
                    {sk.proficiency}
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

export default Skills;
