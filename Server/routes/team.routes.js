module.exports = (app) => {
  const teamController = require('../controllers/team.controller');
  let router = require('express').Router();

  router.post('/create', teamController.createTeam);
  router.get('/all', teamController.getAllTeams);
  router.get('/:id', teamController.getTeamById);
  router.put('/:id', teamController.updateTeam);
  router.delete('/:id', teamController.deleteTeam);

  app.use('/api/teams', router);
};
