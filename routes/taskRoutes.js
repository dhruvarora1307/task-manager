const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

router.post('/', async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.status(201).json(newTask);
});

router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

router.put('/:id', async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTask);
});

module.exports = router;