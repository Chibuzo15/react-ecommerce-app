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
}, { toJSON: { virtuals: true } })


// Model  virtual to get orderdetails ..
// I had to populate a parent model from a child model

OrderSchema.virtual('orderdetails', {
  ref: 'OrderDetails', // The model to use
  localField: '_id', // Your local field, like a `FOREIGN KEY` in RDS
  foreignField: 'order_id', // Your foreign field which `localField` linked to. Like `REFERENCES` in RDS
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: false
});

//create model for todo
const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;