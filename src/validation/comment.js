/* eslint no-param-reassign: ["error", { "props": false }] */

const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateCommentInput(data) {
  const errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = 'Comment must be between 10 and 300 characters';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Comment Field is Required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
