const sha1 = require('sha1');
const jwt = require('jsonwebtoken');
const dbClient = require('../utils/db');

const { TOKEN_SECRET } = process.env;

class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json(
        { error: 'email/password not found' },
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

      const token = jwt.sign(
	  { sub: user._id, iat: Date.now() },
	  TOKEN_SECRET,
	  { expiresIn: '12h' }
      );
    console.log(user._id);

    user.token = `Bearer ${token}`;
    delete user.password;

    const resData = {
      success: 'ok',
      user,
    };
    return res.json(resData);
  }

  /**
     *Logs user out by clearing the client-side cookie
     *
     */
  static logout(req, res) {
    // res.clearCookie('jwt');
    console.log('You have been authorized');
    return res.json({ message: 'You have been logged out' });
  }

  /**
     *Deactivates account till user reactivates it
     *
     */
  static async deactivate(req, res) {
    console.log(req);
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
