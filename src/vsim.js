// vsim.js
import { redis } from './redis/redis.js'

async function testVsim() {
  // Create a Redis client (default: localhost:6379)

  try {
    await redis.connect();
    console.log('✅ Connected to Redis');

    // Search for products similar to product:1001
    const results = await redis.sendCommand([
      'VSIM', 'products', 'ELE','product:1001', 'WITHSCORES'
    ]);
    
    // Results include product IDs and similarity scores
    console.log('Similar products:', results);
    
    // Search using a vector directly
    const queryVector = ['0.95', '0.25', '0.45', '0.75', '0.15'];
    const directResults = await redis.sendCommand([
      'VSIM', 'products', 'VALUES', '5', 
      ...queryVector, "WITHSCORES"
    ]);
    
    console.log('Direct vector search results:', directResults);

  } catch (err) {
    console.error('❌ Redis test failed:', err);
  } finally {
    await redis.close()
    console.log('🔌 Disconnected from Redis');
  }
}

testVsim();
