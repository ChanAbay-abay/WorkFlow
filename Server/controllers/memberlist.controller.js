const db = require('../models'); // Adjust the path accordingly
const Memberlist = db.memberlist;

const MemberlistController = {
  //create a new memberlist
  createMemberlist: async (req, res) => {
    try {
      const newMemberlist = await Memberlist.create(req.body);
      res.status(201).json(newMemberlist);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  //get all memberlists
  getAllMemberlists: async (req, res) => {
    try {
      const memberlists = await Memberlist.findAll();
      res.status(200).json(memberlists);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  //get a single memberlist by id
  getMemberlistById: async (req, res) => {
    const memberlistId = req.params.id;

    try {
      const memberlist = await Memberlist.findByPk(memberlistId);

      if (!memberlist) {
        return res.status(404).json({ error: 'Memberlist not found' });
      }

      res.status(200).json(memberlist);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  //update memberlist by id
  updateMemberlist: async (req, res) => {
    const memberlistId = req.params.id;

    try {
      const memberlist = await Memberlist.findByPk(memberlistId);

      if (!memberlist) {
        return res.status(404).json({ error: 'Memberlist not found' });
      }

      await memberlist.update(req.body);

      res.status(200).json({ message: 'Memberlist updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  //del memlist by id
  deleteMemberlist: async (req, res) => {
    const memberlistId = req.params.id;

    try {
      const memberlist = await Memberlist.findByPk(memberlistId);

      if (!memberlist) {
        return res.status(404).json({ error: 'Memberlist not found' });
      }

      await memberlist.destroy();

      res.status(200).json({ message: 'Memberlist deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = MemberlistController;
