const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');
const ensureLoggedIn = require('../config/ensureLoggedIn');



router.get('/users/show/', ensureLoggedIn,usersCtrl.show);
router.get('/users/checkout/:id', ensureLoggedIn,usersCtrl.checkout);

module.exports = router;

