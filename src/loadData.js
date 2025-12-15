import { redis } from "./redis/redis.js"
import { generateSentenceEmbeddings } from "./text-vector-gen.js"
import { quotes } from './quotes.js'

async function main() {
  console.log('number of quotes is', quotes.length)
  process.stdout.write('Loading')
  await redis.connect();
  for (let i = 0; i < quotes.length; i++) { 
    process.stdout.write(".");
    //quotes[i].embeddings = await generateSentenceEmbeddings(quotes[i].quote);
    const embeddings = await generateSentenceEmbeddings(quotes[i].quote);
    //await redis.call("JSON.SET", `quote:${i+1}`, "$", JSON.stringify(quotes[i]));
    await redis.vAdd("quotes", embeddings, `quote:${i+1}`, {
      SETATTR: quotes[i]
    });
  }
  console.log('Done')
  await redis.close()
}

main()

/*
   Node-Redis
   https://www.npmjs.com/package/redis
*/


/*  
FT.CREATE idx:quotes ON JSON PREFIX 1 quote:
  SCHEMA
  $.author as author TEXT NOSTEM SORTABLE
  $.quote as quote TEXT NOSTEM SORTABLE
  $.source as source TEXT NOSTEM SORTABLE
  $.embeddings as embeddings VECTOR FLAT 10
          TYPE FLOAT32
          DIM 768
          DISTANCE_METRIC L2
          INITIAL_CAP 111
          BLOCK_SIZE  111


FT.SEARCH idx:bikes_vss "(*)=>[KNN 3 @embeddings $query_vector]" PARAMS 2 "query_vector" "Z\xf8\x15:\xf23\xa1\xbfZ\x1dI>\r\xca9..." SORTBY "__vector_score" ASC RETURN 2 "__vector_score" "description" DIALECT 2

FT.SEARCH idx:quotes "(*)=>[KNN 3 @field $embeddings]" PARAMS 2 embeddings "binary_data" DIALECT 2

*/
/*
   VSIM quotes ELE quote:241 WITHSCORES WITHATTRIBS COUNT 5

   VSIM quotes ELE quote:241 WITHSCORES WITHATTRIBS COUNT 5 FILTER ".author == 'George Orwell'"   
*/
