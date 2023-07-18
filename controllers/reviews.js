const Book = require('../models/book');

module.exports = {
  create,
  delete: deleteReview
};

async function deleteReview(req, res) {
    // Note the cool "dot" syntax to query on the property of a subdoc
    const book = await Book.findOne({ 'reviews._id': req.params.id, 'reviews.user': req.user._id });
    // Rogue user!
    if (!book) return res.redirect('/books');
    // Remove the review using the remove method available on Mongoose arrays
    book.reviews.remove(req.params.id);
    // Save the updated movie doc
    await book.save();
    // Redirect back to the movie's show view
    res.redirect(`/books/${book._id}`);
  }
  
  async function create(req, res) {
    const book = await Book.findById(req.params.id);
  
    // Add the user-centric info to req.body (the new review)
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
  
    // We can push (or unshift) subdocs into Mongoose arrays
    book.reviews.push(req.body);
    try {
      // Save any changes made to the movie doc
      await book.save();
    } catch (err) {
      console.log(err);
    }
    res.redirect(`/books/${book._id}`);
  }