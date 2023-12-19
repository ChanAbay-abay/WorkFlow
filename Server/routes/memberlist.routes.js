module.exports = (app) => {
  const memberlistController = require('../controllers/memberlist.controller');
  let router = require('express').Router();

  router.post('/create', memberlistController.createMemberlist);
  router.get('/all', memberlistController.getAllMemberlists);
  router.get('/:id', memberlistController.getMemberlistById);
  router.put('/:id', memberlistController.updateMemberlist);
  router.delete('/:id', memberlistController.deleteMemberlist);

  app.use('/api/memberlists', router);
};