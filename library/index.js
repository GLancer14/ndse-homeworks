const express = require("express");
const dotenv = require("dotenv");
const methodOverride = require("method-override");
const indexRoutes = require("./routes/index");
const booksRoutes = require("./routes/books");
const userRoutes = require("./routes/user");
const booksApiRoutes = require("./routes/booksApi");
const error404 = require("./middleware/404");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

dotenv.config();

app.use("/", indexRoutes);
app.use("/books", booksRoutes);
app.use("/api/user", userRoutes);
app.use("/api/books", booksApiRoutes);
app.use(error404);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App is listening on a port ${PORT}`));