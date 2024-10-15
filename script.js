let books = [];

const form = document.querySelector(".book-form");
const exitFormButton = document.querySelector(".exit-button");
const bookList = document.querySelector(".book-list");
const inputSortBooks = document.querySelector(".sort-books");
const menuButton = document.querySelector(".menu-create-book");
const formMenu = document.querySelector(".form-menu");

function Book(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
Book.prototype.AddBookToLibrary = function () {
    books.push(this);
};

Book.prototype.DeleteBook = function (li) {
    li.remove();
    books.splice(li.getAttribute("data-id"), 1);
    reIndexItems();
};

function reIndexItems() {
    const liItems = bookList.querySelectorAll("li");
    books.forEach((book, index) => {
        liItems[index].setAttribute("data-id", index);
    });
}

function DisplayBooks(books) {
    bookList.innerHTML = "";
    books.forEach((book) => CreateListElement(book));
}

function CreateListElement(item) {
    const li = document.createElement("li");
    li.setAttribute("data-id", books.indexOf(item));
    for (const property in item) {
        switch (property) {
            case "read":
                CreateTextLineWithCheckbox(property, item, li);
                break;
            case "title":
                CreateHeader(property, item, li);
                break;
            case "author":
            case "pages":
                CreateTextLine(property, item, li);
                break;
        }
    }

    bookList.appendChild(li);
}

function CreateHeader(property, item, li) {
    const container = document.createElement("div");
    const button = document.createElement("img");
    button.src = "./close-circle-outline.svg";
    button.classList.add("exit-button");
    button.addEventListener("click", () => item.DeleteBook(li));

    const heading = document.createElement("h2");
    container.classList.add("item-heading");
    heading.textContent = `${property}: ${item[property]}`;
    container.appendChild(heading);
    container.appendChild(button);
    li.appendChild(container);
}

function CreateTextLine(property, item, li) {
    const text = document.createTextNode(`${property}: ${item[property]}`);
    li.appendChild(text);
    li.appendChild(document.createElement("br")); // line break between lines
}

// if book.read create text line and checkbox
function CreateTextLineWithCheckbox(property, item, li) {
    const text = document.createTextNode(`${property}: `);
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    if (item[property]) {
        li.classList.add("checked");
        checkbox.setAttribute("checked", "true");
    }
    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            li.classList.add("checked");
        } else {
            li.classList.remove("checked");
        }
        item[property] = checkbox.checked;
    });
    li.appendChild(text);
    li.appendChild(checkbox);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const book = new Book(
        formData.get("title"),
        formData.get("author"),
        formData.get("pages"),
        formData.get("read") === "on"
    );
    book.AddBookToLibrary();
    form.reset();
    DisplayBooks(books);
    formMenu.close();
});

menuButton.addEventListener("click", () => formMenu.showModal());
exitFormButton.addEventListener("click", () => formMenu.close());

inputSortBooks.addEventListener("input", (e) => {
    const liItems = bookList.querySelectorAll("li");
    const filter = e.target.value.toLowerCase();
    liItems.forEach((li) => {
        if (!li.textContent.includes(filter)) {
            return li.classList.add("disabled");
        }
        return li.classList.remove("disabled");
    });
});
