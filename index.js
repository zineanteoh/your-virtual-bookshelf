const existingLibrary = JSON.parse(localStorage.getItem("library"));
let library = existingLibrary || [];

const catalog = document.querySelector(".catalog");
const popup = document.querySelector(".add-button");
const overlay = document.querySelector(".overlay");

let bookToRemove;
let isEmptySelf;

// Resize text font to fit book titles inside their respective container
const isOverflown = ({ clientHeight, scrollHeight, clientWidth, scrollWidth }) => scrollHeight > clientHeight || scrollWidth > clientWidth;
const resizeText = ({ element, elements, minSize = 3, maxSize = 26, step = 1 }) => {
  (elements || [element]).forEach((el) => {
    let i = minSize;
    let overflow = false;

    while (!overflow && i < maxSize) {
      el.style.fontSize = `${i}px`;
      overflow = isOverflown(el);

      if (!overflow) i += step;
    }

    el.style.fontSize = `${i - step}px`;
  });
};

overlay.addEventListener("click", toggleOverlayAndClearWindow);
popup.addEventListener("click", togglePopup);
document.addEventListener("keydown", (event) => {
  if (!overlay.classList.contains("hidden")) {
    if (event.key == "Escape") {
      toggleOverlayAndClearWindow();
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
  resizeText({
    elements: document.querySelectorAll(".book > h3:first-child"),
    step: 0.5,
  });
}

function addBookToLibrary(book) {
  if (isEmptySelf) {
    isEmptySelf = false;
    document.querySelector(".empty-shelf").classList.add("hidden");
  }
  library.push(book);
  catalog.appendChild(createBookElement(book));
  resizeText({
    elements: document.querySelectorAll(".book > h3:first-child"),
    step: 1,
  });
  localStorage.setItem("library", JSON.stringify(library));
}

function removeBook() {
  toggleOverlayAndClearWindow();
  // removes bookToRemove from page
  let childIndex = getChildIndex(bookToRemove);
  bookToRemove.remove();

  library.splice(childIndex, 1);
  localStorage.setItem("library", JSON.stringify(library));

  if (library.length == 0) {
    isEmptySelf = true;
    document.querySelector(".empty-shelf").classList.remove("hidden");
  }
}

function processBook() {
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#pages").value;
  let isRead = document.querySelector("#status").checked;
  addBookToLibrary(new Book(title, author, pages, isRead));
  clearWindow();
  toggleOverlayAndClearWindow();
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
  remove.addEventListener("click", (event) => {
    toggleAlert();
    bookToRemove = event.target.parentNode;
    if (bookToRemove.classList.contains("remove-book")) {
      bookToRemove = bookToRemove.parentNode;
    }
  });

  // Read button
  let toggleRead = document.createElement("div");
  toggleRead.classList.add("toggle-read");

  newBook.appendChild(title);
  newBook.appendChild(author);
  // newBook.appendChild(pages);
  newBook.appendChild(remove);
  return newBook;
}

function getChildIndex(childNode) {
  let i = 0;
  while ((childNode = childNode.previousSibling) != null) {
    i++;
  }
  return i;
}

function clearWindow() {
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#pages").value = "";
  document.querySelector("#status").checked = false;
}

function toggleAlert() {
  toggleOverlayAndClearWindow();
  document.querySelector(".alert").classList.toggle("hidden");
}

function togglePopup() {
  toggleOverlayAndClearWindow();
  document.querySelector(".popup").classList.toggle("hidden");
}

function toggleOverlayAndClearWindow() {
  document.querySelector(".overlay").classList.toggle("hidden");
  document.querySelector(".alert").classList.add("hidden");
  document.querySelector(".popup").classList.add("hidden");
}

if (library.length != 0) {
  displayLibrary();
} else {
  isEmptySelf = true;
  document.querySelector(".empty-shelf").classList.remove("hidden");
}
