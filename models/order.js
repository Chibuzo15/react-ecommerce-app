const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for todo
const ProductSchema = new Schema({
  customer_id: { type: Schema.Types.ObjectId, ref: 'product' },
  order_date: { type: Date, default: Date.now },
  order_status: String
})

//create model for todo
const Product = mongoose.model('product', ProductSchema);

module.exports = Product;