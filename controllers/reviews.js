const Book = require('../models/book');

module.exports = {
  create,
  delete: deleteReview,
  update,
  edit

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
  

  async function edit(req, res) {
    // Note the cool "dot" syntax to query on the property of a subdoc
    const book = await Book.findOne({'reviews._id': req.params.id});
    // Find the comment subdoc using the id method on Mongoose arrays
    // https://mongoosejs.com/docs/subdocs.html
    const review = book.reviews.id(req.params.id);
    // Render the comments/edit.ejs template, passing to it the comment
    res.render('reviews/edit', { review });
  }

  async function update(req, res) {
   
    // Note the cool "dot" syntax to query on the property of a subdoc
    const book = await Book.findOne({'reviews._id': req.params.id,'reviews.user': req.user._id});
   
   
    const reviewSubdoc = book.reviews.id(req.params.id);
    
    // Ensure that the comment was created by the logged in user
    if (!reviewSubdoc.user.equals(req.user._id)) return res.redirect(`/books/${book._id}`);
    // Update the text of the comment
    reviewSubdoc.content = req.body.content;
    console.log("subdoc",reviewSubdoc)
    
    try {
      await book.save(); console.log("book.reviews",book.reviews)
    } catch (e) {
      console.log(e.message);
    }
    // Redirect back to the book's show view
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


  