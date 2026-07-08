# Gradebook — Student Tracker

Two parts: an Angular frontend (`/student-tracker`) and an Express + MongoDB backend (`/backend`).

## 1. Backend setup

```
cd backend
npm install
```

Open `.env` and replace the placeholder with your own MongoDB connection string
(from MongoDB Atlas, or `mongodb://localhost:27017/gradebook` if running MongoDB locally):

```
MONGODB_URI=mongodb+srv://<your-username>:<your-password>@cluster0.mongodb.net/gradebook
PORT=5000
```

Run the server:

```
npm start
```

You should see `MongoDB connected` and `Server running on port 5000` in the terminal.

## 2. Frontend setup

This is a complete, ready-to-run Angular workspace — no `ng new` needed.

```
cd student-tracker
npm install
ng serve
```

Visit `http://localhost:4200` — make sure the backend (`http://localhost:5000`) is running too,
since `student.service.ts` calls it directly.

To run the unit tests:

```
ng test
```

## Notes

- No NgModules — every component is `standalone: true`.
- No constructors — dependencies are pulled in with `inject()`.
- The student list uses the new `@for` / `@empty` control-flow syntax instead of `*ngFor`.
- `student-form` is a dumb-ish form component: it takes `[editStudent]` as an `@Input`,
  and emits `(saved)` when done. `home.ts` is the container that owns the actual
  student list and passes data down / listens for events up.
