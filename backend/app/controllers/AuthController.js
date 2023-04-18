const sha1 = require('sha1');
const jwt = require('jsonwebtoken');
const dbClient = require('../utils/db');
const { TOKEN_SECRET } = require('../utils/config');

class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json(
        { error: 'email/password not fount' },
      );
    }

    let sha1Password;
    try {
      sha1Password = sha1(password);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    const user = await dbClient.users.findOne({ email, password: sha1Password });

    if (!user) return res.status(404).json({ error: 'Invalid Email or Password' });

    if (!user.active) return res.status(404).json({ error: 'User Deactivated' });

    const token = jwt.sign({ userId: user._id }, TOKEN_SECRET, { expiresIn: '1h' });
    console.log(user._id);

    return res.json({ token });
  }

  /**
     *Logs user out by clearing the client-side cookie
     *
     */
  static logout(req, res) {
    res.clearCookie('jwt');

    res.json({ message: 'You have been logged out' });
  }

  /**
     *Deactivates account till user reactivates it
     *
     */
  static async deactivate(req, res) {
    const { email } = req.body;

    if (!email) return res.status(404).json({ error: 'Email not found' });

    const user = dbClient.users.findOne({ email });

    if (!user) return res.status(404).json({ error: 'User not found' });

    if (user.active) {
      const update = { $set: { active: false } };
      await dbClient.users.updateOne({ email },
        update,
        (err) => res.status(500).json({ error: err.message }));
      return res.status(200).json({ message: 'User deactivated Successfully' });
    }
    return res.status(404).json({ error: 'User already deactivated' });
  }
}

module.exports = AuthController;
