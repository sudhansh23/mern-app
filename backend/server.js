const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./models/items.js');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/items', require('./routes/itemRoutes'));

mongoose.connect('mongodb://127.0.0.1:27017/mern-crud', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// CREATE
app.post('/tasks', async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
});

// READ
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// UPDATE
app.put('/tasks/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

// DELETE
app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
