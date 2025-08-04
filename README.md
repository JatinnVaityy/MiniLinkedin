# 🧑‍💼 MiniLinkedIn

A minimal LinkedIn-like web application built using the **MERN stack**.

## 🌐 Live Demo

- Frontend: [https://mini-linkedin-nu.vercel.app](https://mini-linkedin-nu.vercel.app)  
- Backend: [https://minilinkedinn.onrender.com](https://minilinkedinn.onrender.com)

---

## ⚙️ Tech Stack

- React.js  
- Node.js + Express.js  
- MongoDB  
- JWT Authentication  
- Deployment on Vercel (frontend) and Render (backend)

---

## 🚀 Features

- 🔐 User Registration and Login with JWT  
- 📝 Create, Read, and Display Text-Only Posts  
- 👤 User Profile Page with Name, Email, Bio, and Posts  
- 📄 Public Home Feed with Posts from All Users  

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

git clone https://github.com/JatinnVaityy/MiniLinkedin.git
cd MiniLinkedin


### 2. Backend Setup (/server)
cd server
npm install
Create a .env file inside the server folder with the following variables:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Start the backend server:
node server.js


### 3. Frontend Setup (/frontend)
cd ../frontend
npm install
npm run dev
