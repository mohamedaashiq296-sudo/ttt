import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('emergencyAppUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading user:', error);
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    // Simple authentication - in production, this would call your backend API
    if (username && password && password.length >= 6) {
      // Check if user exists
      const users = JSON.parse(localStorage.getItem('emergencyAppUsers') || '[]');
      const userExists = users.some(u => u.username === username && u.password === password);
      
      if (!userExists && users.length > 0) {
        return { success: false, error: 'Invalid username or password' };
      }

      const userData = {
        username,
        loginTime: new Date().toISOString()
      };
      setUser(userData);
      localStorage.setItem('emergencyAppUser', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('emergencyAppUser');
    localStorage.removeItem('emergencyInfo');
  };

  const register = (username, password, confirmPassword) => {
    if (!username || username.length < 3) {
      return { success: false, error: 'Username must be at least 3 characters' };
    }
    if (password !== confirmPassword) {
      return { success: false, error: 'Passwords do not match' };
    }
    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters' };
    }

    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem('emergencyAppUsers') || '[]');
    if (existingUsers.some(u => u.username === username)) {
      return { success: false, error: 'Username already exists' };
    }

    // Store user in users list
    existingUsers.push({ username, password });
    try {
      localStorage.setItem('emergencyAppUsers', JSON.stringify(existingUsers));
    } catch (error) {
      console.error('Error saving user:', error);
      return { success: false, error: 'Error creating account' };
    }

    // Auto login after registration
    return login(username, password);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
