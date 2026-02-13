import React from 'react';
import { FaTrash, FaPlus, FaEdit } from 'react-icons/fa';

function EmergencyContacts({ data, saveData }) {
  const [contacts, setContacts] = React.useState([]);
  const [isAdding, setIsAdding] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [formData, setFormData] = React.useState({
    name: '',
    relationship: '',
    phone: '',
    email: '',
    address: ''
  });

  React.useEffect(() => {
    if (data && Array.isArray(data.contacts)) {
      setContacts(data.contacts);
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
    if (formData.name && formData.phone) {
      const newContact = {
        id: Date.now().toString(),
        ...formData
      };
      const newContacts = [...contacts, newContact];
      setContacts(newContacts);
      const defaultData = {
        personalInfo: null,
        contacts: [],
        medications: [],
        medicalHistory: [],
        documents: []
      };
      saveData({
        ...(data || defaultData),
        contacts: newContacts
      });
      setFormData({ name: '', relationship: '', phone: '', email: '', address: '' });
      setIsAdding(false);
    }
  };

  const handleEdit = (contact) => {
    setFormData(contact);
    setEditingId(contact.id);
  };

  const handleUpdate = () => {
    const newContacts = contacts.map(c => c.id === editingId ? formData : c);
    setContacts(newContacts);
    const defaultData = {
      personalInfo: null,
      contacts: [],
      medications: [],
      medicalHistory: [],
      documents: []
    };
    saveData({
      ...(data || defaultData),
      contacts: newContacts
    });
    setFormData({ name: '', relationship: '', phone: '', email: '', address: '' });
    setEditingId(null);
  };

  const handleDelete = (id) => {
    const newContacts = contacts.filter(c => c.id !== id);
    setContacts(newContacts);
    const defaultData = {
      personalInfo: null,
      contacts: [],
      medications: [],
      medicalHistory: [],
      documents: []
    };
    saveData({
      ...(data || defaultData),
      contacts: newContacts
    });
  };

  return (
    <div className="section">
      <div className="section-header">
        <h2>Emergency Contacts</h2>
        {!isAdding && !editingId && (
          <button className="action-button" onClick={() => setIsAdding(true)}>
            <FaPlus /> Add Contact
          </button>
        )}
      </div>

      {(isAdding || editingId) && (
        <form className="form">
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter contact name"
            />
          </div>
          <div className="form-group">
            <label>Relationship</label>
            <input
              type="text"
              name="relationship"
              value={formData.relationship}
              onChange={handleChange}
              placeholder="e.g., Mother, Father, Spouse"
            />
          </div>
          <div className="form-group">
            <label>Phone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
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
                setFormData({ name: '', relationship: '', phone: '', email: '', address: '' });
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="list-container">
        {contacts.length === 0 ? (
          <p className="empty-message">No emergency contacts added yet.</p>
        ) : (
          contacts.map(contact => (
            <div key={contact.id} className="list-item">
              <div className="list-item-content">
                <h3>{contact.name}</h3>
                {contact.relationship && <p><strong>Relationship:</strong> {contact.relationship}</p>}
                <p><strong>Phone:</strong> <a href={`tel:${contact.phone}`}>{contact.phone}</a></p>
                {contact.email && <p><strong>Email:</strong> <a href={`mailto:${contact.email}`}>{contact.email}</a></p>}
                {contact.address && <p><strong>Address:</strong> {contact.address}</p>}
              </div>
              <div className="list-item-actions">
                <button className="edit-button" onClick={() => handleEdit(contact)}>
                  <FaEdit />
                </button>
                <button className="delete-button" onClick={() => handleDelete(contact.id)}>
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

export default EmergencyContacts;
