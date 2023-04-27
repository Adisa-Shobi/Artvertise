const { ObjectId } = require('mongodb');
const path = require('path');
const dbClient = require('../utils/db');
const Tools = require('../helpers/tools');

class ItemController {
  /**
     * Retrieves paginated view of all items
     *
     */
  static async getAllItems(req, res) {
    const { userId = 0, page = 0 } = req.query;

    // Set the query parameters
    let query;

    if (userId !== 0) {
      query = { userId };
    } else {
      query = {};
    }

    const itemPage = dbClient.items.aggregate([
      { $match: query },
      { $sort: { createdAt: -1 } },
      { $skip: parseInt(page, 10) * 10 },
      { $limit: 10 },
    ]);

    const pageData = await itemPage.toArray();

    const filteredData = pageData.map((current) => {
      const obj = current;
      obj.id = obj._id;
      delete obj._id;
      return obj;
    });

    return res.json(filteredData);
  }

  /**
     *Request handler creates a new item
     */
  static async newItem(req, res) {
    const {
      userId, auctionable, price, name, description,
    } = req.body;
    const { file } = req;
    const filePath = path.join(__dirname, 'uploads', file.filename);
    console.log(filePath);

    if (!userId || !auctionable || !price || !name || !description) {
      Tools.removeImg(filePath);
      return res.status(400).json({ error: 'Invalid data fields' });
    }

    if (!file) {
      return res.status(400).json({ error: 'Display image not supplied' });
    }

    // Check if price contains all digits
    const isValidPrice = Tools.isDigits(price);
    if (!isValidPrice) {
      Tools.removeImg(filePath);
      return res.status(400).json({ error: 'Invalid price valiue' });
    }

    if (auctionable !== 'true' && auctionable !== 'false') {
      Tools.removeImg(filePath);
      return res.status(400).json({ error: "'auctionable' must be a boolean" });
    }

    const user = await dbClient.users.findOne({ _id: ObjectId(userId) });

    if (!user) {
      Tools.removeImg(filePath);
      return res.status(404).json({ error: 'User not Found' });
    }

    let newItem;
    try {
      newItem = await dbClient.items.insertOne(
        {
          name,
          price,
          userId,
          image: file.filename,
          auctionable,
          description,
        },
      );
    } catch (err) {
      Tools.removeImg(filePath);
      return res.status(500).json({ error: err.message });
    }

    return res.status(201).json(newItem.ops);
  }

  /**
     * Retrieves item by given id
     */
  static async getItem(req, res) {
    const { itemId } = req.params;

    if (!itemId) {
      return res.status(400).json({ error: 'Invalid itemId' });
    }

    let item;
    try {
      item = await dbClient.items.findOne({ _id: ObjectId(itemId) });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.json(item);
  }

  /**
     *Updates the item data
     */
  static async updateItem(req, res) {
    const { itemId } = req.params;
    const updateObj = req.body;
    const allowedFields = ['auctionable', 'price', 'name', 'description'];

    if (!itemId) {
      return res.status(400).json({ error: 'Invalid itemId' });
    }

    console.log(Tools.objPropsInList(updateObj, allowedFields));
    if (!Tools.objPropsInList(updateObj, allowedFields)) {
      return res.status(404).json({ error: 'Illegal field value supplied' });
    }

    let item;
    try {
      item = await dbClient.items.updateOne(
        { _id: ObjectId(itemId) },
        { $set: updateObj },
      );
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    if (item.matchedCount === 0) return res.status(404).json({ error: 'Item not found' });
    return res.json(item.result);
  }

  /**
     *Deletes the specified item from database
     */
  static async deleteItem(req, res) {
    const { itemId } = req.params;

    if (!itemId) {
      return res.status(400).json({ error: 'Invalid itemId' });
    }

    let result;
    try {
      result = await dbClient.items.deleteOne(
        { _id: ObjectId(itemId) },
      );
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    if (result.deletedCount === 0) return res.status(404).json({ error: 'Item not Found' });

    return res.json(result.result);
  }

  /**
     *Retrieves the average rating of an item
     */
  static async getRating(req, res) {
    const { itemId } = req.params;

    if (!itemId) {
	    return res.status(400).json({ error: 'Invalid itemId' });
    }

    let result;
    try {
	    result = await dbclient.reviews.aggregate([
        {
          $group:
		  {
		      id: null,
		      average: { $avg: '$rating' },
		  },
        },
	    ]);
    } catch (err) {
	    return res.status(500).json({ error: err.message });
    }

    result = await result.toArray();
    return res.json(result);
  }

  static async getItemReviews(req, res) {
    const { page = 0 } = req.query;
    const { itemId } = req.params;

    const itemPage = dbClient.reviews.aggregate([
	    { $match: { itemId } },
	    { $sort: { createdAt: -1 } },
	    { $skip: parseInt(page, 10) * 10 },
	    { $limit: 10 },
    ]);

    const itemData = await itemPage.toArray();

    const filteredData = itemData.map((current) => Tools.prepJSON(current));

    return res.json(filteredData);
  }
}

module.exports = ItemController;
