const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for todo
const OrderSchema = new Schema({
  customer_id: { 
    type: Schema.Types.ObjectId,
    ref: 'Customer' },
  order_date: { type: Date, default: Date.now },
  order_status: { 
    type: String,
    default : 'pending',
    enum : ['pending', 'processing', 'completed', 'cancelled']  
  }
})

//create model for todo
const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;