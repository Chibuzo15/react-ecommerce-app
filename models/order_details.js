const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for todo
const OrderDetails_Schema = new Schema({
  product_details: {},
  order_id: {
    type: Schema.Types.ObjectId,
    ref: 'Order'
  },
  total_price: Number
  
})

//create model for todo
const OrderDetails = mongoose.model('OrderDetails', OrderDetails_Schema);

module.exports = OrderDetails;