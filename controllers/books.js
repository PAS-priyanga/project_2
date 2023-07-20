const Book = require('../models/book');
const Author = require('../models/author');

module.exports = {
  index,
  show,
  new: newBook,
  create
};

async function index(req, res) {
    const books = await Book.find({});
    res.render('books/index', { title: 'All Books', books });
  }
  
  async function show(req, res) {
    const book = await Book.findById(req.params.id).populate('author')
    const authors = await Author.find({ _id: { $nin: book.author } }).sort('name');
    console.log(authors);
    res.render('books/show', { title: 'Book Detail', book, authors });
  }
  function newBook(req, res) {
    // We'll want to be able to render an  
    // errorMsg if the create action fails
    res.render('books/new', { title: 'Add Book', errorMsg: '' });
  }



  async function create(req, res) { 
    console.log("inside create function");
    console.log(req.body);
    const book = Book.create(req.body);
  //  const inputauthor = new Author({
  //   name:req.body.authorName,
  //   email:req.body.authorEmail
  // }
  // );
  //  const book = new Book
  //  ({
  //   title:req.body.title,
  //   publisher:req.body.publisher,
  //   publishedYear:req.body.publishedYear,
  //   author:inputauthor
  // }
  // );
    console.log("book"+book);
    // Assign the logged in user's id
    book.user = req.user._id;
    try {
     
        await book.save();
      // Probably want to go to newly added book's show view
      res.redirect(`/books/${book._id}`);
    } catch (err) {
      console.log(err);
      // Probably want to go back to new
      res.redirect(`/books/new`);
    }
  }
  
  