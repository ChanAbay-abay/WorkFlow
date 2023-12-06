'use strict';
const User = require('../models/user.model');

exports.findAll = function (req, res) {
    User.findAll(function (err, user) {
        if (err) {
            res.status(500).json({ error: true, message: 'Internal server error' });
        } else {
            res.status(200).json({ status: 200, data: user });
        }
    });
};

exports.create = async (req, res) => {
    try {
      // Extract user data from the request body
      const { userName, userEmail, userPassword } = req.body;
  
      // Validate that userName is not null or empty
      if (!userName) {
        return res.status(400).json({ error: 'Username cannot be null or empty' });
      }
  
      // Create a new User object
      const newUser = new User({
        userName:userName ,
        userEmail:userEmail ,
        userPassword:userPassword ,
        // ... other user properties
      });
 
      // Perform the insertion into the database using the User model
      User.create(newUser, (err, result) => {
        if (err) {
          console.error('Error creating user:', err);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          res.status(201).json({ message: 'User created successfully', user: result });
        }
      });
    } catch (error) { 
      console.error('Error creating user:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
};

exports.findById = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            res.status(500).json({ error: true, message: 'Error finding user' });
        } else {
            if (user.length === 0) {
                res.status(404).json({ error: true, message: 'user not found' });
            } else {
                res.status(200).json({ status: 200, data: user });
            }
        }
    });
};

exports.update = function (req, res) {
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({ error: true, message: 'Please provide all required fields' });
    } else {
        User.update(req.params.id, new user(req.body), function (err, user) {
            if (err) {
                res.status(500).json({ error: true, message: 'Error updating user' });
            } else {
                if (user.affectedRows === 0) {
                    res.status(404).json({ error: true, message: 'user not found' });
                } else {
                    res.status(200).json({ error: false, message: 'user successfully updated', status: 200 });
                }
            }
        });
    }
};

exports.delete = function (req, res) {
    User.delete(req.params.id, function (err, user) {
        if (err) {
            res.status(500).json({ error: true, message: 'Error deleting user' });
        } else {
            if (user.affectedRows === 0) {
                res.status(404).json({ error: true, message: 'user not found' });
            } else {
                res.status(200).json({ error: false, message: 'user successfully deleted', status: 200 });
            }
        }
    });
};

exports.authenticateUser = function (req, res) {
    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword;

    User.findByEmail(userEmail, function (err, user) {
        if (err) {
            res.status(500).send({ error: "Internal Server Error" });
        } else {
            if (!user) {
                res.status(401).send({ error: "Invalid email or password" });
            } else {
                // Compare the provided password with the stored password in the database
                if (userPassword === user.userPassword) {
                    res.status(200).send({ message: "Authentication successful" });
                } else {
                    res.status(401).send({ error: "Invalid email or password" });
                }
            }
        }
    });
};
