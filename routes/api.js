const express = require ('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/products', (req, res, next) => {

  //this will return all the data, exposing only the id and action field to the client
  Product.find({}, 'action')
    .then(data => res.json(data))
    .catch(next)
});

router.post('/products', (req, res, next) => {
  if(req.body.action){
    Product.create(req.body)
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