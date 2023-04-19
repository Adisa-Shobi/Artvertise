const express = require('express');

const router = express.Router();

// Application router initialized
router.use((req, res, next) => {
  console.log('Router initialized');
  next();
});

router.get('/', (req, res) => {
  res.send('Welcome to Artvertise');
});

module.exports = router;
