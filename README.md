# To Do List Application

A full-stack application for managing a to-do list. This project uses a Node.js backend with Express and MongoDB (via Mongoose), and a React frontend. The backend provides a RESTful API for CRUD operations on to-do items, while the frontend allows users to interact with their todos through a modern UI.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Features

- **User Authentication:** Middleware protects routes to ensure only authenticated users access their data.
- **CRUD Operations:** Create, read, update, and delete to-do items.
- **Toggle Task Completion:** Mark tasks as complete or incomplete.
- **User-Specific Data:** To-do items are tied to the logged-in user.
- **Optimized Data Transfer:** JSON responses with potential optimizations like field selection and gzip compression.
- **Full-Stack Setup:** A React-based frontend for interactive UI.

---

## Technologies Used

- **Backend:**
  - [Node.js](https://nodejs.org/)
  - [Express](https://expressjs.com/)
  - [MongoDB](https://www.mongodb.com/) using [Mongoose](https://mongoosejs.com/)
  - [cors](https://www.npmjs.com/package/cors)
  - [cookie-parser](https://www.npmjs.com/package/cookie-parser)

- **Frontend:**
  - [React](https://reactjs.org/)
  - React Router for navigation

---

## Installation

### Backend Setup

1. **Clone the Repository and Install Dependencies:**

   ```bash
   git clone https://github.com/yourusername/todo-list-app.git
   cd todo-list-app/backend
   npm install
