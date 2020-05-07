const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

//Define your User Collection Objects Structure
//With datatypes
//We'll be using Auth0 for authentication in the future.
const UserSchema = new Schema({
    //THis is where the user will login
    //For Now we will be inserting test data
    name: {
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
        trim: true,
        required: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail
            },
            message: '{VALUE} is not a valid email'
        },
    username: String,
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
    });

    UserSchema.methods.toJSON = function(){
      var user = this;
      var userObject = user.toObject();
  
      return _.pick(userObject, ['_id', 'email'])
    }
  
  UserSchema.methods.generateAuthToken = function(){
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
  
  UserSchema.methods.removeToken = function (token){
      var user = this;
  
      return user.update({
          $pull:{
              tokens: {
                  token
              }
          }
      })
  }
  
  UserSchema.statics.findByToken = function(token) {
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
  
  UserSchema.statics.findByCredentials = function (email, password){
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
  
  UserSchema.pre('save', function (next) {
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
const User = mongoose.model('user', UserSchema);
 
module.exports = {User};