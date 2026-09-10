import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top-grid">
          {/* Brand & Mission Column */}
          <div className="footer-brand-col">
            <div className="footer-brand-title">
              <div className="nav-brand-logo" style={{ width: '30px', height: '30px', fontSize: '0.9rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="3" ry="3"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
              <span>Smart<span style={{ color: 'var(--primary-color)' }}>HRIS</span></span>
            </div>
            
            <p className="footer-tagline">
              The modern human resource operating system designed to automate payroll, streamline PTO, and empower teams worldwide.
            </p>

            <div className="footer-status-pill">
              <span className="footer-status-dot"></span>
              <span>All Systems Operational (99.99%)</span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="footer-col-title">Platform</h4>
            <ul className="footer-nav-list">
              <li><a href="#showcase" className="footer-link-item">Employee Directory</a></li>
              <li><a href="#showcase" className="footer-link-item">Smart Leave Engine</a></li>
              <li><a href="#showcase" className="footer-link-item">One-Click Payroll</a></li>
              <li><a href="#showcase" className="footer-link-item">360° Appraisals</a></li>
              <li><a href="#showcase" className="footer-link-item">Workforce Analytics</a></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="footer-col-title">Solutions</h4>
            <ul className="footer-nav-list">
              <li><a href="#features" className="footer-link-item">Rapid-Growth Startups</a></li>
              <li><a href="#features" className="footer-link-item">Global Remote Workforces</a></li>
              <li><a href="#features" className="footer-link-item">Multi-Entity Payroll</a></li>
              <li><a href="#roi" className="footer-link-item">Cost & Time Savings</a></li>
              <li><a href="#pricing" className="footer-link-item">Enterprise Custom Tier</a></li>
            </ul>
          </div>

          {/* Security & Compliance */}
          <div>
            <h4 className="footer-col-title">Security</h4>
            <ul className="footer-nav-list">
              <li><span className="footer-link-item">SOC-2 Type II Certified</span></li>
              <li><span className="footer-link-item">GDPR & CCPA Compliant</span></li>
              <li><span className="footer-link-item">256-Bit AES Encryption</span></li>
              <li><span className="footer-link-item">Role-Based Access Control</span></li>
              <li><span className="footer-link-item">Automated Audit Logs</span></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="footer-col-title">Company</h4>
            <ul className="footer-nav-list">
              <li><a href="#about" className="footer-link-item">About SmartHRIS</a></li>
              <li><a href="#careers" className="footer-link-item">Careers <span style={{ fontSize: '0.65rem', background: 'var(--primary-light)', color: 'var(--primary-dark)', padding: '0.1rem 0.4rem', borderRadius: '999px', fontWeight: 700 }}>Hiring</span></a></li>
              <li><a href="#faq" className="footer-link-item">Knowledge Base & FAQ</a></li>
              <li><Link to="/login" className="footer-link-item">Customer Portal</Link></li>
              <li><a href="mailto:support@smarthris.io" className="footer-link-item">Contact Support</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & legal row */}
        <div className="footer-bottom-row">
          <div>
            &copy; {new Date().getFullYear()} SmartHRIS Technologies Inc. All rights reserved.
          </div>
          <div className="footer-legal-links">
            <a href="#privacy" className="footer-legal-link">Privacy Policy</a>
            <a href="#terms" className="footer-legal-link">Terms of Service</a>
            <a href="#security" className="footer-legal-link">Security Standard</a>
            <a href="#cookies" className="footer-legal-link">Cookie Preferences</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

