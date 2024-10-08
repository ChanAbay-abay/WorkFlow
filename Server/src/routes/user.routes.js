const express = require('express')
const xxrouter = express.Router()
const userController = require('../controllers/user.controller');

router.get('/',userController.findAll);

router.post('/',userController.create);

router.get('/:id', userController.findById);

router.put('/:id', userController.update);

router.delete('/:id', userController.delete);

router.post('/login', userController.authenticateUser);


module.exports = router

