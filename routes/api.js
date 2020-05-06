const express = require ('express');
const router = express.Router();

const Product = require('../models/product');
const User = require('../models/user');
const Customer = require('../models/customer');
const Order = require('../models/order');
const Image = require('../models/image');
const Orderdetails = require('../models/order_details')

/*
 PRODUCT API

*/

router.get('/products', (req, res, next) => {
  Product.find({})
    .then(data => res.json(data))
    .catch(next)
});

router.post('/products', (req, res, next) => {
  if(req.body.name){
    Product.create(req.body)
      .then(data => res.json(data))
      .catch(next)
  }else {
    res.json({
      error: "The input field is empty"
    })
  }
});

router.patch('/products/:id', (req, res, next) => {
  if(req.body){
    Product.findOneAndUpdate({"_id": req.params.id}, req.body , {new : true})
      .then((data) => {
        res.json(data)
      })
      .catch((err) => {
        res.json(err)
      })
  }else {
    res.json({
      error: "The input field is empty"
    })
  }
})

router.delete('/products/:id', (req, res, next) => {
  Product.findOneAndDelete({"_id": req.params.id})
    .then(data => res.json(data))
    .catch(next)
})

/*
 USER API

*/

router.post('/users', (req, res, next) => {
  //if name object is present in request body
  console.log('In post router')
  if(req.body.name){
    User.create(req.body)
      .then(data => res.json(data))
      .catch(next)
  }else {
    res.json({
      error: "The input field is empty"
    })
  }
});

router.get('/users', (req, res, next) => {
  User.find({})
    .then(data => res.json(data))
    .catch(next)
})

/*
 CUSTOMER API

*/
router.post('/customers', (req, res, next) => {
  if(req.body){
    Customer.create(req.body)
      .then((data) => res.json(data))
      .catch((error) => {
        console.log(error)
      })
  }else{
    res.json({
      error: 'Input field is empty'
    })
  }
});

router.get('/customers', (req, res, next) => {
  Customer.find({})
  .then(data => res.json(data))
  .catch(next)
});

module.exports = router;