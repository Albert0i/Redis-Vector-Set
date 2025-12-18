// main.js
import { getEmbedding } from "./ollamaEmbed.js";

async function run() {
  try {
    const result = await getEmbedding(
      "Represent this sentence for searching relevant passages: The sky is blue because of Rayleigh scattering"
    );
    console.log("Embedding result:", result);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

run();

/*
   Ollama API Reference 
   https://docs.ollama.com/api-reference/get-version

   Ollama 
   https://github.com/ollama/ollama

   Ollama Javascript Library 
   https://github.com/ollama/ollama-js
*/

/*
ollama pull mxbai-embed-large

curl http://localhost:11434/api/embeddings -d ^
"{ \"model\": \"mxbai-embed-large\", ^
   \"prompt\": \"Represent this sentence for searching relevant passages: The sky is blue because of Rayleigh scattering\" }"

curl http://localhost:11434/api/embeddings -d ^
"{ \"model\": \"mxbai-embed-large\", ^
\"prompt\": \"Represent this sentence for searching relevant passages: The sky is blue because of Rayleigh scattering\" }"

mxbai-embed-large
https://ollama.com/library/mxbai-embed-large

*/