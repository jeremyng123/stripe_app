const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product = new Schema({
  id: {type: String, unique: true},
  business_type: {
    type: String,
    enum: [
      'individual',
      'company',
      'non_profit',
      'government_entity'
    ]
  }
})

module.exports(Product);