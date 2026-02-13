const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory storage for emergency info (in production, use a database)
let emergencyInfo = {
  personalInfo: null,
  contacts: [],
  medications: [],
  medicalHistory: [],
  documents: []
};

// GET all emergency info
app.get('/api/emergency-info', (req, res) => {
  res.json(emergencyInfo);
});

// POST/UPDATE personal info
app.post('/api/emergency-info/personal', (req, res) => {
  emergencyInfo.personalInfo = {
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  res.json(emergencyInfo.personalInfo);
});

// GET personal info
app.get('/api/emergency-info/personal', (req, res) => {
  res.json(emergencyInfo.personalInfo || {});
  
});

// POST emergency contact
app.post('/api/emergency-info/contacts', (req, res) => {
  const contact = {
    id: uuidv4(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  emergencyInfo.contacts.push(contact);
  res.status(201).json(contact);
});

// GET all emergency contacts
app.get('/api/emergency-info/contacts', (req, res) => {
  res.json(emergencyInfo.contacts);
});

// UPDATE emergency contact
app.put('/api/emergency-info/contacts/:id', (req, res) => {
  const contact = emergencyInfo.contacts.find(c => c.id === req.params.id);
  if (contact) {
    Object.assign(contact, req.body);
    res.json(contact);
  } else {
    res.status(404).json({ error: 'Contact not found' });
  }
});

// DELETE emergency contact
app.delete('/api/emergency-info/contacts/:id', (req, res) => {
  emergencyInfo.contacts = emergencyInfo.contacts.filter(c => c.id !== req.params.id);
  res.json({ message: 'Contact deleted' });
});

// POST medication
app.post('/api/emergency-info/medications', (req, res) => {
  const medication = {
    id: uuidv4(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  emergencyInfo.medications.push(medication);
  res.status(201).json(medication);
});

// GET all medications
app.get('/api/emergency-info/medications', (req, res) => {
  res.json(emergencyInfo.medications);
});

// UPDATE medication
app.put('/api/emergency-info/medications/:id', (req, res) => {
  const medication = emergencyInfo.medications.find(m => m.id === req.params.id);
  if (medication) {
    Object.assign(medication, req.body);
    res.json(medication);
  } else {
    res.status(404).json({ error: 'Medication not found' });
  }
});

// DELETE medication
app.delete('/api/emergency-info/medications/:id', (req, res) => {
  emergencyInfo.medications = emergencyInfo.medications.filter(m => m.id !== req.params.id);
  res.json({ message: 'Medication deleted' });
});

// POST medical history
app.post('/api/emergency-info/medical-history', (req, res) => {
  const record = {
    id: uuidv4(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  emergencyInfo.medicalHistory.push(record);
  res.status(201).json(record);
});

// GET all medical history
app.get('/api/emergency-info/medical-history', (req, res) => {
  res.json(emergencyInfo.medicalHistory);
});

// DELETE medical history record
app.delete('/api/emergency-info/medical-history/:id', (req, res) => {
  emergencyInfo.medicalHistory = emergencyInfo.medicalHistory.filter(m => m.id !== req.params.id);
  res.json({ message: 'Medical history record deleted' });
});

// Export all data
app.get('/api/emergency-info/export', (req, res) => {
  res.json(emergencyInfo);
});

// Import all data
app.post('/api/emergency-info/import', (req, res) => {
  emergencyInfo = { ...emergencyInfo, ...req.body };
  res.json(emergencyInfo);
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running' });
});

app.listen(PORT, () => {
  console.log(`Emergency Info App backend running on port ${PORT}`);
});
