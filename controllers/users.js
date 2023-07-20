
const User = require('../models/user');
const Book = require('../models/book');
//const { ObjectId } = require('mongodb');
const { MongoClient,  ObjectId } = require("mongodb");


module.exports = {
    show,
    checkout
  };

async function show(req, res) {
  console.log("inside show function");
  const userId = req.params.user;

  try {
    // Find the user by ID
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

// async function checkout(req, res) { try{
//   const book = await Book.findById(req.params.id);
//   const user = await User.findById(req.user._id);
//   user.booksRead.push(req.params.id);
//   await user.save();
//   res.redirect(`/users/show/${user._id}`);
// } catch (err) {
//   console.error(err);
//   res.redirect('/books');
// }
// }
//   if (booksRead.id(req.user._id)) {return res.redirect('/books');
//   book.booksRead.push(req.user._id);
//   await book.save();
//   res.redirect(`/users/show/${book._id}`);
// }
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


async function checkout(req, res) {
  const userId = req.params.user;
  console.log("inside checkout function")

  try {
    // Find the user by ID
    //console.log(req.user);
    const user = await User.findById(req.user._id);
    console.log(user);
    console.log(req.params.id);
    const books = user.booksRead;
    const bookId = new ObjectId(req.params.id);
    //const isbookread = user.booksReadId.find({"_id":req.params.id}).count();
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





