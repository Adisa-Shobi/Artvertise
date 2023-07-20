const { MongoClient } = require('mongodb');

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || '27017';
const DB_NAME = process.env.DB_NAME || 'db_artvertise';
const uri = process.env.DB_URI || `mongodb://${DB_HOST}:${DB_PORT}`;

class DBClient {
  /**
     * Creates a new mongodb client for DB operations
     * DB values set from environment variable or defaults
     */
  constructor() {
    this.failed = true;
    MongoClient.connect(
      uri,
      { useUnifiedTopology: true },
      (err, client) => {
        if (!err) {
          this.client = client;
          this.db = this.client.db(DB_NAME);
          this.users = this.db.collection('users');
          this.items = this.db.collection('items');
          this.cities = this.db.collection('cities');
          this.states = this.db.collection('states');
          this.users = this.db.collection('users');
          this.countries = this.db.collection('countries');
          this.reviews = this.db.collection('reviews');
          this.failed = false;
        } else {
          console.log(err.message);
        }
      },
    );
  }

  /**
* Ensures connection to the database is live
*/
  static isAlive() {
    return this.failed;
  }
}

const dbClient = new DBClient();

module.exports = dbClient;
