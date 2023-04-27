const express = require('express');
const multer = require('multer');
const fs = require('fs');
const passport = require('passport');
const ItemController = require('../controllers/ItemController');
const ImageController = require('../controllers/ImageController');
const UserController = require('../controllers/UserController');
const StateController = require('../controllers/StateController');
const CityController = require('../controllers/CityController');
const CountryController = require('../controllers/CountryController');
const ReviewController = require('../controllers/ReviewController');

const router = express.Router();

const directory = 'app/controllers/uploads/';

// Check if uploads directory exists
if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, directory);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });
// const jwtAuth = passport.authenticate('jwt', { session: false });

// Application router initialized
router.use((req, res, next) => {
  console.log('Router initialized');
  next();
});

// Item handler Routes
router.get('/items', ItemController.getAllItems);
router.post('/items', upload.single('image'), ItemController.newItem);
router.get('/items/:itemId', ItemController.getItem);
router.put('/items/:itemId', ItemController.updateItem);
router.delete('/items/:itemId', ItemController.deleteItem);
router.get('/items/:itemId/reviews', ItemController.getItemReviews);

// Routes for handling image thumbnails
router.get('/thumbnails/:filename', ImageController.getImage);

// User handler routes
router.put('/users/:userId', UserController.updateUser);
router.get('/users/:userId', UserController.getUser);
router.get('/users/me', UserController.getCurrentUser);
router.get('/users/', UserController.getUsers);
router.get('/users/:userId/items', UserController.getUserItems);
router.get('/users/:userId/items/:itemId', UserController.getUserItem);
router.get('/users/:userId/reviews', UserController.getUserReviews);
router.delete('/users/:userId/items/:itemId', UserController.deleteUserItem);

// State handler routes
router.post('/states', StateController.newState);
router.get('/states', StateController.getAllStates);
router.get('/states/:stateId', StateController.getState);
router.put('/states/:stateId', StateController.updateState);
router.delete('/states/:stateId', StateController.deleteState);
router.get('/states/:stateId/cities', StateController.getStateCities);
router.post('/states/:stateId/cities', StateController.newStateCity);
router.get('/states/:stateId/cities/:cityId', StateController.getStateCity);

// City handler
router.post('/city', CityController.newCity);
router.get('/city', CityController.getAllCities);
router.get('/city/:cityId', CityController.getCity);
router.put('/city/:cityId', CityController.updateCity);
router.delete('/city/:cityId', CityController.deleteCity);
router.get('/city/:cityId/users', CityController.getCityUsers);
router.get('/city/:cityId/items', CityController.getCityItems);

// Country controller
router.post('/countries', CountryController.newCountry);
router.get('/countries', CountryController.getAllCountries);
router.get('/countries/:countryId', CountryController.getCountry);
router.put('/countries/:countryId', CountryController.updateCountry);
router.delete('/countries/:countryId', CountryController.deleteCountry);
router.get('/countries/:countryId/states', CountryController.getCountryStates);
router.get('/countries/:countryId/items', CountryController.getCountryItems);
router.get('/countries/:countryId/users', CountryController.getCountryUsers);
router.get('/countries/:countryId/cities', CountryController.getCountryCities);

// Review controller
router.post('/reviews', ReviewController.newReview);
router.get('/reviews', ReviewController.getAllReviews);
router.get('/reviews/:reviewId', ReviewController.getReview);
router.put('/reviews/:reviewId', ReviewController.updateReview);
router.delete('/reviews/:reviewId', ReviewController.deleteReview);

module.exports = router;
