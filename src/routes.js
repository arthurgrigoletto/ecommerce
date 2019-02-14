const express = require('express');
const passport = require('passport');
const multer = require('multer');
const multerConfig = require('./config/multer');

// Import Controllers
const AuthentificationController = require('./controllers/api/AuthController');
const CommentController = require('./controllers/api/CommentController');
const ProductController = require('./controllers/api/ProductController');

const routes = express.Router();

/*
================================================================================
================================================================================
========================== AUTHENTIFICATION ROUTES =============================
================================================================================
================================================================================
*/

// @route   POST api/auth/login
// @desc    Login User / Returning JWT Token
// @access  Public
routes.post('/auth/login', AuthentificationController.login);

// @route   POST api/auth/register
// @desc    Register User
// @access  Public
routes.post(
  '/auth/register',
  multer(multerConfig).single('file'),
  AuthentificationController.register,
);

// @route   GET api/auth/current
// @desc    Return Current User
// @access  Private
routes.get(
  '/auth/current',
  passport.authenticate('jwt', { session: false }),
  AuthentificationController.current,
);

/*
================================================================================
================================================================================
============================== PRODUCT ROUTES ==================================
================================================================================
================================================================================
*/
// @route   GET api/products
// @desc    GET Products
// @access  Public
routes.get('/products', ProductController.index);

// @route   GET api/products/:id
// @desc    GET Product or Fields Product by Id
// @access  Public
routes.get('/products/:id', ProductController.show);

// @route   POST api/products
// @desc    Create an Product
// @access  Private
routes.post(
  '/products',
  passport.authenticate('jwt', { session: false }),
  multer(multerConfig).single('file'),
  ProductController.store,
);

// @route   PUT api/products
// @desc    Update an Articles
// @access  Private
routes.put(
  '/products/:id',
  passport.authenticate('jwt', { session: false }),
  multer(multerConfig).single('file'),
  ProductController.update,
);

// @route   DELETE api/products/:id
// @desc    Delete an Article
// @access  Private
routes.delete(
  '/products/:id',
  passport.authenticate('jwt', { session: false }),
  ProductController.remove,
);

/*
================================================================================
================================================================================
============================== COMMENTS ROUTES =================================
================================================================================
================================================================================
*/

// @route   GET api/:id/comments
// @desc    GET Article's Comments
// @access  Public
routes.get('/:id/comments', CommentController.getComments);

// @route   POST api/:id/comments
// @desc    Create Article's Comment
// @access  Private
routes.post(
  '/:id/comments',
  passport.authenticate('jwt', { session: false }),
  CommentController.addComment,
);

// @route   PUT api/:id/comments
// @desc    Update Article's Comment
// @access  Private
routes.put(
  '/:id/comments/:commentId',
  passport.authenticate('jwt', { session: false }),
  CommentController.updateComment,
);

// @route   Delete api/:id/comments
// @desc    Delete Article's Comment
// @access  Private
routes.delete(
  '/:id/comments/:commentId',
  passport.authenticate('jwt', { session: false }),
  CommentController.deleteComment,
);

module.exports = routes;