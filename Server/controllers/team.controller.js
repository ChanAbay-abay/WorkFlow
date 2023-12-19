const db = require('../models'); // Adjust the path accordingly
const Team = db.team;

const TeamController = {
  //create a new team
  createTeam: async (req, res) => {
    try {
      const newTeam = await Team.create(req.body);
      res.status(201).json(newTeam);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  //get all teams
  getAllTeams: async (req, res) => {
    try {
      const teams = await Team.findAll();
      res.status(200).json(teams);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  //get a single team by id
  getTeamById: async (req, res) => {
    const teamId = req.params.id;

    try {
      const team = await Team.findByPk(teamId);

      if (!team) {
        return res.status(404).json({ error: 'Team not found' });
      }

      res.status(200).json(team);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  //update a team by id
  updateTeam: async (req, res) => {
    const teamId = req.params.id;

    try {
      const team = await Team.findByPk(teamId);

      if (!team) {
        return res.status(404).json({ error: 'Team not found' });
      }

      await team.update(req.body);

      res.status(200).json({ message: 'Team updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  //delete team by id
  deleteTeam: async (req, res) => {
    const teamId = req.params.id;

    try {
      const team = await Team.findByPk(teamId);

      if (!team) {
        return res.status(404).json({ error: 'Team not found' });
      }

      await team.destroy();

      res.status(200).json({ message: 'Team deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = TeamController;
