const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const methodOverride = require("method-override");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const indexRoutes = require("./routes/index");
const booksRoutes = require("./routes/books");
const userRoutes = require("./routes/user");
const booksApiRoutes = require("./routes/booksApi");
const error404 = require("./middleware/404");

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

app.use("/", indexRoutes);
app.use("/books", booksRoutes);
app.use("/api/user", userRoutes);
app.use("/api/books", booksApiRoutes);
app.use(error404);

async function start(PORT, DBURL) {
  try {
    await mongoose.connect(DBURL);
    app.listen(PORT, () => console.log(`App is listening on a port ${PORT}`));
  } catch(e) {
    console.log(e)
  }
}

const PORT = process.env.PORT || 3000;
const DBURL = process.env.DBURL;
start(PORT, DBURL)