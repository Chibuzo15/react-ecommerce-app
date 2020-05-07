const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  email: {
    type: String,
    required: true,
    unique: true
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
  tokens: [{
      access: {
          type: String,
          required: true
      },
      token: {
          type: String,
          required: true
      }
  }]
})

CustomerSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email', 'state', 'address'])
}

CustomerSchema.methods.generateAuthToken = function(){
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString()

  user.tokens = user.tokens.concat([{
      access, token
  }]);
  return user.save().then(() => {
      return token;
  })
};

CustomerSchema.methods.removeToken = function (token){
  var user = this;

  return user.update({
      $pull:{
          tokens: {
              token
          }
      }
  })
}

CustomerSchema.statics.findByToken = function(token) {
  var User = this;
  var decoded; 
  
  try{
      decoded = jwt.verify(token, process.env.JWT_SECRET)
  }catch(e) {
      return Promise.reject();
  }

  return User.findOne({
      '_id' : decoded._id,
      'tokens.token': token,
      'tokens.access': 'auth'
  });
};

CustomerSchema.statics.findByCredentials = function (email, password){
  var User = this;

  return User.findOne({email}).then((user) => {
      if (!user){
          return Promise.reject();
      } 
      
      return new Promise((resolve, reject) => {
          bcrypt.compare(password, user.password, (err, res) => {
              if(res){
                  resolve(user)
              }else{
                  reject()
              }
              // console.log(user.password)
              // console.log(password)
          })
      });
  })
};

CustomerSchema.pre('save', function (next) {
  var user = this;

  if(user.isModified('password')){
      bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(user.password, salt, (err, hash) => {
                  user.password = hash
                  next(); 
              })
          })
  }else{
      next();
  }
});
//create model for todo
const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = {Customer};