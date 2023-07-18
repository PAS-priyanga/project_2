const author = require('../models/author');
const book = require('../models/book');

module.exports = {
  new: newAuthor,
  
};

async function newAuthor(req, res) {
  //Sort performers by their name
  const authors = await author.find({}).sort('name');
  res.render('authors/new', { title: 'Add Author', authors });
}
