import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const Documents = () => {
  const { authState } = useContext(AuthContext);

  const [activeSettingsTab, setActiveSettingsTab] = useState('Profile');
  const [profileForm, setProfileForm] = useState({
    firstName: authState.name ? authState.name.split(' ')[0] : 'Priya',
    lastName: authState.name ? authState.name.split(' ').slice(1).join(' ') : 'Sharma',
    jobTitle: 'HR Manager',
    email: authState.email || 'priya@hris.io',
    phone: '+1 555-0103'
  });

  const [appearanceForm, setAppearanceForm] = useState({
    themeColor: localStorage.getItem('themeColor') || 'blue',
    mode: localStorage.getItem('theme') || 'light',
    sidebarStyle: localStorage.getItem('sidebarStyle') || 'full'
  });

  const [notifications, setNotifications] = useState({
    leaveRequests: true,
    payrollAlerts: true,
    newEmployees: false,
    systemUpdates: true,
    birthdayReminders: false
  });

  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [languageForm, setLanguageForm] = useState({
    language: 'English (US)',
    dateFormat: 'MM/DD/YYYY',
    timeZone: 'UTC-5 Eastern'
  });

  const [documentsList, setDocumentsList] = useState([
    { id: 1, name: 'Employment Contract.pdf', size: '1.2 MB', date: 'Jan 12, 2022' },
    { id: 2, name: 'National ID Card.pdf', size: '345 KB', date: 'Jan 12, 2022' },
    { id: 3, name: 'Educational Certificate.pdf', size: '2.1 MB', date: 'Mar 5, 2021' },
    { id: 4, name: 'HR Policy Manual.docx', size: '4.8 MB', date: 'Sep 1, 2023' },
    { id: 5, name: 'Salary Slip June 2024.pdf', size: '180 KB', date: 'Jul 1, 2024' },
    { id: 6, name: 'Performance Review.pdf', size: '650 KB', date: 'Jul 10, 2024' }
  ]);

  const handleProfileSave = (e) => {
    e.preventDefault();
    alert('Profile settings saved successfully.');
  };

  const handleAppearanceSave = (e) => {
    e.preventDefault();
    // Save theme
    localStorage.setItem('theme', appearanceForm.mode);
    document.documentElement.setAttribute('data-theme', appearanceForm.mode);
    
    // Save sidebar style
    localStorage.setItem('sidebarStyle', appearanceForm.sidebarStyle);
    
    alert('Appearance preferences saved successfully. Page will reload to apply sidebar styling.');
    window.location.reload();
  };

  const handleNotificationSave = (e) => {
    e.preventDefault();
    alert('Notification toggles updated.');
  };

  const handleSecuritySave = (e) => {
    e.preventDefault();
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    alert('Security password updated.');
    setSecurityForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleLanguageSave = (e) => {
    e.preventDefault();
    alert('Language regional options saved.');
  };

  const handleUploadFile = () => {
    const fileName = prompt('Enter mock file name to upload:');
    if (!fileName) return;
    const newDoc = {
      id: documentsList.length + 1,
      name: fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`,
      size: '420 KB',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setDocumentsList([newDoc, ...documentsList]);
  };

  const handleDeleteDoc = (id) => {
    if (window.confirm('Delete this document?')) {
      setDocumentsList(documentsList.filter(d => d.id !== id));
    }
  };

  return (
    <div className="dashboard-content">
      
      {/* Header Info */}
      <div className="dashboard-header-row">
        <div>
          <h1 style={{ background: 'none', WebkitTextFillColor: 'initial', fontSize: '1.75rem', fontWeight: 800 }}>
            Documents & Settings
          </h1>
          <div className="dashboard-subtitle">
            Upload personal compliance files, view company documents, and update your profile configurations.
          </div>
        </div>
      </div>

      <section className="dashboard-grid-2-1">
        
        {/* Documents Column (Left) */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card-title">My Documents</div>
          
          {/* Upload Zone */}
          <div className="upload-zone" onClick={handleUploadFile}>
            <div className="upload-icon">📤</div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Drop files here or click to upload</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PDF, DOCX, JPG up to 20MB</div>
          </div>

          {/* Files List */}
          <div className="file-list">
            {documentsList.map(doc => (
              <div key={doc.id} className="file-item">
                <div className="file-item-info">
                  <span className="file-icon">📄</span>
                  <div>
                    <div className="file-name">{doc.name}</div>
                    <div className="file-meta">{doc.size} • Uploaded {doc.date}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  <button className="icon-btn" title="Download" onClick={() => alert(`Downloading: ${doc.name}`)}>
                    <span>⬇️</span>
                  </button>
                  <button className="icon-btn" title="Delete" style={{ color: 'var(--danger-color)' }} onClick={() => handleDeleteDoc(doc.id)}>
                    <span>🗑️</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings Column (Right) */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card-title">Settings</div>
          
          <div className="settings-container">
            {/* Sidebar Navigation inside settings */}
            <nav className="settings-nav">
              {['Profile', 'Appearance', 'Notifications', 'Security', 'Language'].map(tab => (
                <button 
                  key={tab} 
                  className={`settings-nav-btn ${activeSettingsTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveSettingsTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </nav>

            {/* Tab Form fields */}
            <div style={{ flex: 1 }}>
              
              {/* Profile settings */}
              {activeSettingsTab === 'Profile' && (
                <form onSubmit={handleProfileSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {/* Photo area */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    <div className="user-avatar user-avatar-large">
                      {profileForm.firstName[0]}{profileForm.lastName[0]}
                    </div>
                    <button type="button" className="btn btn-secondary" style={{ padding: '0.4rem 0.85rem' }} onClick={() => alert('Change profile photo dialog simulated.')}>
                      Change Photo
                    </button>
                  </div>

                  <div className="form-row">
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">First Name</label>
                      <input type="text" className="form-input" value={profileForm.firstName} onChange={(e) => setProfileForm({...profileForm, firstName: e.target.value})} required />
                    </div>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Last Name</label>
                      <input type="text" className="form-input" value={profileForm.lastName} onChange={(e) => setProfileForm({...profileForm, lastName: e.target.value})} required />
                    </div>
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Job Title</label>
                    <input type="text" className="form-input" value={profileForm.jobTitle} onChange={(e) => setProfileForm({...profileForm, jobTitle: e.target.value})} required />
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Email</label>
                    <input type="email" className="form-input" value={profileForm.email} onChange={(e) => setProfileForm({...profileForm, email: e.target.value})} required />
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Phone</label>
                    <input type="text" className="form-input" value={profileForm.phone} onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})} required />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: 'fit-content', marginTop: '0.5rem' }}>Save Changes</button>
                </form>
              )}

              {/* Appearance preferences */}
              {activeSettingsTab === 'Appearance' && (
                <form onSubmit={handleAppearanceSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  
                  {/* Theme colors */}
                  <div>
                    <label className="form-label">Color Theme</label>
                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                      <span className={`dot-theme-color ${appearanceForm.themeColor === 'blue' ? 'active' : ''}`} style={{ backgroundColor: '#0284c7' }} onClick={() => setAppearanceForm({...appearanceForm, themeColor: 'blue'})} />
                      <span className={`dot-theme-color ${appearanceForm.themeColor === 'purple' ? 'active' : ''}`} style={{ backgroundColor: '#818cf8' }} onClick={() => setAppearanceForm({...appearanceForm, themeColor: 'purple'})} />
                      <span className={`dot-theme-color ${appearanceForm.themeColor === 'orange' ? 'active' : ''}`} style={{ backgroundColor: '#f59e0b' }} onClick={() => setAppearanceForm({...appearanceForm, themeColor: 'orange'})} />
                      <span className={`dot-theme-color ${appearanceForm.themeColor === 'green' ? 'active' : ''}`} style={{ backgroundColor: '#10b981' }} onClick={() => setAppearanceForm({...appearanceForm, themeColor: 'green'})} />
                    </div>
                  </div>

                  {/* Light / Dark Mode toggle */}
                  <div>
                    <label className="form-label">Mode</label>
                    <div className="mode-toggle-group" style={{ marginTop: '0.5rem' }}>
                      <button 
                        type="button" 
                        className={`mode-toggle-btn ${appearanceForm.mode === 'light' ? 'active' : ''}`}
                        onClick={() => setAppearanceForm({...appearanceForm, mode: 'light'})}
                      >
                        ☀️ Light
                      </button>
                      <button 
                        type="button" 
                        className={`mode-toggle-btn ${appearanceForm.mode === 'dark' ? 'active' : ''}`}
                        onClick={() => setAppearanceForm({...appearanceForm, mode: 'dark'})}
                      >
                        🌙 Dark
                      </button>
                    </div>
                  </div>

                  {/* Sidebar style */}
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Sidebar Style</label>
                    <select 
                      className="form-input" 
                      style={{ marginTop: '0.5rem' }} 
                      value={appearanceForm.sidebarStyle} 
                      onChange={(e) => setAppearanceForm({...appearanceForm, sidebarStyle: e.target.value})}
                    >
                      <option value="full">Default Full</option>
                      <option value="compact">Compact Icons</option>
                    </select>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: 'fit-content' }}>Save Preferences</button>
                </form>
              )}

              {/* Notification Toggles */}
              {activeSettingsTab === 'Notifications' && (
                <form onSubmit={handleNotificationSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Leave Requests</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Get notified when a leave is submitted</div>
                      </div>
                      <input type="checkbox" style={{ accentColor: 'var(--primary-color)', transform: 'scale(1.2)' }} checked={notifications.leaveRequests} onChange={(e) => setNotifications({...notifications, leaveRequests: e.target.checked})} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Payroll Alerts</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Alerts when payroll is processed</div>
                      </div>
                      <input type="checkbox" style={{ accentColor: 'var(--primary-color)', transform: 'scale(1.2)' }} checked={notifications.payrollAlerts} onChange={(e) => setNotifications({...notifications, payrollAlerts: e.target.checked})} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>New Employees</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>When someone joins the team</div>
                      </div>
                      <input type="checkbox" style={{ accentColor: 'var(--primary-color)', transform: 'scale(1.2)' }} checked={notifications.newEmployees} onChange={(e) => setNotifications({...notifications, newEmployees: e.target.checked})} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>System Updates</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Product updates and maintenance</div>
                      </div>
                      <input type="checkbox" style={{ accentColor: 'var(--primary-color)', transform: 'scale(1.2)' }} checked={notifications.systemUpdates} onChange={(e) => setNotifications({...notifications, systemUpdates: e.target.checked})} />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: 'fit-content', marginTop: '0.5rem' }}>Save Preferences</button>
                </form>
              )}

              {/* Security password settings */}
              {activeSettingsTab === 'Security' && (
                <form onSubmit={handleSecuritySave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Current Password</label>
                    <input type="password" placeholder="••••••••" className="form-input" value={securityForm.currentPassword} onChange={(e) => setSecurityForm({...securityForm, currentPassword: e.target.value})} required />
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">New Password</label>
                    <input type="password" placeholder="Min. 8 characters" className="form-input" value={securityForm.newPassword} onChange={(e) => setSecurityForm({...securityForm, newPassword: e.target.value})} required />
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Confirm New Password</label>
                    <input type="password" placeholder="Repeat password" className="form-input" value={securityForm.confirmPassword} onChange={(e) => setSecurityForm({...securityForm, confirmPassword: e.target.value})} required />
                  </div>

                  <div className="alert alert-success" style={{ backgroundColor: '#fffbeb', color: '#b45309', borderLeftColor: '#d97706', margin: 0, padding: '0.65rem 1rem', fontSize: '0.8rem' }}>
                    ⓘ 2FA is recommended. Enable it for added security.
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: 'fit-content' }}>Update Password</button>
                </form>
              )}

              {/* Language regional settings */}
              {activeSettingsTab === 'Language' && (
                <form onSubmit={handleLanguageSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Language</label>
                    <select className="form-input" value={languageForm.language} onChange={(e) => setLanguageForm({...languageForm, language: e.target.value})}>
                      <option>English (US)</option>
                      <option>Spanish (ES)</option>
                      <option>German (DE)</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Date Format</label>
                    <select className="form-input" value={languageForm.dateFormat} onChange={(e) => setLanguageForm({...languageForm, dateFormat: e.target.value})}>
                      <option>MM/DD/YYYY</option>
                      <option>DD/MM/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Time Zone</label>
                    <select className="form-input" value={languageForm.timeZone} onChange={(e) => setLanguageForm({...languageForm, timeZone: e.target.value})}>
                      <option>UTC-5 Eastern</option>
                      <option>UTC+0 GMT</option>
                      <option>UTC+5:30 IST</option>
                    </select>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: 'fit-content' }}>Save Settings</button>
                </form>
              )}

            </div>
          </div>
        </div>

      </section>
    </div>
  );
};

export default Documents;
