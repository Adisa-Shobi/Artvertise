const express = require('express');
const multer = require('multer');
const fs = require('fs');
const ItemController = require('../controllers/ItemController');
const ImageController = require('../controllers/ImageController');

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

// Application router initialized
router.use((req, res, next) => {
  console.log('Router initialized');
  next();
});

router.get('/', (req, res) => {
  res.send('Welcome to Artvertise');
});

// Routes for handling item objects
router.get('/items', ItemController.getAllItems);
router.post('/items', upload.single('image'), ItemController.newItem);
router.get('/items/:itemId', ItemController.getItem);
router.put('/items/:itemId', ItemController.updateItem);
router.delete('/items/:itemId', ItemController.deleteItem);

// Routes for handling image thumbnails
router.get('/thumbnails/:filename', ImageController.getImage);

module.exports = router;
