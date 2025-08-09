# Library Management API

A RESTful Library Management System API built with **Express**, **TypeScript**, **MongoDB** (via Mongoose), featuring proper schema validation, business logic, aggregation, and middleware.

---

## Features

- CRUD operations for Books
- Borrow books with availability and copies control
- Filtering, sorting, and pagination support for books
- Borrow summary aggregation with total borrowed quantities
- Mongoose static/instance methods and middleware
- Input validation with Zod
- Clear error handling with consistent response structure

---

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB with Mongoose
- Zod for request validation
- dotenv for environment variables

---

## Setup & Installation

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB instance (local or cloud)
- npm package manager

### Steps

1. **Clone the repository**

```bash
git clone "https://github.com/perpendicular01/Library-Management-API-.git"
cd Library-Management-API
npm install
```

2. **Create a .env file**
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

3. **Run the server**
```
npm run dev
```


## API Summary

### Books
- `POST /api/books` — Create book  
- `GET /api/books` — List books (supports filter, sort, limit)  
- `GET /api/books/:id` — Get book by ID  
- `PUT /api/books/:id` — Update book  
- `DELETE /api/books/:id` — Delete book  

### Borrow
- `POST /api/borrow` — Borrow a book (checks availability)  
- `GET /api/borrow` — Get borrow summary (total borrowed per book) 
