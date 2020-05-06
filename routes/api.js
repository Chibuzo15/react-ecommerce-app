const express = require ('express');
const mongoose = require('mongoose');
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
    .populate('image')
    .then(data => res.json(data))
    .catch(next)
});

router.get('/products/:id', (req, res, next) => {
  Product.findOne({"_id": req.params.id})
    .populate('image')
    .then((product) => {
      res.json(product)
    })
    .catch((error) => {
      res.send({error})
    })
});

router.post('/products', (req, res, next) => {
  if(req.body){
    
    const image = new Image({
      _id: new mongoose.Types.ObjectId(),
      url: 'http://testurl.com',
    });
    const product = new Product({
      AvailableSizes: [],
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: image._id //Get the id from the image
    });
 
    product.save()  
      .then(data => {
        res.json(data)
        image.save()
          .then((data) => {
            res.json(data)
          }) 
        })
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
    var user = new User(req.body);
    user.save()
      .then(data => res.json(data))
      .catch(next)
    // User.create(req.body)
    //   .then(data => res.json(data))
    //   .catch(next)
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

/*
 ORDER API

*/

router.post('/orders', (req, res, next) => {
  const order = new Order({
    customer_id : '5eb2d34119a3d42094706b10',// get this from react frontend
    order_status : 'processing' //get this from react
  })
  if(req.body){
    order.save()
      .then((data) => {
        res.json(data)
      })
      .catch((error) => {
        res.json(error)
      })
  }
  else{
    res.json({
      error: 'Input field is empty'
    })
  }
})

router.get('/orders', (req, res, next) => {
  Order.find({})
    .populate('customer_id')
    .then((data) => {
      res.json(data)
    })
    .catch((error) => {
      res.json(error)
    })
})

module.exports = router;