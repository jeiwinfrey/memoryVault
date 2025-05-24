// Middleware to check if user is authenticated
module.exports = {
  // Ensure user is logged in
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please log in to view this resource');
    res.redirect('/auth/login');
  },
  
  // Redirect if user is already logged in
  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/memories');
  }
};
