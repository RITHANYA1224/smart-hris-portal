import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

const Payroll = () => {
  const { authState } = useContext(AuthContext);
  const { token, role } = authState;

  const [employees, setEmployees] = useState([]);
  const [payrollList, setPayrollList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Period state
  const [selectedPeriod, setSelectedPeriod] = useState('2026-06-30');

  useEffect(() => {
    fetchPayrollData();
  }, []);

  const fetchPayrollData = async () => {
    setLoading(true);
    setError('');
    try {
      // Fetch employees for display names
      const empRes = await fetch('http://localhost:8080/api/employees/search?query=', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (empRes.ok) {
        const empData = await empRes.json();
        setEmployees(empData);
      }

      // Fetch payroll list from mock database
      const payrollData = JSON.parse(localStorage.getItem('hris_payroll') || '[]');
      setPayrollList(payrollData);
    } catch (err) {
      setError('Failed to fetch payroll records.');
    } finally {
      setLoading(false);
    }
  };

  const handleRunPayroll = async () => {
    setError('');
    setSuccess('');
    try {
      const response = await fetch('http://localhost:8080/api/payroll/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ payPeriod: selectedPeriod })
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess('Payroll run processed successfully.');
        fetchPayrollData();
      } else {
        setError(data.message || 'Error processing payroll.');
      }
    } catch (err) {
      setError('Connection failure.');
    }
  };

  const handleDownloadSlip = (payRecord) => {
    const emp = employees.find(e => e.id === payRecord.employeeId);
    const empName = emp ? emp.name : 'Employee';
    alert(`Downloading Payslip for ${empName} (Period: ${payRecord.payPeriod})\nGross: ₹${payRecord.gross}\nNet Pay: ₹${payRecord.netPay}`);
  };

  // Initials for avatar
  const getInitials = (nameStr) => {
    if (!nameStr) return 'U';
    return nameStr.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  // Filter payroll records for active period
  const filteredPayrolls = payrollList.filter(p => p.payPeriod === selectedPeriod);

  // Math totals for the selected period
  const totalGross = filteredPayrolls.reduce((sum, p) => sum + p.gross, 0);
  const totalPF = filteredPayrolls.reduce((sum, p) => sum + p.pfEmployee, 0);
  const totalESI = filteredPayrolls.reduce((sum, p) => sum + p.esiEmployee, 0);
  const totalTax = filteredPayrolls.reduce((sum, p) => sum + p.tds, 0);
  const totalNet = filteredPayrolls.reduce((sum, p) => sum + p.netPay, 0);
  const employeesPaid = filteredPayrolls.length;

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-content">
      
      {/* Header Info */}
      <div className="dashboard-header-row">
        <div>
          <h1 style={{ background: 'none', WebkitTextFillColor: 'initial', fontSize: '1.75rem', fontWeight: 800 }}>
            Payroll Management
          </h1>
          <div className="dashboard-subtitle">
            Calculate employee gross earnings, statutory deductions, tax withholdings, and disburse net pay.
          </div>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* KPI stats */}
      <section className="kpi-grid">
        <div className="card kpi-card">
          <div className="kpi-icon bg-blue">💵</div>
          <div>
            <div className="kpi-value">₹{totalGross.toLocaleString()}</div>
            <div className="kpi-label">Total Payroll</div>
          </div>
        </div>
        <div className="card kpi-card">
          <div className="kpi-icon bg-green">👥</div>
          <div>
            <div className="kpi-value">{employeesPaid}</div>
            <div className="kpi-label">Employees Paid</div>
          </div>
        </div>
        <div className="card kpi-card">
          <div className="kpi-icon bg-orange">🕒</div>
          <div>
            <div className="kpi-value">{employees.length - employeesPaid}</div>
            <div className="kpi-label">Pending Slips</div>
          </div>
        </div>
        <div className="card kpi-card">
          <div className="kpi-icon bg-pink">🛡️</div>
          <div>
            <div className="kpi-value">₹{totalTax.toLocaleString()}</div>
            <div className="kpi-label">Tax Deducted</div>
          </div>
        </div>
      </section>

      {/* Filter and Action panel */}
      <section className="card" style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontWeight: 600 }}>Period:</span>
          <select 
            className="form-input" 
            style={{ width: '180px', padding: '0.4rem' }}
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="2026-06-30">June 2026</option>
            <option value="2026-07-31">July 2026</option>
            <option value="2026-08-31">August 2026</option>
          </select>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            ({filteredPayrolls.length} employees processed)
          </span>
        </div>
        
        {['Admin', 'HR BP', 'Finance Officer'].includes(role) && (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-secondary" onClick={() => alert('Exporting data as CSV...')}>Export CSV</button>
            <button className="btn btn-primary" onClick={handleRunPayroll}>Generate Payroll</button>
          </div>
        )}
      </section>

      {/* Directory Table */}
      <section className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Basic Salary</th>
              <th>PF (12%)</th>
              <th>ESI (0.75%)</th>
              <th>Tax (10%)</th>
              <th>Net Salary</th>
              <th>Slip</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayrolls.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                  No payroll records found for this period. Click 'Generate Payroll' to calculate.
                </td>
              </tr>
            ) : (
              filteredPayrolls.map((record) => {
                const emp = employees.find(e => e.id === record.employeeId);
                return (
                  <tr key={record.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div className="user-avatar">{getInitials(emp?.name)}</div>
                        <div>
                          <div style={{ fontWeight: 600 }}>{emp?.name || 'Self'}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{emp?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>₹{record.gross.toLocaleString()}</td>
                    <td>₹{record.pfEmployee.toLocaleString()}</td>
                    <td>₹{record.esiEmployee.toLocaleString()}</td>
                    <td>₹{record.tds.toLocaleString()}</td>
                    <td style={{ fontWeight: 600, color: 'var(--primary-color)' }}>₹{record.netPay.toLocaleString()}</td>
                    <td>
                      <button className="btn btn-secondary" style={{ padding: '0.3rem 0.5rem', fontSize: '0.8rem' }} onClick={() => handleDownloadSlip(record)}>
                        <span>⬇️</span> Slip
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </section>

      {/* Two Column Graphs & Breakdowns */}
      {filteredPayrolls.length > 0 && (
        <section className="dashboard-grid-2-1">
          
          {/* Cost Trend line chart */}
          <div className="card">
            <div className="card-title">Payroll Cost Trend</div>
            <div className="chart-container" style={{ height: '220px' }}>
              <svg viewBox="0 0 500 180" width="100%" height="100%">
                <line x1="30" y1="30" x2="480" y2="30" stroke="var(--border-color)" strokeDasharray="3,3" />
                <line x1="30" y1="80" x2="480" y2="80" stroke="var(--border-color)" strokeDasharray="3,3" />
                <line x1="30" y1="130" x2="480" y2="130" stroke="var(--border-color)" strokeDasharray="3,3" />
                
                {/* Cost line */}
                <path d="M 30 140 L 120 120 L 210 135 L 300 80 L 390 90 L 480 60" fill="none" stroke="var(--accent-color)" strokeWidth="3" />
                
                <circle cx="30" cy="140" r="4" fill="var(--accent-color)" />
                <circle cx="120" cy="120" r="4" fill="var(--accent-color)" />
                <circle cx="210" cy="135" r="4" fill="var(--accent-color)" />
                <circle cx="300" cy="80" r="4" fill="var(--accent-color)" />
                <circle cx="390" cy="90" r="4" fill="var(--accent-color)" />
                <circle cx="480" cy="60" r="4" fill="var(--accent-color)" />
                
                {/* Labels */}
                <text x="30" y="165" fill="var(--text-muted)" fontSize="9" textAnchor="middle">Jan</text>
                <text x="120" y="165" fill="var(--text-muted)" fontSize="9" textAnchor="middle">Feb</text>
                <text x="210" y="165" fill="var(--text-muted)" fontSize="9" textAnchor="middle">Mar</text>
                <text x="300" y="165" fill="var(--text-muted)" fontSize="9" textAnchor="middle">Apr</text>
                <text x="390" y="165" fill="var(--text-muted)" fontSize="9" textAnchor="middle">May</text>
                <text x="480" y="165" fill="var(--text-muted)" fontSize="9" textAnchor="middle">Jun</text>
              </svg>
            </div>
          </div>

          {/* Salary Breakdown & Distribution Donut */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="card-title">Salary Breakdown</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Basic Salary</span>
                <span style={{ fontWeight: 600 }}>₹{totalGross.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>PF Contribution</span>
                <span style={{ fontWeight: 600, color: 'var(--danger-color)' }}>- ₹{totalPF.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>ESI Contribution</span>
                <span style={{ fontWeight: 600, color: 'var(--danger-color)' }}>- ₹{totalESI.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Tax (TDS)</span>
                <span style={{ fontWeight: 600, color: 'var(--danger-color)' }}>- ₹{totalTax.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '0.65rem', fontWeight: 700, fontSize: '0.95rem' }}>
                <span>Net Disbursed</span>
                <span style={{ color: 'var(--success-color)' }}>₹{totalNet.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </section>
      )}

    </div>
  );
};

export default Payroll;
