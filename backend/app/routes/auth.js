const express = require('express');
const passport = require('passport');
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

/**
*Route creates a new user and stores tham in the database
*
*
*/
router.post('/signup', (req, res) => {
  UserController.postNew(req, res);
});

/**
*Route uses passport local startegy to login users
*
*On failure it redirects to the login page
*
*/
router.post('/login', (req, res) => {
  AuthController.login(req, res);
});

/**
*Route deactivates users account
*
*/
router.post('/deactivate',
  passport.authenticate('jwt', { session: false }),
	    AuthController.deactivate);

/**
*Route logs user out
*/
router.post('/logout',
	    passport.authenticate('jwt', {session: false}),
	    AuthController.logout)

module.exports = router;
