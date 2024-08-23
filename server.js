const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const User = require('./models/User'); // Import the User model

// Initialize Express app
const app = express();

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', authRoutes);

// Route to handle GET requests to /display
app.get('/display', async (req, res) => {
  try {
    const users = await User.find(); // Fetch users from the database
    res.render('UserTable', { users }); // Render the UserTable view with user data
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).send("Server Error");
  }
});

// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
