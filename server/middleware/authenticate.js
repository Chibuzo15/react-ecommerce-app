var {User} = require('../models/user');
const {Customer} = require('../models/customer');

var authenticate = (req, res, next) => {
    var token = req.header('x-auth');

    User.findByToken(token).then((user) => {
        if(!user){
            return Promise.reject();
        }

        req.user = user;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).send()
    });
};

var customerAuth = (req, res, next) => {
    var token = req.header('x-auth');

    Customer.findByToken(token).then((customer) => {
        if(!customer){
            return Promise.reject();
        }

        req.customer = customer;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).send()
    });
};

module.exports = {authenticate, customerAuth}