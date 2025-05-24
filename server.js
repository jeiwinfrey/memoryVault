require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const { Sequelize } = require('sequelize');

// Import database and models
const db = require('./config/database');
const models = require('./models/index');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'memory-vault-secret',
  resave: false,
  saveUninitialized: false
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Flash messages
app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Routes
const authRoutes = require('./routes/auth');
const memoriesRoutes = require('./routes/memories');

app.use('/auth', authRoutes);
app.use('/memories', memoriesRoutes);

// Home route
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/memories');
  } else {
    res.render('login');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
