/*
   Finding similar vectors with VSIM
*/

async function findSimilarProducts() {
    // Search for products similar to product:1001
    const results = await client.sendCommand([
      'VSIM', 'product_descriptions', 'ELE','product:1001', 'WITHSCORES'
    ]);
    
    // Results include product IDs and similarity scores
    console.log('Similar products:', results);
    
    // Search using a vector directly
    const queryVector = [0.95, 0.25, 0.45, 0.75, 0.15];
    const directResults = await client.sendCommand([
      'VSIM', 'product_descriptions', 'VALUES', '5', 
      ...queryVector, "WITHSCORES"
    ]);
    
    console.log('Direct vector search results:', directResults);
  }
