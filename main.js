'use strict';

let books = [];

function Book(title, author, pages, read) {
    this.id = Math.random().toString();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function () {
    const reading = this.read === true ? 'gelesen' : 'nicht gelesen';
    return `${this.title}, ${this.author}, ${this.pages}, ${reading}`;
};
document.getElementById('button').addEventListener('click', () => {
    const container = document.querySelector('.book-container');
    const bookForm = createFormularHTML();
    console.log(bookForm);
    bookForm.classList.toggle('hide');
    container.appendChild(bookForm);
});
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    books.push(newBook);
}

function renderBooks() {
    const bookContainer = document.querySelector('.book-container');
    bookContainer.innerHTML = '';
    books.forEach((book) => {
        console.log(book);
        const ul = createBookHTML(book);
        ul.dataset.id = book.id;
        bookContainer.appendChild(ul);
        const li6 = ul.querySelector('li:nth-child(6)');
        const li5 = ul.querySelector('li:nth-child(5)'); // vzima petiqt element ot createBookHTML
        if (book.read) {
            // tuk go chete avtomatichno kato true i s teksta s false otdolu se poluchava smqnata na iconite i na teksta gelesen i ungelesen
            li5.innerHTML =
                '<i class="fas fa-book-open-reader" id="book-icon"></i>';
        } else {
            li5.innerHTML = '<i class="fas fa-book" id="book-icon"></i>';
        }
    });
}
function createFormularHTML(formular) {
    const div = document.createElement('div');
    div.classList.add('hide');
    div.classList.add('formular');
    div.id = 'formular';
    const title = document.createElement('input');
    title.type = 'text';
    title.required = true;
    title.placeholder = 'Title';
    const author = document.createElement('input');
    author.type = 'text';
    author.required = true;
    author.placeholder = 'Author';
    const pages = document.createElement('input');
    pages.type = 'number';
    pages.required = true;
    pages.placeholder = 'Pages';
    const read = document.createElement('label');
    read.textContent = 'gelesen';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.style.accentColor = 'rgb(237, 169, 169)';
    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.style.padding = '10px';
    submit.style.fontFamily = '"Raleway", sans-serif';
    submit.style.backgroundColor = 'rgb(237, 169, 169, 0.8)';
    submit.style.color = 'white';
    submit.style.borderRadius = '5px';
    submit.style.fontSize = '17px';
    submit.style.margin = '5px';

    submit.textContent = 'Add Book';
    submit.addEventListener('click', () => {
        addBookToLibrary(
            title.value,
            author.value,
            pages.value,
            checkbox.checked //? 'gelesen' : 'ungelesen'
        );
        renderBooks();
    });
    div.append(title, author, pages, read, checkbox, submit);
    return div;
}
function createBookHTML(book) {
    const ul = document.createElement('ul');
    ul.classList.add('liste');
    ul.id = 'liste';
    const li1 = document.createElement('li');
    const li2 = document.createElement('li');
    const li3 = document.createElement('li');
    const li4 = document.createElement('li');
    const li5 = document.createElement('li');
    const li6 = document.createElement('li');
    li1.textContent = book.title;
    li1.style.fontSize = '26px';
    li1.style.fontWeight = 'bolder';
    li2.textContent = book.author;
    li3.textContent = book.pages;
    li4.textContent = book.read ? 'gelesen' : 'ungelesen';
    li5.innerHTML =
        book.read === false // predi tova stoeshe gelesen no qvno ne e dobra ideq i e hubavo da se raboti s true i false. ot tuk shte ni prati po gore
            ? '<i id="book-icon" class="fas fa-book" ></i>'
            : '<i class="fas fa-book-open-reader" id="book-icon"></i>';
    li6.innerHTML = '<i class="fas fa-trash"></i>';
    ul.append(li1, li2, li3, li4, li5, li6);
    return ul;
}
const bookContainer = document.querySelector('.book-container');
bookContainer.addEventListener('click', (event) => {
    const target = event.target;
    if (event.target.matches('.fa-trash')) {
        const id = target.parentElement.parentElement.dataset.id;
        books = books.filter((book) => book.id !== id);
        renderBooks();
    }
    if (event.target.matches('#book-icon')) {
        const id = target.parentElement.parentElement.dataset.id;
        const currentBook = books.find((book) => book.id === id);
        currentBook.read = !currentBook.read;
        renderBooks();
        console.log(books);
    }
});
