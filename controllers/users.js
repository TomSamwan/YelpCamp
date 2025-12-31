const User = require("../models/user");

module.exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username });

    const registeredUser = await User.register(user, password);
    req.login(registeredUser, () => {
      req.flash("success", "Welcome to Yelp Camp!");
      res.redirect("/campgrounds");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/login");
  }
};

module.exports.renderLogin = (req, res) => {
  console.dir(req.session)
  res.render("users/login");
};

module.exports.login = (req, res) => {
  const { username } = req.body;
  req.flash("success", `Welcome back ${username}!`);
  const redirectUrl = res.locals.returnTo || "/campgrounds";
  delete res.locals.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    err && next(err);
    req.flash("success", "Goodbye 👋");
    res.redirect("/campgrounds");
  });
};
