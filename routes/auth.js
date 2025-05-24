const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const { forwardAuthenticated } = require('../middleware/isAuthenticated');

// Passport configuration
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      // Find user by email
      const user = await User.findOne({ where: { email } });
      
      // Check if user exists
      if (!user) {
        return done(null, false, { message: 'Invalid email or password' });
      }
      
      // Validate password
      const isMatch = await user.validPassword(password);
      if (!isMatch) {
        return done(null, false, { message: 'Invalid email or password' });
      }
      
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Login page route
router.get('/login', forwardAuthenticated, (req, res) => {
  res.render('login');
});

// Register page route
router.get('/signup', forwardAuthenticated, (req, res) => {
  res.render('signup');
});

// Register handle
router.post('/signup', async (req, res) => {
  const { email, password, password2 } = req.body;
  let errors = [];

  // Check required fields
  if (!email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  // Check passwords match
  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  // Check password length
  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('signup', {
      errors,
      email,
      password,
      password2
    });
  } else {
    try {
      // Check if user already exists
      const userExists = await User.findOne({ where: { email } });
      
      if (userExists) {
        errors.push({ msg: 'Email is already registered' });
        res.render('signup', {
          errors,
          email,
          password,
          password2
        });
      } else {
        // Create new user
        const newUser = await User.create({
          email,
          password
        });
        
        req.flash('success_msg', 'You are now registered and can log in');
        res.redirect('/auth/login');
      }
    } catch (err) {
      console.error(err);
      req.flash('error_msg', 'An error occurred during registration');
      res.redirect('/auth/signup');
    }
  }
});

// Login handle
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/memories',
    failureRedirect: '/auth/login',
    failureFlash: true
  })(req, res, next);
});

// Logout handle
router.get('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    req.flash('success_msg', 'You are logged out');
    res.redirect('/auth/login');
  });
});

module.exports = router;
