const bcrypt = require("bcryptjs");
const User = require("../models/User");


// Function to handle login or registration
exports.loginOrRegister = async (req, res) => {
  console.log("Request body:", req.body);
  const { loginUser, password } = req.body;


  try {
    const foundUser = await User.findOne({ username: loginUser });

    if (foundUser) {
      const isMatch = await bcrypt.compare(password, foundUser.password);
      if (isMatch) {
        return res.json({
          success: true,
          message: "Login successful",
          user: foundUser,
        });
      } else {
        return res.json({ success: false, message: "Invalid password" });
      }
    } else {

      // User does not exist, proceed with registration
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ ...req.body, password: hashedPassword });

      await newUser.save();
      return res.json({
        success: true,
        message: "Registration successful",
        user: newUser,
      });
    }
  } catch (err) {
    console.error("Error:", err.message);
    return res.json({
      success: false,
      message: "Error connecting to the database",
    });
  }
};




// Function to get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.render('UserTable', { users }); // Render the UserTable view with user data
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).send("Server Error");
  }
};

 
