# 🚀 GrievEase – Complaint Management System

GrievEase is a full-stack web application designed to streamline complaint management for students and administrators. It provides a structured workflow where users can submit complaints and track their status, while admins can review, update, and resolve them efficiently.

---

## 🌟 Features

### 👤 User

* Register and Login securely
* Submit complaints
* Track complaint status with timeline
* View complaint history

### 🛠️ Admin

* Secure admin login
* View all complaints
* Update complaint status:

  * Submitted → Under Review → In Progress → Resolved
  * OR Rejected
* Add internal remarks
* Manage complaint lifecycle

---

## 🧠 Tech Stack

### 🔹 Frontend

* HTML
* CSS
* JavaScript

### 🔹 Backend

* Node.js
* Express.js

### 🔹 Database

* MongoDB
* Mongoose

### 🔹 Authentication & Security

* JSON Web Token (JWT)
* bcryptjs
* dotenv

---

## 📁 Project Structure

```id="w0flr9"
GrievEase/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── complaintController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Complaint.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── complaintRoutes.js
│   │   └── protectedRoutes.js
│   │
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── pages/
│   ├── css/
│   ├── js/
│   └── assets/
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash id="yq8mbn"
git clone <your-repo-link>
cd GrievEase
```

---

## 🔧 Backend Setup

### Step 1: Go to backend folder

```bash id="9qsz3r"
cd backend
```

---

### Step 2: Install dependencies

```bash id="fczrs3"
npm install
```

---

### Step 3: Create `.env` file

Create a `.env` file in the backend folder:

```env id="p6c2k0"
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/grievease
JWT_SECRET=your_secret_key
```

---

### Step 4: Start MongoDB

Run MongoDB locally:

```bash id="g3l4e2"
mongod
```

Or use MongoDB Compass.

---

### Step 5: Run backend server

```bash id="km9jcs"
node server.js
```

OR

```bash id="blx4f1"
npx nodemon server.js
```

---

## 🌐 Frontend Setup

### Step 1: Open frontend folder

```bash id="0fb9jq"
cd ../frontend
```

---

### Step 2: Run frontend

👉 Simply open:

```id="5j1l7q"
index.html
```

OR use Live Server in VS Code.

---

## 🔐 API Base URL

```id="nqdl4m"
http://localhost:5000/api
```

---

## 📡 API Endpoints

### 🔑 Authentication

* `POST /api/auth/register` → Register user
* `POST /api/auth/login` → Login user

---

### 📢 Complaints

* `POST /api/complaints` → Create complaint
* `GET /api/complaints` → Get user complaints
* `PUT /api/complaints/:id` → Update complaint (Admin)

---

## 🔒 Authentication Flow

1. User logs in
2. Server generates JWT token
3. Token stored in frontend
4. Token sent with every request
5. Backend verifies token using middleware

---

## 🛡️ Security Features

* Password hashing using bcrypt
* JWT-based authentication
* Protected routes using middleware
* Environment variables for sensitive data

---

## 🧪 Testing

You can test APIs using:

* Postman
* Thunder Client (VS Code Extension)

---

## ⚠️ Important Notes

* Do NOT upload `.env` file to GitHub
* Add `.env` to `.gitignore`
* Ensure MongoDB is running before starting backend
* Admin user must be created manually in database

---

## 🚀 Future Enhancements

* Email notifications
* File/image upload for complaints
* Real-time status updates
* Role-based dashboards
* Deployment (Render / Vercel / MongoDB Atlas)

---

## 👨‍💻 Author

**Dhruv Pathare**
BSc IT Student

---

## ⭐ Project Purpose

This project is developed for academic and learning purposes to understand full-stack development using Node.js and MongoDB.

---

## 📌 How It Works (Flow)

```id="12r4al"
User → Frontend → API Request → Express → Controller → Database
                                      ↓
                                  Response
```

---

## 🎯 Conclusion

GrievEase simplifies complaint handling by providing a structured and transparent system for both users and administrators. It demonstrates real-world implementation of authentication, REST APIs, and database integration.
