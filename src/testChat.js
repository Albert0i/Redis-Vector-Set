// testChat.js
import readline from "readline";
import { getChatMessage } from "./ollamaEmbed.js";

// Conversation history
let messages = [
    {
      role: "system",
      content: "You are a helpful assistant. Answer clearly and concisely."
    },
    {
      role: "user",
      content: "Hello Ollama!"
    }
  ];

// Interactive loop
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Ask Ollama> "
});

console.log("Type your question and press Enter. Press Ctrl-C to exit.");
rl.prompt();

rl.on("line", async (line) => {
  const question = line.trim();
  if (!question) {
    rl.prompt();
    return;
  }

  // Add user message to history
  messages.push({ role: "user", content: question });

  try {
    const result = await getChatMessage(messages);
    console.log("Chat result:", result);

    // Add assistant reply to history
    messages.push({ role: "assistant", content: result });
  } catch (err) {
    console.error("Error:", err.message);
  }

  rl.prompt();
}).on("close", () => {
  console.log("\nGoodbye!");
  process.exit(0);
});

/*
async function run() {
  try {
    const result = await getChatMessage(
      "why is the sky blue?"
    );
    console.log("Chat result:", result);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

run();
*/

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