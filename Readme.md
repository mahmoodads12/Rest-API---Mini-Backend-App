<div align="center">

<h1>🚀 Node.js REST API – Express & TypeScript</h1>

<p>
A production-ready REST API built with <strong>Node.js</strong>, <strong>Express</strong> and <strong>TypeScript</strong>, featuring authentication, clean architecture and MongoDB integration.
</p>

<p>
<a href="https://nodejs.org/en">Node.js</a> ·
<a href="https://www.typescriptlang.org">TypeScript</a> ·
<a href="https://expressjs.com/">Express</a> ·
<a href="https://www.mongodb.com">MongoDB</a>
</p>

</div>

---

## 📌 Overview

This project is a complete, end-to-end implementation of a REST API using **Node.js, Express and TypeScript**.  
It focuses on **clean architecture**, **authentication**, and **real-world backend patterns**.

The goal of this project is not just functionality, but **production-quality backend design**.

---

## ✨ Features

- User authentication (Register / Login)
- Secure password handling
- JWT-based authentication
- Middleware-based request handling
- Modular folder structure
- MongoDB integration
- Clean separation of concerns

---

## 🧱 Tech Stack

- **Node.js**
- **TypeScript**
- **Express**
- **MongoDB**
- **JWT**
- **bcrypt**
- **Middleware-based architecture**

---

## ⚙️ Environment Setup

Create a `.env` file in the root directory:

```env
DB_HOST=your_mongodb_connection
SECRET_KEY=your_secret_key
```

---

## 📁 Project Structure

```text
src/
├── controllers/
│   ├── authentification.ts   # Auth controllers (register, login)
│   └── users.ts              # User controllers
│
├── db/
│   └── users.ts              # Database access logic
│
├── helpers/
│   └── index.ts              # Shared helper functions
│
├── middlewares/
│   └── index.ts              # Authentication & ownership middleware
│
├── router/
│   ├── authentification.ts   # Auth routes
│   ├── users.ts              # User routes
│   └── index.ts              # Router aggregation
│
├── index.ts                  # Application entry point
```

---

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` – Create a new user
- `POST /api/auth/login` – Authenticate user and return JWT

### Users (Protected)
- `GET /api/users` – Get all users (JWT required)
- `PATCH /api/users/:id` – Update own user (JWT + ownership)
- `DELETE /api/users/:id` – Delete own user (JWT + ownership)

---

## 🛡️ Authorization

- **isAuthenticated** – Validates JWT token
- **isOwner** – Ensures users can only modify their own data

---

## ▶️ Getting Started

```bash
npm install
npm start
```

---

## 🧠 Why This Project Matters

- Realistic backend architecture
- Proper authentication & authorization
- Clean separation of concerns
- Easy to explain in interviews
- Suitable as a production base

---

## 👤 Author

**Mahmoud Adas**  
Junior Backend / Full-Stack Developer  
Focused on clean backend architectures and scalable APIs.
