const sha1 = require('sha1');
const dbClient = require('../utils/db');

class UserController {
  static async postNew(req, res) {
    const {
      firstName, lastName, email, password, country, state, city,
    } = req.body;

    if (!email || !firstName || !lastName || !country || !state || !city) return res.status(400).json({ error: 'Invalid field arguments' });

    if (!password || password.length < 8) return res.status(400).json({ error: 'Invalid password' });

    // Check if the user being created already exists
    const isUser = await dbClient.users.findOne(
      { email },
    );

    // If the user already exists return an error
    if (isUser) return res.status(400).json({ error: 'Email already exists' });

    const sha1password = sha1(password);
    let user;
    try {
      user = await dbClient.users.insertOne(
        {
          firstName,
          lastName,
          email,
          password: sha1password,
          country,
          state,
          city,
          active: true,
        },
      );
    } catch (err) {
      res.status(400).json({ error: err.message });
    }

    const userData = { id: user.insertedId, email };
    return res.status(201).send(userData);
  }
}

module.exports = UserController;
