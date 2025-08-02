const redis = require("redis")

const redisClient = redis.createClient({
  legacyMode: true,
  socket: {
    host: '127.0.0.1', // IP of Redis from WSL
    port: 6379
  }
}); 

redisClient.connect()
  .then(() => console.log('✅ Redis Connected'))
  .catch((err) => console.error('❌ Redis Connection Error:', err));

module.exports = redisClient;