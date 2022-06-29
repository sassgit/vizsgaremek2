const User = require('../../model/user');
const {rootEnable, readEnable} = require('../../auth/autorization');
module.exports = require('../base')(User, {
  putEnable: rootEnable,
  deleteEnable: rootEnable,
  getAllEnable: readEnable,
  getOneEnable: readEnable,
  patchEnable: rootEnable,
});