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