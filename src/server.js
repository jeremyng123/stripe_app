require('dotenv').config({path:__dirname+'/../.env'});
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 7000;

// mongoose db
const mongoose = require('mongoose');
const url = process.env.REACT_APP_MONGOOSE_URL + '/proccoli';

mongoose.connect(url, { useNewUrlParser: true , useUnifiedTopology: true });
const db = mongoose.connection;

let _stripe = require('./backend/stripe_related')
db.once('open', _ => {
  console.log('Database connected:', url);
});

db.on('error', err => {
  console.error('connection error:', err);
});
//enable cors
app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// app.use(cookieParser());

/** stripe related components */
//generate payment request for a card payer
app.post('/stripe', _stripe._stripe);

//handle payment confirmations
app.post('/confirm-payment', _stripe.confirm_payment);

/** File related endpoints */
app.post('/file/:file_id', _stripe.retrieve_file);

/** Account related endpoints */
app.post('/account/register');
  
app.listen(port, () => console.log(`server running on port ${port}`))