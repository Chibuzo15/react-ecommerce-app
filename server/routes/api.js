const express = require ('express');
const mongoose = require('mongoose');
const router = express.Router();

const _ = require('lodash')

const Product = require('../models/product');
const {User} = require('../models/user');
const {Customer} = require('../models/customer');
const Order = require('../models/order');
const Image = require('../models/image');
const Orderdetails = require('../models/order_details')

const {authenticate, customerAuth} = require('../middleware/authenticate');

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
  var body = _.pick(req.body, ['name', 'email', 'password']);
  var user = new User(body);
  
  if(req.body){
    user.save()
      .then(() => {
        return user.generateAuthToken();
      })
      .then((token) => {
        res.header('x-auth', token).send(user);
      })
      .catch((e) => {
        res.status(400).send(e)
      })
    // User.create(req.body)
    //   .then(data => res.json(data))
    //   .catch(next)
  }else {
    res.json({
      error: "The input field is empty"
    })
  }
});

router.get('/users', authenticate, (req, res, next) => {
  User.find({})
    .then(data => res.json(data))
    .catch(next)
})

router.get('/users/me', authenticate, (req, res) => {
  res.send(req.user)
});

router.post('/users/login', (req, res) => {

  var body = _.pick(req.body, ['email', 'password']);
  
  User.findByCredentials(body.email, body.password).then((user) => {
      return user.generateAuthToken().then((token) => {
          res.header('x-auth', token).send({
            user,
            token
          });
      })
  }).catch((e) => {
      res.status(401).send({error: 'User not found'});
  });

})

router.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
      res.status(200).send()
  }, () => {
      res.status(400).send()
  })
})

/*
 CUSTOMER API

*/
router.post('/customers', (req, res, next) => {
  var body = _.pick(req.body, ['first_name', 'last_name', 'state', 'address', 'email', 'password']);
  var customer = new Customer(body)
  if(req.body){
    customer.save()
      .then(() => {
        return customer.generateAuthToken();
      })
      .then((token) => {
        res.header('x-auth', token).send(customer);
      })
      .catch((error) => {
        console.log(error)
        res.status(400).send()
      })
  }else{
    res.json({
      error: 'Input field is empty'
    })
  }
});

// router.get('/customers', (req, res, next) => {
//   Customer.find({})
//   .then(data => res.json(data))
//   .catch(next)
// });

router.get('/customers/me', customerAuth, (req, res) => {
  res.send(req.customer)
});

router.post('/customers/login', (req, res) => {

  var body = _.pick(req.body, ['email', 'password']);
  
  Customer.findByCredentials(body.email, body.password).then((customer) => {
      return customer.generateAuthToken().then((token) => {
          res.header('x-auth', token).send(customer);
      })
  }).catch((e) => {
      res.status(401).send(e);
  });

})

router.delete('/customers/me/token', customerAuth, (req, res) => {
  req.customer.removeToken(req.token).then(() => {
      res.status(200).send()
  }, () => {
      res.status(400).send()
  })
})
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