const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Account = new Schema({
  stride_id: String,
  type: {
    type: String,
    enum: [
      'custom',
      'express',
      'standard'
    ],
    default: 'express'
  },
  name: String,
  email: String,
  phoneNumber: String,
  business_type: {
    type: String,
    enum: [
      'individual',
      'company',
      'non_profit',
      // 'government_entity'
    ]
  }
})

module.exports('Account', Account);