// vadd.js
import { redis } from './redis/redis.js'

async function vadd() {
  // Create a Redis client (default: localhost:6379)

  try {
    await redis.connect();
    console.log('✅ Connected to Redis');

    // Create a text embedding vector set
    await redis.sendCommand([
      'VADD', 'products', 'VALUES', '5', '1.0', '0.2', '0.5', '0.8', '0.1', 'product:1001'
    ]);
    
    // Add another vector to the set
    await redis.sendCommand([
      'VADD', 'products', 'VALUES', '5', '0.9', '0.3', '0.4', '0.7', '0.2', 'product:1002'
    ]);

  } catch (err) {
    console.error('❌ Redis test failed:', err);
  } finally {
    await redis.close()
    console.log('🔌 Disconnected from Redis');
  }
}

await vadd() 

// async function testVadd() {
//   // Create a Redis client (default: localhost:6379)

//   try {
//     await redis.connect();
//     console.log('✅ Connected to Redis');

//     // Create a text embedding vector set
//     await redis.sendCommand([
//       'VADD', 'products', 'VALUES', '5', '1.0', '0.2', '0.5', '0.8', '0.1', 'product:1001'
//     ]);
    
//     // Add another vector to the set
//     await redis.sendCommand([
//       'VADD', 'products', 'VALUES', '5', '0.9', '0.3', '0.4', '0.7', '0.2', 'product:1002'
//     ]);

//   } catch (err) {
//     console.error('❌ Redis test failed:', err);
//   } finally {
//     await redis.close()
//     console.log('🔌 Disconnected from Redis');
//   }
// }

// testVadd();
