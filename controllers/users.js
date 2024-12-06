const User = require('../models/user');

module.exports.renderLogin = (req, res) => {
  res.render('users/login')
}

module.exports.login = async (req, res) => {
  req.flash('success', 'Welcome back!');
  const redirectUrl = res.locals.returnTo || '/campgrounds';
  delete req.session.returnTo;
  res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    req.flash('success', 'Goodbye 👋')
    res.redirect('/campgrounds')
  })
}