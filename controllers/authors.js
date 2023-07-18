const Author = require('../models/author');
const Book = require('../models/book');

module.exports = {
  new: newAuthor,
  create,
  addToAuthor,
};

async function addToAuthor(req, res) {
  const book = await Book.findById(req.params.id);
  // The cast array holds the performer's ObjectId (referencing)
  book.author.push(req.body.authorId);
  await book.save();
  res.redirect(`/books/${book._id}`);
}


async function newAuthor(req, res) {
  //Sort performers by their name
  const authors = await Author.find({}).sort('name');
  res.render('authors/new', { title: 'Add Author', authors });
}

async function create(req, res) { 
  const author = await Author.create(req.body);
  // Assign the logged in user's id
 
  try {
    await author.save();
    // Probably want to go to newly added book's show view
    res.redirect(`/authors/${author._id}`);
  } catch (err) {
    console.log(err);
    // Probably want to go back to new
    res.redirect(`/authors/new`);
  }
}
