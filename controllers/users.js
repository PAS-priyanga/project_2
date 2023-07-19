const User = require('../models/user');
const Book = require('../models/book');


module.exports = {
    show,
  };

async function show(req, res) {
  const userId = req.params.user;

  try {
    // Find the user by ID
    console.log(req.user);
    const user = await User.findById(req.user._id);
    console.log(user);
    const booksRead = user.booksRead;


    res.render('users/show', {booksRead });

  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
}










