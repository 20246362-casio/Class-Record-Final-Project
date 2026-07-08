# Gradebook Backend

Express + MongoDB (Mongoose) API for the Gradebook Student Tracker app.

## Setup

```
npm install
```

Copy `.env` and fill in your own MongoDB connection string:

```
MONGODB_URI=mongodb+srv://<your-username>:<your-password>@<your-cluster>.mongodb.net/?appName=StudentTracker
PORT=5000
```

## Run

```
npm start
```

or, for auto-restart on file changes during development:

```
npm run dev
```

## API Endpoints

| Method | Endpoint              | Description        |
|--------|------------------------|---------------------|
| GET    | /api/students          | List all students   |
| POST   | /api/students          | Add a new student   |
| PUT    | /api/students/:id      | Update a student    |
| DELETE | /api/students/:id      | Delete a student    |

See `/README.md` in the project root for how this connects to the Angular frontend.
