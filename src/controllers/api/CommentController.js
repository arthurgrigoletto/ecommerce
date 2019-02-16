/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

const Product = require('../../models/entity/Product');

// Load Input Validation
const validateCommentInput = require('../../validation/comment');

const addComment = (req, res) => {
  const { errors, isValid } = validateCommentInput(req.body);
  const { text } = req.body;
  const { name, id: userId, avatar } = req.user;

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with erros object
    res.status(400).json(errors);
  }

  return Product.findById(req.params.id)
    .then((product) => {
      const newComment = {
        text,
        user: userId,
        avatar,
        name,
      };

      // Add to Comments Array
      product.comments.unshift(newComment);

      // Save
      product.save().then(prod => res.json(prod));
    })
    .catch(() => res.status(404).json({ productnotfound: 'No Product found' }));
};

// Get comments by Product
const getComments = async (req, res) => Product.findById(req.params.id)
  .then(product => res.json(product.comments))
  .catch(() => res.status(404).json({ productnotfound: 'No Article Found' }));

// General Method
const generalMethod = (typeMethod, req, res) => {
  const { id: productId, commentId } = req.params;
  const { _id: userId } = req.user;
  const { text: newComment } = req.body;

  return Product.findById(productId)
    .then((product) => {
      // Check if comment exists
      if (product.comments.filter(comment => comment._id.toString() === commentId).length === 0) {
        return res.status(404).json({ commentnotexists: 'Comment does not exist' });
      }

      // Get remove index
      const commentIndex = product.comments.map(item => item._id.toString()).indexOf(commentId);

      // Check if user is the same
      if (product.comments[commentIndex].user.toString() !== userId.toString()) {
        return res.status(405).json({ notallowed: 'You can only delete your comments' });
      }

      switch (typeMethod) {
        case 'delete':
          // Splice comment out of array
          product.comments.splice(commentIndex, 1);
          break;
        case 'put':
          product.comments[commentIndex].text = newComment;
          break;
        default:
          break;
      }

      // Save
      return product.save().then(product1 => res.json(product1));
    })
    .catch(() => res.json(404).json({ articlenotfound: 'No Article Found' }));
};

// Update Comment
const updateComment = (req, res) => {
  const { errors, isValid } = validateCommentInput(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with erros object
    res.status(400).json(errors);
  }

  return generalMethod('put', req, res);
};

// Delete Comment
const deleteComment = (req, res) => generalMethod('delete', req, res);

module.exports = {
  addComment,
  getComments,
  updateComment,
  deleteComment,
};
