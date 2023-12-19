const db = require('../models'); // Adjust the path accordingly
const Subtask = db.subtask;

const SubtaskController = {
  //create a new subtask
  createSubtask: async (req, res) => {
    try {
      const newSubtask = await Subtask.create(req.body);
      res.status(201).json(newSubtask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  //get all subtasks
  getAllSubtasks: async (req, res) => {
    try {
      const subtasks = await Subtask.findAll();
      res.status(200).json(subtasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  //get a single subtask by id
  getSubtaskById: async (req, res) => {
    const subtaskId = req.params.id;

    try {
      const subtask = await Subtask.findByPk(subtaskId);

      if (!subtask) {
        return res.status(404).json({ error: 'Subtask not found' });
      }

      res.status(200).json(subtask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  //update a subtask by id
  updateSubtask: async (req, res) => {
    const subtaskId = req.params.id;

    try {
      const subtask = await Subtask.findByPk(subtaskId);

      if (!subtask) {
        return res.status(404).json({ error: 'Subtask not found' });
      }

      await subtask.update(req.body);

      res.status(200).json({ message: 'Subtask updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  //del subtask by id
  deleteSubtask: async (req, res) => {
    const subtaskId = req.params.id;

    try {
      const subtask = await Subtask.findByPk(subtaskId);

      if (!subtask) {
        return res.status(404).json({ error: 'Subtask not found' });
      }

      await subtask.destroy();

      res.status(200).json({ message: 'Subtask deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = SubtaskController;
