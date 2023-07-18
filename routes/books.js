const express = require('express');
const router = express.Router();
// You'll be creating this controller module next
const booksCtrl = require('../controllers/books');
const ensureLoggedIn = require('../config/ensureLoggedIn');
	
// GET /movies
router.get('/', booksCtrl.index);
// GET /movies/new
router.get('/new', ensureLoggedIn, booksCtrl.new);
// GET /movies/:id (show functionality) MUST be below new route
router.get('/:id', booksCtrl.show);
// POST /movies
router.post('/', ensureLoggedIn, booksCtrl.create);
	
module.exports = router;