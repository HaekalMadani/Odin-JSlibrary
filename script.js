const myLibrary = []

/**
 * @constructor
 * @param {string} id
 * @param {string} title
 * @param {string} author
 * @param {number} pages
 * @param {boolean} read
 */

function Book(id, title, author, pages, read){
    if(!new.target){
        throw new Error("Constructor requires 'new'")
    }

    this.id = id
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

/**
 * @constructor
 * @param {string} id
 * @param {string} title
 * @param {string} author
 * @param {number} pages
 * @param {boolean} read
 * @returns {void}
 */

function addBookToLibrary(id, title, author, pages, read){
    let book = new Book(id, title, author, pages, read);

    myLibrary.push(book);
}

// vvvvvv close / show dialog vvvvvv

const dialog = document.querySelector("dialog");
const addBookBtn = document.querySelector("#addbook");
addBookBtn.addEventListener("click", (e) => {
    dialog.showModal();
});

const closeBtn = document.querySelector(".reset");
closeBtn.addEventListener("click", (e) => {
    dialog.close()
})

// vvvvvv submit form vvvvvv

const form = document.querySelector("form");

const titleInputField = document.querySelector("#title");
const authorInputField = document.querySelector("#author");
const pagesInputField = document.querySelector("#pages");
const readInputField = document.querySelector("#read");

let setID = crypto.randomUUID();

addBookToLibrary(
    setID,
    titleInputField,
    authorInputField,
    pagesInputField,
    readInputField
);

display(createBookCardDiv);

closeBtn.click();

function createBookCardDiv(){
    let bookcard = document.createElement("div");
    for(let i = myLibrary.length - 1; i < myLibrary.length; i++){
        bookcard.classList.add("book-card");
        bookcard.setAttribute("data-id", myLibrary[i].id);

        let titleParagraph = document.createElement('h2');
        let authorParagraph = document.createElement('p');
        let pagesParagraph = document.createElement('p');

        titleParagraph.textContent = `"${myLibrary[i].title}"`;
        authorParagraph.textContent = `Author: ${myLibrary[i].author}`;
        pagesParagraph.textContent = `Number of Pages: ${myLibrary[i].pages}`;

        let hasReadbtn = document.createElement("button");
        hasReadbtn.classList.add("read-toggle-btn");
        if(myLibrary[i].read){
            hasReadbtn.textContent = "I have read this book"
        }
        else{
            hasReadbtn.textContent = "Didn't read this book"
        }

        let removeBook = document.createElement("button");
        removeBook.classList.add("removebook");
        removeBook.textContent = "Remove";

        bookcard.appendChild(titleParagraph);
        bookcard.appendChild(authorParagraph);
        bookcard.appendChild(pagesParagraph);
        bookcard.appendChild(hasReadbtn);
        bookcard.appendChild(removebook);
    }

    return bookcard;    
}

const bookContainer = document.querySelector(".books")
function display(bookcard){
    bookContainer.appendChild(bookcard);
}

bookContainer.addEventListener("click", (e) => {
    const targetDiv = e.target.parentElement;
    const targetID = targetDiv.dataset.id;
  
    if (e.target.classList.contains("removebook")) {
      for (let i = 0; i < myLibrary.length; i++) {
        if (targetID === myLibrary[i].id) {
          myLibrary.splice(i, 1);
          targetDiv.remove();
        }
      }
    }
  
    if (e.target.classList.contains("c")) {
      const targetBook = myLibrary.find((book) => book.id === targetID);
      if (targetBook.hasRead) {
        targetBook.hasRead = false;
        e.target.textContent = "haven't read it yet";
  
        targetDiv.style.opacity = "1";
      } else {
        targetBook.hasRead = true;
        e.target.textContent = "I've already read it";
  
        targetDiv.style.opacity = "0.5";
      }
    }
  });