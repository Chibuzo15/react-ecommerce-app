const express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/api');
const path = require('path');
const cors = require('cors')
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

let config = {
  origin: 'http://localhost:3000',
  credentials: true,
};

if (process.env.baseURL){
  config = {
    origin: 'https://cors-anywhere.herokuapp.com/https://protected-springs-06155.herokuapp.com',
    credentials: true,
  };
}

app.use(cors(config));

app.use((req, res, next) => {
  // res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth");
  next();
});

app.use(bodyParser.json());

app.use(session({
  secret: 'MySuperSecret',
  resave: false,
  saveUninitialized: false
}))

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

app.use('/images', express.static(path.join(__dirname,'uploads')));

app.use('/api', routes);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'))
  });
  
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});