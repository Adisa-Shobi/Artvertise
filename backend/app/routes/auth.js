const express = require('express');
const passport = require('passport');
const dbClient = require('../utils/db');
const userController = require('../controllers/UserController');

const router = express.Router();

/**
*Route creates a new user and stores tham in the database
*
*
*/
router.post('/users', (req, res) => {
    userController.newUser(req, res);
})


/**
*Route uses passport local startegy to login users
*
*On failure it redirects to the login page
*
*/
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}))

module.exports = router;
