const Author = require('../models/author');
const Book = require('../models/book');

module.exports = {
  new: newAuthor,
  create,
  addToAuthor,
};

async function addToAuthor(req, res) {
  const book = await Book.findById(req.params.id);
  
  book.author = req.body.authorId;
  console.log(book);
  console.log(req.body)
  
  await book.save();
  res.redirect(`/books/${book._id}`);
}


async function newAuthor(req, res) {

  const authors = await Author.find({}).sort('name');
  res.render('authors/new', { title: 'Add Author', authors });
}

async function create(req, res) { 
  const author = await Author.create(req.body);
  // Assign the logged in user's id
 
  try {
    await author.save();
    // want to go to newly added book's show view
    res.redirect(`/authors/${author._id}`);
  } catch (err) {
    console.log(err);
    // want to go back to new
    res.redirect(`/authors/new`);
  }
}
