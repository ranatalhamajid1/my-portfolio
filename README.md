# 🚀 Portfolio — Rana Muhammad Talha Majid

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-8.x-47A248?logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue)

A modern, responsive, full-stack personal portfolio website featuring dark/light mode, smooth animations, glassmorphism design, and a fully functional Node.js backend with MongoDB for the contact form.

🌐 **Live Demo:** [Coming Soon](#)

---

## ✨ Features

- 🌙 **Dark / Light Mode** — Persisted in localStorage
- 🎭 **Glassmorphism UI** — Modern frosted-glass cards
- ⚡ **Smooth Animations** — IntersectionObserver-based scroll reveals
- ⌨️ **Typing Effect** — Animated role cycling in hero section
- 📊 **Animated Skill Bars** — Progress bars animate on scroll
- 🔢 **Counter Animation** — Smooth number counting for stats
- 📱 **Fully Responsive** — Mobile-first design (480px → 1200px+)
- 📬 **Functional Contact Form** — With client + server validation
- 🛡️ **Rate Limiting** — Prevents spam on the contact API
- 🔍 **SEO Optimized** — Meta tags, Open Graph, semantic HTML
- ♿ **Accessible** — ARIA labels, keyboard navigation, focus states
- 🚀 **Zero Dependencies Frontend** — Pure HTML, CSS, vanilla JS

---

## 🛠️ Tech Stack

| Layer      | Technology                          |
| ---------- | ----------------------------------- |
| Frontend   | HTML5, CSS3, Vanilla JavaScript ES6+|
| Backend    | Node.js, Express.js                 |
| Database   | MongoDB + Mongoose                  |
| Icons      | Font Awesome 6                      |
| Fonts      | Google Fonts (Inter, Space Grotesk) |
| Security   | CORS, Rate Limiting, Input Validation|

---

## 📁 Folder Structure

```
my-portfolio/
├── frontend/
│   ├── index.html              # Main HTML (all sections)
│   ├── css/
│   │   └── styles.css          # Complete stylesheet
│   ├── js/
│   │   └── main.js             # All frontend logic
│   └── assets/
│       └── .gitkeep            # Placeholder for images
├── backend/
│   ├── server.js               # Express server entry
│   ├── package.json            # Dependencies
│   ├── .env.example            # Environment template
│   ├── models/
│   │   └── Contact.js          # Mongoose schema
│   └── routes/
│       └── contact.js          # Contact API endpoints
├── README.md
└── .gitignore
```

---

## 📋 Prerequisites

- **Node.js** 18+ — [Download](https://nodejs.org/)
- **MongoDB** — [Local](https://www.mongodb.com/try/download/community) or [Atlas (Free)](https://www.mongodb.com/atlas)
- **Git** — [Download](https://git-scm.com/)

---

## 🚀 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/ranatalhamajid1/my-portfolio.git
cd my-portfolio
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` and set your MongoDB connection string:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/portfolio
NODE_ENV=development
```

### 4. Start MongoDB (if running locally)

```bash
mongod
```

### 5. Run the server

```bash
# Development (auto-restart on changes)
npm run dev

# Production
npm start
```

### 6. Open in browser

```
http://localhost:3000
```

---

## 📡 API Documentation

### Health Check

```
GET /api/health
```

**Response:**
```json
{
  "success": true,
  "message": "Portfolio API is running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456,
  "mongodb": "connected"
}
```

### Submit Contact Message

```
POST /api/contact
Content-Type: application/json
```

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Discussion",
  "message": "Hi, I'd like to discuss a project..."
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Message sent successfully! I will get back to you soon."
}
```

### Get All Contacts

```
GET /api/contacts?status=unread&page=1&limit=20
```

### Update Contact Status

```
PATCH /api/contacts/:id/status
Content-Type: application/json

{ "status": "read" }
```

### Delete Contact

```
DELETE /api/contacts/:id
```

---

## 🌍 Deployment Guide

### Frontend — Netlify (Free)

1. Go to [netlify.com](https://www.netlify.com/) and sign up
2. Click **"Add new site" → "Import an existing project"**
3. Connect your GitHub repository
4. Set build settings:
   - **Base directory:** `frontend`
   - **Publish directory:** `frontend`
5. Click **Deploy site**

### Frontend — Vercel (Free)

1. Go to [vercel.com](https://vercel.com/) and sign up
2. Click **"New Project"** → Import from GitHub
3. Set **Root Directory** to `frontend`
4. Framework Preset: **Other**
5. Click **Deploy**

### Backend — Render (Free)

1. Go to [render.com](https://render.com/) and sign up
2. Click **"New +" → "Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
5. Add environment variables:
   - `MONGODB_URI` = your MongoDB Atlas connection string
   - `PORT` = 3000
   - `NODE_ENV` = production
6. Click **Create Web Service**

### Database — MongoDB Atlas (Free Tier)

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas) and create a free account
2. Create a new **Shared Cluster** (free tier — M0)
3. Set up a database user (username + password)
4. Whitelist your IP (or `0.0.0.0/0` for all)
5. Click **Connect → Connect your application**
6. Copy the connection string and replace `<password>` with your password
7. Use this string as your `MONGODB_URI` environment variable

---

## 🔧 Environment Variables

| Variable         | Description                      | Default                              |
| ---------------- | -------------------------------- | ------------------------------------ |
| `PORT`           | Server port                      | `3000`                               |
| `MONGODB_URI`    | MongoDB connection string        | `mongodb://localhost:27017/portfolio` |
| `NODE_ENV`       | Environment (development/production) | `development`                   |
| `ALLOWED_ORIGIN` | CORS allowed origin (production) | `*`                                  |

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 📫 Contact

**Rana Muhammad Talha Majid**

- 📧 Email: [talhamajid404@gmail.com](mailto:talhamajid404@gmail.com)
- 🔗 LinkedIn: [linkedin.com/in/rana-muhammad-talha-majid-25233228b](https://www.linkedin.com/in/rana-muhammad-talha-majid-25233228b)
- 🐙 GitHub: [github.com/ranatalhamajid1](https://github.com/ranatalhamajid1)
- 📱 Phone: 0306-8888847

---

<p align="center">
  Built with ❤️ and lots of ☕ by <strong>Rana Muhammad Talha Majid</strong>
</p>