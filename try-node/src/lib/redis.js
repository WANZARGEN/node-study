import redis from 'redis';

const client = redis.createClient();

client.on("error", function (err) {
  console.error("Redis client connection error: " + err);
});

export default client;
