/* eslint no-param-reassign: ["error", { "props": false }] */

const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateLoginInput(data) {
  const errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password Field is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email Field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
