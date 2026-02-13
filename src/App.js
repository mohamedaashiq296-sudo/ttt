import React from 'react';
import { FaPhone, FaPills, FaHistory, FaUser, FaDownload, FaUpload, FaSignOutAlt } from 'react-icons/fa';
import './App.css';
import PersonalInfo from './components/PersonalInfo';
import EmergencyContacts from './components/EmergencyContacts';
import Medications from './components/Medications';
import MedicalHistory from './components/MedicalHistory';
import Login from './components/Login';
import { useAuth } from './context/AuthContext';

function App() {
  const { user, loading, logout } = useAuth();
  const [activeTab, setActiveTab] = React.useState('personal');
  const [data, setData] = React.useState(null);
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);

  const loadData = React.useCallback(() => {
    try {
      const userKey = `emergencyInfo_${user.username}`;
      const localData = localStorage.getItem(userKey);
      if (localData) {
        setData(JSON.parse(localData));
      } else {
        setData({
          personalInfo: null,
          contacts: [],
          medications: [],
          medicalHistory: [],
          documents: []
        });
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setData({
        personalInfo: null,
        contacts: [],
        medications: [],
        medicalHistory: [],
        documents: []
      });
    }
  }, [user]);

  const saveData = React.useCallback((newData) => {
    try {
      const userKey = `emergencyInfo_${user.username}`;
      setData(newData);
      localStorage.setItem(userKey, JSON.stringify(newData));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }, [user]);

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    loadData();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [loadData]);
  
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  const handleExport = () => {
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `emergency-info-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target.result);
          saveData(imported);
          alert('Data imported successfully!');
        } catch (error) {
          alert('Error importing file: ' + error.message);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1>🚨 Emergency Info App</h1>
          <div className="status">
            <span className={`online-status ${isOnline ? 'online' : 'offline'}`}>
              {isOnline ? '🟢 Online' : '🔴 Offline'}
            </span>
            <span className="user-info">
              Welcome, {user.username}
            </span>
            <button className="logout-button" onClick={logout} title="Sign out">
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </header>

      <nav className="tab-navigation">
        <button
          className={`tab-button ${activeTab === 'personal' ? 'active' : ''}`}
          onClick={() => setActiveTab('personal')}
        >
          <FaUser /> Personal Info
        </button>
        <button
          className={`tab-button ${activeTab === 'contacts' ? 'active' : ''}`}
          onClick={() => setActiveTab('contacts')}
        >
          <FaPhone /> Emergency Contacts
        </button>
        <button
          className={`tab-button ${activeTab === 'medications' ? 'active' : ''}`}
          onClick={() => setActiveTab('medications')}
        >
          <FaPills /> Medications
        </button>
        <button
          className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <FaHistory /> Medical History
        </button>
      </nav>

      <main className="app-content">
        {activeTab === 'personal' && <PersonalInfo data={data} saveData={saveData} />}
        {activeTab === 'contacts' && <EmergencyContacts data={data} saveData={saveData} />}
        {activeTab === 'medications' && <Medications data={data} saveData={saveData} />}
        {activeTab === 'history' && <MedicalHistory data={data} saveData={saveData} />}
      </main>

      <footer className="app-footer">
        <button onClick={handleExport} className="footer-button" title="Export data">
          <FaDownload /> Export
        </button>
        <label className="footer-button" title="Import data">
          <FaUpload /> Import
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            style={{ display: 'none' }}
          />
        </label>
      </footer>
    </div>
  );
}

export default App;
