const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const users = require("../controllers/users");
const passport = require("passport");
const { storeReturnTo } = require("../middleware");

router.post("/register", storeReturnTo, catchAsync(users.register));

router
  .route("/login")
  .get(storeReturnTo, users.renderLogin)
  .post(
    storeReturnTo,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    users.login
  );

router.get("/logout", users.logout);

module.exports = router;
