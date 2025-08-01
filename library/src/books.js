const Book = require("./Book");

module.exports = [
  new Book({
    id: "4f813fcf-cdcc-4564-8fb9-b509948b3e7b",
    title: "Мёртвые души",
    description: "",
    authors: "Н. В. Гоголь",
    favorite: true,
    fileCover: "",
    fileName: "",
    fileBook: "dead-souls.txt",
  }),
  new Book({
    id: "e7785987-7089-4119-9069-6b7153a9dff1",
    title: "Мастер и Маргарита",
    description: "",
    authors: "М. А. Булгаков",
    favorite: false,
    fileCover: "",
    fileName: "",
    fileBook: "the-master-and-margarita.txt",
  }),
  new Book({
    id: "d7b788e9-f566-404a-bbf0-a05947eaa9c2",
    title: "Отцы и дети",
    description: "",
    authors: "И. С. Тургенев",
    favorite: true,
    fileCover: "",
    fileName: "",
    fileBook: "fathers-and-sons.txt",
  }),
];
