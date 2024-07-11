// Initialize an empty array to store the books
const myLibrary = [];

// Book constructor function
function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

// Adding several initial books to the library
const firstBook = new Book("Martin Eden", "Jack London", 393, "yes");
const secondBook = new Book("The Count of Monte Cristo", "Alexandre Dumas", 1276, "in-progress");
const thirdBook = new Book("Flowers for Algernon", "Daniel Keyes", 311, "yes");
myLibrary.push(firstBook, secondBook, thirdBook);


// Initial call to createLibrary to display the initial books
createLibrary(myLibrary);


//Creating library book cards
function createLibrary(myLibrary) {
    const libraryCards = document.querySelector(".library-cards");
    libraryCards.replaceChildren();

    // Iterate over all books in the myLibrary array 
    for (let book of myLibrary) {
        // Create the book card container
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
    
        // Container for icons
        const iconsContainer = document.createElement("div");
        iconsContainer.classList.add("icons-container");

        // Container for settings icons (read status, delete)
        const iconsSettings = document.createElement("div");
        iconsSettings.classList.add("icons-settings");
    
        // Iterate over book elements and add them to the book card
        for (let element in book) {
            const elementContainer = document.createElement("div");
            elementContainer.classList.add(`book-${element}`);
            
            // Adding special icons for the number of pages
            if (element === "pages") {
                const pagesIcon = document.createElement("span");
                pagesIcon.classList.add("material-symbols-outlined");
                pagesIcon.innerText = "library_books";
                elementContainer.appendChild(pagesIcon);
    
                const pagesNumber = document.createElement("div");
                pagesNumber.classList.add("pages-number");
                pagesNumber.innerText = book[element];
                elementContainer.appendChild(pagesNumber);
    
                iconsContainer.appendChild(elementContainer);

            } else if (element === "readStatus"){
                // Adding read status symbol
                const readSymbol = document.createElement("span");
                readSymbol.classList.add("material-symbols-outlined", "change-read-status");
    
                if (book[element] === "yes") {
                    readSymbol.innerText = "check_circle";
                } else if (book[element] === "in-progress") {
                    readSymbol.innerText = "arrow_forward";
                } else {
                    readSymbol.innerText = "cancel";
                }

                elementContainer.appendChild(readSymbol);
                iconsSettings.appendChild(elementContainer);

            }else {
                // Adding book title and author name elements to the book card
                elementContainer.innerText = book[element];
                bookCard.appendChild(elementContainer);
            }
        }
        
        // Create delete icon
        const deleteIcon = document.createElement("span");
        deleteIcon.classList.add("material-symbols-outlined", "delete-button");
        deleteIcon.innerText = "delete";
        iconsSettings.appendChild(deleteIcon);
        iconsContainer.appendChild(iconsSettings);


        bookCard.appendChild(iconsContainer);
        libraryCards.appendChild(bookCard);
    }
}

// Create event listeners for all cards
const library = document.querySelector(".library-cards");
library.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-button")) {
        // Delete button click
        const cardDelete = event.target.closest(".book-card");
        const bookTitle = cardDelete.querySelector(".book-title").innerText;
        const index = myLibrary.findIndex(book => book.title === bookTitle);

        if (index !== -1) {
            myLibrary.splice(index, 1);
            cardDelete.remove();
        } else {
            console.error("The card is not found")
        }
    } else if (event.target.classList.contains("change-read-status")) {
        // Change read status click
        const cardChangeStatus = event.target.closest(".book-card");
        const bookTitle = cardChangeStatus.querySelector(".book-title").innerText;
        const index = myLibrary.findIndex(book => book.title === bookTitle);

        if (index !== -1) {
            let book = myLibrary[index];
            switch(book.readStatus) {
                case "yes":
                    book.readStatus = "no";
                    event.target.innerText = "cancel";
                    break;
                case "no":
                    book.readStatus = "in-progress";
                    event.target.innerText = "arrow_forward";
                    break;
                case "in-progress":
                    book.readStatus = "yes";
                    event.target.innerText = "check_circle";
                    break;
                default:
                    console.error("Unknown read status");
            }
        }
    }
})


// Show dialog window to add new book
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


// Add new book to the library
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