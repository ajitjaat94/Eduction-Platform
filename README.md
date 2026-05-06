# 🚀 Education Platform Backend API

Scalable backend system for an education platform built using Node.js, Express.js, and MongoDB.

---

# ⚡ Features

- 🔐 JWT Authentication System
- ✉️ Email Verification System
- 👤 User Profile Management
- 🛡️ Protected Routes & Middleware
- 📄 PDF Upload System
- ☁️ Cloudinary File Upload Integration
- 🧠 Question Management APIs
- 🛠️ Admin Question Upload APIs
- 📊 User Activity Tracking
- ✅ Request Validation System
- 🌐 RESTful API Architecture
- 🚀 Production Deployment Ready

---

# 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- Cloudinary
- Nodemailer

---

# 📂 Project Structure

```bash
src/
├── config/
├── controller/
├── middlewares/
├── models/
├── routes/
├── utils/
├── validations/
├── app.js
└── server.js
```

---

# 🔥 Main APIs

## Authentication
- User Signup
- User Login
- Email Verification

## Profile
- User Profile APIs

## PDF System
- Upload PDF
- Update PDF
- Fetch PDFs

## Question System
- Question Upload
- User Question Submission
- Result APIs

---

# 📘 API Documentation

## 🔐 Authentication Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/auth/signup | Register new user |
| POST | /api/v1/auth/login | Login user |
| POST | /api/v1/refresh | Refresh access token |
| POST | /api/v1/logout | Logout user |
| POST | /api/v1/verify | Verify email |

---

## 👤 Profile Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/profile | Get user profile |

---

## 🧠 User Question Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/question | Get questions |
| POST | /api/v1/question | Submit answers |
| GET | /api/v1/question/result | Get result |

---

## 🛠️ Admin Question Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/question/admin | Upload questions |
| PUT | /api/v1/question/admin | Update questions |
| GET | /api/v1/question/admin | Read all questions |
| DELETE | /api/v1/question/admin | Delete question |

---

## 📄 PDF Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/pdf | Upload PDF |
| GET | /api/v1/pdf | Get all PDFs |
| PUT | /api/v1/pdf | Update PDF |
| DELETE | /api/v1/pdf | Delete PDF |
---

# 🌍 Deployment

Backend deployed on Render.

MongoDB hosted on MongoDB Atlas.

---

# ⚠️ Note

This repository contains a public demo version of the backend architecture.

Some production-level business logic and advanced private features are not included in the public repository.

---

# 📫 Contact

📧 ajitkumar57525@gmail.com
