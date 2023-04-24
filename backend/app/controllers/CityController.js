const { ObjectId } = require('mongodb');
const dbClient = require('../utils/db');
const Tools = require('../helpers/tools');

class CityController {
  /**
     *Creates a new city object
     */
  static async newCity(req, res) {
    const { name, stateId, countryId } = req.body;

    if (!name || !stateId || !countryId) {
      res.status(400).json({ error: 'Invlid arguments supplied' });
    }

    try {
      const isState = await Tools.isState(stateId);
      const isCountry = await Tools.isCountry(countryId);

      if (!isState || !isCountry) {
        return res.status(404).json({ error: 'Invalid country or state id' });
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    let city;
    try {
      city = await dbClient.cities.insertOne(
        { name, stateId, countryId },
      );
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    city = Tools.prepJSON(city);

    return res.json(city);
  }

  /**
     *Retrieves a paginate view of all cities
     */
  static async getAllCities(req, res) {
    const { stateId = 0, countryId = 0, page = 0 } = req.query;

    const query = {};
    if (countryId !== 0) query.countryId = countryId;
    if (stateId !== 0) query.stateId = stateId;

    const cityPage = dbClient.cities.aggregate([
      { $match: query },
      { $sort: { createdAt: -1 } },
      { $skip: parseInt(page, 10) * 10 },
      { $limit: 10 },
    ]);

    const cityData = await cityPage.toArray();

    const filteredData = cityData.map((current) => Tools.prepJSON(current));

    return res.json(filteredData);
  }

  /**
     *Retrieves a city based on id
     */
  static async getCity(req, res) {
    const { cityId } = req.params;

    let city;
    try {
      city = await dbClient.cities.findOne({ _id: ObjectId(cityId) });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!city) {
      return res.send(404).json({ error: 'City not found' });
    }

    const filteredData = Tools.prepJSON(city);
    return res.json(filteredData);
  }

  /**
     *Updates city information
     */
  static async updateCity(req, res) {
    const { cityId } = req.params;
    const updateObj = req.body;
    const allowedFields = ['name'];

    console.log(Tools.objPropsInList(updateObj, allowedFields));
    if (!Tools.objPropsInList(updateObj, allowedFields)) {
      return res.status(404).json({ error: 'Illegal field value supplied' });
    }

    let city;
    try {
      city = await dbClient.cities.updateOne(
        { _id: ObjectId(cityId) },
        { $set: updateObj },
      );
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    if (city.matchedCount === 0) return res.status(404).json({ error: 'City not found' });
    return res.json(city.result);
  }

  /**
     *Deletes City specified by Id
     */
  static async deleteCity(req, res) {
    const { cityId } = req.params;

    let result;
    try {
      result = await dbClient.cities.deleteOne(
        { _id: ObjectId(cityId) },
      );
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    if (result.deletedCount === 0) return res.status(404).json({ error: 'City not Found' });

    return res.json(result.result);
  }

  /**
     *Retrieves user within specified city
     */
  static async getCityUsers(req, res) {
    const { page = 0 } = req.query;
    const { cityId } = req.params;

    const userPage = dbClient.users.aggregate([
      { $match: { cityId } },
      { $sort: { createdAt: -1 } },
      { $skip: parseInt(page, 10) * 10 },
      { $limit: 10 },
    ]);

    const userData = await userPage.toArray();

    const filteredData = userData.map((current) => Tools.prepJSON(current));

    return res.json(filteredData);
  }

  /**
     *Retrieves items within specified city
     */
  static async getCityItems(req, res) {
    const { page = 0 } = req.query;
    const { cityId } = req.params;

    const itemPage = dbClient.items.aggregate([
      { $match: { cityId } },
      { $sort: { createdAt: -1 } },
      { $skip: parseInt(page, 10) * 10 },
      { $limit: 10 },
    ]);

    const itemData = await itemPage.toArray();

    const filteredData = itemData.map((current) => Tools.prepJSON(current));

    return res.json(filteredData);
  }
}

module.exports = CityController;
