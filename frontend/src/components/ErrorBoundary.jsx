import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="main-content">
          <div className="card" style={{ maxWidth: '600px', margin: '4rem auto', textAlign: 'center' }}>
            <span style={{ fontSize: '3rem' }}>⚠️</span>
            <h2 style={{ marginTop: '1rem', color: '#c92a2a' }}>Something went wrong</h2>
            <p style={{ margin: '1rem 0' }}>An unexpected error occurred in the application. Please reload or try again later.</p>
            <button 
              className="btn btn-primary" 
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
