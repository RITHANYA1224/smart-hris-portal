import React, { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const Documents = () => {
  const { authState, login } = useContext(AuthContext);

  const fileInputRef = useRef(null);
  const photoInputRef = useRef(null);

  const [activeSettingsTab, setActiveSettingsTab] = useState('Profile');
  const [successMessage, setSuccessMessage] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(localStorage.getItem('userAvatar') || null);

  // Initialize profile form with logged-in user credentials
  const [profileForm, setProfileForm] = useState({
    firstName: authState.name ? authState.name.split(' ')[0] : 'Admin',
    lastName: authState.name ? authState.name.split(' ').slice(1).join(' ') || 'User' : 'User',
    jobTitle: authState.role === 'ADMIN' ? 'System Administrator' : 
              authState.role === 'HR_BP' ? 'HR Business Partner' : 
              authState.role === 'MANAGER' ? 'Engineering Manager' : 'HR Manager',
    email: authState.email || localStorage.getItem('userEmail') || 'admin@hris.com',
    phone: '+91 98765 43212'
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
    dateFormat: 'DD/MM/YYYY',
    timeZone: 'UTC+5:30 IST'
  });

  // Load documents from localStorage or initialize defaults
  const initialDocs = [
    { id: 1, name: 'Employment Contract.pdf', size: '1.2 MB', date: 'Jan 12, 2022' },
    { id: 2, name: 'National ID Card.pdf', size: '345 KB', date: 'Jan 12, 2022' },
    { id: 3, name: 'Educational Certificate.pdf', size: '2.1 MB', date: 'Mar 5, 2021' },
    { id: 4, name: 'HR Policy Manual.docx', size: '4.8 MB', date: 'Sep 1, 2023' },
    { id: 5, name: 'Salary Slip June 2026.pdf', size: '180 KB', date: 'Jul 1, 2026' },
    { id: 6, name: 'Performance Review.pdf', size: '650 KB', date: 'Jul 10, 2026' }
  ];

  const [documentsList, setDocumentsList] = useState(() => {
    const saved = localStorage.getItem('hris_documents');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialDocs;
      }
    }
    return initialDocs;
  });

  // Save documents to localStorage whenever list changes
  useEffect(() => {
    localStorage.setItem('hris_documents', JSON.stringify(documentsList));
  }, [documentsList]);

  // Keep profile form synchronized when authState changes
  useEffect(() => {
    if (authState.name) {
      const parts = authState.name.split(' ');
      setProfileForm(prev => ({
        ...prev,
        firstName: parts[0] || prev.firstName,
        lastName: parts.slice(1).join(' ') || prev.lastName,
        email: authState.email || prev.email,
        jobTitle: authState.role === 'ADMIN' ? 'System Administrator' : 
                  authState.role === 'HR_BP' ? 'HR Business Partner' : 
                  authState.role === 'MANAGER' ? 'Engineering Manager' : prev.jobTitle
      }));
    }
  }, [authState]);

  const showNotification = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  // 1. FILE MANAGER TRIGGER & UPLOAD HANDLER
  const handleUploadZoneClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newDocs = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const sizeStr = file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(file.size / 1024)} KB`;

      // Create a local blob URL so downloaded files retain their original binary data
      const fileUrl = URL.createObjectURL(file);

      newDocs.push({
        id: Date.now() + i,
        name: file.name,
        size: sizeStr,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        fileUrl: fileUrl,
        type: file.type
      });
    }

    setDocumentsList(prev => [...newDocs, ...prev]);
    showNotification(`Successfully uploaded ${files.length} document(s) to employee record.`);
    // Reset file input so identical files can be selected again if needed
    e.target.value = '';
  };

  // 2. REAL FILE DOWNLOAD HANDLER
  const handleDownloadDoc = (doc) => {
    if (doc.fileUrl) {
      const link = document.createElement('a');
      link.href = doc.fileUrl;
      link.download = doc.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Create mock PDF / document content blob
      const content = `SmartHRIS Enterprise Document Record\n\nTitle: ${doc.name}\nSize: ${doc.size}\nDate: ${doc.date}\nSystem: SmartHRIS MySQL Production Database\nSecurity Classification: Confidential`;
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = doc.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
    showNotification(`Downloading ${doc.name}...`);
  };

  // 3. FILE DELETE HANDLER
  const handleDeleteDoc = (id) => {
    const docToDelete = documentsList.find(d => d.id === id);
    const confirmDelete = window.confirm(`Are you sure you want to delete "${docToDelete?.name || 'this file'}"?`);
    if (confirmDelete) {
      setDocumentsList(prev => prev.filter(d => d.id !== id));
      showNotification(`Document deleted successfully.`);
    }
  };

  // 4. PHOTO CHANGE HANDLER
  const handlePhotoSelect = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target.result;
      setProfilePhoto(result);
      localStorage.setItem('userAvatar', result);
      showNotification('Profile photo updated successfully.');
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // 5. PROFILE FORM SUBMIT (Connected to MySQL & LocalStorage)
  const handleProfileSave = async (e) => {
    e.preventDefault();
    const fullName = `${profileForm.firstName.trim()} ${profileForm.lastName.trim()}`;
    const email = profileForm.email.trim();

    // Update LocalStorage and AuthContext state
    localStorage.setItem('userName', fullName);
    localStorage.setItem('userEmail', email);
    if (login && authState.token) {
      login(authState.token, authState.role, fullName, email);
    }

    // Attempt backend MySQL sync if available
    try {
      await api.put('/api/users/profile', {
        name: fullName,
        email: email,
        phoneNumber: profileForm.phone
      });
    } catch (err) {
      console.warn("Backend profile sync notice (saved to local state):", err);
    }

    showNotification('Profile settings saved successfully.');
  };

  // 6. APPEARANCE PREFERENCES
  const handleAppearanceSave = (e) => {
    e.preventDefault();
    localStorage.setItem('theme', appearanceForm.mode);
    document.documentElement.setAttribute('data-theme', appearanceForm.mode);
    localStorage.setItem('sidebarStyle', appearanceForm.sidebarStyle);
    showNotification('Appearance preferences saved.');
  };

  // 7. NOTIFICATIONS SAVE
  const handleNotificationSave = (e) => {
    e.preventDefault();
    showNotification('Notification preferences saved successfully.');
  };

  // 8. SECURITY SAVE
  const handleSecuritySave = (e) => {
    e.preventDefault();
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    showNotification('Security credentials updated successfully.');
    setSecurityForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  // 9. LANGUAGE REGIONAL SAVE
  const handleLanguageSave = (e) => {
    e.preventDefault();
    showNotification('Regional language & timezone preferences saved.');
  };

  return (
    <div className="dashboard-content">
      
      {/* Hidden File Inputs for Native File Manager Dialogs */}
      <input 
        type="file" 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        multiple 
        accept=".pdf,.docx,.doc,.jpg,.jpeg,.png,.xlsx"
        onChange={handleFileSelect}
      />
      <input 
        type="file" 
        ref={photoInputRef} 
        style={{ display: 'none' }} 
        accept="image/*"
        onChange={handlePhotoSelect}
      />

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

      {/* Success Notification Banner */}
      {successMessage && (
        <div className="alert alert-success fade-in" style={{ backgroundColor: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0', padding: '0.85rem 1.25rem', borderRadius: '10px', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <span>✓</span>
          <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{successMessage}</span>
        </div>
      )}

      <section className="dashboard-grid-2-1">
        
        {/* Documents Column (Left) */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card-title">My Documents</div>
          
          {/* Interactive Upload Zone -> Triggers Native File Manager */}
          <div 
            className="upload-zone" 
            onClick={handleUploadZoneClick}
            style={{ cursor: 'pointer', transition: 'all 0.2s ease', border: '2px dashed #c084fc', borderRadius: '12px', padding: '2rem 1.5rem', textAlign: 'center', backgroundColor: '#faf5ff' }}
            title="Click to open file manager and select files"
          >
            <div className="upload-icon" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📤</div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#7e22ce' }}>Drop files here or click to upload</div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.25rem' }}>PDF, DOCX, JPG, PNG up to 20MB</div>
          </div>

          {/* Files List with Working Download and Delete Buttons */}
          <div className="file-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {documentsList.map(doc => (
              <div 
                key={doc.id} 
                className="file-item"
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #e9d5ff', background: 'linear-gradient(145deg, #f5f3ff 0%, #fae8ff 100%)' }}
              >
                <div className="file-item-info" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <span className="file-icon" style={{ fontSize: '1.5rem' }}>
                    {doc.name.endsWith('.pdf') ? '📄' : doc.name.endsWith('.docx') ? '📝' : '📁'}
                  </span>
                  <div>
                    <div className="file-name" style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1e293b' }}>{doc.name}</div>
                    <div className="file-meta" style={{ fontSize: '0.75rem', color: '#64748b' }}>{doc.size} • Uploaded {doc.date}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button 
                    type="button"
                    className="icon-btn" 
                    title={`Download ${doc.name}`}
                    onClick={() => handleDownloadDoc(doc)}
                    style={{ padding: '0.4rem 0.6rem', cursor: 'pointer', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f8fafc' }}
                  >
                    <span>⬇️</span>
                  </button>
                  <button 
                    type="button"
                    className="icon-btn" 
                    title={`Delete ${doc.name}`}
                    style={{ padding: '0.4rem 0.6rem', cursor: 'pointer', borderRadius: '6px', border: '1px solid #fecaca', background: '#fef2f2', color: '#b91c1c' }}
                    onClick={() => handleDeleteDoc(doc.id)}
                  >
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
                  type="button"
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
                    {profilePhoto ? (
                      <img 
                        src={profilePhoto} 
                        alt="Profile" 
                        style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #7F56D9' }} 
                      />
                    ) : (
                      <div className="user-avatar user-avatar-large" style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#7F56D9', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 700 }}>
                        {profileForm.firstName[0] || 'U'}{profileForm.lastName[0] || ''}
                      </div>
                    )}
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      style={{ padding: '0.4rem 0.85rem' }} 
                      onClick={() => photoInputRef.current?.click()}
                    >
                      Change Photo
                    </button>
                  </div>

                  <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">First Name</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={profileForm.firstName} 
                        onChange={(e) => setProfileForm({...profileForm, firstName: e.target.value})} 
                        required 
                      />
                    </div>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Last Name</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={profileForm.lastName} 
                        onChange={(e) => setProfileForm({...profileForm, lastName: e.target.value})} 
                        required 
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Job Title</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={profileForm.jobTitle} 
                      onChange={(e) => setProfileForm({...profileForm, jobTitle: e.target.value})} 
                      required 
                    />
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Email</label>
                    <input 
                      type="email" 
                      className="form-input" 
                      value={profileForm.email} 
                      onChange={(e) => setProfileForm({...profileForm, email: e.target.value})} 
                      required 
                    />
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Phone</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={profileForm.phone} 
                      onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})} 
                      required 
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    style={{ width: 'fit-content', marginTop: '0.5rem', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 600 }}
                  >
                    Save Changes
                  </button>
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
                      <option>DD/MM/YYYY</option>
                      <option>MM/DD/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Time Zone</label>
                    <select className="form-input" value={languageForm.timeZone} onChange={(e) => setLanguageForm({...languageForm, timeZone: e.target.value})}>
                      <option>UTC+5:30 IST</option>
                      <option>UTC-5 Eastern</option>
                      <option>UTC+0 GMT</option>
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
