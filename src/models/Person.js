const mongoose = require('mongoose');
const File = require('./File');
const Schema = mongoose.Schema;

const address = require('./address');

function getCurrentYear() {
  return new Date() / 1000 / 60 / 60 / 24 / 365;
}

const Person = new Schema({
  person_id: {
    type: String,
    unique: true,
    required: true
  },
  account: {
    type: mongoose.Types.ObjectId,
    ref: 'Account'
  },
  address: address,
  dob: {
    day: {
      type: Number,
      min: [1, '`{PATH}` cannot be less than 1'],
      max: [31, '`{PATH}` cannot exceed 31']
    }, 
    month: {
      type: Number,
      min: [1, '`{PATH}` cannot be less than 1'],
      max: [12, '`{PATH}` cannot exceed 12']
    }, 
    year: {
      type: Number,
      max: parseInt(getCurrentYear()) + 1
    }
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  first_name: String,
  last_name: String,
  metadata: {},
  phone: String,
  relationship: {
    director: {
      type: Boolean,
      default: false
    },
    executive: {
      type: Boolean,
      default: false
    },
    owner: {
      type: Boolean,
      default: false
    },
    percent_ownership: {
      type: Number,
      min: [0, '`{PATH}` ({VALUE}) cannot be less than 0'],
      max: [100.1, '`{PATH}` ({VALUE}) cannot exceed 100']
    },
    representative: {
      type: Boolean,
      default: false
    },
    title: String // i.e. Support Engineer, etc
  }
}, {toJSON: {virtuals: true}})

Person.virtual('get_DOB_in_Date').
  get(()=> {
    return new Date(this.dob.year, this.dob.month, this.dob.day, 0, 0, 0, 0);
  })

module.exports(Person);