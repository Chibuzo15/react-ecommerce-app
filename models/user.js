const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define your User Collection Objects Structure
//With datatypes
//We'll be using Auth0 for authentication in the future.
const user = new Schema({
    //THis is where the user will login
    //For Now we will be inserting test data
    name: {
        type: String,
        required: true
      },
    email: {
        type: String,
        required: true
      },
    username: String,
    auth0_id: String
    });

//create model for todo
const User = mongoose.model('user', user);
 
module.exports = User;