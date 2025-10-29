# Task Manager Web Application

A Task Management Web Application that allows users to efficiently create, manage, update, delete, and track their tasks in a simple yet powerful interface. The platform includes secure authentication, protected routes, and responsive UI to ensure smooth user experience across all devices.

---

🔗 **Live Demo:**
[Task Manager]()

---

🔗 **Backend Deployment Link:**
[Task Manager]()

---

🔗 **Github Link:**
[Task Manager]()

---

## Login (Demo Credentials)

> **Guest**
> Username: `sushants2711@gmail.com`
> Password: `oppo1234`

---

## Features

- **User Authentication** — Secure login, signup, and logout functionality.

- **Create Task** — Add a new task with title, description, and completion status.

- **Update Task** — Edit task details and modify completion status.

- **Delete Task** — Remove unwanted tasks anytime.

- **Toggle Task Status** — Mark tasks as complete or incomplete instantly.

- **View All Tasks** — Get a structured list of all created tasks.

- **Protected Routes** — Access restricted pages only after login.

- **Responsive UI** — Works seamlessly on mobile, tablet, and desktop.

---

## ⚙️ Installation & Setup

Follow the steps below to clone and run the project locally.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/sushants2711/Frontend-Developer-task-manager
2️⃣ Navigate into the Project Folder
bash

cd folder name || Open a integrated terminal of VsCode
3️⃣ Install Dependencies

For Backend:
cd backend
npm install

For Frontend:
cd ../frontend
npm install

4️⃣ Configure Environment Variables

Create a .env file in the backend folder:

PORT=3200
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development

```

---

## 🛠️ Tech Stack

### **Frontend**

- ⚛️ React.js
- 💅 Bootstrap
- 🌐 HTML

### **Backend**

- 🧩 Node.js
- 🚀 Express.js

### **Database**

- 🍃 MongoDB

---

## Backend Tools & Technologies

The backend of this project is built using Node.js and several modern libraries to provide a secure, scalable, and maintainable API.

- **Node.js** – JavaScript runtime for building server-side applications.
- **Express.js** – Web framework for building APIs and handling routes.
- **MongoDB & Mongoose** – Database and ODM for storing and managing data.
- **bcryptjs** – Password hashing for authentication security.
- **jsonwebtoken (JWT)** – User authentication and authorization.
- **Joi** – Data validation and schema enforcement.
- **dotenv** – Environment variable management.
- **cors** – Handling Cross-Origin Resource Sharing.
- **body-parser** – Parsing incoming request bodies.
- **cookie-parser** – Parsing cookies from HTTP requests.
- **nodemon** – Automatic server restart during development.

---

## Frontend Tools & Technologies

This project is built using modern React.js tools and technologies to create a responsive, maintainable, and feature-rich frontend.

- **React.js** – JavaScript library for building user interfaces.
- **React Router DOM** – Client-side routing.
- **React Helmet** – Manage document head and metadata dynamically.
- **React Toastify** – Toast notifications.
- **Bootstrap** – Utility-first CSS framework for responsive design.
- **Fetch API** – HTTP requests handling.
- **React Hooks (useState, useEffect, useContext)** – State management and lifecycle methods.
- **Context API** – Global state management.
- **Vite / Create React App** – Project build and development tooling.
- **React DevTools** – Debugging and component inspection.

## 🧩 Backend API Endpoints

1. GET /api/v1/task/all - Fetch all projects/tasks ✅

```
{
    "success": true,
    "message": "Task fetch Successfully",
    "data": [
        {
            "_id": "6901aa9bd6e19b5fb644eef2",
            "title": "Buy groceries",
            "description": "Purchase milk, bread, eggs, and fruits from the supermarket.",
            "user": "6901a34af0e22c7908525201",
            "completed": false,
            "createdAt": "2025-10-29T05:48:11.419Z",
            "updatedAt": "2025-10-29T06:48:51.535Z",
            "__v": 0
        },
        {
            "_id": "6901aaa6d6e19b5fb644eef6",
            "title": "Finish React project",
            "description": "Complete the frontend integration for the task management app.",
            "user": "6901a34af0e22c7908525201",
            "completed": false,
            "createdAt": "2025-10-29T05:48:22.180Z",
            "updatedAt": "2025-10-29T06:26:43.254Z",
            "__v": 0
        },
        {
            "_id": "6901aaf47225b2dec3ae604e",
            "title": "Morning workout",
            "description": "Do 30 minutes of cardio and 15 minutes of strength training.",
            "user": "6901a34af0e22c7908525201",
            "completed": false,
            "createdAt": "2025-10-29T05:49:40.802Z",
            "updatedAt": "2025-10-29T05:49:40.802Z",
            "__v": 0
        },
    ]
}

```

2. POST /api/v1/task/add - Add a new project/task ✅

```
{
    "success": true,
    "message": "Task Created Successfully",
    "data": {
        "title": "Update resume",
        "description": "Add recent projects and experience to the resume document.",
        "user": "6901a34af0e22c7908525201",
        "completed": true,
        "_id": "6901ff53e8531e1796434875",
        "createdAt": "2025-10-29T11:49:39.792Z",
        "updatedAt": "2025-10-29T11:49:39.792Z",
        "__v": 0
    }
}
```

---

## Contact

For bugs or feature request, please reach out to sushants2711@gmail.com

[Linkedin](https://www.linkedin.com/in/sushant-kumar-singh-414782230)

[WhatsApp](https://wa.me/7903759760)
