const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  zip: String,
  city: String,
  streetAddress: String,
  country: String,
  email: String,
  password: String
})

module.exports = mongoose.model('Customer', CustomerSchema);
