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
  .then(() => console.log(`Database connected successfully on Url ${process.env.MONGODB_URI}`))
  .catch(err => console.log(err));

//since mongoose promise is depreciated, we overide it with node's promise
mongoose.Promise = global.Promise;

const config = {
  origin: 'http://localhost:3000',
  credentials: true,
};

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

app.use('/api', routes);

if(process.env.NODE.ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  });
  
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
  console.log(`App environment is ${process.env.NODE_ENV}`)
});