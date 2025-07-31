const Book = require("./Book");

module.exports = [
  new Book({
    title: "Мёртвые души",
    description: "",
    authors: "Н. В. Гоголь",
    favorite: true,
    fileCover: "",
    fileName: "",
    fileBook: "dead-souls.txt",
  }),
  new Book({
    title: "Мастер и Маргарита",
    description: "",
    authors: "М. А. Булгаков",
    favorite: false,
    fileCover: "",
    fileName: "",
    fileBook: "the-master-and-margarita.txt",
  }),
  new Book({
    title: "Отцы и дети",
    description: "",
    authors: "И. С. Тургенев",
    favorite: true,
    fileCover: "",
    fileName: "",
    fileBook: "fathers-and-sons.txt",
  }),
];