module.exports = (app) => {
    const roletypeController = require('../controllers/roletype.controller');
    let router = require('express').Router();

    router.post('/create', roletypeController.createRoletype);
    router.get('/all', roletypeController.getAllRoletypes);
    router.get('/:id', roletypeController.getRoletypeById);
    router.put('/:id', roletypeController.updateRoletype);
    router.delete('/:id', roletypeController.deleteRoletype);

    app.use('/api/roletypes', router);
};
