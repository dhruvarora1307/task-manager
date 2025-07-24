const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');
const app = express();
const PORT = 3000;

mongoose.connect('mongodb+srv://dhruvarora1438:GKbEyKWdffYzHYMF@cluster0.yvbiuve.mongodb.net/taskdb?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.static('public'));
app.use(express.json());
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));