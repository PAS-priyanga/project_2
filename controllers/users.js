
const User = require('../models/user');
const Book = require('../models/book');

const { MongoClient,  ObjectId } = require("mongodb");


module.exports = {
    show,
    checkout
  };

async function show(req, res) {
  console.log("inside show function");
  const userId = req.params.user;

  try {
   
    console.log(req.user);
    const user = await User.findById(req.user._id);
    console.log(user);
    const booksRead = user.booksRead;
    
  
    res.render('users/show', {title: 'booksRead ', booksRead});}

   catch (err) {
    console.log(err);
    res.redirect('/');
  }
}


async function create(req, res) { 
  const book = Book.create(req.body);
  // Assign the logged in user's id
  book.user = req.user._id;
  try {
    await book.save();
    //  want to go to newly added book's show view
    res.redirect(`/books/${book._id}`);
  } catch (err) {
    console.log(err);
    // want to go back to new
    res.redirect(`/books/new`);
  }
}


async function checkout(req, res) {
  const userId = req.params.user;
  console.log("inside checkout function")

  try {
    // Find the user by ID
    
    const user = await User.findById(req.user._id);
    console.log(user);
    console.log(req.params.id);
    const books = user.booksRead;
    const bookId = new ObjectId(req.params.id);
    console.log("bookID"+bookId);
    const isbookread = await User.find({"booksReadId":{"_id": bookId}}).count();
    console.log("isbookread"+isbookread);
    if (isbookread == 0) {
    const book = await Book.findById(req.params.id).populate('author');

    console.log("book"+book);
    console.log("req"+req.params);
    user.booksReadId.push(req.params.id);
    books.push(book);
    user.save();
    console.log("user"+user);
    console.log("books"+books);
    }
  
  
    res.render('books/checkout', {title: 'books', books});}

   catch (err) {
    console.log(err);
    res.redirect('/');
  }
}





