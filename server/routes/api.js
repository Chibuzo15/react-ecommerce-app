const express = require('express');
const mongoose = require('mongoose');

// const session = require('express-session')
const router = express.Router();
// const paystack = require('paystack')('sk_test_e3920dc537d3187f8696a77641f39fa873fb3da4');

const _ = require('lodash')

const Product = require('../models/product');
const { Cart } = require('../models/cart');
const { User } = require('../models/user');
const { Customer } = require('../models/customer');
const Order = require('../models/order');
const Image = require('../models/image');
const Orderdetails = require('../models/order_details')

const { authenticate, customerAuth } = require('../middleware/authenticate');

// import multer and the AvatarStorage engine
var path = require('path');
const multer = require('multer');
const ProductImageStorage = require('../helpers/ProductImageStorage');
require('../config/config');

// setup a new instance of the ProductImageStorage engine
var storage = ProductImageStorage({
  portrait: true,
  // square: true,
  responsive: true,
  // greyscale: true,
  quality: 90
});

var limits = {
  files: 1, // allow only 1 file per request
  fileSize: 1024 * 1024, // 1 MB (max file size)
};

var fileFilter = function (req, file, cb) {
  // supported image file mimetypes
  var allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'];

  if (_.includes(allowedMimes, file.mimetype)) {
    // allow supported image files
    cb(null, true);
  } else {
    // throw error for invalid files
    cb(new Error('Invalid file type. Only jpg, png and gif image files are allowed.'));
  }
};

// setup multer
var upload = multer({
  storage: storage,
  limits: limits,
  fileFilter: fileFilter
});


/**
 * ROUTES BEGIN
 *
 */

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

    // const image = new Image({
    //   _id: req.body.image_id, //get from req
    //   url: 'http://testurl.com',
    // });
    const product = new Product({
      AvailableSizes: [],
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image_id //Get the id from the image
    });

    product.save()
      .then(data => {
        res.json(data)
        // image.save()
        //   .then((data) => {
        //     res.json(data)
        //   })
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
  // console.log('logout router')
  req.customer.removeToken(req.token).then(() => {
    res.status(200).send()
  }, () => {
    res.status(400).send()
  })
})

/*
 ORDER API

*/

router.post('/add-order', customerAuth, (req, res, next) => {
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
  const order = Order.find({
    customer_id: req.customer._id
  })
  order.
    populate({
      path: 'orderdetails',
      populate: {
        path: 'product_details.id'
      }
    })
    // .deepPopulate('orderdetails.order_id')
    .then((result) => {
      res.send(result)
    }).catch((err) => {
      console.log(err)
      res.send(err)
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
    }).catch((err) => {
      res.status(500).send(err)
    })

})

router.get('/remove-from-cart/:id', (req, res) => {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId)
    .then((product) => {
      cart.remove(product._id)
      req.session.cart = cart;

      res.send(cart)
    }).catch((err) => {
      res.status(500).send(err)
    })

})

router.get('/get-cart', (req, res) => {
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  res.send({
    totalQty: cart.totalQty,
    totalPrice: cart.totalPrice,
    items: cart.generateArray()
  })
})

router.get('/clear-cart', (req, res) => {
  req.session.cart = null;
  res.send()
})


/*
UPLOAD
*/

router.post('/upload-image', upload.single('product_image'), function (req, res, next) {
  var files;
  var file = req.file.filename;
  var matches = file.match(/^(.+?)_.+?\.(.+)$/i);

  if (req.file) {
    console.log(matches[1] + '--.' + matches[2])
    if (matches) {
      files = _.map(['lg', 'md', 'sm'], function (size) {
        return matches[1] + '_' + size + '.' + matches[2];
      });
    } else {
      files = [file];
    }

    files = _.map(files, function (file) {
      var port = req.app.get('port');
      var base = req.protocol + '://' + req.hostname + (port ? ':' + port : '');
      var url = path.join(req.file.baseUrl, file).replace(/[\\\/]+/g, '/').replace(/^[\/]+/g, '');

      return (req.file.storage == 'local' ? base : '') + '/' + url;
    });

    let modBaseUrl = req.file.baseUrl.replace('uploads', '')

    const image = new Image({
      _id: new mongoose.Types.ObjectId(), //get from req
      url: path.join(modBaseUrl, matches[1] + '--.' + matches[2])
    });

    image.save()
      .then(() => {
        res.json({
          image_id: image._id,
          url: path.join(modBaseUrl, matches[1] + '--.' + matches[2])
        });
      })
      .catch((error) => {
        res.status(400).send(error)
      })

  }
  else {
    res.status(400).send()
  }
});


module.exports = router;