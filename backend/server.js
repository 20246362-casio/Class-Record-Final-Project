require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  studentId: { type: String, required: true },
  course: { type: String, required: true },
  grade: { type: Number, required: true }
});

const Student = mongoose.model('Student', studentSchema);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));


// Get all students
app.get('/api/students', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// Add a new student
app.post('/api/students', async (req, res) => {
  const student = new Student(req.body);
  const savedStudent = await student.save();
  res.json(savedStudent);
});

// Update a student
app.put('/api/students/:id', async (req, res) => {
  const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedStudent);
});

// Delete a student
app.delete('/api/students/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: 'Student deleted' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
