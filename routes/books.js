const express = require("express");
const fs = require("fs");
const Book = require("../src/Book");
const books = require("../src/books");
const fileMulter = require("../middleware/file");

const router = express.Router();

router.get("/", (req, res) => {
  res.json(books);
});

router.post("/", fileMulter.single("book"), (req, res) => {
  const newBook = new Book(req.body);
  if (req.file) {
    newBook.fileBook = req.file.filename;
  }

  books.push(newBook);
  res.status(201);
  res.json(newBook);
});

router.get("/:id", (req, res) => {
  const book = books.find(item => item.id === req.params.id);
  if (book) {
    res.json(book);
  } else {
    res.status(404);
    res.json({ message: "404 Not found" });
  }
});

router.put("/:id", fileMulter.single("book"), (req, res) => {
  const bookIndex = books.findIndex(item => item.id === req.params.id);
  if (bookIndex !== -1) {
    books[bookIndex] = {
      ...books[bookIndex],
      ...req.body,
    };
    if (req.file) {
      fs.rm(__dirname + `/../public/books/${books[bookIndex].fileBook}`, err => {
        if (err) {
          throw err;
        }
      });
      books[bookIndex].fileBook = req.file.filename;
    }

    res.json(books[bookIndex]);
  } else {
    res.status(404);
    res.json({ message: "404 Not found" });
  }
});

router.delete("/:id", (req, res) => {
  const bookIndex = books.findIndex(item => item.id === req.params.id);
  if (bookIndex !== -1) {
    fs.rm(__dirname + `/../public/books/${books[bookIndex].fileBook}`, err => {
      if (err) {
        throw err;
      }
    });
    books.splice(bookIndex, 1);
    res.json({ message: "ok" });
  } else {
    res.status(404);
    res.json({ message: "404 Not found" });
  }
});

router.get("/:id/download", (req, res) => {
  const book = books.find(item => item.id === req.params.id);
  if (book) {
    res.download(__dirname + `/../public/books/${book.fileBook}`, err => {
      if (err) {
        res.status(404);
        res.json({ message: "404 Not found" });
      }
    });
  } else {
    res.status(404);
    res.json({ message: "404 Not found" });
  }
});

module.exports = router;