const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// other routes

router.get('/users/:userId/books/read', ensureLoggedIn,usersCtrl.showBooksRead);

module.exports = router;

