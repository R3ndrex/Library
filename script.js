let books = [];

const form = document.querySelector(".book-form");
const formInputs = document.querySelectorAll(".book-form input");
const exitFormButton = document.querySelector(".exit-button");
const bookList = document.querySelector(".book-list");
const inputSortBooks = document.querySelector(".sort-books");
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
    bookList.innerHTML = "";
    books.forEach((book, index) => CreateListElement(book, index));
}

function CreateListElement(item, index) {
    const li = document.createElement("li");
    li.setAttribute("data-id", index);
    for (const element in item) {
        switch (element) {
            case "read":
                CreateTextLineWithCheckbox(element, item, li);
                break;
            case "title":
                CreateHeader(element, item, li);
                break;
            default:
                CreateTextLine(element, item, li);
                break;
        }
    }

    bookList.appendChild(li);
}

function CreateHeader(element, item, li) {
    const container = document.createElement("div");
    const button = document.createElement("img");
    button.src = "./close-circle-outline.svg";
    button.classList.add("exit-button");
    button.addEventListener("click", () => DeleteBook(li));
    const heading = document.createElement("h2");
    container.classList.add("item-heading");
    heading.textContent = `${element}: ${item[element]}`;
    container.appendChild(heading);
    container.appendChild(button);
    li.appendChild(container);
}

function CreateTextLine(element, item, li) {
    const text = document.createTextNode(`${element}: ${item[element]}`);
    li.appendChild(text);
    li.appendChild(document.createElement("br")); // line break between lines
}

// if book.read create text line and checkbox
function CreateTextLineWithCheckbox(element, item, li) {
    const text = document.createTextNode(`${element}: `);
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    if (item[element]) {
        li.classList.add("checked");
        checkbox.setAttribute("checked", "true");
    }
    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            li.classList.add("checked");
        } else {
            li.classList.remove("checked");
        }
        item[element] = checkbox.checked;
    });
    li.appendChild(text);
    li.appendChild(checkbox);
}

function DeleteBook(li) {
    bookList.removeChild(li);
    books.splice(li.getAttribute("data-id"), 1);
    const liItems = bookList.querySelectorAll("li");
    books.forEach((book, index) => {
        liItems[index].setAttribute("data-id", index);
    });
}

formButton.addEventListener("click", (e) => {
    e.preventDefault();
    AddBookToLibrary(
        formInputs[0].value,
        formInputs[1].value,
        formInputs[2].value,
        formInputs[3].checked
    );
    formInputs[0].value = "";
    formInputs[1].value = "";
    formInputs[2].value = "";
    formInputs[3].checked = false;
    DisplayBooks(books);
});

menuButton.addEventListener("click", () => form.classList.remove("disabled"));

exitFormButton.addEventListener("click", () => form.classList.add("disabled"));

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
