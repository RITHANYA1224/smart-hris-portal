import React, { useState } from 'react';

const Skills = () => {
  // State for search filter on the Skills Matrix table
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Master Skills List (preserving original entries & enhancing with Employee Counts)
  const skillsData = [
    { id: 1, name: 'Java & Spring Boot', category: 'Backend Development', proficiency: 'EXPERT', employeesCount: 4, demand: 'High Demand' },
    { id: 2, name: 'React.js & JavaScript', category: 'Frontend Development', proficiency: 'ADVANCED', employeesCount: 5, demand: 'High Demand' },
    { id: 3, name: 'MySQL & Database Architecture', category: 'Database Systems', proficiency: 'ADVANCED', employeesCount: 3, demand: 'Medium Demand' },
    { id: 4, name: 'Docker & Kubernetes', category: 'DevOps & Cloud', proficiency: 'INTERMEDIATE', employeesCount: 2, demand: 'Growing Demand' },
    { id: 5, name: 'Cloud Computing & AWS', category: 'DevOps & Cloud', proficiency: 'ADVANCED', employeesCount: 6, demand: 'Growing Demand' },
    { id: 6, name: 'Agile & HR Team Leadership', category: 'Management', proficiency: 'EXPERT', employeesCount: 4, demand: 'High Demand' }
  ];

  // Categories summary data
  const categoriesData = [
    { name: 'Backend Development', skillsCount: 5, employeesCount: 8, icon: '💻', classType: 'pastel-card-1' },
    { name: 'Frontend Development', skillsCount: 4, employeesCount: 6, icon: '🎨', classType: 'pastel-card-2' },
    { name: 'Database Systems', skillsCount: 4, employeesCount: 5, icon: '🗄️', classType: 'pastel-card-3' },
    { name: 'DevOps & Cloud', skillsCount: 4, employeesCount: 4, icon: '☁️', classType: 'pastel-card-4' },
    { name: 'Human Resources', skillsCount: 3, employeesCount: 5, icon: '👥', classType: 'pastel-card-1' },
    { name: 'Management', skillsCount: 4, employeesCount: 6, icon: '📊', classType: 'pastel-card-2' }
  ];

  // Skills Gap Analysis data
  const skillsGapData = [
    { skill: 'Cloud Computing & AWS', current: 'Intermediate', target: 'Advanced', progress: 65 },
    { skill: 'Cybersecurity & Compliance', current: 'Beginner', target: 'Intermediate', progress: 40 },
    { skill: 'Data Analytics & Reporting', current: 'Intermediate', target: 'Advanced', progress: 60 },
    { skill: 'AI & Process Automation', current: 'Beginner', target: 'Intermediate', progress: 35 }
  ];

  // In-Demand Skills data
  const inDemandSkills = [
    { name: 'Java & Spring Boot', demand: 'High Demand', tagColor: '#7e22ce', tagBg: '#f3e8ff' },
    { name: 'React.js & JavaScript', demand: 'High Demand', tagColor: '#be185d', tagBg: '#fce7f3' },
    { name: 'Cloud Computing & AWS', demand: 'Growing Demand', tagColor: '#86198f', tagBg: '#fae8ff' },
    { name: 'Data Analytics', demand: 'Growing Demand', tagColor: '#9f1239', tagBg: '#ffe4e6' }
  ];

  // Filter skills based on user search & category dropdown
  const filteredSkills = skillsData.filter(sk => {
    const matchesSearch = sk.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sk.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || sk.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ padding: '2rem 2.5rem', minHeight: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Page Header */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#2e1065', margin: 0 }}>
          Skills Matrix & Competency Directory
        </h1>
        <p style={{ fontSize: '0.95rem', color: '#6b21a8', marginTop: '0.25rem' }}>
          Organization skill taxonomy, employee competency mapping, training insights, and workforce gap analysis.
        </p>
      </div>

      {/* 1. Skills Overview Summary Cards (4 Cards Grid) */}
      <section className="kpi-grid">
        <div className="card kpi-card pastel-card-1">
          <div className="kpi-icon pastel-icon-lavender">🎯</div>
          <div>
            <div className="kpi-value">24</div>
            <div className="kpi-label">Total Skills</div>
            <div style={{ fontSize: '0.75rem', color: '#6b21a8', marginTop: '0.2rem' }}>Skills tracked across organization</div>
          </div>
        </div>

        <div className="card kpi-card pastel-card-2">
          <div className="kpi-icon pastel-icon-pink">📁</div>
          <div>
            <div className="kpi-value">6</div>
            <div className="kpi-label">Skill Categories</div>
            <div style={{ fontSize: '0.75rem', color: '#9d174d', marginTop: '0.2rem' }}>Technical & professional domains</div>
          </div>
        </div>

        <div className="card kpi-card pastel-card-3">
          <div className="kpi-icon pastel-icon-lilac">⭐</div>
          <div>
            <div className="kpi-value">12</div>
            <div className="kpi-label">Advanced Skills</div>
            <div style={{ fontSize: '0.75rem', color: '#701a75', marginTop: '0.2rem' }}>Employees with advanced proficiency</div>
          </div>
        </div>

        <div className="card kpi-card pastel-card-4">
          <div className="kpi-icon pastel-icon-blush">⚠️</div>
          <div>
            <div className="kpi-value">4</div>
            <div className="kpi-label">Skills Gap</div>
            <div style={{ fontSize: '0.75rem', color: '#881337', marginTop: '0.2rem' }}>Key areas requiring training</div>
          </div>
        </div>
      </section>

      {/* 2. Enhanced Skills Matrix Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e9d5ff', backgroundColor: 'rgba(250, 245, 255, 0.3)' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#2e1065', margin: 0 }}>
            Competency Benchmark Matrix
          </h2>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <input 
              type="text" 
              placeholder="Search skill or category..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '0.55rem 0.9rem',
                borderRadius: '8px',
                border: '1px solid #e9d5ff',
                fontSize: '0.875rem',
                width: '240px',
                backgroundColor: '#ffffff',
                color: '#2e1065'
              }}
            />
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{
                padding: '0.55rem 0.9rem',
                borderRadius: '8px',
                border: '1px solid #e9d5ff',
                fontSize: '0.875rem',
                backgroundColor: '#ffffff',
                color: '#2e1065'
              }}
            >
              <option value="All">All Categories</option>
              <option value="Backend Development">Backend Development</option>
              <option value="Frontend Development">Frontend Development</option>
              <option value="Database Systems">Database Systems</option>
              <option value="DevOps & Cloud">DevOps & Cloud</option>
              <option value="Management">Management</option>
            </select>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#faf7ff', borderBottom: '1px solid #e9d5ff', color: '#581c87', fontSize: '0.85rem', fontWeight: 600 }}>
              <th style={{ padding: '1rem 1.5rem' }}>Skill Name</th>
              <th style={{ padding: '1rem 1.5rem' }}>Category</th>
              <th style={{ padding: '1rem 1.5rem' }}>Proficiency Benchmark</th>
              <th style={{ padding: '1rem 1.5rem' }}>Employees</th>
            </tr>
          </thead>
          <tbody>
            {filteredSkills.length > 0 ? (
              filteredSkills.map((sk) => (
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
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#4c1d95' }}>
                    👥 {sk.employeesCount} Employees
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#6b21a8' }}>
                  No skills matched your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 3. Skill Categories Overview */}
      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#2e1065', marginBottom: '1rem' }}>
          Skill Categories Overview
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
          {categoriesData.map((cat, idx) => (
            <div key={idx} className={`card ${cat.classType}`} style={{ borderRadius: '14px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.6rem' }}>{cat.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: '#2e1065' }}>{cat.name}</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.85 }}>
                    {cat.skillsCount} Skills • {cat.employeesCount} Employees
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Skills Gap Analysis & Skill Distribution Chart (2 Columns Grid) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        
        {/* Left Column: Skills Gap Analysis */}
        <div className="card">
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#2e1065', marginBottom: '0.35rem' }}>
            Skills Gap Analysis
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#6b21a8', marginBottom: '1.25rem' }}>
            Critical skill areas identified for employee development and upskilling
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {skillsGapData.map((item, idx) => (
              <div key={idx} style={{ padding: '0.85rem 1rem', borderRadius: '10px', backgroundColor: 'rgba(250, 245, 255, 0.6)', border: '1px solid #e9d5ff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 700, color: '#2e1065', marginBottom: '0.4rem' }}>
                  <span>{item.skill}</span>
                  <span style={{ fontSize: '0.78rem', color: '#86198f' }}>{item.current} ➔ {item.target}</span>
                </div>
                <div style={{ height: '8px', width: '100%', backgroundColor: '#e9d5ff', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${item.progress}%`,
                    background: idx % 2 === 0 ? 'linear-gradient(90deg, #9333ea, #c084fc)' : 'linear-gradient(90deg, #ec4899, #f472b6)',
                    borderRadius: '999px'
                  }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Skill Distribution Chart */}
        <div className="card">
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#2e1065', marginBottom: '0.35rem' }}>
            Skill Distribution by Category
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#6b21a8', marginBottom: '1rem' }}>
            Percentage breakdown of organizational competencies
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '210px' }}>
            {/* SVG Donut Chart */}
            <svg viewBox="0 0 160 160" width="160" height="160">
              <circle cx="80" cy="80" r="60" fill="none" stroke="#f3e8ff" strokeWidth="24" />
              {/* Backend 30% */}
              <circle cx="80" cy="80" r="60" fill="none" stroke="#9333ea" strokeWidth="24" strokeDasharray="113 264" strokeDashoffset="0" />
              {/* Frontend 25% */}
              <circle cx="80" cy="80" r="60" fill="none" stroke="#ec4899" strokeWidth="24" strokeDasharray="94 283" strokeDashoffset="-113" />
              {/* Database 20% */}
              <circle cx="80" cy="80" r="60" fill="none" stroke="#c084fc" strokeWidth="24" strokeDasharray="75 302" strokeDashoffset="-207" />
              {/* DevOps 15% */}
              <circle cx="80" cy="80" r="60" fill="none" stroke="#f472b6" strokeWidth="24" strokeDasharray="56 321" strokeDashoffset="-282" />
              {/* Management 10% */}
              <circle cx="80" cy="80" r="60" fill="none" stroke="#d8b4fe" strokeWidth="24" strokeDasharray="38 339" strokeDashoffset="-338" />
              <text x="80" y="84" textAnchor="middle" fontSize="14" fontWeight="800" fill="#2e1065">100%</text>
            </svg>

            {/* Legend */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#9333ea' }}></span>
                <span style={{ fontWeight: 600, color: '#2e1065' }}>Backend (30%)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#ec4899' }}></span>
                <span style={{ fontWeight: 600, color: '#2e1065' }}>Frontend (25%)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#c084fc' }}></span>
                <span style={{ fontWeight: 600, color: '#2e1065' }}>Database (20%)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#f472b6' }}></span>
                <span style={{ fontWeight: 600, color: '#2e1065' }}>DevOps & Cloud (15%)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#d8b4fe' }}></span>
                <span style={{ fontWeight: 600, color: '#2e1065' }}>Management (10%)</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 5. Bottom Section: Most In-Demand Skills & Employee Skill Insights */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        
        {/* Most In-Demand Skills Card */}
        <div className="card">
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#2e1065', marginBottom: '1rem' }}>
            Most In-Demand Skills
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {inDemandSkills.map((sk, idx) => (
              <div key={idx} style={{ padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #e9d5ff', backgroundColor: 'rgba(250, 245, 255, 0.5)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#2e1065', marginBottom: '0.4rem' }}>{sk.name}</div>
                <span style={{
                  padding: '0.25rem 0.65rem',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  backgroundColor: sk.tagBg,
                  color: sk.tagColor
                }}>
                  {sk.demand}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Employee Skill Insights Card */}
        <div className="card">
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#2e1065', marginBottom: '1rem' }}>
            Employee Skill Insights
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            <div className="pastel-card-1" style={{ padding: '1rem', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#2e1065' }}>8</div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#6b21a8', marginTop: '0.25rem' }}>Employees with Expert Skills</div>
            </div>

            <div className="pastel-card-2" style={{ padding: '1rem', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#500724' }}>6</div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#9d174d', marginTop: '0.25rem' }}>Employees Under Training</div>
            </div>

            <div className="pastel-card-3" style={{ padding: '1rem', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#4a044e' }}>4</div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#701a75', marginTop: '0.25rem' }}>Skill Assessments This Month</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Skills;
