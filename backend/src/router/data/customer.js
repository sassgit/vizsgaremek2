const Customer = require('../../model/customer');
module.exports = require('../base')(Customer, require('../../auth/defaultacces'));