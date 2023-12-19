module.exports = (app) => {
  const subtaskController = require('../controllers/subtask.controller');
  let router = require('express').Router();

  router.post('/create', subtaskController.createSubtask);
  router.get('/all', subtaskController.getAllSubtasks);
  router.get('/:id', subtaskController.getSubtaskById);
  router.put('/:id', subtaskController.updateSubtask);
  router.delete('/:id', subtaskController.deleteSubtask);

  app.use('/api/subtasks', router);
};
