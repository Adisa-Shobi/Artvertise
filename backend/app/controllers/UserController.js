const dbClient = require('../utils/db');
const sha1 = require('sha1');

class UserController{
    static async postNew (req, res) {
	const { email, password } = req.body;


	if (!email)
	    return res.status(400).json({error: "Missing email"})

	if (!password || password.length < 8)
	    return res.status(400).json({error: "Missing or incomplete password"})

	// Check if the user being created already exists
	const isUser = await dbClient.users.findOne(
	    { email }
	);

	// If the user already exists return an error
	if (isUser)
	    return res.status(400).json({error: "Email already exists"});

	const sha1password = sha1(password);
	let user;
	try {
	    user = await dbClient.users.insertOne(
		{ email, password: sha1password, active: true }
	    )
	} catch (err) {
	    res.status(400).json({ error: err.message })
	}

	const userData = { id: user.insertedId, email };
	return res.status(201).send(userData);
    }
}

module.exports = UserController;
