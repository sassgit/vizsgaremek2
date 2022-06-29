const mongoose = require('mongoose');

const PaintingSchema = mongoose.Schema({
  artist: {
    type: mongoose.Types.ObjectId,
    ref: 'Artist'
  },
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  otherInfo: String,
  photos: {
    type: [{ type: mongoose.Types.ObjectId, ref: 'Photo'}]
  },
  count: {
    type: Number,
    required: true,
    default: 1
  },
  stock: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
  }
})

const model = mongoose.model('Painting', PaintingSchema);

model.populateOne = ['artist', 'photos'];
model.populateAll = 'artist';

module.exports = model;
