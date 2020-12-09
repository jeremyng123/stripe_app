module.exports('address', {
  city: {
    type: String,
    default: 'Singapore',
    required: true
  },
  country: {
    type: String,
    default: 'SG',
    required: true
  },
  line1: String,
  line2: String,
  postal_code: String,
  state: String
})