const db = require('../models'); // Adjust the path accordingly
const Task = db.task;

const TaskController = {
  //create a new task
  createTask: async (req, res) => {
    try {
      const newTask = await Task.create(req.body);
      res.status(201).json(newTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  //get all tasks
  getAllTasks: async (req, res) => {
    try {
      const tasks = await Task.findAll();
      res.status(200).json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  //get 1 task by id
  getTaskById: async (req, res) => {
    const taskId = req.params.id;

    try {
      const task = await Task.findByPk(taskId);

      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      res.status(200).json(task);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  //update task by id
  updateTask: async (req, res) => {
    const taskId = req.params.id;

    try {
      const task = await Task.findByPk(taskId);

      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      await task.update(req.body);

      res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  //del task by id
  deleteTask: async (req, res) => {
    const taskId = req.params.id;

    try {
      const task = await Task.findByPk(taskId);

      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      await task.destroy();

      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = TaskController;
