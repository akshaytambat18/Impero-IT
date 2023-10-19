const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to create a new task
router.post('/tasks',authMiddleware, TaskController.createTask);

// Route to get a list of all tasks
router.get('/tasks',authMiddleware, TaskController.getAllTasks);

// Route to get a specific task by ID
router.get('/tasks/:taskId',authMiddleware, TaskController.getTaskById);

// Route to update a task by ID
router.put('/tasks/:taskId',authMiddleware, TaskController.updateTask);

// Route to delete a task by ID
router.delete('/tasks/:taskId',authMiddleware, TaskController.deleteTask);

// Search Route
router.get('/task/search', authMiddleware, TaskController.getTaskByLabel);

module.exports = router;
