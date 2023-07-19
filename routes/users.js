const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// other routes

router.get('/users/show', ensureLoggedIn,usersCtrl.show);

module.exports = router;

