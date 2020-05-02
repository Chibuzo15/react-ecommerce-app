const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for todo
const ProductSchema = new Schema({
  first_name: {
    type: String,
    required: [true, 'The product text field is required']
  },
  last_name: {
    type: String,
    required: [true, 'The product text field is required']
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  date_joined: { type: Date, default: Date.now },
})

//create model for todo
const Product = mongoose.model('product', ProductSchema);

module.exports = Product;