const myLibrary = [];

class Book {
    constructor(author, title, numPages, read) {
        this.author = author;
        this.title = title;
        this.numPages = numPages;
        this.read = read;
    }

    toggleRead() {
        this.read = !(this.read);
    }
}

function addBookToLibrary(author, title, numPages, read) {
    const book = new Book(author, title, numPages, read);
    myLibrary.push(book);
}

window.onload = () => {
    document.querySelector(`#addNewBook`).addEventListener(`click`, e => {
        document.querySelector(`.side-bar>form`).style.display = `block`;
    })

    document.querySelector(`#addBook`).addEventListener(`click`, e => {
        if (document.querySelector(`form`).checkValidity()) {
            e.preventDefault();
            let author = document.querySelector(`#author`).value;
            document.querySelector(`#author`).value = ``;
            let title = document.querySelector(`#title`).value;
            document.querySelector(`#title`).value = ``;
            let numPages = document.querySelector(`#numPages`).value;
            document.querySelector(`#numPages`).value = ``;
            let read = document.querySelector(`#was-read`).checked
            document.querySelector(`#was-read`).checked = `true`;
            document.querySelector(`.side-bar>form`).style.display = `none`;
            
            author = sanitize(author);
            title = sanitize(title);
            numPages = sanitize(numPages);
            
            addBookToLibrary(author, title, numPages, read);
            redisplayBooks();
        }
    })

    const authorInput = document.querySelector('#author');
    authorInput.addEventListener('input', () => {
        // console.log('yeah');
        if (!authorInput.validity.valid) {
            document.querySelector('.author-error').textContent = "Author name required";
        } else {
            document.querySelector('.author-error').textContent = "";
        }
    });

    const titleInput = document.querySelector('#title');
    titleInput.addEventListener('input', () => {
        // console.log('yeah');
        if (!titleInput.validity.valid) {
            document.querySelector('.title-error').textContent = "Title required";
        } else {
            document.querySelector('.title-error').textContent = "";
        }
    });

    const numPagesInput = document.querySelector('#numPages');
    numPagesInput.addEventListener('input', () => {
        // console.log('yeah');
        console.log(isNaN(Number(numPagesInput.value)));
        if (!numPagesInput.validity.valid || isNaN(Number(numPagesInput.value)) || Number(numPagesInput.value) <= 0) {
            document.querySelector('.numPages-error').textContent = "Number of pages required";
        } else {
            document.querySelector('.numPages-error').textContent = "";
        }
    });


}

function redisplayBooks() {
    const collection = document.querySelector(`.collection`);
    collection.innerHTML = ``;
    myLibrary.forEach((book, index) => {
        collection.innerHTML += `
            <div class="book book${index}">
                <p>Author: ${book.author}</p>
                <p>Title: ${book.title}</p>
                <p>Number of pages: ${book.numPages}</p>
                <p>Read? ${book.read}</p>
                <button type="button" id="remove-button">Remove book</button>
                <button type="button" id="toggle-read-button">Toggle read</button>
            </div>
        `;
    });
    myLibrary.forEach((book, index) => {
        document.querySelector(`.book${index}>#remove-button`).addEventListener(`click`, () => {
            document.querySelector(`.book${index}`).remove();
            myLibrary.splice(index, 1)
            redisplayBooks();
        });
        document.querySelector(`.book${index}>#toggle-read-button`).addEventListener(`click`, () => {
            myLibrary[index].toggleRead();
            redisplayBooks();
        });        
    })
}

const sanitize = (str) => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

