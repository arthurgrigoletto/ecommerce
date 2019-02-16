/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
/* eslint no-param-reassign: ["error", { "props": false }] */

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
  const {
    name, email, password, street, number, zip, city, state, cpf,
  } = req.body;

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
      name,
      email,
      password,
      cpf,
      address: {
        street,
        number,
        zip,
        city,
        state,
      },
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

const updateUser = (req, res) => {
  const errors = {};
  const {
    name, email, password, street, number, zip, city, state, cpf, birthday,
  } = req.body;

  return User.findById(req.user._id).then((user) => {
    // New Avatar
    if (req.file) {
      const { key, location: avatar = '' } = req.file;

      user.avatar = avatar;
      user.key = key;
    }

    // New Name
    user.name = name || user.name;

    // New Email
    user.email = email || user.email;

    // New Street
    user.address.street = street || user.address.street;

    // New Nuber
    user.address.number = number || user.address.number;

    // New ZipCode
    user.address.zip = zip || user.address.zip;

    // New City
    user.address.city = city || user.address.city;

    // New State
    user.address.state = state || user.address.state;

    // New CPF
    user.cpf = cpf || user.cpf;

    // New BirthDay
    user.birthday = birthday || user.birthday;

    // Check Password
    return bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }

      return user.save().then(newUser => res.json(newUser));
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
  updateUser,
  current,
};
