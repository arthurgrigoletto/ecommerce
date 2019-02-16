/* eslint func-names: ["error", "never"] */

require('dotenv').config();
const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: String,
  key: String,
  cpf: {
    type: String,
    required: true,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  cart: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Products',
      },
      image: {
        type: String,
      },
      name: {
        type: String,
      },
      price: {
        type: Number,
      },
    },
  ],
  birthday: {
    type: Date,
  },
});

UserSchema.pre('save', function () {
  if (!this.avatar) {
    this.avatar = `${process.env.APP_URL}/files/${this.key}`;
  }
});

module.exports = mongoose.model('Users', UserSchema);
