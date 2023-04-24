const express = require('express');
const multer = require('multer');
const fs = require('fs');
const passport = require('passport');
const ItemController = require('../controllers/ItemController');
const ImageController = require('../controllers/ImageController');
const UserController = require('../controllers/UserController');
const StateController = require('../controllers/StateController');
const CityController = require('../controllers/CityController');

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

router.get('/', (req, res) => {
  res.send('Welcome to Artvertise');
});

// Item handler Routes
router.get('/items', ItemController.getAllItems);
router.post('/items', upload.single('image'), ItemController.newItem);
router.get('/items/:itemId', ItemController.getItem);
router.put('/items/:itemId', ItemController.updateItem);
router.delete('/items/:itemId', ItemController.deleteItem);

// Routes for handling image thumbnails
router.get('/thumbnails/:filename', ImageController.getImage);

// User handler routes
router.put('/users/:userId', UserController.updateUser);
router.get('/users/:userId', UserController.getUser);
router.get('/users/me', UserController.getCurrentUser);
router.get('/users/', UserController.getUsers);
router.get('/users/:userId/items', UserController.getUserItems);
router.get('/users/:userId/items/:itemId', UserController.getUserItem);
router.delete('/users/:userId/items/:itemId', UserController.deleteUserItem);

// State handler routes
router.post('/states', StateController.newState);
router.get('/states', StateController.getAllStates);
router.get('/states/:stateId', StateController.getState);
router.put('/states/:stateId', StateController.updateState);
router.delete('/states/:stateId', StateController.deleteState);
router.get('/state/:stateId/cities', StateController.getStateCities);
router.post('/state/:stateId/cities', StateController.newStateCity);
router.get('/state/:stateId/cities/:cityId', StateController.getStateCity);

// City handler
router.post('/city', CityController.newCity);
router.get('/city', CityController.getAllCities);
router.get('/city/:cityId', CityController.getCity);
router.put('/city/:cityId', CityController.updateCity);
router.delete('/city/:cityId', CityController.deleteCity);
router.get('/city/:cityId/users', CityController.getCityUsers);
router.get('/city/:cityId/items', CityController.getCityItems);

module.exports = router;
