let myLibrary = [];

// Temporary code: manually adding some books
myLibrary.push(
  new Book("21 Lessons for the 21st Century", "Yuval Noah Harari", 300, true)
);
myLibrary.push(new Book("Sapiens", "Yuval Noah Harari", 300, true));
myLibrary.push(new Book("Factfulness", "Hans Rosling", 300, true));

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.info = info;
  function info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.isRead ? "read" : "not read yet"
    }`;
  }
}

function addBookToLibrary(book) {}

function displayLibrary() {}
