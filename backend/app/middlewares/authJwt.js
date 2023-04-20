const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  // Get the bearer token from the Authorization header
  const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);

  if (!token) {
    // If there's no token, send an unauthorized response
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
      // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

      // Attach the decoded payload to the request object
      console.log(decoded);
    req.user = decoded;

    // Call the next middleware function
    next();
  } catch (error) {
      // If the token is invalid, send an unauthorized response
      console.log(error.message);
    res.status(401).json({ error: error.message });
  }
}

module.exports = { verifyToken }
