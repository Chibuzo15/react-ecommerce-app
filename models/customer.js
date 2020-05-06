const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for todo
const CustomerSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
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
const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;