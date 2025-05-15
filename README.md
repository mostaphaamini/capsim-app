# Capsim Assessment Backend

This is the backend REST API built with NestJS and TypeORM. It serves quiz questions, accepts submissions, and calculates scores.

---

## Features

- Provides REST API endpoints:
  - `GET /questions` - returns 5 random questions with answers (without points)
  - `POST /submissions` - accepts user answers and calculates score
- SQLite database with TypeORM
- Automatic schema sync and optional seeding
- CORS enabled for frontend communication
- Environment-based configuration using `.env`
- Unit and integration tests with Jest

---

## Tech Stack

- Node.js 18+
- NestJS
- TypeORM
- SQLite
- Jest for testing

---

## Setup

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Configure environment variables

Create `.env` file in `backend/`:

```env
PORT=8080
FRONTEND_ORIGIN=http://localhost:3000
```

---

### 3. Seed the database (optional)

To seed the database with sample questions and answers, run:

```bash
npm run seed
```

> Or, if your seed is called in app startup, it will auto-seed on first run.

---

### 4. Start the backend server

```bash
npm run start:dev
```

Access API at `http://localhost:8080`

---

## API Endpoints

| Method | Path                | Description                        |
|--------|---------------------|----------------------------------|
| GET    | `/questions`        | Returns 5 random questions + answers (no points) |
| POST   | `/submissions`      | Submit answers and get scored result |
| GET    | `/questions/:id/answers` | Get all answers for a question (for debugging) |

---

## Running Tests

```bash
npm run test
```

---

## Project Structure

```
backend/
├── src/
│   ├── questions/
│   ├── submissions/
│   ├── app.module.ts
│   ├── main.ts
│   └── ...
├── test/
├── .env
├── package.json
└── tsconfig.json
```

---

## Deployment

- Recommended to deploy on services like Render, Railway, Fly.io
- Use environment variables to configure ports and allowed origins

---

## 👨‍💻 Author

Matthew C Mark  
📧 [matthew.c.mark.dev@gmail.com](mailto:matthew.c.mark.dev@gmail.com)  

> 💡 Feel free to customize this README with your own name, email, GitHub, and deployment URLs.
