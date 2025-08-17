const express = require("express");
const passport = require("passport");
const router = express.Router();
const Users = require("../models/users");
const authStrategy = require("../middleware/strategy");

passport.use("local", authStrategy);

passport.serializeUser((user, cb) => {
  console.log("serializing...")
  cb(null, user._id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    console.log("deserializing...")
    const user = await Users.findById(id);
    cb(null, user);
  } catch(e) {
    cb(e);
  }
});

router.get("/login", (req, res) => {
  res.render("../views/auth/login");
});

router.get("/signup", (req, res) => {
  res.render("../views/auth/signup");
});

router.get("/me", (req, res) => {
  res.status(201);
  res.json({ id: 1, mail: "test@mail.ru" });
});

router.post("/login", passport.authenticate("local", { 
  failureRedirect: "/api/user/login",
}), (req, res) => {
    console.log(req.user);
    res.redirect("/");
  }
);

router.post("/signup", (req, res) => {
  // res.status(201);
  // res.json({ id: 1, mail: "test@mail.ru" });
});

module.exports = router;