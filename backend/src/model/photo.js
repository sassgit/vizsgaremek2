const mongoose = require('mongoose');

const PhotoSchema = mongoose.Schema({
  storedFileName: {
    type: String,
    unique: true
  },
  alt: String,
  fileSize: Number,
})

module.exports = mongoose.model('Photo', PhotoSchema);
