/* eslint no-param-reassign: ["error", { "props": false }] */

// Load Product Model
const Product = require('../../models/entity/Product');

const index = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    sort: '-createdAt',
  };

  const products = await Product.paginate({}, options);

  return res.json(products);
};

const show = async (req, res) => {
  let product;

  if (!req.query) {
    product = await Product.findById(req.params.id);
  } else {
    const params = Object.keys(req.query).join(' ');
    product = await Product.findById(req.params.id).select(params);
  }

  return res.json(product);
};

const store = async (req, res) => {
  const { name, description } = req.body;
  const { key, location: banner = '' } = req.file;

  const newProduct = new Product({
    name,
    description,
    key,
    banner,
  });

  return newProduct.save().then(product => res.json(product));
};

const update = async (req, res) => {
  const { name, description, price } = req.body;
  const { id } = req.params;

  return Product.findById(id).then((product) => {
    // New Banner
    if (req.file) {
      const { key, location: banner = '' } = req.file;

      product.banner = banner;
      product.key = key;
    }

    // New Name
    product.name = name || product.name;

    // New Description
    product.description = description || product.description;

    // New Price
    product.price = price || product.price;

    // Updated_at
    product.updatedAt = new Date();

    return product.save().then(prod => res.json(prod));
  });
};

const destroy = async (req, res) => {
  await Product.findByIdAndRemove(req.params.id);

  return res.json({ msg: 'Delete Success' });
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
