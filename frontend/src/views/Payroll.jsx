import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import payrollService from '../services/payrollService';

const Payroll = () => {
  const { authState } = useContext(AuthContext);
  const { role } = authState;

  const [payrollList, setPayrollList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [selectedPeriod, setSelectedPeriod] = useState('2026-06-30');
  const [selectedPayslip, setSelectedPayslip] = useState(null);

  useEffect(() => {
    fetchPayrollData();
  }, []);

  const fetchPayrollData = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await payrollService.getAllPayroll();
      setPayrollList(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch payroll records.');
    } finally {
      setLoading(false);
    }
  };

  const handleRunPayroll = async () => {
    setError('');
    setSuccess('');
    try {
      await payrollService.runPayrollBatch(selectedPeriod);
      setSuccess('Payroll batch successfully processed.');
      fetchPayrollData();
    } catch (err) {
      setError(err.response?.data?.message || 'Error processing payroll.');
    }
  };

  const handleOpenPayslip = (payRecord) => {
    setSelectedPayslip(payRecord);
  };

  const handleClosePayslip = () => {
    setSelectedPayslip(null);
  };

  const filteredPayrolls = payrollList.filter(p => p.payPeriod === selectedPeriod || payrollList.length > 0);

  const totalGross = filteredPayrolls.reduce((sum, p) => sum + (p.gross || 0), 0);
  const totalPF = filteredPayrolls.reduce((sum, p) => sum + (p.pfEmployee || 0), 0);
  const totalESI = filteredPayrolls.reduce((sum, p) => sum + (p.esiEmployee || 0), 0);
  const totalTax = filteredPayrolls.reduce((sum, p) => sum + (p.tds || 0), 0);
  const totalNet = filteredPayrolls.reduce((sum, p) => sum + (p.netPay || 0), 0);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem 2.5rem', backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 70px)' }}>
      {/* Header Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
            Payroll Management
          </h1>
          <p style={{ fontSize: '0.95rem', color: '#64748b', marginTop: '0.25rem' }}>
            Run monthly payroll, view statutory deductions, and generate payslips
          </p>
        </div>

        {['ADMIN', 'HR_BP', 'FINANCE_OFFICER'].includes(role) && (
          <button 
            onClick={handleRunPayroll}
            style={{
              backgroundColor: '#7F56D9',
              color: '#ffffff',
              padding: '0.65rem 1.25rem',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            ⚡ Run Payroll Batch
          </button>
        )}
      </div>

      {error && <div style={{ padding: '0.75rem', backgroundColor: '#fef2f2', color: '#b91c1c', borderRadius: '8px', marginBottom: '1rem' }}>{error}</div>}
      {success && <div style={{ padding: '0.75rem', backgroundColor: '#f0fdf4', color: '#15803d', borderRadius: '8px', marginBottom: '1rem' }}>{success}</div>}

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '1.5rem' }}>
        <div className="pastel-card-1" style={{ padding: '1.25rem', borderRadius: '14px' }}>
          <div className="kpi-label">Total Gross Salary</div>
          <div className="kpi-value" style={{ marginTop: '0.35rem' }}>₹{totalGross.toLocaleString()}</div>
        </div>
        <div className="pastel-card-2" style={{ padding: '1.25rem', borderRadius: '14px' }}>
          <div className="kpi-label">PF Deductions</div>
          <div className="kpi-value" style={{ marginTop: '0.35rem' }}>₹{totalPF.toLocaleString()}</div>
        </div>
        <div className="pastel-card-3" style={{ padding: '1.25rem', borderRadius: '14px' }}>
          <div className="kpi-label">ESI & TDS Tax</div>
          <div className="kpi-value" style={{ marginTop: '0.35rem' }}>₹{(totalESI + totalTax).toLocaleString()}</div>
        </div>
        <div className="pastel-card-4" style={{ padding: '1.25rem', borderRadius: '14px' }}>
          <div className="kpi-label">Total Net Disbursed</div>
          <div className="kpi-value" style={{ marginTop: '0.35rem' }}>₹{totalNet.toLocaleString()}</div>
        </div>
      </div>

      {/* Payroll Table */}
      <div style={{ background: 'linear-gradient(145deg, #ffffff 0%, #faf5ff 100%)', borderRadius: '16px', border: '1px solid #e9d5ff', overflow: 'hidden', boxShadow: '0 6px 22px rgba(147, 51, 234, 0.05)' }}>
        <div style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f3e8ff', backgroundColor: 'rgba(250, 245, 255, 0.3)' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#2e1065', margin: 0 }}>
            Payroll Records ({selectedPeriod})
          </h2>

          <select 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(e.target.value)}
            style={{ padding: '0.6rem 1rem', borderRadius: '8px', border: '1px solid #e9d5ff', fontSize: '0.9rem', backgroundColor: '#ffffff', color: '#2e1065' }}
          >
            <option value="2026-06-30">June 2026</option>
            <option value="2026-07-31">July 2026</option>
            <option value="2026-08-31">August 2026</option>
          </select>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#faf7ff', borderBottom: '1px solid #e9d5ff', color: '#581c87', fontSize: '0.85rem', fontWeight: 600 }}>
              <th style={{ padding: '1rem 1.5rem' }}>Employee</th>
              <th style={{ padding: '1rem 1.5rem' }}>Pay Period</th>
              <th style={{ padding: '1rem 1.5rem' }}>Gross</th>
              <th style={{ padding: '1rem 1.5rem' }}>PF / ESI</th>
              <th style={{ padding: '1rem 1.5rem' }}>TDS</th>
              <th style={{ padding: '1rem 1.5rem' }}>Net Pay</th>
              <th style={{ padding: '1rem 1.5rem' }}>Status</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayrolls.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                  No payroll records found for this period.
                </td>
              </tr>
            ) : (
              filteredPayrolls.map((record) => (
                <tr key={record.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.95rem', fontWeight: 600, color: '#1e293b' }}>
                    {record.employeeName || 'Priya Sharma'}
                  </td>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.9rem', color: '#64748b' }}>
                    {record.payPeriod}
                  </td>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.9rem', color: '#334155', fontWeight: 600 }}>
                    ₹{record.gross?.toLocaleString()}
                  </td>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.85rem', color: '#64748b' }}>
                    ₹{record.pfEmployee} / ₹{record.esiEmployee}
                  </td>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.85rem', color: '#64748b' }}>
                    ₹{record.tds}
                  </td>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.95rem', fontWeight: 700, color: '#15803d' }}>
                    ₹{record.netPay?.toLocaleString()}
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      backgroundColor: record.status === 'DISBURSED' ? '#dcfce7' : '#e0f2fe',
                      color: record.status === 'DISBURSED' ? '#15803d' : '#0369a1'
                    }}>
                      {record.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    <button
                      onClick={() => handleOpenPayslip(record)}
                      style={{
                        padding: '0.4rem 0.85rem',
                        backgroundColor: '#6366f1',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      📄 Payslip
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Interactive Printable Payslip Modal */}
      {selectedPayslip && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1.5rem'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            maxWidth: '560px',
            width: '100%',
            padding: '2rem',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            position: 'relative'
          }}>
            {/* Header branding */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #7F56D9', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.35rem', color: '#1e293b', fontWeight: 800 }}>HRIS Corporation</h2>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>Official Employee Salary Advice</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ padding: '0.35rem 0.75rem', borderRadius: '6px', backgroundColor: '#f1f5f9', fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
                  PERIOD: {selectedPayslip.payPeriod}
                </span>
              </div>
            </div>

            {/* Employee Meta */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
              <div>
                <span style={{ color: '#64748b', display: 'block', fontSize: '0.75rem' }}>EMPLOYEE NAME</span>
                <strong style={{ color: '#1e293b' }}>{selectedPayslip.employeeName || 'Priya Sharma'}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', display: 'block', fontSize: '0.75rem' }}>PAYROLL STATUS</span>
                <strong style={{ color: '#16a34a' }}>{selectedPayslip.status}</strong>
              </div>
            </div>

            {/* Earnings & Deductions Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              {/* Earnings */}
              <div style={{ backgroundColor: '#f0fdf4', padding: '1rem', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                <h4 style={{ margin: '0 0 0.75rem 0', color: '#15803d', fontSize: '0.85rem', textTransform: 'uppercase' }}>Earnings</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  <span>Basic / Gross Pay:</span>
                  <strong>₹{selectedPayslip.gross?.toLocaleString()}</strong>
                </div>
              </div>

              {/* Deductions */}
              <div style={{ backgroundColor: '#fef2f2', padding: '1rem', borderRadius: '8px', border: '1px solid #fecdd3' }}>
                <h4 style={{ margin: '0 0 0.75rem 0', color: '#b91c1c', fontSize: '0.85rem', textTransform: 'uppercase' }}>Deductions</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.35rem' }}>
                  <span>Provident Fund (PF):</span>
                  <span>₹{selectedPayslip.pfEmployee}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.35rem' }}>
                  <span>ESI Health Ins.:</span>
                  <span>₹{selectedPayslip.esiEmployee}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                  <span>Income Tax (TDS):</span>
                  <span>₹{selectedPayslip.tds}</span>
                </div>
              </div>
            </div>

            {/* Net Pay Total Banner */}
            <div style={{ backgroundColor: '#ede9fe', padding: '1rem 1.25rem', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <span style={{ fontWeight: 700, color: '#5b21b6', fontSize: '0.95rem' }}>NET PAYABLE AMOUNT:</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#6d28d9' }}>₹{selectedPayslip.netPay?.toLocaleString()}</span>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                onClick={handleClosePayslip}
                style={{ padding: '0.65rem 1.25rem', backgroundColor: '#e2e8f0', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                style={{ padding: '0.65rem 1.25rem', backgroundColor: '#7F56D9', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
              >
                🖨️ Print / Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payroll;
