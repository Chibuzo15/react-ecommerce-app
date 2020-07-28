const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// deep population
const deepPopulate = require('mongoose-deep-populate')(mongoose);

//create schema for todo
const OrderDetails_Schema = new Schema({
  product_details: [{
    id: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }, quantity: String
  }],
  order_id: {
    type: Schema.Types.ObjectId,
    ref: 'Order'
  },
  total_price: Number

}, { toJSON: { virtuals: true } })

OrderDetails_Schema.plugin(deepPopulate);

//create model for todo
const OrderDetails = mongoose.model('OrderDetails', OrderDetails_Schema);

module.exports = OrderDetails;