/* eslint func-names: ["error", "never"] */

require('dotenv').config();
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  price: {
    type: Number,
    default: 0,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  banner: String,
  key: String,
  rates: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
      },
      rating: {
        type: Number,
        default: 0,
        max: 5,
      },
    },
  ],
  average: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      commentedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

ProductSchema.pre('save', function () {
  if (!this.banner) {
    this.banner = `${process.env.APP_URL}/files/${this.key}`;
  }

  if (this.rates.length > 0) {
    const ratings = this.rates.map(rate => rate.rating);
    const total = ratings.reduce((prev, curr) => prev + curr, 0);

    const average = total / ratings.length;

    this.average = average;
  }
});

ProductSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Products', ProductSchema);
