const mongoose = require('mongoose');
const File = require('./File');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const address = require('./address');

require('dotenv').config({path:__dirname + './../../.env'})
/**
 * The Account schema is an entity for business to come 
 * to the platform.
 * 
 * Members of this `account` falls under the Persons API
 */

const Account = new Schema({
  account_id: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true
  },
  address: address, // this address is the account's address
  fname: String,
  lname: String
}, {toJSON: {virtuals: true}})

Account.virtual('getFullName').
  get()

Account.pre('save', (next)=> {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt)=> {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, (err,hash) => {
      if (err) return next(err);
      //override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

Account.methods.comparePassword = (candidatePassword, cb) => {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports(Account);