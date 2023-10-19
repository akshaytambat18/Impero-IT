const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const router = require("./routes/authRoutes.js");
const taskRouter = require('./routes/taskRoutes.js');
const mongoURI = 'mongodb://127.0.0.1:27017/imperoDB';
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));


// MongoDB Connection
mongoose.connect(mongoURI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());
app.use('/',router);

//Ejs Setup 
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Task Related Routes
app.use('/tasks/', taskRouter);

// Route to Render the Login Page
app.get('/login', (req, res) => {
  res.render('login'); 
});

// Route to Render the Register Page
app.get('/register', (req, res) => {
  res.render('registerUser'); 
});

// Route to Render the Dashboard Page
app.get('/dashboard', (req, res) => {
  res.render('dashboard'); 
});

const jwt = require('jsonwebtoken');

// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
