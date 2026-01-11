# Threadz - Real-Time Chat App

A production-ready full-stack chat application featuring JWT authentication, real-time messaging, and modern integrations. Live demo: [https://threadz-app.onrender.com/](https://threadz-app.onrender.com/)

## ✨ Features

```
🔐 Custom JWT Authentication (bcrypt + refresh tokens)
⚡ Real-time Messaging (Socket.io with rooms)
🟢 Online/Offline Status Indicators
🔔 Notification & Typing Indicators (sound toggle)
📨 Automated Welcome Emails (Resend)
🗂️ Image Uploads & Message Media (Cloudinary)
📱 Responsive UI (React 18 + Tailwind + DaisyUI)
🧠 Global State (Zustand)
🚦 API Rate Limiting (Arcjet)
🐳 MongoDB with Mongoose ODM
⚙️ GitHub Workflow Ready (PRs + CI/CD)
🚀 Deployed on Render (free tier)
```

## 🏗️ Tech Stack

```
Frontend: React 18, Vite, Tailwind CSS, DaisyUI, Zustand, React Router
Backend: Node.js, Express.js, Socket.io, bcryptjs, jsonwebtoken
Database: MongoDB (Atlas), Mongoose
Services: Resend (Email), Cloudinary (Media), Arcjet (Rate Limiting)
Deployment: Render.com
Dev: ESLint, Prettier, Husky
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- [Resend](https://resend.com) account
- [Cloudinary](https://cloudinary.com) account
- [Arcjet](https://arcjet.com) account (optional)

### Clone & Install

```bash
git clone https://github.com/yourusername/threadz-chat-app.git
cd threadz-chat-app
```

### 1. Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env with your keys
npm install
npm run dev
```

### 2. Frontend Setup

```bash
cd ../frontend
cp .env.example .env
# Update REACT_APP_API_URL=http://localhost:3000
npm install
npm run dev
```

### 3. Production Build & Deploy

```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
npx serve -s dist -l 4173
```

## 🔧 Environment Variables

### Backend `.env`

```env
# Server
PORT=3000
NODE_ENV=production

# Database
MONGO_URI=mongodb+srv://...

# JWT (generate with: openssl rand -base64 32)
JWT_SECRET=your-very-long-secret-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Email
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@threadz.app
EMAIL_FROM_NAME="Threadz"

# Media
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# Rate Limiting
ARCJET_KEY=aj_...
ARCJET_ENV=production

# Origins
CLIENT_URL=https://yourdomain.com
```

### Frontend `.env`

```env
VITE_API_URL=https://your-backend-domain.com
VITE_CLOUDINARY_CLOUD_NAME=...
```

## 📁 Project Structure

```
threadz-chat-app/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── middleware/      # Auth, rate-limit, validation
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # Express routes
│   │   ├── socket/          # Socket.io handlers
│   │   ├── utils/           # Helpers
│   │   └── server.js        # Entry point
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI
│   │   ├── hooks/           # Custom React hooks
│   │   ├── pages/           # Page components
│   │   ├── store/           # Zustand stores
│   │   ├── utils/           # API calls, formatters
│   │   └── App.jsx
│   ├── public/
│   ├── vite.config.js
│   └── tailwind.config.js
└── README.md
```

## 🌐 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Create account | - |
| POST | `/api/auth/login` | Login | - |
| POST | `/api/auth/refresh` | Refresh token | - |
| GET | `/api/users` | Get users | ✓ |
| GET | `/api/messages` | Get messages | ✓ |
| POST | `/api/messages` | Send message | ✓ |
| POST | `/api/upload` | Upload image | ✓ |

**Socket.io Events:**
```
join-room, leave-room, send-message, typing, online, offline
```

## 🔒 Security Features

- JWT Access/Refresh token pattern
- bcrypt password hashing (12 rounds)
- Helmet.js security headers
- CORS protection
- Rate limiting (Arcjet)
- Input sanitization (express-validator)
- MongoDB injection prevention

## 🚀 Deployment

### Render.com (Current)

1. Fork this repo
2. Create two Render services:
   - **Web Service** → `backend` (port 3000)
   - **Static Site** → `frontend/build`
3. Add env vars in Render dashboard
4. Set Socket.io CORS: `https://your-frontend.onrender.com`

### Environment Variables for Render
```
MONGO_URI=... (use Atlas IP whitelist 0.0.0.0/0)
NODE_ENV=production
CLIENT_URL=https://your-frontend.onrender.com
```

## 🧪 Testing

```bash
# Backend
npm run test          # Jest unit tests
npm run test:e2e      # End-to-end tests

# Frontend
npm run test          # Vitest + React Testing Library
npm run test:ui       # Vite UI mode
npm run lint          # ESLint
npm run format        # Prettier
```

## 🤝 Contributing

1. Fork the project
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add: amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Open Pull Request

**Commits follow [Conventional Commits](https://www.conventionalcommits.org/)**

## 📄 License

This project is MIT licensed. See [LICENSE](LICENSE) for details.

```
Built with ❤️ for developers by developers
⭐ Star on GitHub if you found this useful!
```

## 🚀 Next Features (Roadmap)

- [ ] Group Chats & Channels
- [ ] Message Reactions/Edits
- [ ] File Sharing (PDF, Docs)
- [ ] Push Notifications (PWA)
- [ ] Voice Messages
- [ ] Dark/Light Theme Toggle
- [ ] Message Search & Archive
- [ ] 2FA Authentication

***

<div align="center">

[
[
[

</div>
