/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

const User = require('../../models/entity/User');

const getProductsOnCart = (req, res) => {
  const { _id: userId } = req.user;

  User.findById(userId)
    .then(user => res.json(user.cart))
    .catch(() => res.status(404).json({ usernotfound: 'User Not Found' }));
};

const addProductToCart = (req, res) => {
  const {
    productId, image, name, price,
  } = req.body;
  const { _id: userId } = req.user;

  User.findById(userId)
    .then((user) => {
      const product = {
        product: productId,
        image,
        name,
        price,
      };

      user.cart.unshift(product);

      user.save().then(usuario => res.json(usuario));
    })
    .catch(() => res.status(404).json({ usernotfound: 'User Not Found' }));
};

const removeProductFromCart = (req, res) => {
  const { _id: userId } = req.user;
  const { id } = req.params;

  User.findById(userId).then((user) => {
    // Check if product exists
    if (user.cart.filter(product => product._id.toString() === id).length === 0) {
      return res.status(404).json({ productnotexist: 'Product does not exist' });
    }

    // Get remove index
    const productIndex = user.cart.map(item => item._id.toString()).indexOf(id);

    // Splice comment out of array
    user.cart.splice(productIndex, 1);

    // Save
    return user.save().then(usuario => res.json(usuario));
  });
};

module.exports = {
  getProductsOnCart,
  addProductToCart,
  removeProductFromCart,
};
