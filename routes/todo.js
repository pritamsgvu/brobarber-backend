const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Get all To-Dos
router.get('/', async (req, res) => {
  try {
      const todos = await Todo.find();
      // Format createdAt date before sending it to the client
      const formattedTodos = todos.map(todo => ({
          ...todo._doc,
          createdAt: todo.createdAt.toLocaleString() // Format the createdAt to a readable string
      }));
      res.json(formattedTodos);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Create a new To-Do
router.post('/', async (req, res) => {
    const todo = new Todo({
        task: req.body.task,
        isCompleted: req.body.isCompleted,
    });

    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a To-Do
router.put('/:id', async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a To-Do
router.delete('/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
