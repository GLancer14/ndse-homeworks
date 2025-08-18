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
      const { book } = JSON.parse(rawData);
      const request = http.request({
        hostname: process.env.COUNTER_URL,
        port: 3001,
        path: `/counter/${req.params.id}/incr`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }, apiRes => {
        let data = "";
        apiRes.on("data", chunk => {
          data += chunk;
        });
        apiRes.on("end", () => {
          console.log(`Book ${book.title} has been viewed ${data} times`);
          res.render("../views/books/view", {
            book,
            viewsCount: data,
            title: "Книги",
            user: req.user,
          });
        });
      }).on("error", e => {
        console.error(e);
      });
  
      request.end();
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
        user: req.user,
      });
    });
  }).on("error", e => {
    console.log(e);
  });
});

router.get("/book/add", (req, res) => {
  res.render("../views/books/create", { user: req.user });
});

module.exports = router;