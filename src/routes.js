const express = require('express');
const passport = require('passport');
const multer = require('multer');
const multerConfig = require('./config/multer');

// Import Controllers
const UserController = require('./controllers/api/UserController');
const CommentController = require('./controllers/api/CommentController');
const ProductController = require('./controllers/api/ProductController');
const RateController = require('./controllers/api/RateController');
const CartController = require('./controllers/api/CartController');

const routes = express.Router();

/*
================================================================================
================================================================================
================================ USERS ROUTES ==================================
================================================================================
================================================================================
*/

// @route   POST api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
routes.post('/users/login', UserController.login);

// @route   POST api/users/register
// @desc    Register User
// @access  Public
routes.post('/users/register', multer(multerConfig).single('file'), UserController.register);

// @route   PUT api/users/
// @desc    Update User
// @access  Private
routes.put(
  '/users',
  passport.authenticate('jwt', { session: false }),
  multer(multerConfig).single('file'),
  UserController.updateUser,
);

// @route   GET api/users/current
// @desc    Return Current User
// @access  Private
routes.get(
  '/users/current',
  passport.authenticate('jwt', { session: false }),
  UserController.current,
);

/*
================================================================================
================================================================================
================================ CART ROUTES ===================================
================================================================================
================================================================================
*/
// @route   GET api/cart
// @desc    GET Products on user cart
// @access  Private
routes.get(
  '/cart',
  passport.authenticate('jwt', { session: false }),
  CartController.getProductsOnCart,
);

// @route   POST api/cart
// @desc    Add Product to user cart
// @access  Private
routes.post(
  '/cart',
  passport.authenticate('jwt', { session: false }),
  CartController.addProductToCart,
);

// @route   DELETE api/cart/:id
// @desc    Delete an Product from Cart
// @access  Private
routes.delete(
  '/cart/:id',
  passport.authenticate('jwt', { session: false }),
  CartController.removeProductFromCart,
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
// @desc    Delete an Product
// @access  Private
routes.delete(
  '/products/:id',
  passport.authenticate('jwt', { session: false }),
  ProductController.destroy,
);

/*
================================================================================
================================================================================
============================== COMMENTS ROUTES =================================
================================================================================
================================================================================
*/

// @route   GET api/:id/comments
// @desc    GET Product's Comments
// @access  Public
routes.get('/:id/comments', CommentController.getComments);

// @route   POST api/:id/comments
// @desc    Create Product's Comment
// @access  Private
routes.post(
  '/:id/comments',
  passport.authenticate('jwt', { session: false }),
  CommentController.addComment,
);

// @route   PUT api/:id/comments/:commentId
// @desc    Update Product's Comment
// @access  Private
routes.put(
  '/:id/comments/:commentId',
  passport.authenticate('jwt', { session: false }),
  CommentController.updateComment,
);

// @route   Delete api/:id/comments
// @desc    Delete Product's Comment
// @access  Private
routes.delete(
  '/:id/comments/:commentId',
  passport.authenticate('jwt', { session: false }),
  CommentController.deleteComment,
);

/*
================================================================================
================================================================================
================================ RATES ROUTES ==================================
================================================================================
================================================================================
*/

// @route   GET api/:id/rates
// @desc    GET Product's Rates
// @access  Public
routes.get('/:id/rates', RateController.getRate);

// @route   POST api/:id/rates
// @desc    Create Product's Rate
// @access  Private
routes.post('/:id/rates', passport.authenticate('jwt', { session: false }), RateController.addRate);

// @route   PUT api/:id/rates
// @desc    Update Product's Rate
// @access  Private
routes.put(
  '/:id/rates/:rateId',
  passport.authenticate('jwt', { session: false }),
  RateController.updateRate,
);

// @route   Delete api/:id/rates
// @desc    Delete Product's Rate
// @access  Private
routes.delete(
  '/:id/rates/:rateId',
  passport.authenticate('jwt', { session: false }),
  RateController.unRate,
);

module.exports = routes;
