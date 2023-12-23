module.exports = (app) => {
  const taskController = require('../controllers/task.controller');
  let router = require('express').Router();

  router.post('/create', taskController.createTask);
  router.get('/all', taskController.getAllTasks);
  router.get('/:id', taskController.getTaskById);
  router.put('/:id', taskController.updateTask);
  router.delete('/:id', taskController.deleteTask);

  app.use('/api/tasks', router);
};