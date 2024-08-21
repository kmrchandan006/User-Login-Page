const bcrypt = require('bcryptjs');
const User = require('../models/User');

 
const validatePassword = (password) => {
  const regex = /^[A-Z]/; // Password must start with a capital letter
  return regex.test(password) && password.length == 6;
};

exports.loginOrRegister = async (req, res) => {
  console.log('Request body:', req.body);
  const { loginUser, password } = req.body;

  if (!validatePassword(password)) {
    return res.send('<script>alert("Password must start with a capital letter and be exactly 6 characters long."); window.location.href="/";</script>');
  }

  try {
    const foundUser = await User.findOne({ username: loginUser });

    if (foundUser) {
      const isMatch = await bcrypt.compare(password, foundUser.password);
      if (isMatch) {
        return res.render('UserTable', { user: foundUser });
      } else {
        return res.send('<script>alert("Invalid password."); window.location.href="/";</script>');
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ ...req.body, password: hashedPassword });
      await newUser.save();
      console.log('New user saved:', newUser);
      return res.render('UserTable', { user: newUser });
    }
  } catch (err) {
    console.error('Error:', err.message);
    return res.send('<script>alert("Error connecting to the database."); window.location.href="/";</script>');
  }
};
