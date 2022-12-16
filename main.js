// book class: represents a book

 class Book{
    constructor(title,author,isbn)
    {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

 }

//  Handles Storage

class Storage{
    static getBook(){
        let books;
        if(localStorage.getItem('books')===null){
            books = [];
        }
        else{
           books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book){
       const books = Storage.getBook();
       books.push(book);
       localStorage.setItem('books',JSON.stringify(books));
    }

    static removeBook(isbn){
      const books = Storage.getBook();

      books.forEach((book,index)=>{
        if(book.isbn===isbn){
            books.splice(index,1);
        }
      });
      localStorage.setItem('books',JSON.stringify(books));
    }
}


//  UI class: Handle UI tasks
class UI{
    static displayBooks(){
        
    
        const books = Storage.getBook();
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book){
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');
        row.innerHTML =`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">x</td>`;
        list.appendChild(row);
    }
    static clearFields()
    {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
    static removeBooks(el)
    {
       if(el.classList.contains('delete'))
       {
        el.parentElement.parentElement.remove();
       }
    }

    static showAlert(message,className)
    {
        const div = document.createElement('div');
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        container.insertBefore(div,form);

        // vanish in 3 seconds
        setTimeout(()=>document.querySelector('.alert').remove(),3000);
    }
    
}

// Display Books
document.addEventListener('DOMContentLoaded',UI.displayBooks);


// Add Books

document.querySelector('#book-form').addEventListener('submit',(e)=>
{
    e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  //  Alert messages

 if(title===''||author===''||isbn==='')
 {
    UI.showAlert('please fill in the fields','danger');
 }
 else{
    const book = new Book(title,author,isbn);
  
    // add book to UI

    UI.addBookToList(book);

    // add book to local storage

    Storage.addBook(book);

    // show sucess message
  
    UI.showAlert('book added','success');
   
  
    //   Clear book list after it is added
    
    UI.clearFields();
 }

  
}
);

// Event: remove a book

 document.querySelector('#book-list').addEventListener('click',(e) =>
 {
    // reomve book from UI

    UI.removeBooks(e.target);

    // remove book from local storage

    Storage.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // alert to show books have been removed

    UI.showAlert('book removed','success');
 });

