const Task = require('../modules/Task');

// Function to create a new task
exports.createTask = async (req, res) => {
  try {
    let { title, description, priority, dueDate, label, tags } = req.body;
     dueDate = new Date(dueDate);

    const newTask = new Task({
      title,
      description,
      priority,
      dueDate,
      label,
      tags
    });

    await newTask.save();
    return res.status(201).json(newTask);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error creating task' });
  }
};

// Function to get a list of all tasks

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({dueDate:-1, priority: -1});
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching tasks' });
  }
};


// Function to get a specific task by ID

exports.getTaskById = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching task' });
  }
};

// Function to get a specific label

exports.getTaskByLabel = async (req, res) => {
  try {
    const labelID = req.query;
    let matchVar = {};

    if ("label" in req.query) {
      matchVar = { label: req.query.label };
    } else if ("tags" in req.query) {
      matchVar = { tags: req.query.tags };
    } else if ("state" in req.query) {
      matchVar = { state: req.query.state };
    } else if ("priority" in req.query) {
      matchVar = { priority: parseInt(req.query.priority) };
    } else if ("search" in req.query) {
      matchVar = { title: req.query.search };
    }

    // Function to Sort

    const sortOptions = {};
    if ("sortBy" in req.query) {
      const sortOrder = req.query.sortOrder || "asc"; 
      sortOptions[req.query.sortBy] = sortOrder;
    }

    const tasks = await Task.find(matchVar).sort(sortOptions); 
    console.log(tasks);

    if (!tasks) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching task' });
  }
};



// Function to update a task by ID

exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const { title, description, priority, state, label, tags, dueDate } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(taskId, {
      title,
      description,
      priority,
      state,
      label,
      tags,
      dueDate
    });

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    return res.status(200).json({message : `${updatedTask._id} updated this Id`});
  } catch (error) {
    return res.status(500).json({ message: 'Error updating task' });
  }
};

// Function to delete a task by ID
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const deletedTask = await Task.findByIdAndRemove(taskId);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting task' });
  }
};
