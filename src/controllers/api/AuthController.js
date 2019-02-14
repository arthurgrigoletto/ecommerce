/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User Model
const User = require('../../models/entity/User');

const login = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;

  // Find user by email
  return User.findOne({ email }).then((user) => {
    // Check foi user
    if (!user) {
      errors.email = 'User not found';
      res.status(404).json(errors);
    }

    // Check Password
    return bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
      // User Matched

      // Create JWT Payload
      const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
      };

      // Sign Token
      return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 3600 }, (err, token) => {
        res.json({
          success: true,
          token: `Bearer ${token}`,
        });
      });
    });
  });
};

const register = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  const { key, location: avatar = '' } = req.file;

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  return User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    }

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      avatar,
      key,
    });

    return bcrypt.genSalt(10, (error, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;

        newUser.password = hash;
        newUser
          .save()
          .then(usuario => res.json(usuario))
          .catch(erro => res.status(500).json(erro));
      });
    });
  });
};

const current = (req, res) => res.json({
  _id: req.user._id,
  email: req.user.email,
  name: req.user.name,
  avatar: req.user.avatar,
});

module.exports = {
  login,
  register,
  current,
};
