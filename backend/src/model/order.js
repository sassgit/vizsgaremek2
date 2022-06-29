const Artist = require('./artist');
const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
  customer: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Customer'
  },
  paintings: {
    type: [
      { 
        type: mongoose.Types.ObjectId,
        ref: 'Painting'
      }],
    required: true
  },
  remark: String,
  status: {
    type: String,
    required: true
  },
  bill: String,
  billStatus: String,
  price: {
    type: Number,
    required: true
  }
})

const model = mongoose.model('Order', OrderSchema);

model.populateOne = async (query) => {
  const retVal = await query.populate('customer').populate('paintings');
  await Promise.all(retVal.paintings.map(async (e, index) => {
    const artist = await Artist.findById(e.artist);
    if (artist)
      retVal.paintings[index].artist = artist;
  }));
  return retVal;
}
model.populateAll = 'customer';

module.exports = model;
