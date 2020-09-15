// Book Class : Represents a Book
class Book {
  constructor(title, Author, Reference) {
    this.title = title;
    this.Author = Author;
    this.Reference = Reference;
  }
}
// UI Class: Handle UI Tasks
class UI {
  static dispalyBooks() {
    const books = store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const List = document.querySelector("#book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.Author}</td> 
    <td>${book.Reference}</td> 
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    List.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static ShowMessgae(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");

    container.insertBefore(div, form);
    // Vanish In 3 Second
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#Author").value = "";
    document.querySelector("#Reference").value = "";
  }
}

// Store Class: Handles Storage

class store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static addBook(book) {
    const books = store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(Reference) {
    const books = store.getBooks();
    books.forEach((book, index) => {
      if (book.Reference === Reference) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

// Event: Dispaly Books

document.addEventListener("DOMContentLoaded", UI.dispalyBooks);

// Event: Add Books

document.querySelector("#book-form").addEventListener("submit", (e) => {
  // Prevent Actual Submit
  e.preventDefault();
  // Get Form Values
  const title = document.querySelector("#title").value;
  const Author = document.querySelector("#Author").value;
  const Reference = document.querySelector("#Reference").value;

  // Validate
  if (title === "" || Author === "" || Reference === "") {
    UI.ShowMessgae("Please Fill In All Fields", "danger");
  } else {
    // Instatiate Book

    const book = new Book(title, Author, Reference);

    // Add Book To Fields

    UI.addBookToList(book);

    // Add Book To Store
    store.addBook(book);

    // Successs Message
    UI.ShowMessgae("Book Added", "success");

    // clearFields

    UI.clearFields();
  }
});

// Event: Remove Books
document.querySelector("#book-list").addEventListener("click", (e) => {
  UI.deleteBook(e.target);

  // Successs Message
  UI.ShowMessgae("Book Removed", "success");
});
