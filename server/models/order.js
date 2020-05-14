const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for todo
const OrderSchema = new Schema({
  _id: Schema.Types.ObjectId,
  customer_id: { 
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Customer' },
  // payment_id: {
  //   type: String,
  //   required: true
  // },
  order_date: { type: Date, default: Date.now },
  order_status: { 
    type: String,
    required: true,
    default : 'pending',
    enum : ['pending', 'processing', 'completed', 'cancelled']  
  }
})

//create model for todo
const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;