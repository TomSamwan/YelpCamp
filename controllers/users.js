const User = require("../models/user");

module.exports.renderRegister = (req, res) => {
  res.render("/register");
};

module.exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      err && next(err);
      req.flash("success", "Welcome to Yelp Camp!");
      res.redirect("/campgrounds");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("register");
  }
};

module.exports.renderLogin = (req, res) => {
  res.render("users/login");
};

module.exports.login = (req, res) => {
  const { username } = req.body;
  req.flash("success", `Welcome back ${username}!`);
  res.redirect("./campgrounds");
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    err && next(err);
    req.flash("success", "Goodbye 👋");
    res.redirect("/campgrounds");
  });
};
