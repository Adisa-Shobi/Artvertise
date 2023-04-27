const fs = require('fs');
const { ObjectId } = require('mongodb');
const dbClient = require('../utils/db');

class Tools {
  /**
     *Checke if all the characters in a string are digits
     *
     */
  static isDigits(str) {
    return /^\d+$/.test(str);
  }

  static objPropsInList(obj, list) {
    return Object.keys(obj).every((prop) => list.includes(prop));
  }

  static removeImg(dir) {
    if (fs.existsSync(dir)) {
      // Remove the file
      fs.unlinkSync(dir, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('File removed');
        }
      });
    }
  }

  static cleanUser(user) {
    const mockObj = user;
    mockObj.id = mockObj._id;
    delete mockObj._id;
    delete mockObj.password;
    return mockObj;
  }

  static prepJSON(obj) {
    const mockObj = obj;
    mockObj.id = mockObj._id;
    delete mockObj._id;
    return mockObj;
  }

  static async isState(stateId) {
    const state = await dbClient.states.findOne(
      { _id: ObjectId(stateId) },
    );

    if (!state) {
      return false;
    }

    return true;
  }

  static async isCountry(countryId) {
    const country = await dbClient.countries.findOne(
      { _id: ObjectId(countryId) },
    );

    if (!country) {
      return false;
    }

    return true;
  }

  static async isCity(cityId) {
    const city = await dbClient.cities.findOne(
      { _id: ObjectId(cityId) },
    );

    if (!city) {
      return false;
    }

    return true;
  }

  static async isUser(userId) {
    const user = await dbClient.users.findOne(
      { _id: ObjectId(userId) },
    );

    if (!user) {
      return false;
    }

    return true;
  }

  static async isItem(itemId) {
    const item = await dbClient.items.findOne(
      { _id: ObjectId(itemId) },
    );

    if (!item) {
      return false;
    }

    return true;
  }
}

module.exports = Tools;
