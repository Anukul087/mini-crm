# 🚀 Mini CRM Dashboard

A full-stack Mini CRM (Customer Relationship Management) system built using the MERN stack.  
Designed for internship-level submission with professional UI, analytics, and production-grade features.

---

## 📌 Features

### ✅ Core CRM Functionality
- Create Leads
- View Leads
- Update Leads (Inline Edit)
- Delete Leads
- Status Management (New, Contacted, Qualified, Lost)

### 📊 Dashboard & Analytics
- Animated KPI Counters
- Lead Distribution Chart (Chart.js)
- Real-time status updates reflected in analytics

### 🔎 Data Handling
- Search (Name, Email, Phone)
- Column Sorting
- Pagination (5 leads per page)

### 🎨 UI & UX Enhancements
- Modern responsive design
- Traffic-light action buttons (Edit / Delete / Save)
- Toast notifications (react-toastify)
- Dark Mode Toggle
- Smooth animations & micro-interactions

---

## 🛠 Tech Stack

### Frontend
- React.js
- Axios
- Chart.js (react-chartjs-2)
- React Toastify
- Custom CSS (Modern UI + Dark Mode)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

---

## 📂 Project Structure

mini-crm/
│
├── client/              # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── LeadForm.jsx
│   │   │   ├── LeadList.jsx
│   │   │   ├── DashboardChart.jsx
│   │   │   └── AnimatedNumber.jsx
│   │   └── App.js
│
├── server/              # Express Backend
│   ├── models/
│   ├── routes/
│   ├── server.js
│
└── README.md

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

git clone https://github.com/YOUR_USERNAME/mini-crm.git  
cd mini-crm

---

### 2️⃣ Backend Setup

cd server  
npm install  

Create a .env file inside server:

MONGO_URI=your_mongodb_connection_string  
PORT=5000  

Start backend:

npm start  

---

### 3️⃣ Frontend Setup

cd client  
npm install  
npm start  

App runs on:

http://localhost:3000

---

## 📊 API Endpoints

GET     /api/leads        → Get all leads  
POST    /api/leads        → Create lead  
PUT     /api/leads/:id    → Update lead  
DELETE  /api/leads/:id    → Delete lead  

---

## 🌙 Dark Mode

Dark mode can be toggled from the UI.  
All components are optimized for accessibility and contrast.

---

## 🚀 Deployment

Frontend: Vercel  
Backend: Render / Railway  

---

## 👨‍💻 Author

Built as an internship-ready full-stack project.

---

## 📜 License

This project is for educational and demonstration purposes.
