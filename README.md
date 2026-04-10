# 🗂️ Task Manager Full Stack App

A full-stack Task Management web application built using **React**, **Spring Boot**, and **PostgreSQL**.  
It allows users to create, manage, and track tasks using a Kanban-style workflow.

---

## 🚀 Tech Stack

- 🎯 Frontend: React.js
- ⚙️ Backend: Spring Boot
- 🗄️ Database: PostgreSQL
- 🔗 API: REST APIs

---

## ✨ Features

- Create new tasks
- Update existing tasks
- Delete tasks
- Drag & Drop Kanban board (To Do / In Progress / Done)
- Assign tasks to users
- Set task priority (High / Medium / Low)
- Track task status in real time

---

## 📁 Project Structure


task-manager-app/
│
├── frontend/ # React UI
├── backend/ # Spring Boot REST API
├── database/ # PostgreSQL SQL scripts


---

## ⚙️ How to Run the Project

---


🔹 1. Clone the Repository
```bash
git clone https://github.com/your-username/task-manager-app.git

🔹 2. Backend Setup (Spring Boot)
cd backend
mvn spring-boot:run
Backend runs on:
http://localhost:9225/tasks
http://localhost:9225/api/users

🔹 3. Frontend Setup (React)
cd frontend
npm install
npm start
Frontend runs on:
http://localhost:5174

🔹 4. Database Setup (PostgreSQL)

Run the SQL scripts inside /database folder:

schema.sql → creates tables
data.sql → inserts sample data

🔗 API Endpoints
GET /api/tasks → Get all tasks
POST /api/tasks → Create task
PUT /api/tasks/{id} → Update task
DELETE /api/tasks/{id} → Delete task

🔹 5.Screenshots
<img width="1920" height="1080" alt="Screenshot (6)" src="https://github.com/user-attachments/assets/57f5af36-7c30-4772-ab7f-257382fbf36d" />
<img width="1920" height="1080" alt="Screenshot (4)" src="https://github.com/user-attachments/assets/59818b5e-cf05-46fa-89de-0439db27f409" />
<img width="1920" height="1080" alt="Screenshot (3)" src="https://github.com/user-attachments/assets/7be1a859-5f14-43e4-b6fc-f44fe4e460ba" />
<img width="1920" height="1080" alt="Screenshot (2)" src="https://github.com/user-attachments/assets/79bc2256-af17-4731-a76e-c3185ec9f0fc" />
<img width="1920" height="1080" alt="Screenshot (1)" src="https://github.com/user-attachments/assets/0f199fa4-0930-4120-a407-7703774a4c10" />



👩‍💻 Author
Name: Nandhini Dhanasekaran
GitHub: https://github.com/NandhiniDhanasekaran
