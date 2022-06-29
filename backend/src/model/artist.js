const mongoose = require('mongoose');

const ArtistSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  artistName: String,
  otherInfo: String
})

module.exports = mongoose.model('Artist', ArtistSchema);
