const db = require('../models'); // Adjust the path accordingly
const Roletype = db.roletype;

const RoletypeController = {
  //create a roletype
  createRoletype: async (req, res) => {
    try {
      const newRoletype = await Roletype.create(req.body);
      res.status(201).json(newRoletype);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  //get all roletypes
  getAllRoletypes: async (req, res) => {
    try {
      const roletypes = await Roletype.findAll();
      res.status(200).json(roletypes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  //get a roletype by id
  getRoletypeById: async (req, res) => {
    const roletypeId = req.params.id;

    try {
      const roletype = await Roletype.findByPk(roletypeId);

      if (!roletype) {
        return res.status(404).json({ error: 'Roletype not found' });
      }

      res.status(200).json(roletype);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  //update roletype by id
  updateRoletype: async (req, res) => {
    const roletypeId = req.params.id;

    try {
      const roletype = await Roletype.findByPk(roletypeId);

      if (!roletype) {
        return res.status(404).json({ error: 'Roletype not found' });
      }

      await roletype.update(req.body);

      res.status(200).json({ message: 'Roletype updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  //delete roletype by id
  deleteRoletype: async (req, res) => {
    const roletypeId = req.params.id;

    try {
      const roletype = await Roletype.findByPk(roletypeId);

      if (!roletype) {
        return res.status(404).json({ error: 'Roletype not found' });
      }

      await roletype.destroy();

      res.status(200).json({ message: 'Roletype deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = RoletypeController;
