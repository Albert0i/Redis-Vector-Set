// testconn.js
import { redis } from './redis/redis.js'

async function testConnection() {
  // Create a Redis client (default: localhost:6379)

  try {
    await redis.connect();
    console.log('✅ Connected to Redis');

    // Send a simple PING command
    const pong = await redis.ping();
    console.log('Redis PING response:', pong);

    // Optionally set and get a test key
    await redis.set('test:key', 'Hello Redis');
    const value = await redis.get('test:key');
    console.log('Test key value:', value);

  } catch (err) {
    console.error('❌ Redis test failed:', err);
  } finally {
    await redis.close()
    console.log('🔌 Disconnected from Redis');
  }
}

testConnection();
