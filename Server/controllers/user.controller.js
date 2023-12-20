const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { SECRET_KEY } = require('../config'); // Replace with your actual secret key
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

  // login a user
  loginUser: async (req, res) => {
    const { userEmail, userPassword } = req.body;

    try {
      // Find user by email
      const user = await User.findOne({ where: { userEmail: userEmail } });

      if (!user) {
        return res.status(404).json({ error: 'User not found', data: userEmail });
      }

      

      // Compare the provided password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(userPassword, user.userPassword);

      if (!isPasswordValid) {
        console.error('Invalid Password');
        console.error('Hashed Password Mismatch');
        console.log('Provided Password:', userPassword);
        console.log('Stored Hashed Password:', user.userPassword);
        return res.status(401).json({ error: 'Invalid password' });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user.userID, userEmail: user.userEmail }, "SECRET_KEY", {
        expiresIn: '1h', // Token expiration time (adjust as needed)
      });

      // Send the token in the response
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // signup a user
  signupUser: async (req, res) => {
    const { userName, userEmail, userPassword } = req.body;

    try {
      // Check if the user with the provided email already exists
      const existingUser = await User.findOne({ where: { userEmail } });

      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
      }

      // Hash the password before storing it in the database
      const hashedPassword = await bcrypt.hash(userPassword, 10);

      // Create a new user
      const newUser = await User.create({
        userName,
        userEmail,
        userPassword: hashedPassword,
      });

      // Generate a JWT token
      const token = jwt.sign({ userId: newUser.userID, userEmail: newUser.userEmail }, "SECRET_KEY", {
        expiresIn: '1h', // Token expiration time (adjust as needed)
      });

      // Send the token in the response
      res.status(201).json({
        message: 'User created successfully',
        userId: newUser.userID,
        userName: newUser.userName,
        userEmail: newUser.userEmail,
        createDate: newUser.createDate,
        token,
      });
    } catch (error) {
      // Handle unique constraint violation error
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: 'Email already in use' });
      }

      // Handle other errors
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
      console.log(users);
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