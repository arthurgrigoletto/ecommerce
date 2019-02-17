/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

const Product = require('../../models/entity/Product');

const getRate = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  return res.json(product.rates);
};

const addRate = (req, res) => {
  const { id: userId } = req.user;
  const { id: productId } = req.params;
  const { rating } = req.body;

  Product.findById(productId)
    .then((product) => {
      if (product.rates.filter(rate => rate.user.toString() === userId).length > 0) {
        return res.status(400).json({ alreadyrated: 'User already rated this product' });
      }

      // Add user id and user rate to rates array
      product.rates.unshift({ user: userId, rating });

      return product.save().then(prod => res.json(prod));
    })
    .catch(() => res.status(404).json({ productnotfound: 'No Product Found' }));
};

const generalMethod = (typeMethod, req, res) => {
  const { id: productId, rateId } = req.params;
  const { _id: userId } = req.user;
  const { rate: newRate } = req.body;

  return Product.findById(productId)
    .then((product) => {
      if (product.rates.filter(comment => comment._id.toString() === rateId).length === 0) {
        return res.status(404).json({ commentnotexists: 'Comment does not exist' });
      }

      // Get remove index
      const rateIndex = product.rates.map(item => item._id.toString()).indexOf(rateId);

      // Check if user is the same
      if (product.rates[rateIndex].user.toString() !== userId.toString()) {
        return res.status(405).json({ notallowed: 'You can only delete your rates' });
      }

      switch (typeMethod) {
        case 'delete':
          // Splice comment out of array
          product.rates.splice(rateIndex, 1);
          break;
        case 'put':
          product.rates[rateIndex].text = newRate;
          break;
        default:
          break;
      }

      // Save
      return product.save().then(prod => res.json(prod));
    })
    .catch(() => res.status(404).json({ productnotfound: 'No Product Found' }));
};

const updateRate = (req, res) => generalMethod('put', req, res);

const unRate = (req, res) => generalMethod('delete', req, res);

module.exports = {
  getRate,
  addRate,
  updateRate,
  unRate,
};
