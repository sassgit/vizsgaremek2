const Painting = require('../model/painting');
const Order = require('../model/order');

const safeSum = (...values) => {
  if (values) {
    return values.reduce((prev, v) => Number.isFinite(v) ? prev + v : prev, 0);
  } else
    return 0;
}

module.exports = {
  summary: async (req, res, next) => {
    try {
      const paintings = await Painting.find({}).populate();
      const orders = await Order.find({}).populate();
      res.status(200).json({
        allPaintings: paintings.reduce((prev, p) => safeSum(prev, p.count), 0),
        stockPaintings: paintings.reduce((prev, p) => safeSum(prev, p.stock), 0),
        allPaintingsPrice: paintings.reduce((prev, p) => safeSum(prev, p.count * p.price), 0),
        stockPaintingsPrice: paintings.reduce((prev, p) => safeSum(prev, p.stock * p.price), 0),
        soldPaintings: orders.reduce((prev, o) => safeSum(prev, o.paintings.length), 0),
        soldPrice: orders.reduce((prev, o) => safeSum(prev, o.price), 0),
      });
    } catch (err) {
      res.status(501);
      res.json({
        message: 'Summary error!',
        error: err
      });
    }
  }
}