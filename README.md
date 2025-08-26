# 🚀 MERN Task Management System

A full-stack **Task & Employee Management System** built with the **MERN stack** (MongoDB, Express.js, React, Node.js).  
This project provides functionalities for managing employees, assigning tasks, tracking status, and managing deadlines.

---

## 📌 Features

### 👤 Employee Management

- Add, update, delete employees.
- Validate employee details (name, email, phone, department).
- Email uniqueness and 10-digit phone validation.
- Active/Inactive employee status.

### 📋 Task Management

- Create, update, delete tasks.
- Assign tasks to employees.
- Set **priority** (`Low`, `Medium`, `High`).
- Track **status** (`pending`, `in-progress`, `completed`).
- Prevent past date deadlines.
- Filter tasks by **employee, priority, status**.

### 🛡 Authentication & Authorization

- Admin login page.
- Protected routes with `RouteProtector`.
- Unauthorized & Not Found pages.

### 🎨 UI/UX

- Built with **React + Material UI (MUI)**.
- Responsive design for desktop and mobile.
- Snackbar notifications for errors.

---

## 🛠 Tech Stack

**Frontend**

- React.js (with hooks, router, redux toolkit)
- Material UI (MUI) for styling

**Backend**

- Node.js
- Express.js
- MongoDB + Mongoose (with schema validations)

---

## ⚙️ Installation & Setup

1. Clone the repository

   ```bash
   git clone https://github.com/sambhavgurjar/AdminDashboard.git
   cd task-management
   ```

2. Install dependencies

   ```bash
   # For backend
   cd server
   npm install

   # For frontend
   cd ../client
   npm install
   ```

3. Setup environment variables (`.env` in backend)

   ```env
   PORT=5000
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ADMIN_ID="admin"
   ADMIN_PASS="admin@123"
   ```

4. Run the app

   ```bash
   # Backend
   cd server
   npm run dev

   # Frontend
   cd ../client
   npm run dev
   ```

---










