const myLibrary = [];

function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

const firstBook = new Book("Martin Eden", "Jack London", 393, "yes");
const secondBook = new Book("The Count of Monte Cristo", "Alexandre Dumas", 1276, "in-progress");
const thirdBook = new Book("Flowers for Algernon", "Daniel Keyes", 311, "yes");

myLibrary.push(firstBook, secondBook, thirdBook);
createLibrary(myLibrary);

function createLibrary(myLibrary) {
    const libraryCards = document.querySelector(".library-cards");
    libraryCards.replaceChildren();

    for (let book of myLibrary) {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        for (let element in book) {
            const elementContainer = document.createElement("div");
            elementContainer.classList.add(`book-${element}`);

            if (element === "pages") {
                const pagesIcon = document.createElement("span");
                pagesIcon.classList.add("material-symbols-outlined");
                pagesIcon.innerText = "library_books";
                elementContainer.appendChild(pagesIcon);

                const pagesNumber = document.createElement("div");
                pagesNumber.classList.add("pages-number");
                pagesNumber.innerText = book[element];
                elementContainer.appendChild(pagesNumber);
            } else if (element === "readStatus"){
                const readStatusButton = document.createElement("button");
                readStatusButton.classList.add("change-read-status");

                const readSymbol = document.createElement("span");
                readSymbol.classList.add("material-symbols-outlined");

                if (book[element] === "yes") {
                    readSymbol.innerText = "check_circle";
                } else if (book[element] === "in-progress") {
                    readSymbol.innerText = "arrow_forward";
                } else {
                    readSymbol.innerText = "cancel";
                }

                readStatusButton.appendChild(readSymbol);
                elementContainer.appendChild(readStatusButton);
            }else {
                elementContainer.innerText = book[element];
            }
            bookCard.appendChild(elementContainer);
        }

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        const deleteIcon = document.createElement("span");
        deleteIcon.classList.add("material-symbols-outlined");
        deleteIcon.innerText = "delete";
        deleteButton.appendChild(deleteIcon);
        bookCard.appendChild(deleteButton);

        libraryCards.appendChild(bookCard);
    }
}


const showDialogButton = document.querySelector("#show-dialog");
const dialogForm = document.querySelector("#add-book-dialog");
const closeButton =document.querySelector("#close-dialog");
const addBookButton = document.querySelector("#add-book");
const bookForm = document.querySelector(".new-book-form");

showDialogButton.addEventListener("click", () => {
    dialogForm.showModal();
})

closeButton.addEventListener("click", () => {
    dialogForm.close();
})

bookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const readStatus = document.querySelector('input[name="reading-status"]:checked').value;

    const newBook = new Book(title, author, pages, readStatus);
    myLibrary.push(newBook);
    bookForm.reset();
    dialogForm.close();
    createLibrary(myLibrary);
})