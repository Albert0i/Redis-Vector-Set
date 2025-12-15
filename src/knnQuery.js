import { redisClient, disconnect } from "./redis/redisClient.js"
import { generateSentenceEmbeddings } from "./text-vector-gen.js"

const float32Buffer = (arr) => {
    const floatArray = new Float32Array(arr);
    const float32Buffer = Buffer.from(floatArray.buffer);
    return float32Buffer;
  };

//A KNN query will give us the top n documents that best match the query vector.
/*  sample raw query

    FT.SEARCH idx:products
    "*=>[KNN 5 @productDescriptionEmbeddings $searchBlob AS score]"
    RETURN 4 score brandName productDisplayName imageURL
    SORTBY score
    PARAMS 2 searchBlob "6\xf7\..."
    DIALECT 2
*/
const queryQuoteEmbeddingsByKNN = async (
      _searchTxt,
      _resultCount,
    ) => {
    console.log(`queryQuotesEmbeddingsByKNN started`);
    let results = {};
    if (_searchTxt) {
      _resultCount = _resultCount ?? 5;
      const searchTxtVectorArr = await generateSentenceEmbeddings(_searchTxt);
      const searchQuery = `(*)=>[KNN ${_resultCount} @embeddings $searchBlob AS score]`;
  
      results = await redisClient.call('FT.SEARCH', 
                                       'idx:quotes', 
                                       searchQuery, 
                                       'RETURN', 4, 'score', 'author', 'quote', 'source', 
                                       'SORTBY', 'score', 'ASC', 
                                       'PARAMS', 2, 'searchBlob', 
                                                    float32Buffer(searchTxtVectorArr), 
                                       'DIALECT', 2);
    } else {
      throw 'Search text cannot be empty';
    }
  
    return results;
  };

async function main() {
  const results = await queryQuoteEmbeddingsByKNN('dream love death')
  console.log(results)
  await disconnect()
}

main()
/*
   FT.SEARCH
   https://redis.io/docs/latest/commands/ft.search/

   Vector search
   https://redis.io/docs/latest/develop/interact/search-and-query/query/vector-search/

  FT.SEARCH index "(*)=>[KNN num_neighbours @field $vector]" PARAMS 2 vector "binary_data" DIALECT 2

  1. Pre-filter: The first expression within the round brackets is a filter. It allows you to decide which vectors should be taken into account before the vector search is performed. The expression (*) means that all vectors are considered.

  2. Next step: The => arrow indicates that the pre-filtering happens before the vector search.

  3. KNN query: The expression [KNN num_neighbours @field $vector] is a parameterized query expression. A parameter name is indicated by the $ prefix within the query string.

  4. Vector binary data: You need to use the PARAMS argument to substitute $vector with the binary representation of the vector. The value 2 indicates that PARAMS is followed by two arguments, the parameter name vector and the parameter value.

  5. Dialect: The vector search feature has been available since version two of the query dialect.
*/