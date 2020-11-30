require('dotenv').config({path:__dirname+'/../.env'})
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 7000
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_TEST_SECRET_KEY);

// mongoose db
const mongoose = require('mongoose')
const url = process.env.REACT_APP_MONGOOSE_URL + '/proccoli'

mongoose.connect(url, { useNewUrlParser: true })
const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})
//enable cors
app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cookieParser());

//generate payment request for a card payer
app.post('/stripe', async (req, res) => {

  //user sends price along with request
  const userPrice = parseInt(req.body.price)*100;

  //create a payment intent
  const intent = await stripe.paymentIntents.create({
    
    //use the specified price
    amount: userPrice,
    currency: 'sgd'

  });

  //respond with the client secret and id of the new paymentintent
  res.json({client_secret: intent.client_secret, intent_id:intent.id});

})

//handle payment confirmations
app.post('/confirm-payment', async (req, res) => {

  //extract payment type from the client request
  const paymentType = String(req.body.payment_type);

  //handle confirmed stripe transaction
  if (paymentType == "stripe") {

    //get payment id for stripe
    const clientid = String(req.body.payment_id);

    //get the transaction based on the provided id
    stripe.paymentIntents.retrieve(
      clientid,
      function(err, paymentIntent) {

        //handle errors
        if (err){
          console.log(err);
        }
        
        //respond to the client that the server confirmed the transaction
        if (paymentIntent.status === 'succeeded') {

          /*YOUR CODE HERE*/  
          
          console.log("confirmed stripe payment: " + clientid);
          res.json({success: true});
        } else {
          res.json({success: false});
        }
      }
    );
  } 
  
})
  
app.listen(port, () => console.log(`server running on port ${port}`))