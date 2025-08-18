const express = require("express");
const passport = require("passport");
const router = express.Router();
const Users = require("../models/users");
const authStrategy = require("../middleware/strategy");
const isAuth = require("../middleware/isAuth");

passport.use("local", authStrategy);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const user = await Users.findById(id);
    cb(null, user);
  } catch(e) {
    cb(e);
  }
});

router.get("/login", (req, res) => {
  res.render("../views/auth/login", { user: req.user });
});

router.get("/signup", (req, res) => {
  res.render("../views/auth/signup", { user: null });
});

router.get("/logout", (req, res) => {
  req.logout(err => {
    if (err) {
      throw err;
    }
  });
  res.redirect("/");
});

router.get("/me", isAuth, (req, res) => {
  res.render("../views/user/profile", { user: req.user });
});

router.post("/login", passport.authenticate("local", {
  failureRedirect: "/api/user/login",
  successRedirect: "/",
}));

router.post("/signup", async (req, res, next) => {
  const newUser = new Users({ ...req.body });
  try {
    await newUser.save();

    next();
  } catch(e) {
    res.status(500).json(e);
  }
}, passport.authenticate("local", {
  failureRedirect: "/api/user/login",
  successRedirect: "/",
}));

module.exports = router;