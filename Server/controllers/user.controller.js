const db = require('../models');
const User = db.user;

const UserController = {
  //create a user
  createUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      res.status(201).json({
        userID: newUser.userID,
        userName: newUser.userName,
        userEmail: newUser.userEmail,
        userPassword: newUser.userPassword,
        createDate: newUser.createDate,
      });
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        // Log validation errors
        console.error('Validation Errors:', error.errors);
      }
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  //get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  //get 1 user by id
  getUserById: async (req, res) => {
    const userId = req.params.id;

    try {
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  //update a user by id
  updateUser: async (req, res) => {
    const userId = req.params.id;

    try {
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await user.update(req.body);

      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  //delete a user by id
  deleteUser: async (req, res) => {
    const userId = req.params.id;

    try {
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await user.destroy();

      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = UserController;