const stripe = require('stripe')(process.env.REACT_APP_STRIPE_TEST_SECRET_KEY);

/**
 * Creation of STRIPE Object
 */
exports.create_account = async (req,res) => {
  account = await stripe.accounts.create({
    type: 'custom',
    country: 'SG', // forcibly SG for now
    email: req.body.email,
    capabilities: {
      ...req.body.capabilities, // if there are any capabilities, add it in
      card_payments: {requested: true},
      transfers: {requested: true}
    },
    business_type: req.body.business_type,    // default: company
    business_profile: req.body.business_profile,
    company: req.body.company
  })
}

/**
 * Retrieval of STRIPE Object
 */
exports.retrieve_account = async (req,res) =>{
  account = await stripe.accounts.retrieve(
    req.params.account_id
  )
  res.json(account);
}

exports.retrieve_person = async (req,res) =>{
  person = await stripe.accounts.retrievePerson(
    req.params.account_id,
    req.params.person_id
  )
  res.json(person);
}

exports.retrieve_file = async (req,res) =>{
  file = await stripe.files.retrieve(
    req.params.file_id
  )
  res.json(file);
}

exports._stripe = async (req,res) => {
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
}

exports.confirm_payment = async (req,res) => {
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
}

exports.create_stripe_account = async(req, res) => {
  return account = await stripe.accounts.create({
    type: 'custom',
    
  })
}