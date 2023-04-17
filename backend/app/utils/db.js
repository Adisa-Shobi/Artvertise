const { MongoClient } = require('mongodb');

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || '27017';
const DB_NAME = process.env.DB_NAME || 'db_artvertise';
const uri = `mongodb://${DB_HOST}:${DB_PORT}`;

class DBClient {
  /**
     * Creates a new mongodb client for DB operations
     * DB values set from environment variable or defaults
     */
  constructor() {
    this.failed = true;
    MongoClient.connect(
      uri,
      { userUnifiedTopology: true },
      (err, client) => {
        if (!err) {
          this.client = client;
          this.db = this.client.db(DB_NAME);
          this.users = this.db.collection('users');
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

module.exports = dbClient();
