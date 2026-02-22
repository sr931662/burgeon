import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState({ type: '', message: '' });
  
  const { login, isLoading, error: authError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Page load reveal
    setTimeout(() => document.body.classList.add('loaded'), 50);
  }, []);

  // Clear alert after 5 seconds
  useEffect(() => {
    if (alertMessage.message) {
      const timer = setTimeout(() => {
        setAlertMessage({ type: '', message: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear field error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        setAlertMessage({
          type: 'success',
          message: 'Login successful! Redirecting to home...'
        });
        
        // Redirect to home page after 1 second
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        setAlertMessage({
          type: 'error',
          message: result.error || 'Invalid email or password. Please try again.'
        });
      }
    } catch (err) {
      setAlertMessage({
        type: 'error',
        message: 'An unexpected error occurred. Please try again.'
      });
    }
  };

  const handleForgotPassword = () => {
    // For now, just show a message that this feature is coming soon
    setAlertMessage({
      type: 'info',
      message: 'Password reset feature coming soon. Please contact support.'
    });
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        {/* Logo Section */}
        <div className={styles.logoSection}>
          <Link to="/" className={styles.logo}>
            BURGEON<span className={styles.logoDot}>.</span>
            <span className={styles.logoSub}>Engineering</span>
          </Link>
          <div className={styles.logoTagline}>Partner Portal Access</div>
        </div>

        {/* Form Header */}
        <div className={styles.formHeader}>
          <h1 className={styles.formTitle}>Welcome Back</h1>
          <p className={styles.formSubtitle}>Please enter your credentials to continue</p>
        </div>

        {/* Alert Messages */}
        {alertMessage.message && (
          <div className={`${styles.alert} ${
            alertMessage.type === 'success' ? styles.alertSuccess : 
            alertMessage.type === 'error' ? styles.alertError : 
            styles.alertInfo
          }`}>
            <span className={styles.alertIcon}>
              {alertMessage.type === 'success' ? '✓' : 
               alertMessage.type === 'error' ? '⚠' : 'ℹ'}
            </span>
            {alertMessage.message}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>
              Email Address <span>required</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`${styles.formInput} ${formErrors.email ? styles.error : ''}`}
              placeholder="you@company.com"
              disabled={isLoading}
              autoFocus
            />
            {formErrors.email && (
              <div className={styles.errorMessage}>{formErrors.email}</div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>
              Password <span>required</span>
            </label>
            <div className={styles.passwordField}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`${styles.formInput} ${formErrors.password ? styles.error : ''}`}
                placeholder="••••••••"
                disabled={isLoading}
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {formErrors.password && (
              <div className={styles.errorMessage}>{formErrors.password}</div>
            )}
          </div>

          <div className={styles.formOptions}>
            <label className={styles.rememberMe}>
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              className={styles.forgotPassword}
              onClick={handleForgotPassword}
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In →'}
          </button>

          <div className={styles.formFooter}>
            Don't have an account? <Link to="/register">Request Access</Link>
          </div>
        </form>

        {/* Back to Home Link */}
        <div className={styles.backLink}>
          <Link to="/">
            <span className={styles.backIcon}>←</span> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;