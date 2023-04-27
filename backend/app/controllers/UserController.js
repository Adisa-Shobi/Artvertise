const sha1 = require('sha1');
const { ObjectId } = require('mongodb');
const dbClient = require('../utils/db');
const Tools = require('../helpers/tools');

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

  /**
     *Updates user data of a user
     */
  static async updateUser(req, res) {
    const { userId } = req.params;
    const updateObj = req.body;
    const allowedFields = ['email', 'country', 'state', 'city', 'active'];

    if (!userId) {
      return res.status(400).json({ error: 'Invalid itemId' });
    }

    console.log(Tools.objPropsInList(updateObj, allowedFields));
    if (!Tools.objPropsInList(updateObj, allowedFields)) {
      return res.status(404).json({ error: 'Illegal field value supplied' });
    }

    let user;
    try {
      user = await dbClient.users.updateOne(
        { _id: ObjectId(userId) },
        { $set: updateObj },
      );
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    if (user.matchedCount === 0) return res.status(404).json({ error: 'Item not found' });
    return res.json(user.result);
  }

  /**
     *Return the current user belonging to Authentication
     */
  static async getCurrentUser(req, res) {
    if (req.isAuthenticated()) {
      return res.json(req.user);
    }
    return res.json({});
  }

  /**
     *Retrieves a user based on id
     */
  static async getUser(req, res) {
    const { userId } = req.params;

    const user = await dbClient.users.findOne(
      { _id: ObjectId(userId) },
    );

    if (!user) {
      return res.status(404).json({ error: 'User not Found' });
    }

    const filteredUser = Tools.cleanUser(user);

    return res.json(filteredUser);
  }

  /**
     *Retrieves all items belonging to a certain user
     */
  static async getUserItems(req, res) {
    const { userId } = req.params;
    const { page = 0 } = req.query;

    const query = { userId };

    let itemPage;
    try {
      itemPage = dbClient.items.aggregate([
        { $match: query },
        { $sort: { createdAt: -1 } },
        { $skip: parseInt(page, 10) * 10 },
        { $limit: 10 },
      ]);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    const itemData = await itemPage.toArray();

    const filteredData = itemData.map((current) => Tools.prepJSON(current));
    return res.json(filteredData);
  }

  /**
     *Retrieves a paginated list of all user
     */
  static async getUsers(req, res) {
    const { userId = 0, page = 0 } = req.query;

    // Set the query parameters
    let query;

    if (userId !== 0) {
      query = { _id: ObjectId(userId) };
    } else {
      query = {};
    }

    const userPage = dbClient.users.aggregate([
      { $match: query },
      { $sort: { createdAt: -1 } },
      { $skip: parseInt(page, 10) * 10 },
      { $limit: 10 },
    ]);

    const userData = await userPage.toArray();

    const filteredData = userData.map((current) => Tools.cleanUser(current));

    return res.json(filteredData);
  }

  /**
     *Retrieves specified item belonging to specified user
     */
  static async getUserItem(req, res) {
    const { userId, itemId } = req.params;

    let item;
    try {
      item = await dbClient.items.findOne(
        { _id: ObjectId(itemId), userId },
      );
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    return res.json(item);
  }

  /**
     *Deletes specified item belonging to specified user
     */
  static async deleteUserItem(req, res) {
    const { userId, itemId } = req.params;

    let result;
    try {
      result = await dbClient.items.deleteOne(
        { _id: ObjectId(itemId), userId },
      );
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Failed to delete item' });
    }

    return res.json(result.result);
  }

  static async getUserReviews(req, res) {
    const { page = 0 } = req.query;
    const { userId } = req.params;

    const itemPage = dbClient.reviews.aggregate([
      { $match: { userId } },
      { $sort: { createdAt: -1 } },
      { $skip: parseInt(page, 10) * 10 },
      { $limit: 10 },
    ]);

    const itemData = await itemPage.toArray();

    const filteredData = itemData.map((current) => Tools.prepJSON(current));

    return res.json(filteredData);
  }
}

module.exports = UserController;
