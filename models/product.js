const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for todo
const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, 'The product text field is required']
  },
  price: {
    type: Number,
    required: true
  },
  description: String,
  date: { type: Date, default: Date.now },
})

//create model for todo
const Product = mongoose.model('product', ProductSchema);

module.exports = Product;