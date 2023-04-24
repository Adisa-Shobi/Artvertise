const { ObjectId } = require('mongodb');
const dbClient = require('../utils/db');
const Tools = require('../helpers/tools');
const CityController = require('./CityController');

class StateController {
  /**
     *Creates and stores a new state object
     */
  static async newState(req, res) {
    const { name, countryId } = req.body;

    if (!name || !countryId) {
      return res.status(400).json({ error: 'Incomplete parameters' });
    }

    let country;

    try {
      country = await dbClient.countries.findOne({ _id: ObjectId(countryId) });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!country) {
      return res.status(404).json({ error: 'Country not found' });
    }

    let state;
    try {
      state = await dbClient.states.insertOne(
        { name, countryId },
      );
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    state = Tools.prepJSON(state);
    return res.json(state);
  }

  /**
     *Retrieves paginated list of all states
     */
  static async getAllStates(req, res) {
    const { stateId = 0, page = 0 } = req.query;

    let query;
    if (stateId !== 0) {
      query = { _id: ObjectId(stateId) };
    } else {
      query = {};
    }

    const statePage = dbClient.states.aggregate([
      { $match: query },
      { $sort: { createdAt: -1 } },
      { $skip: parseInt(page, 10) * 10 },
      { $limit: 10 },
    ]);

    const stateData = await statePage.toArray();

    const filteredData = stateData.map((current) => Tools.prepJSON(current));

    return res.json(filteredData);
  }

  /**
     *Retrieves specified state by id
     */
  static async getState(req, res) {
    const { stateId } = req.params;

    let state;
    try {
      state = await dbClient.states.findOne({ _id: ObjectId(stateId) });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!state) {
      return res.status(404).json({ error: 'State not Found' });
    }

    return res.json(state);
  }

  /**
     *Updates state data
     */
  static async updateState(req, res) {
    const { stateId } = req.params;
    const updateObj = req.body;
    const allowedFields = ['name', 'countryId'];

    console.log(Tools.objPropsInList(updateObj, allowedFields));
    if (!Tools.objPropsInList(updateObj, allowedFields)) {
      return res.status(404).json({ error: 'Illegal field value supplied' });
    }

    if (updateObj.countryId) {
      let country;

      try {
        country = await dbClient.countries.findOne(
          { _id: ObjectId(updateObj.countryId) },
        );
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }

      if (!country) {
        return res.status(404).json({ error: 'Country not found' });
      }
    }

    let state;
    try {
      state = await dbClient.states.updateOne(
        { _id: ObjectId(stateId) },
        { $set: updateObj },
      );
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    if (state.matchedCount === 0) return res.status(404).json({ error: 'State not found' });
    return res.json(state.result);
  }

  /**
     *Deletes a state object
     */
  static async deleteState(req, res) {
    const { stateId } = req.params;

    let result;
    try {
      result = await dbClient.states.deleteOne(
        { _id: ObjectId(stateId) },
      );
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    if (result.deletedCount === 0) return res.status(404).json({ error: 'State not Found' });

    return res.json(result.result);
  }

  /**
     *Retrieves all cities within specified city
     */
  static async getStateCities(req, res) {
    const { stateId } = req.params;

    let cities;
    try {
      cities = await dbClient.cities.find(
        { stateId },
      );
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.json(cities);
  }

  /**
     *Creates new city within specified state
     */
  static async newStateCity(req, res) {
    const { stateId } = req.params;

    let state;
    try {
      state = await dbClient.states.findOne({ _id: ObjectId(stateId) });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!state) {
      return res.status(404).json({ error: 'State not found' });
    }

    req.body.stateId = stateId;
    req.body.countryId = state.countryId;
    return CityController.newCity(req, res);
  }

  /**
     *Retrieves specified city within specified state
     */
  static async getStateCity(req, res) {
    const { stateId, cityId } = req.params;

    let city;
    try {
      city = await dbClient.cities.findOne(
        { _id: ObjectId(cityId), stateId },
      );
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!city) {
      return res.status(404).json({ error: 'City not found' });
    }

    return res.json(city);
  }
}

module.exports = StateController;
