/*
   Adding vectors with VADD
*/

// Connect to Redis
const redis = require('redis');
const client = redis.createClient();

// Create a vector set and add vectors
async function addVectors() {
  // Create a text embedding vector set
  await client.sendCommand([
    'VADD', 'product_descriptions', 
    'product:1002', 'VALUES', '5', '1.0', '0.2', '0.5', '0.8', '0.1'
  ]);
  
  // Add another vector to the set
  await client.sendCommand([
    'VADD', 'product_descriptions',
    'product:1002', 'VALUES', '5', '0.9', '0.3', '0.4', '0.7', '0.2'
  ]);
  
  console.log('Vectors added successfully!');
}
