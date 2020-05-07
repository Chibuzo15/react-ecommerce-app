const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/api');
const path = require('path');
// require('dotenv').config();
require('./config/config')

const app = express();

const port = process.env.PORT || 5000;

//connect to the database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully`))
  .catch(err => console.log(err));

//since mongoose promise is depreciated, we overide it with node's promise
mongoose.Promise = global.Promise;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());



app.use((err, req, res, next) => {
  console.log(err);
  next();
});

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});