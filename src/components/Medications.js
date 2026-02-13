import React from 'react';
import { FaTrash, FaPlus, FaEdit } from 'react-icons/fa';

function Medications({ data, saveData }) {
  const [medications, setMedications] = React.useState([]);
  const [isAdding, setIsAdding] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [formData, setFormData] = React.useState({
    name: '',
    dosage: '',
    frequency: '',
    reason: '',
    prescribedBy: '',
    startDate: '',
    endDate: '',
    sideEffects: ''
  });

  React.useEffect(() => {
    if (data && Array.isArray(data.medications)) {
      setMedications(data.medications);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAdd = () => {
    if (formData.name && formData.dosage) {
      const newMedication = {
        id: Date.now().toString(),
        ...formData
      };
      const newMedications = [...medications, newMedication];
      setMedications(newMedications);
      const defaultData = {
        personalInfo: null,
        contacts: [],
        medications: [],
        medicalHistory: [],
        documents: []
      };
      saveData({
        ...(data || defaultData),
        medications: newMedications
      });
      resetForm();
      setIsAdding(false);
    }
  };

  const handleEdit = (medication) => {
    setFormData(medication);
    setEditingId(medication.id);
  };

  const handleUpdate = () => {
    const newMedications = medications.map(m => m.id === editingId ? formData : m);
    setMedications(newMedications);
    const defaultData = {
      personalInfo: null,
      contacts: [],
      medications: [],
      medicalHistory: [],
      documents: []
    };
    saveData({
      ...(data || defaultData),
      medications: newMedications
    });
    resetForm();
    setEditingId(null);
  };

  const handleDelete = (id) => {
    const newMedications = medications.filter(m => m.id !== id);
    setMedications(newMedications);
    const defaultData = {
      personalInfo: null,
      contacts: [],
      medications: [],
      medicalHistory: [],
      documents: []
    };
    saveData({
      ...(data || defaultData),
      medications: newMedications
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      dosage: '',
      frequency: '',
      reason: '',
      prescribedBy: '',
      startDate: '',
      endDate: '',
      sideEffects: ''
    });
  };

  return (
    <div className="section">
      <div className="section-header">
        <h2>Medications</h2>
        {!isAdding && !editingId && (
          <button className="action-button" onClick={() => setIsAdding(true)}>
            <FaPlus /> Add Medication
          </button>
        )}
      </div>

      {(isAdding || editingId) && (
        <form className="form">
          <div className="form-group">
            <label>Medication Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter medication name"
            />
          </div>
          <div className="form-group">
            <label>Dosage *</label>
            <input
              type="text"
              name="dosage"
              value={formData.dosage}
              onChange={handleChange}
              placeholder="e.g., 500mg"
            />
          </div>
          <div className="form-group">
            <label>Frequency</label>
            <input
              type="text"
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
              placeholder="e.g., Twice daily"
            />
          </div>
          <div className="form-group">
            <label>Reason for Use</label>
            <input
              type="text"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="e.g., High blood pressure"
            />
          </div>
          <div className="form-group">
            <label>Prescribed By</label>
            <input
              type="text"
              name="prescribedBy"
              value={formData.prescribedBy}
              onChange={handleChange}
              placeholder="Doctor name"
            />
          </div>
          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Side Effects</label>
            <textarea
              name="sideEffects"
              value={formData.sideEffects}
              onChange={handleChange}
              placeholder="List any known side effects"
              rows="2"
            />
          </div>
          <div className="button-group">
            <button
              type="button"
              className="save-button"
              onClick={editingId ? handleUpdate : handleAdd}
            >
              {editingId ? 'Update' : 'Add'}
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
                resetForm();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="list-container">
        {medications.length === 0 ? (
          <p className="empty-message">No medications added yet.</p>
        ) : (
          medications.map(medication => (
            <div key={medication.id} className="list-item">
              <div className="list-item-content">
                <h3>{medication.name}</h3>
                <p><strong>Dosage:</strong> {medication.dosage}</p>
                {medication.frequency && <p><strong>Frequency:</strong> {medication.frequency}</p>}
                {medication.reason && <p><strong>Reason:</strong> {medication.reason}</p>}
                {medication.prescribedBy && <p><strong>Prescribed By:</strong> {medication.prescribedBy}</p>}
                {medication.sideEffects && <p><strong>Side Effects:</strong> {medication.sideEffects}</p>}
              </div>
              <div className="list-item-actions">
                <button className="edit-button" onClick={() => handleEdit(medication)}>
                  <FaEdit />
                </button>
                <button className="delete-button" onClick={() => handleDelete(medication.id)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Medications;
