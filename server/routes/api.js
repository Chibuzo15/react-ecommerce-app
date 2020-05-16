const express = require('express');
const mongoose = require('mongoose');
// const session = require('express-session')
const router = express.Router();
const paystack = require('paystack')('sk_test_e3920dc537d3187f8696a77641f39fa873fb3da4');

const _ = require('lodash')

const Product = require('../models/product');
const { Cart } = require('../models/cart');
const { User } = require('../models/user');
const { Customer } = require('../models/customer');
const Order = require('../models/order');
const Image = require('../models/image');
const Orderdetails = require('../models/order_details')

const { authenticate, customerAuth } = require('../middleware/authenticate');

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
  Product.findOne({ "_id": req.params.id })
    .populate('image')
    .then((product) => {
      res.json(product)
    })
    .catch((error) => {
      res.send({ error })
    })
});

router.post('/products', (req, res, next) => {
  if (req.body) {

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

  } else {
    res.json({
      error: "The input field is empty"
    })
  }
});

router.patch('/products/:id', (req, res, next) => {
  if (req.body) {
    Product.findOneAndUpdate({ "_id": req.params.id }, req.body, { new: true })
      .then((data) => {
        res.json(data)
      })
      .catch((err) => {
        res.json(err)
      })
  } else {
    res.json({
      error: "The input field is empty"
    })
  }
})

router.delete('/products/:id', (req, res, next) => {
  Product.findOneAndDelete({ "_id": req.params.id })
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

  if (req.body) {
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
  } else {
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
    res.status(401).send({ error: 'User not found' });
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
  if (req.body) {
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
  } else {
    res.json({
      error: 'Input field is empty'
    })
  }
});

router.get('/customers/me', customerAuth, (req, res) => {
  res.send(req.customer)
});

router.post('/customers/login', (req, res) => {

  var body = _.pick(req.body, ['email', 'password']);

  Customer.findByCredentials(body.email, body.password).then((customer) => {
    return customer.generateAuthToken().then((token) => {
      res.header('x-auth', token).send({
        customer,
        token
      });
    })
  }).catch((e) => {
    res.status(401).send(e);
  });

})

router.delete('/customers/logout', customerAuth, (req, res) => {
  console.log('logout router')
  req.customer.removeToken(req.token).then(() => {
    res.status(200).send()
  }, () => {
    res.status(400).send()
  })
})

/*
 ORDER API

*/

router.post('/orders', customerAuth, (req, res, next) => {
  var productDetails = _.pick(req.body, ['products', 'price']);
  console.log(req.body)

  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
    customer_id: req.customer._id,
    order_status: req.body.order_status
  })

  const orderDetails = new Orderdetails({
    product_details: productDetails.products,
    order_id: order._id,
    total_price: productDetails.price
  })

  if (req.body) {
    order.save()
      .then((data) => {
        res.json(data)

        orderDetails.save()
          .then((data) => {
            res.send(data)
          })

          .catch((error) => {
            res.status(400).send(error)
          })
      })

      .catch((error) => {
        res.status(400).json(error)
      })
  }
  else {
    res.status(400).json({
      error: 'Input field is empty'
    })
  }
})

router.get('/orders', authenticate, (req, res, next) => {
  Order.find({})
    .populate('customer_id')
    .then((data) => {
      res.json(data)
    })
    .catch((error) => {
      res.json(error)
    })
})

router.get('/customer/orders', customerAuth, (req, res, next) => {
  Order.find({})
    .then((data) => {
      res.json(data)
    })
    .catch((error) => {
      res.json(error)
    })
})

/*
 CART
*/
router.get('/add-to-cart/:id', (req, res) => {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId)
    .then((product) => {
      cart.add(product, product._id)
      req.session.cart = cart;
      
      res.send()
    }) .catch((err) => { 
      res.status(500).send(err)
    })
    
})

router.get('/get-cart', (req, res) => {
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  
  res.send({
    totalQty: cart.totalQty, 
    totalPrice: cart.totalPrice, 
    items: cart.generateArray()})
})

router.get('/clear-cart', (req, res) => {
  req.session.cart = null;
  res.send()
})

//paystack testing

router.get('/paystack', (req, res) => {
  // paystack.plan.get('PLN_v7to6rshcbvvgg4')
  //   .then(function(error, body) {
  //       console.log(error);
  //       console.log(body);
  //       res.send(error)
  //   });

  // paystack.plan.create({
  //   name: 'API demo',
  //   amount: 10000,
  //   interval: 'monthly'
  // })
  //   .then(function(error, body) {
  //      console.log(error);
  //     console.log(body);
  //     res.send();
  //     }); 
  paystack.transaction.list({perPage: 20})
    .then(body => {
      console.log(body);
      res.send(body)
    })
    .catch(function(error) {
        console.log(error);
        res.send()
    });
})

module.exports = router;