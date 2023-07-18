const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// other routes

router.get('/users/:userId/books/read', ensureLoggedIn,userCtrl.showBooksRead);

module.exports = router;


