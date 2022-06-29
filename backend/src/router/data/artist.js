const Artist = require('../../model/artist');
module.exports = require('../base')(Artist, require('../../auth/defaultacces'));