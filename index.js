class Book {

    constructor(title, author,isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
class Store {
    
    static getBooks() {
        let books = [];
        if(localStorage.getItem('books') === null)
        {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        let books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }

    static removeBook(isbn) {
        let books = Store.getBooks();
        books.forEach((book,index)=> {
            if(book.isbn === isbn){
                books.splice(index,1);
            }
        })
        localStorage.setItem('books',JSON.stringify(books));
    }
}
class UI {
    static displayBooks() {
     const books = Store.getBooks();
     books.forEach((book)=> UI.addBook(book));
    }
    static handleSubmit() {
      const title = document.querySelector('#title');
      const author = document.querySelector('#author');
      const isbn = document.querySelector('#isbn');
      if(title.value === '' || author.value === '' || isbn.value === '')
      {
        UI.showAlert('Please fill in all the details','danger');
      }
      else {
        const book = {
            title:  title.value,
            author: author.value,
            isbn:   isbn.value
          }
          UI.addBook(book);
          Store.addBook(book);
          UI.showAlert('Successfully added book','success');
          title.value = '';
          author.value = '';
          isbn.value = '';
      } 
    }
    static addBook(book) {
        
        const tb = document.querySelector('.table-body');
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td class="del"><a href="#" class="delete-btn">x</a></td>
        `;
        tb.appendChild(tr);
        
    }

    static deleteBook(el) {
        if(el.classList.contains('delete-btn'))
        {
            el.parentElement.parentElement.remove();
            UI.showAlert('Successfully removed book','success');
        }
    }

    static showAlert(message,className) {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(message));
        div.className = `alert alert-${className}`;
        const form = document.querySelector('.form');
        const firstField = document.getElementById('first');
        form.insertBefore(div,firstField);

        setTimeout(()=> document.querySelector('.alert').remove(),3000);
    }
    
}
const submit = document.querySelector('.submit-btn');
submit.addEventListener('click',UI.handleSubmit);
UI.displayBooks();

const tbody = document.querySelector('.table-body');
tbody.addEventListener('click',(e)=>{
  UI.deleteBook(e.target);
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
})
