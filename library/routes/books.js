const express = require("express");
const http = require("http");
const router = express.Router();

router.get("/:id", (req, res) => {
  const { id } = req.params;

  http.get(`http://localhost:3000/api/books/${id}`, apiRes => {
    if (apiRes.statusCode !== 200) {
      throw new Error("Request error");
    }

    apiRes.setEncoding("utf-8");
    let rawData = "";
    apiRes.on("data", chunk => {
      rawData += chunk;
    });
    apiRes.on("end", () => {
      const parsedData = JSON.parse(rawData);
      res.render("../views/books/view", {
        book: parsedData.book,
        viewsCount: parsedData.viewsCount,
        title: "Книги",
      });
    });
  }).on("error", e => {
    console.log(e);
  });
});

router.get("/book/update/:id", (req, res) => {
  const { id } = req.params;

  http.get(`http://localhost:3000/api/books/${id}`, apiRes => {
    if (apiRes.statusCode !== 200) {
      throw new Error("Request error");
    }

    apiRes.setEncoding("utf-8");
    let rawData = "";
    apiRes.on("data", chunk => {
      rawData += chunk;
    });
    apiRes.on("end", () => {
      const parsedData = JSON.parse(rawData);
      res.render("../views/books/update", {
        book: parsedData.book,
        title: "Книги",
      });
    });
  }).on("error", e => {
    console.log(e);
  });
});

router.get("/book/add", (req, res) => {
  res.render("../views/books/create");
});

module.exports = router;