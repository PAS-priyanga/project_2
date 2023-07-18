const User = require('../models/user');
const Book = require('../models/book');


module.exports = {
    showBooksRead,
  };
  
async function showBooksRead(req, res) {
  const userId = req.params.user;

  try {
    // Find the user by ID
    const user = await User.findById(userId).populate('booksRead');
    const booksRead = user.booksRead;

    res.render('books/read', { booksRead });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
}










