const Book = require('../models/book');

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
    const book = await Book.findById(req.params.id);
    res.render('books/show', { title: 'Book Detail', book });
  }
  function newBook(req, res) {
    // We'll want to be able to render an  
    // errorMsg if the create action fails
    res.render('books/new', { title: 'Add Book', errorMsg: '' });
  }



  async function create(req, res) { 
    const book = Book.create(req.body);
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
  