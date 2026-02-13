import React, { useState } from 'react';
import { FaLock, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './Login.css';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      let result;
      if (isLogin) {
        result = login(username, password);
      } else {
        result = register(username, password, confirmPassword);
      }

      if (!result.success) {
        setError(result.error);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  const fillDemoCredentials = () => {
    setUsername('demo');
    setPassword('password123');
    setError('');
    setIsLogin(true);
  };

  // Initialize demo user if not exists
  React.useEffect(() => {
    try {
      const users = JSON.parse(localStorage.getItem('emergencyAppUsers') || '[]');
      if (!users.some(u => u.username === 'demo')) {
        users.push({ username: 'demo', password: 'password123' });
        localStorage.setItem('emergencyAppUsers', JSON.stringify(users));
      }
    } catch (error) {
      console.error('Error initializing demo user:', error);
    }
  }, []);

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>🚨 Emergency Info App</h1>
          <p>{isLogin ? 'Sign In' : 'Create Account'}</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>
              <FaUser /> Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              disabled={isLoading}
              required
            />
          </div>

          <div className="form-group">
            <label>
              <FaLock /> Password
            </label>
            <div className="password-input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={isLoading}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>
                <FaLock /> Confirm Password
              </label>
              <div className="password-input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="login-divider">or</div>

        <button
          type="button"
          className="demo-button"
          onClick={fillDemoCredentials}
          disabled={isLoading}
        >
          Use Demo Credentials
        </button>

        <div className="login-footer">
          <p>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            {' '}
            <button
              type="button"
              className="toggle-mode-button"
              onClick={handleToggleMode}
              disabled={isLoading}
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

        <div className="login-info">
          <h3>Demo Credentials</h3>
          <p><strong>Username:</strong> demo</p>
          <p><strong>Password:</strong> password123</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
