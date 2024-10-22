# Fullstack Authentication App

Full-stack authentication application with NestJS backend and React frontend.

## Tech Stack

- **Backend**: NestJS, MongoDB, JWT
- **Frontend**: React, TypeScript, Chakra UI

## Installation

### Backend

```bash
cd backend
npm install
```

Create `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/auth-db
JWT_SECRET=your-secret-key
```

Run:
```bash
npm run start:dev
```

### Frontend

```bash
cd frontend
npm install
```

Create `.env` file:
```env
REACT_APP_BASE_URL=http://localhost:3000
```

Run:
```bash
npm start
```

## Features

- User registration
- User login
- JWT authentication
- Protected routes
- Password validation
