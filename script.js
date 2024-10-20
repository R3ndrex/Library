/*globals events*/
const form = document.querySelector(".book-form");
const exitFormButton = document.querySelector(".exit-button");
const bookList = document.querySelector(".book-list");
const inputSortBooks = document.querySelector(".sort-books");
const menuButton = document.querySelector(".menu-create-book");
const formMenu = document.querySelector(".form-menu");

const library = (function () {
    const books = [];

    function displayBooks() {
        events.emit("ChangeBooks", books.length);
        bookList.innerHTML = "";
        books.forEach((book, index) => createListElement(book, index));
    }

    function createListElement(item, index) {
        const li = document.createElement("li");
        li.setAttribute("data-id", index);
        for (const property in item) {
            switch (property) {
                case "read":
                    createTextLineWithCheckbox(property, item, li);
                    break;
                case "title":
                    createHeader(property, item, li);
                    break;
                case "author":
                case "pages":
                    createTextLine(property, item, li);
                    break;
            }
        }
        bookList.appendChild(li);
    }

    function createHeader(property, item, li) {
        const container = document.createElement("div");
        const button = document.createElement("img");
        button.src = "./close-circle-outline.svg";
        button.alt = "Exit-Button";
        button.classList.add("exit-button");

        button.addEventListener("click", () => deleteBook(li));

        const heading = document.createElement("h2");
        container.classList.add("item-heading");
        heading.textContent = `${property}: ${item[property]}`;
        container.appendChild(heading);
        container.appendChild(button);
        li.appendChild(container);
    }

    function createTextLine(property, item, li) {
        const text = document.createTextNode(`${property}: ${item[property]}`);
        li.appendChild(text);
        li.appendChild(document.createElement("br")); // line break between lines
    }
    // if book.read create text line and checkbox
    function createTextLineWithCheckbox(property, item, li) {
        const label = document.createElement("label");
        label.textContent = `${property}: `;
        label.setAttribute("for", `${li.getAttribute("data-id")}`);
        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute(`id`, `${li.getAttribute("data-id")}`);
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
        li.appendChild(label);
        li.appendChild(checkbox);
    }

    function deleteBook(li) {
        books.splice(li.getAttribute("data-id"), 1);
        displayBooks();
    }

    function addBook(book) {
        books.push(book);
        displayBooks();
    }

    return { deleteBook, addBook };
})();

function Book(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

form.addEventListener("submit", () => {
    const formData = new FormData(form);
    const book = new Book(
        formData.get("title"),
        formData.get("author"),
        formData.get("pages"),
        formData.get("read") === "on"
    );
    library.addBook(book);
    form.reset();
    formMenu.close();
});

menuButton.addEventListener("click", () => {
    formMenu.showModal();
    window.addEventListener("click", (e) => {
        if (e.target.contains(formMenu)) {
            formMenu.close();
        }
    });
});

exitFormButton.addEventListener("click", () => formMenu.close());

inputSortBooks.addEventListener("input", (e) => {
    const liItems = bookList.querySelectorAll("li");
    const filter = e.target.value.toLowerCase();
    liItems.forEach((li) => {
        if (!li.textContent.toLowerCase().includes(filter)) {
            return li.classList.add("disabled");
        }
        return li.classList.remove("disabled");
    });
});
