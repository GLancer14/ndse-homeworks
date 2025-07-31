const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user");
const booksRoutes = require("./routes/books");
const error404 = require("./middleware/404");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

app.use("/api/user", userRoutes);
app.use("/api/books", booksRoutes);
app.use(error404);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App is listening on a port ${PORT}`));