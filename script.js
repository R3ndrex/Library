let books = [];

const form = document.querySelector(".book-form");
const inputs = document.querySelectorAll(".book-form>input");
const exitButton = document.querySelector(".exit-form-button");
const bookList = document.querySelector(".book-list");
const formButton = document.querySelector(".book-form>button");
const menuButton = document.querySelector(".menu-create-book");

function Book(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function AddBookToLibrary(title, author, pages, read) {
    books.push(new Book(title, author, pages, read));
}

function DisplayBooks(books) {
    books.forEach((book) => {
        console.log(book);
    });
}

menuButton.addEventListener("click", () => {
    form.style["display"] = "grid";
});

exitButton.addEventListener("click", () => {
    form.style["display"] = "none";
});

formButton.addEventListener("click", (e) => {
    e.preventDefault();
    AddBookToLibrary(
        inputs[0].value,
        inputs[1].value,
        inputs[2].value,
        inputs[3].checked
    );
    inputs[0].value = "";
    inputs[1].value = "";
    inputs[2].value = "";
    inputs[3].checked = false;
    DisplayBooks(books);
});
