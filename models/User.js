const mongoose = require('mongoose');


const isAlphaWithSpaces = (value) => {
  return /^[A-Za-z\s]+$/.test(value);
};

const isValidStreet = (value) =>
  /^[a-zA-Z0-9\s.,-]+$/.test(value) && /[a-zA-Z]/.test(value);
const isValidMobileNo = (value) => {
  return /^[1-9][0-9]{9}$/.test(value);
};

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    validate: {
      validator: function(v) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(v);
      },
      message: props => `Password must be at least 6 characters, include one uppercase letter, one lowercase letter, one number, and one special character`
    }
  }
});



const User = mongoose.model('User', userSchema);

module.exports = User;
