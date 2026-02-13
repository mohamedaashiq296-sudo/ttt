import React from 'react';
import { FaTrash, FaPlus, FaEdit } from 'react-icons/fa';

function MedicalHistory({ data, saveData }) {
  const [records, setRecords] = React.useState([]);
  const [isAdding, setIsAdding] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [formData, setFormData] = React.useState({
    date: '',
    condition: '',
    treatment: '',
    hospital: '',
    doctor: '',
    notes: ''
  });

  React.useEffect(() => {
    if (data && Array.isArray(data.medicalHistory)) {
      setRecords(data.medicalHistory);
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
    if (formData.date && formData.condition) {
      const newRecord = {
        id: Date.now().toString(),
        ...formData
      };
      const newRecords = [...records, newRecord];
      setRecords(newRecords);
      const defaultData = {
        personalInfo: null,
        contacts: [],
        medications: [],
        medicalHistory: [],
        documents: []
      };
      saveData({
        ...(data || defaultData),
        medicalHistory: newRecords
      });
      resetForm();
      setIsAdding(false);
    }
  };

  const handleEdit = (record) => {
    setFormData(record);
    setEditingId(record.id);
  };

  const handleUpdate = () => {
    const newRecords = records.map(r => r.id === editingId ? formData : r);
    setRecords(newRecords);
    const defaultData = {
      personalInfo: null,
      contacts: [],
      medications: [],
      medicalHistory: [],
      documents: []
    };
    saveData({
      ...(data || defaultData),
      medicalHistory: newRecords
    });
    resetForm();
    setEditingId(null);
  };

  const handleDelete = (id) => {
    const newRecords = records.filter(r => r.id !== id);
    setRecords(newRecords);
    const defaultData = {
      personalInfo: null,
      contacts: [],
      medications: [],
      medicalHistory: [],
      documents: []
    };
    saveData({
      ...(data || defaultData),
      medicalHistory: newRecords
    });
  };

  const resetForm = () => {
    setFormData({
      date: '',
      condition: '',
      treatment: '',
      hospital: '',
      doctor: '',
      notes: ''
    });
  };

  return (
    <div className="section">
      <div className="section-header">
        <h2>Medical History</h2>
        {!isAdding && !editingId && (
          <button className="action-button" onClick={() => setIsAdding(true)}>
            <FaPlus /> Add Record
          </button>
        )}
      </div>

      {(isAdding || editingId) && (
        <form className="form">
          <div className="form-group">
            <label>Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Condition/Reason *</label>
            <input
              type="text"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              placeholder="e.g., Broken arm, Appendicitis"
            />
          </div>
          <div className="form-group">
            <label>Treatment</label>
            <input
              type="text"
              name="treatment"
              value={formData.treatment}
              onChange={handleChange}
              placeholder="e.g., Surgery, Physical therapy"
            />
          </div>
          <div className="form-group">
            <label>Hospital/Clinic</label>
            <input
              type="text"
              name="hospital"
              value={formData.hospital}
              onChange={handleChange}
              placeholder="Enter hospital/clinic name"
            />
          </div>
          <div className="form-group">
            <label>Doctor Name</label>
            <input
              type="text"
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              placeholder="Enter doctor's name"
            />
          </div>
          <div className="form-group">
            <label>Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Additional notes"
              rows="3"
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
        {records.length === 0 ? (
          <p className="empty-message">No medical history records added yet.</p>
        ) : (
          records.map(record => (
            <div key={record.id} className="list-item">
              <div className="list-item-content">
                <h3>{new Date(record.date).toLocaleDateString()}</h3>
                <p><strong>Condition:</strong> {record.condition}</p>
                {record.treatment && <p><strong>Treatment:</strong> {record.treatment}</p>}
                {record.hospital && <p><strong>Hospital:</strong> {record.hospital}</p>}
                {record.doctor && <p><strong>Doctor:</strong> {record.doctor}</p>}
                {record.notes && <p><strong>Notes:</strong> {record.notes}</p>}
              </div>
              <div className="list-item-actions">
                <button className="edit-button" onClick={() => handleEdit(record)}>
                  <FaEdit />
                </button>
                <button className="delete-button" onClick={() => handleDelete(record.id)}>
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

export default MedicalHistory;
