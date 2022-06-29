const Painting = require('../../model/painting');
module.exports = require('../base')(Painting, require('../../auth/defaultacces'));