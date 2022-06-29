const {editEnable, readEnable} = require('./autorization');
module.exports = {
  putEnable: editEnable,
  getOneEnable: readEnable,
  getAllEnable: readEnable,
  patchEnable: editEnable,
  deleteEnable: editEnable,
}
