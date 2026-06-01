# 🚀 GrievEase – Complaint Management System

GrievEase is a full-stack web application designed to streamline complaint management for students and administrators. It provides a structured workflow where users can submit complaints and track their status, while admins can review, update, and resolve them efficiently.

---
## 🌟 Images
<img width="1920" height="951" alt="login" src="https://github.com/user-attachments/assets/ad36c4b2-1073-4582-b382-4d7fd3bab01b" />
<img width="1919" height="936" alt="dashboard" src="https://github.com/user-attachments/assets/efcbea11-84b5-4813-9451-7f5925666c89" />
<img width="1920" height="943" alt="FileComplaint" src="https://github.com/user-attachments/assets/731ba21d-a321-4ebb-a7e0-a592deafb668" />
<img width="1916" height="942" alt="MyComplaints" src="https://github.com/user-attachments/assets/7a78f7d0-9434-4081-9fdf-22f22247cc1a" />
<img width="1916" height="937" alt="profile" src="https://github.com/user-attachments/assets/5ab0a95e-d65f-4564-b4e1-ecd71f322201" />
<img width="1918" height="943" alt="track_status" src="https://github.com/user-attachments/assets/ed0d7a0e-979d-4f8f-9227-1c9c22d5c1c2" />
<img width="1915" height="926" alt="adminlogin" src="https://github.com/user-attachments/assets/e79703cb-1c21-4d17-9ed8-e991b8ec7881" />
<img width="1895" height="938" alt="AdminDashboard" src="https://github.com/user-attachments/assets/96095fad-a3a0-44a1-aba1-6873dd4eef77" />
<img width="1897" height="947" alt="Complaints" src="https://github.com/user-attachments/assets/a8081b76-f57e-46cc-9f68-0e2002a26c8a" />
<img width="1899" height="947" alt="admin_complaint_detail1" src="https://github.com/user-attachments/assets/f391a24d-6262-4745-abdd-70667e7447e8" />
<img width="1886" height="924" alt="admin_complaint_detail2" src="https://github.com/user-attachments/assets/c3834e70-152e-4d82-a924-1978028e789d" />
<img width="1918" height="926" alt="admin_notes" src="https://github.com/user-attachments/assets/e137d9dc-0c16-48e7-ac79-32d5fe704a45" />

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
├──src/
│    │
│    ├── css/
│    │   ├── admin/
│    │   │   ├── admin_complaint_detail.css
│    │   │   ├── admin_complaints.css
│    │   │   ├── admin_dashboard.css
│    │   │   └── admin_notes.css
│    │   │
│    │   ├── shared/
│    │   │   ├── dashboard.css
│    │   │   └── index_login.css
│    │   │
│    │   └── student/
│    │       ├── file_complaint.css
│    │       ├── help_support.css
│    │       ├── my_complaints.css
│    │       ├── profile.css
│    │       └── track_status.css
│    │
│    ├── js/
│    │   ├── admin/
│    │   │   ├── admin_complaint_detail.js
│    │   │   ├── admin_complaints.js
│    │   │   ├── admin_dashboard.js
│    │   │   └── admin_notes.js
│    │   │
│    │   ├── shared/
│    │   │   ├── dashboard.js
│    │   │   ├── login.js
│    │   │   └── theme-engine.js
│    │   │
│    │   └── student/
│    │       ├── file_complaint.js
│    │       ├── help_support.js
│    │       ├── my_complaints.js
│    │       ├── profile.js
│    │       └── track_status.js
│    │
│    ├── templates/
│    │   ├── admin/
│    │   │   ├── admin_complaint_detail.html
│    │   │   ├── admin_complaints.html
│    │   │   ├── admin_dashboard.html
│    │   │   └── admin_notes.html
│    │   │
│    │   └── student/
│    │       ├── file_complaint.html
│    │       ├── help_support.html
│    │       ├── my_complaints.html
│    │       ├── profile.html
│    │       ├── student_dashboard.html
│    │       └── track_status.html
│    │
│    ├── index.html
```


---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash id="yq8mbn"
git clone https://github.com/dhruvpathare07/GrievEase.git
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

