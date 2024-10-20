/*globals stats*/
/*globals events*/
const stats = (function () {
    let books = 0;
    const allBooks = document.querySelector(".all-books");
    events.on("ChangeBooks", SetBooks);
    function SetBooks(amount) {
        books = amount;
        display();
    }
    function display() {
        allBooks.textContent = `Books: ${books}`;
    }
    function destroy() {
        allBooks.parentElement.remove();
        events.off("ChangeBooks", SetBooks);
    }
    return { destroy };
})();
