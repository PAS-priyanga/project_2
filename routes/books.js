const express = require('express');
const router = express.Router();
// You'll be creating this controller module next
const booksCtrl = require('../controllers/books');
const ensureLoggedIn = require('../config/ensureLoggedIn');
	
// GET /books
router.get('/', booksCtrl.index);
// GET /books/new
router.get('/new', ensureLoggedIn, booksCtrl.new);
// GET /books/:id (show functionality) MUST be below new route
router.get('/:id', booksCtrl.show);

// // POST /books
router.post('/', ensureLoggedIn, booksCtrl.create);
// router.post('/books', ensureLoggedIn,usersCtrl.checkout);
module.exports = router;