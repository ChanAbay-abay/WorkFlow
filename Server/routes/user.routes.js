module.exports = (app) => {
  const userController = require('../controllers/user.controller');
  let router = require('express').Router();

  router.post('/create', userController.createUser);
  router.get('/all', userController.getAllUsers);
  router.get('/:id', userController.getUserById);
  router.put('/:id', userController.updateUser);
  router.delete('/:id', userController.deleteUser);

  app.use('/api/users', router);
};
