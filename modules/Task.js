const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  priority: {
    type: Number,
    enum: [1, 2, 3],
    required: true,
  },
  dueDate: {
    type: Date,
    required: false
  },
  state: {
    type: String,
    required: false,
    default: "InProgress"
  },
  label: {
    type: String,
    required: false
  },
  tags: {
    type: String,
    required: false
  }

});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
