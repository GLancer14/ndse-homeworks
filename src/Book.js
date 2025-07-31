const { v4: uuidv4 } = require("uuid");

class Book {
  constructor(bookObject) {
    this.id = uuidv4();
    this.title = bookObject?.title || "";
    this.description = bookObject?.description || "";
    this.authors = bookObject?.authors || "";
    this.favorite = bookObject?.favorite || false;
    this.fileCover = bookObject?.fileCover || "";
    this.fileName = bookObject?.fileName || "";
    this.fileBook = bookObject?.fileBook || "";
  }
}

module.exports = Book;