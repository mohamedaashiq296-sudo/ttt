import React from 'react';
import { FaSave, FaEdit, FaTimes } from 'react-icons/fa';

function PersonalInfo({ data, saveData }) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState({
    fullName: '',
    dateOfBirth: '',
    bloodType: '',
    allergies: '',
    emergencyName: '',
    emergencyRelation: '',
    emergencyPhone: '',
    medicalConditions: '',
    insuranceProvider: '',
    policyNumber: '',
    doctorName: '',
    doctorPhone: '',
    ...(data?.personalInfo || {})
  });

  React.useEffect(() => {
    if (data?.personalInfo) {
      setFormData(data.personalInfo);
    }
  }, [data?.personalInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    const newData = {
      ...(data || {
        personalInfo: null,
        contacts: [],
        medications: [],
        medicalHistory: [],
        documents: []
      }),
      personalInfo: formData
    };
    saveData(newData);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="section">
        <div className="section-header">
          <h2>Personal Information</h2>
          <button className="action-button" onClick={() => setIsEditing(true)}>
            <FaEdit /> Edit
          </button>
        </div>
        <div className="info-display">
          {formData.fullName ? (
            <>
              <div className="info-item">
                <label>Full Name:</label>
                <span>{formData.fullName}</span>
              </div>
              <div className="info-item">
                <label>Date of Birth:</label>
                <span>{formData.dateOfBirth}</span>
              </div>
              <div className="info-item">
                <label>Blood Type:</label>
                <span>{formData.bloodType}</span>
              </div>
              <div className="info-item">
                <label>Allergies:</label>
                <span>{formData.allergies || 'None listed'}</span>
              </div>
              <div className="info-item">
                <label>Medical Conditions:</label>
                <span>{formData.medicalConditions || 'None listed'}</span>
              </div>
              <div className="info-item">
                <label>Doctor Name:</label>
                <span>{formData.doctorName}</span>
              </div>
              <div className="info-item">
                <label>Doctor Phone:</label>
                <span>{formData.doctorPhone}</span>
              </div>
            </>
          ) : (
            <p className="empty-message">No personal information saved yet. Click Edit to add information.</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="section-header">
        <h2>Edit Personal Information</h2>
      </div>
      <form className="form">
        <div className="form-group">
          <label>Full Name *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
          />
        </div>
        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Blood Type</label>
          <select name="bloodType" value={formData.bloodType} onChange={handleChange}>
            <option value="">Select blood type</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>
        <div className="form-group">
          <label>Allergies</label>
          <textarea
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            placeholder="List any allergies"
            rows="3"
          />
        </div>
        <div className="form-group">
          <label>Medical Conditions</label>
          <textarea
            name="medicalConditions"
            value={formData.medicalConditions}
            onChange={handleChange}
            placeholder="List any medical conditions"
            rows="3"
          />
        </div>
        <div className="form-group">
          <label>Doctor Name</label>
          <input
            type="text"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
            placeholder="Enter doctor's name"
          />
        </div>
        <div className="form-group">
          <label>Doctor Phone</label>
          <input
            type="tel"
            name="doctorPhone"
            value={formData.doctorPhone}
            onChange={handleChange}
            placeholder="Enter doctor's phone"
          />
        </div>
        <div className="form-group">
          <label>Insurance Provider</label>
          <input
            type="text"
            name="insuranceProvider"
            value={formData.insuranceProvider}
            onChange={handleChange}
            placeholder="Enter insurance provider"
          />
        </div>
        <div className="form-group">
          <label>Policy Number</label>
          <input
            type="text"
            name="policyNumber"
            value={formData.policyNumber}
            onChange={handleChange}
            placeholder="Enter policy number"
          />
        </div>
        <div className="button-group">
          <button type="button" className="save-button" onClick={handleSave}>
            <FaSave /> Save
          </button>
          <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>
            <FaTimes /> Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default PersonalInfo;
