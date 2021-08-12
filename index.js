const catalog = document.querySelector(".catalog");

let myLibrary = [];

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

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayLibrary() {
  myLibrary.forEach(function (book) {
    let newBook = document.createElement("div");
    let title = document.createElement("h3");
    let author = document.createElement("h3");
    let pages = document.createElement("h3");

    newBook.classList.add("book");
    title.textContent = `"${book.title}"`;
    author.textContent = book.author;
    pages.textContent = book.pages;

    newBook.appendChild(title);
    newBook.appendChild(author);
    newBook.appendChild(pages);
    catalog.appendChild(newBook);
  });
}

function toggleAddNewBook() {}

// Temporary code: manually adding some books
addBookToLibrary(
  new Book("21 Lessons for the 21st Century", "Yuval Noah Harari", 300, true)
);
addBookToLibrary(new Book("Sapiens", "Yuval Noah Harari", 300, true));
addBookToLibrary(new Book("Factfulness", "Hans Rosling", 300, true));

window.onload = () => {
  displayLibrary();
};
