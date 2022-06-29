const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  role: String
})

UserSchema.plugin(require('mongoose-bcrypt'));

const model = mongoose.model('User', UserSchema);

model.populateOne = async (query) => {
  const user = await query.populate();
  delete user.password
  delete user._doc.password;
  return user;
}

model.populateAll = async (query) => {
  const users = await query.populate();
  return users.map( user => {
    delete user.password
    delete user._doc.password;
    return user;
  });
}


module.exports = model;
