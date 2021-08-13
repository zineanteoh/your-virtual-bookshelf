let existingLibrary = JSON.parse(localStorage.getItem("library"));
let library = existingLibrary || [];

const catalog = document.querySelector(".catalog");
const popup = document.querySelector(".add-button");
const overlay = document.querySelector(".overlay");

overlay.addEventListener("click", togglePopup);
popup.addEventListener("click", togglePopup);
document.addEventListener("keydown", (event) => {
  if (!overlay.classList.contains("hidden")) {
    if (event.key == "Escape") {
      togglePopup();
    }
  }
});
document.querySelector(".popup-form").addEventListener("submit", (event) => {
  event.preventDefault();
});

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function displayLibrary() {
  library.forEach(function (book) {
    catalog.appendChild(createBookElement(book));
  });
}

function addBookToLibrary(book) {
  library.push(book);
  catalog.appendChild(createBookElement(book));
  localStorage.setItem("library", JSON.stringify(library));
}

function processBook() {
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#pages").value;
  let isRead = document.querySelector("#status").checked;
  addBookToLibrary(new Book(title, author, pages, isRead));
  clearWindow();
  togglePopup();
}

function createBookElement(book) {
  let newBook = document.createElement("div");
  newBook.classList.add("book");

  let title = document.createElement("h3");
  let author = document.createElement("h3");
  let pages = document.createElement("h3");
  title.textContent = book.title;
  author.textContent = book.author;
  pages.textContent = book.pages;

  let remove = document.createElement("div");
  remove.classList.add("remove-book");
  remove.innerHTML = '<i class="fas fa-times"></i>';
  remove.addEventListener("click", () => {});

  newBook.appendChild(title);
  newBook.appendChild(author);
  newBook.appendChild(pages);
  newBook.appendChild(remove);
  return newBook;
}

function clearWindow() {
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#pages").value = "";
  document.querySelector("#status").checked = false;
}

function togglePopup() {
  document.querySelector(".overlay").classList.toggle("hidden");
  document.querySelector(".popup").classList.toggle("hidden");
}

if (library.length != 0) {
  displayLibrary();
}
