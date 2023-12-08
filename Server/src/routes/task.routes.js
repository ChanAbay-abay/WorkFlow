const express = require('express')
const router = express.Router();
const { createTask,taskList,taskDone,UpdateTask } = require('../controllers/task.controller');

router.post('/createTask',createTask);
router.get('/listTask',taskList);
router.post('/DoneTask',taskDone);
router.post('/updateTask',UpdateTask);

module.exports = router