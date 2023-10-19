const User = require('../modules/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Function to register a new user
exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check if the username already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    const user = await newUser.save();
    console.log(user);
    const token = jwt.sign({
      user: user._id,
      username : user.username
    },"akshayimpero")
    console.log(token);
    const successMessage = 'User Was Successfully Registered! Login Now...';
    res.render('login', { successMessage });
  

  } catch (error) {
    console.log("ERROR", error);
    return res.status(500).json({ message: 'Error registering user' });
  }
};

// Function to authenticate a user and generate a JWT
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Generate a JWT
    const token = jwt.sign({ userId: user._id }, 'akshayimpero', {
      expiresIn: '1h', // Token expiration time
    });
 
    // res.render('dashboard', { token });
    return res.status(200).json({ token });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error logging in' });
  }
};
