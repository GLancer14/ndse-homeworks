const LocalStrategy = require("passport-local").Strategy;
const Users = require("../models/users");

const verify = async (username, password, done) => {
  try {
    console.log("verifying...")
    const user = await Users.findOne({ username: username });
    if (!user || user.password !== password) {
      console.log("incorrect username or password")
      return done(null, false, { message: "incorrect username or password" });
    }

    return done(null, user);
  } catch(e) {
    console.log(e)
    return done(e);
  }
};

const options = {
  usernameField: "username",
  passwordField: "password",
};

module.exports = new LocalStrategy(options, verify);