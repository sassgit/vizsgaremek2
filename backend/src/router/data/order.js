const Order = require('../../model/order');
module.exports = require('../base')(Order, require('../../auth/defaultacces'));