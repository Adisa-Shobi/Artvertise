const { ObjectId } = require('mongodb');
const dbClient = require('../utils/db');
const Tools = require('../helpers/tools');

class CountryController {
  /**
     *Creates and stores a new country object
     */
  static async newCountry(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'No name supplied' });
    }

    const isCountry = await dbClient.countries.findOne({ name });

    if (isCountry) {
      return res.status(400).json({ error: 'Country already exists' });
    }

    let country;
    try {
      country = await dbClient.countries.insertOne(
        { name },
      );
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    country = Tools.prepJSON(country);
    return res.json(country.ops);
  }

  /**
     *Retrieves a paginated list of all countries
     */
  static async getAllCountries(req, res) {
    const { countryId = 0, page = 0 } = req.query;

    const query = {};
    if (countryId !== 0) query.countryId = countryId;

    const countryPage = dbClient.countries.aggregate([
      { $match: query },
      { $sort: { createdAt: -1 } },
      { $skip: parseInt(page, 10) * 10 },
      { $limit: 10 },
    ]);

    const countryData = await countryPage.toArray();

    const filteredData = countryData.map((current) => Tools.prepJSON(current));

    return res.json(filteredData);
  }

  /**
     *Retrieves specified country by id
     */
  static async getCountry(req, res) {
    const { countryId } = req.params;

    let country;
    try {
      country = await dbClient.countries.findOne(
        { _id: ObjectId(countryId) },
      );
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!country) {
      return res.status(404).json({ error: 'Country not found' });
    }

    const filteredData = Tools.prepJSON(country);
    return res.json(filteredData);
  }

  /**
     *Updates country information
     */
  static async updateCountry(req, res) {
    const { countryId } = req.params;
    const updateObj = req.body;
    const allowedFields = ['name'];

    console.log(Tools.objPropsInList(updateObj, allowedFields));
    if (!Tools.objPropsInList(updateObj, allowedFields)) {
      return res.status(404).json({ error: 'Illegal field value supplied' });
    }

    let country;
    try {
      country = await dbClient.countries.updateOne(
        { _id: ObjectId(countryId) },
        { $set: updateObj },
      );
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    if (country.matchedCount === 0) return res.status(404).json({ error: 'Country not found' });
    return res.json(country.result);
  }

  /**
     *Deletes City specified by Id
     */
  static async deleteCountry(req, res) {
    const { countryId } = req.params;

    let result;
    try {
      result = await dbClient.countries.deleteOne(
        { _id: ObjectId(countryId) },
      );
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    if (result.deletedCount === 0) return res.status(404).json({ error: 'Country not Found' });

    return res.json(result.result);
  }

  /**
     *Retrieves all states within specified country
     */
  static async getCountryStates(req, res) {
    const { page = 0 } = req.query;
    const { countryId } = req.params;

    const statesPage = dbClient.states.aggregate([
      { $match: { countryId } },
      { $sort: { createdAt: -1 } },
      { $skip: parseInt(page, 10) * 10 },
      { $limit: 10 },
    ]);

    const statesData = await statesPage.toArray();

    const filteredData = statesData.map((current) => Tools.prepJSON(current));

    return res.json(filteredData);
  }

  /**
     *Retrieves all items within specified country
     */
  static async getCountryItems(req, res) {
    const { page = 0 } = req.query;
    const { countryId } = req.params;

    const itemsPage = dbClient.items.aggregate([
      { $match: { countryId } },
      { $sort: { createdAt: -1 } },
      { $skip: parseInt(page, 10) * 10 },
      { $limit: 10 },
    ]);

    const itemsData = await itemsPage.toArray();

    const filteredData = itemsData.map((current) => Tools.prepJSON(current));

    return res.json(filteredData);
  }

  /**
     *Retrieves all users within specified country
     */
  static async getCountryUsers(req, res) {
    const { page = 0 } = req.query;
    const { countryId } = req.params;

    const usersPage = dbClient.users.aggregate([
      { $match: { countryId } },
      { $sort: { createdAt: -1 } },
      { $skip: parseInt(page, 10) * 10 },
      { $limit: 10 },
    ]);

    const usersData = await usersPage.toArray();

    const filteredData = usersData.map((current) => Tools.prepJSON(current));

    return res.json(filteredData);
  }

  /**
     *Retrieves all items within specified country
     */
  static async getCountryCities(req, res) {
    const { page = 0 } = req.query;
    const { countryId } = req.params;

    const cityPage = dbClient.cities.aggregate([
      { $match: { countryId } },
      { $sort: { createdAt: -1 } },
      { $skip: parseInt(page, 10) * 10 },
      { $limit: 10 },
    ]);

    const cityData = await cityPage.toArray();

    const filteredData = cityData.map((current) => Tools.prepJSON(current));

    return res.json(filteredData);
  }
}

module.exports = CountryController;
