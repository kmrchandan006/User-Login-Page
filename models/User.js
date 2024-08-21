const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  mobile: String,
  email: String,
  street: String,
  city: String,
  state: String,
  country: String,
  username: String,
  password: String,
});


const User = mongoose.model('User', userSchema);

module.exports = User;
