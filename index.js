const express = require("express");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

class Book {
  constructor(bookObject) {
    this.id = uuidv4();
    this.title = bookObject?.title || "";
    this.description = bookObject?.description || "";
    this.authors = bookObject?.authors || "";
    this.favorite = bookObject?.favorite || "";
    this.fileCover = bookObject?.fileCover || "";
    this.fileName = bookObject?.fileName || "";
  }
}

const books = [
  new Book({
    title: "Мёртвые души",
    description: "",
    authors: "Н. В. Гоголь",
    favorite: "",
    fileCover: "",
    fileName: "",
  }),
  new Book({
    title: "Мастер и Маргарита",
    description: "",
    authors: "М. А. Булгаков",
    favorite: "",
    fileCover: "",
    fileName: "",
  }),
  new Book({
    title: "Отцы и дети",
    description: "",
    authors: "И. С. Тургенев",
    favorite: "",
    fileCover: "",
    fileName: "",
  }),
];

app.post("/api/user/login", (req, res) => {
  res.status(201);
  res.json({ id: 1, mail: "test@mail.ru" });
});

app.get("/api/books", (req, res) => {
  res.json(books);
});

app.post("/api/books", (req, res) => {
  const newBook = new Book(req.body);
  books.push(newBook);
  res.status(201);
  res.json(newBook);
});

app.get("/api/books/:id", (req, res) => {
  const book = books.find(item => item.id === req.params.id);
  if (book) {
    res.json(book);
  } else {
    res.status(404);
    res.json({ message: "404 Not found" });
  }
});

app.put("/api/books/:id", (req, res) => {
  const bookIndex = books.findIndex(item => item.id === req.params.id);
  if (bookIndex !== -1) {
    books[bookIndex] = {
      ...books[bookIndex],
      ...req.body,
    };
    res.json(books[bookIndex]);
  } else {
    res.status(404);
    res.json({ message: "404 Not found" });
  }
});

app.delete("/api/books/:id", (req, res) => {
  const bookIndex = books.findIndex(item => item.id === req.params.id);
  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    res.json({ message: "ok" });
  } else {
    res.status(404);
    res.json({ message: "404 Not found" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App is listening on a port ${PORT}`));