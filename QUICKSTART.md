# 🚀 QUICK START GUIDE

## Prerequisites
- Node.js installed
- npm or yarn

## Backend Setup (Terminal 1)

```bash
cd backend
npm install
npm start
```

Server runs on: **http://localhost:5000**

## Frontend Setup (Terminal 2)

```bash
cd frontend
npm install
npm start
```

App opens at: **http://localhost:3000**

## Login Credentials

**Demo Account:**
- Username: `demo`
- Password: `password123`

Or create a new account on the Sign Up screen.

## What You Can Do

✅ **Add Emergency Info**
- Personal information (blood type, allergies, etc.)
- Emergency contacts (name, phone, email)
- Current medications
- Medical history records

✅ **Export/Import Data**
- Download as JSON backup
- Import data back anytime

✅ **Offline Access**
- App works completely offline
- All data stored locally
- Service worker caching

✅ **Multi-User**
- Each user has separate account
- Separate data per user
- Secure logout

## Features

🔐 **Authentication** - Login/Signup system
📱 **Responsive** - Works on mobile, tablet, desktop
💾 **Offline-First** - Works without internet
🔄 **Real-time Sync** - Auto-save to local storage
📊 **Multiple Sections** - Personal, Contacts, Medications, History

## Troubleshooting

**Port 3000/5000 already in use?**
```bash
# Backend - change port in .env file (PORT=5001)
# Frontend - run with different port
npm start -- --port 3001
```

**Clear all data?**
Open browser DevTools → Application → Local Storage → Clear All

**Issues?**
Check browser console (F12) for error messages
