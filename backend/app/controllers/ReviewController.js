const { ObjectId } = require('mongodb');
const Tools = require('../helpers/tools');
const dbClient = require('../utils/db');

class ReviewController {
  /**
     *Creates a new item review
     */
  static async newReview(req, res) {
    const {
      userId, rating, description, itemId,
    } = req.body;

    if (!userId || !rating || !description || !itemId) {
      return res.status(400).json({ error: 'Invalid arguments supplied' });
    }

    const ratingInt = parseInt(rating, 10);
    if (!Tools.isDigits(rating) || ratingInt > 5 || ratingInt < 0) {
      return res.status(400).json({ error: 'Rating must be an int between 1 an 5' });
    }

    try {
      const isUser = Tools.isUser(userId);
      const isItem = Tools.isItem(itemId);

      if (!isUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      if (!isItem) {
        return res.status(404).json({ error: 'Item not found' });
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    let review;
    try {
      review = await dbClient.reviews.insertOne(
        {
          userId,
          itemId,
          rating,
          description,
        },
      );
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    const filteredData = Tools.prepJSON(review.ops);
    return res.json(filteredData);
  }

  /**
     *Retrieves all Review objects
     */
  static async getAllReviews(req, res) {
    const { userId = 0, itemId = 0, page = 0 } = req.query;

    const query = {};
    if (userId !== 0) query.userId = userId;
    if (itemId !== 0) query.itemId = itemId;

    const reviewPage = dbClient.reviews.aggregate([
      { $match: query },
      { $sort: { createdAt: -1 } },
      { $skip: parseInt(page, 10) * 10 },
      { $limit: 10 },
    ]);

    const reviewData = await reviewPage.toArray();

    const filteredData = reviewData.map((current) => Tools.prepJSON(current));

    return res.json(filteredData);
  }

  /**
     * Retrieves the review based on
     */
  static async getReview(req, res) {
    const { reviewId } = req.params;

    let review;
    try {
      review = await dbClient.reviews.findOne({ _id: ObjectId(reviewId) });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!review) {
      return res.send(404).json({ error: 'Review not found' });
    }

    const filteredData = Tools.prepJSON(review);
    return res.json(filteredData);
  }

  /**
     *Updates the specified review object
     */
  static async updateReview(req, res) {
    const { reviewId } = req.params;
    const updateObj = req.body;
    const allowedFields = ['description', 'rating'];

    console.log(Tools.objPropsInList(updateObj, allowedFields));
    if (!Tools.objPropsInList(updateObj, allowedFields)) {
      return res.status(404).json({ error: 'Illegal field value supplied' });
    }

    if (updateObj.rating) {
      const ratingInt = parseInt(updateObj.rating, 10);
      if (!Tools.isDigits(updateObj.rating) || ratingInt > 5 || ratingInt < 0) {
        return res.status(400).json({ error: 'Rating must be an int between 1 an 5' });
      }
    }

    let review;
    try {
      review = await dbClient.reviews.updateOne(
        { _id: ObjectId(reviewId) },
        { $set: updateObj },
      );
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    if (review.matchedCount === 0) return res.status(404).json({ error: 'Review not found' });
    return res.json(review.result);
  }

  /**
     *Deletes specified review object
     */
  static async deleteReview(req, res) {
    const { reviewId } = req.params;

    let result;
    try {
      result = await dbClient.reviews.deleteOne(
        { _id: ObjectId(reviewId) },
      );
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    if (result.deletedCount === 0) return res.status(404).json({ error: 'Review not Found' });

    return res.json(result.result);
  }
}

module.exports = ReviewController;
