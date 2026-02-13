# Offline Emergency Info App

A full-stack offline-first emergency information application with both backend and frontend components.

## Features

### Authentication
- **User Registration**: Create a new account with username and password
- **Secure Login**: Sign in with your credentials
- **Session Persistence**: Stay logged in even after closing the app
- **Demo Mode**: Quick access with demo credentials for testing

### Frontend (React)
- **Personal Information**: Store name, blood type, allergies, medical conditions, insurance info
- **Emergency Contacts**: Manage emergency contact information with phone/email quick access
- **Medications**: Track current medications with dosage, frequency, and side effects
- **Medical History**: Keep records of past medical events and treatments
- **Offline-First**: Works completely offline with local storage
- **Progressive Web App**: Installable on devices, service worker support
- **Export/Import**: Backup and restore your data as JSON
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### Backend (Node.js/Express)
- RESTful API for managing emergency information
- Personal info endpoints
- Emergency contacts CRUD operations
- Medications management
- Medical history tracking
- Data export/import functionality
- CORS enabled for frontend communication

## Project Structure

```
ttt/
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── .env
│   └── .gitignore
├── frontend/
│   ├── package.json
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── service-worker.js
│   ├── src/
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── index.css
│   │   ├── App.css
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   └── components/
│   │       ├── Login.js
│   │       ├── Login.css
│   │       ├── PersonalInfo.js
│   │       ├── EmergencyContacts.js
│   │       ├── Medications.js
│   │       └── MedicalHistory.js
│   └── .gitignore
└── README.md
```

## Installation

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

   The backend will run on `http://localhost:5000`

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   The frontend will open at `http://localhost:3000`

## Login Credentials

**Demo Account** (for quick testing):
- **Username:** demo
- **Password:** password123

You can also create a new account with your own credentials on the sign-up screen.

**Password Requirements:**
- Minimum 6 characters long
- Confirm password must match
- Username must be at least 3 characters

## API Endpoints

### Personal Info
- `GET /api/emergency-info/personal` - Get personal information
- `POST /api/emergency-info/personal` - Create/Update personal information

### Emergency Contacts
- `GET /api/emergency-info/contacts` - Get all contacts
- `POST /api/emergency-info/contacts` - Add new contact
- `PUT /api/emergency-info/contacts/:id` - Update contact
- `DELETE /api/emergency-info/contacts/:id` - Delete contact

### Medications
- `GET /api/emergency-info/medications` - Get all medications
- `POST /api/emergency-info/medications` - Add new medication
- `PUT /api/emergency-info/medications/:id` - Update medication
- `DELETE /api/emergency-info/medications/:id` - Delete medication

### Medical History
- `GET /api/emergency-info/medical-history` - Get all records
- `POST /api/emergency-info/medical-history` - Add new record
- `DELETE /api/emergency-info/medical-history/:id` - Delete record

### Data Management
- `GET /api/emergency-info/export` - Export all data
- `POST /api/emergency-info/import` - Import data
- `GET /api/health` - Health check

## Offline Usage

1. The app works completely offline with local browser storage
2. Service worker caches the app shell for offline access
3. All data is stored locally in browser's localStorage
4. Use Export to backup your data
5. Use Import to restore from a backup

## Browser Support

- Chrome/Edge 60+
- Firefox 55+
- Safari 11.1+
- Any browser supporting Service Workers and IndexedDB

## Development

### Backend Development
```bash
cd backend
npm install
npm run dev  # Requires nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm install
npm start    # Runs on port 3000 with hot reload
```

## Building for Production

### Frontend Build
```bash
cd frontend
npm run build
```

This creates an optimized build in the `build/` folder.

## Notes

- The backend currently uses in-memory storage for data. For production, integrate a database like MongoDB or PostgreSQL.
- All timestamps are stored in ISO format.
- Data is auto-saved to localStorage on the frontend.
- Emergency contacts have clickable phone/email links for quick dialing.

## License

MIT
