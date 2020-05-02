const express = require ('express');
const router = express.Router();
const Product = require('../models/product');
const User = require('../models/user');

router.get('/products', (req, res, next) => {
  //this will return all the data, exposing only the id and action field to the client
  Product.find({})
    .then(data => res.json(data))
    .catch(next)
});

//GET for products
router.get('/users', (req, res, next) => {
  User.find({})
    .then(data => res.json(data))
    .catch(next)
})

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

//POST to add users
router.post('/users', (req, res, next) => {
  //if name object is present in request body
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

router.delete('/products/:id', (req, res, next) => {
  Product.findOneAndDelete({"_id": req.params.id})
    .then(data => res.json(data))
    .catch(next)
})

module.exports = router;