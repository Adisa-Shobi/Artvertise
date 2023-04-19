const redis = require('redis');
const promisify = require('util');

class RedisClient {
  constructor() {
    this.client = redis.createClient();

    this.client.on('error', (err) => {
      console.log(err.message);
    });

    this.getAsync = promisify(this.client.get).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    const value = await this.getAsync(key);
    return value;
  }

  async set(key, value, duration) {
    this.client.set(key, value, 'EX', duration);
  }

  async del(key) {
    const result = this.delAsync(key);
    return result;
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
