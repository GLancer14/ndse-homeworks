const express = require("express");
const fs = require("fs");
const dotenv = require("dotenv");

const app = express();
const router = express.Router();

dotenv.config();

router.get("/counter/:bookId", (req, res) => {
  fs.readFile(__dirname + "/../volume/counter.json", { encoding: "utf-8" }, (err, data) => {
    if (err) {
      throw err;
    }

    const bookId = req.params.bookId;
    const dataParsed = JSON.parse(data);
    let viewsCount;
    if (dataParsed[bookId]) {
      viewsCount = dataParsed[bookId];
    } else {
      viewsCount = 0;
    }

    res.json(viewsCount);
  });
});

router.post("/counter/:bookId/incr", (req, res) => {
  fs.readFile(__dirname + "/../volume/counter.json", { encoding: "utf-8" }, (err, data) => {
    if (err) {
      throw err;
    }

    const bookId = req.params.bookId;
    const dataParsed = JSON.parse(data);
    if (dataParsed[bookId]) {
      ++dataParsed[bookId];
    } else {
      dataParsed[bookId] = 1;
    }

    fs.writeFile(__dirname + "/../volume/counter.json", JSON.stringify(dataParsed), { encoding: "utf-8" }, err => {
      if (err) {
        throw err;
      }

      res.json(dataParsed[bookId]);
    });
  });
});

app.use("/", router);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`App is listening on a port ${PORT}`));