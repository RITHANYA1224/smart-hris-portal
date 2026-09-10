import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: 'Employee',
    designation: 'Associate'
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Email validation & availability check state
  const [emailChecked, setEmailChecked] = useState(true);
  const [emailError, setEmailError] = useState('');

  // Password Policy: min 8 characters, upper, lower, digit, special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const nameRegex = /^[A-Za-z ]{2,100}$/;
  const phoneRegex = /^[0-9]{10}$/;

  // Debounced email check
  useEffect(() => {
    if (!formData.email) {
      setEmailError('');
      return;
    }

    const emailPattern = /^[A-Za-z0-9+_.-]+@(.+)$/;
    if (!emailPattern.test(formData.email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      try {
        let response;
        try {
          response = await fetch(`/api/auth/check-email?email=${encodeURIComponent(formData.email)}`);
        } catch (e) {
          response = await fetch(`http://localhost:8080/api/auth/check-email?email=${encodeURIComponent(formData.email)}`);
        }
        if (response && response.ok) {
          const data = await response.json();
          if (!data.available) {
            setEmailError('This email is already registered');
            setEmailChecked(false);
          } else {
            setEmailError('');
            setEmailChecked(true);
          }
        }
      } catch (err) {
        console.error('Email verification error:', err);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [formData.email]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setError('');

    // Step 1 Validations
    if (!nameRegex.test(formData.name.trim())) {
      setError("Name must not contain numbers or special characters");
      return;
    }
    const cleanP = formData.phoneNumber.replace(/[^0-9]/g, '');
    if (cleanP.length !== 10) {
      setError("Phone Number must be exactly 10 digits long");
      return;
    }
    if (!emailChecked || emailError) {
      setError("Please fix email errors before proceeding");
      return;
    }
    if (!passwordRegex.test(formData.password)) {
      setError("Password must meet security requirements (min 8 characters, at least 1 uppercase, 1 lowercase, 1 digit, 1 special character)");
      return;
    }

    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      name: formData.name.trim(),
      phoneNumber: formData.phoneNumber.replace(/[^0-9]/g, ''),
      email: formData.email.trim().toLowerCase(),
      password: formData.password.trim(),
      role: (formData.role || 'EMPLOYEE').toUpperCase().replace(/\s+/g, '_'),
      designation: formData.designation ? formData.designation.trim() : 'Software Engineer'
    };

    try {
      let response;
      try {
        response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
      } catch (proxyErr) {
        response = await fetch('http://localhost:8080/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
      }

      const data = await response.json();

      if (response && response.ok) {
        setSuccess(true);
      } else {
        setError(data.message || "Registration failed. Please check form constraints.");
      }
    } catch (err) {
      setError("Unable to connect to the server. Please verify backend is running.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="main-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div className="card" style={{ width: '100%', maxWidth: '500px', textAlign: 'center' }}>
          <span style={{ fontSize: '4rem' }}>🎉</span>
          <h2 style={{ margin: '1.5rem 0 1.0rem 0' }}>Registration successful!</h2>
          <p style={{ marginBottom: '2rem' }}>Your profile has been created and saved in the database. You can now log in.</p>
          <Link to="/login" className="btn btn-primary">Go to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="card" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Create Account</h2>

        {/* Stepper Progress bar */}
        <div className="steps-container">
          <div className="steps-line"></div>
          <div className={`step-node ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>1</div>
          <div className={`step-node ${step >= 2 ? 'active' : ''}`}>2</div>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {step === 1 ? (
          <form onSubmit={handleNextStep}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">Full Name</label>
              <input 
                type="text" 
                id="name" 
                className="form-input" 
                placeholder="e.g. John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                className="form-input" 
                placeholder="e.g. john@hris.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {emailError && <span style={{ color: '#c92a2a', fontSize: '0.8rem' }}>{emailError}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="phoneNumber">Phone Number</label>
              <input 
                type="text" 
                id="phoneNumber" 
                className="form-input" 
                placeholder="10 digit number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <div className="password-input-container">
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password" 
                  className="form-input" 
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Must be at least 8 characters, with 1 uppercase, 1 lowercase, 1 digit, and 1 special character.
              </span>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              Continue
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="role">Requested Role</label>
              <select id="role" className="form-input" value={formData.role} onChange={handleChange}>
                <option value="Guest">Guest</option>
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
                <option value="HR BP">HR BP</option>
                <option value="Finance Officer">Finance Officer</option>
                <option value="Dept Head">Dept Head</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="designation">Job Designation</label>
              <input 
                type="text" 
                id="designation" 
                className="form-input" 
                placeholder="e.g. Software Engineer"
                value={formData.designation}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button 
                type="button" 
                className="btn btn-secondary" 
                style={{ flex: 1 }}
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ flex: 1 }}
                disabled={loading}
              >
                {loading ? "Registering..." : "Submit"}
              </button>
            </div>
          </form>
        )}

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem' }}>
          Already have an account? <Link to="/login" style={{ color: '#6fa0e6', fontWeight: 600 }}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
