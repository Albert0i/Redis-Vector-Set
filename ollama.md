
# 🖥️ Tutorial: Setup and Use Ollama Server on Windows 11

## 1. Install Ollama
1. Go to [Ollama Download Page](https://ollama.com/download).
2. Select the **Windows installer** (currently in preview).
3. Run the installer — it sets up the Ollama service and CLI (`ollama.exe`).
4. Verify installation:
   ```cmd
   ollama --version
   ```
   If successful, you’ll see the version number.

---

## 2. Pull a Model
Before you can use embeddings or chat, you need to download a model:
```cmd
ollama pull mxbai-embed-large
```
This fetches the **MXBAI Embed Large** model for embeddings.  
Other models: `llama2`, `mistral`, `gemma`, etc.

---

## 3. Run Ollama Server
- Ollama runs automatically as a background service after installation.  
- It listens on:
  ```
  http://localhost:11434
  ```
- Test the server:
  ```cmd
  curl http://localhost:11434
  ```
  You should get a basic JSON response confirming the API is live.

---

## 4. Invoke via CLI in `cmd.exe`

### Example: Generate Embeddings
```cmd
curl http://localhost:11434/api/embeddings -d ^
"{ \"model\": \"mxbai-embed-large\", ^
\"prompt\": \"Represent this sentence for searching relevant passages: The sky is blue because of Rayleigh scattering\" }"
```

### Notes:
- Use `^` for line continuation in `cmd.exe`.
- Escape quotes with `\"`.
- The response will be JSON containing the embedding vector.

---

## 5. Use Ollama in Node.js (ES6)

### Step 1: Create a module `ollamaEmbed.js`
```js
// ollamaEmbed.js
export async function getEmbedding(prompt) {
  const response = await fetch("http://localhost:11434/api/embeddings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "mxbai-embed-large",
      prompt
    })
  });

  if (!response.ok) {
    throw new Error(`Ollama API error: ${response.statusText}`);
  }

  return await response.json(); // contains the embedding vector
}
```

### Step 2: Invoke from another file `main.js`
```js
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
```

### Step 3: Run the program
```cmd
node main.js
```

---

## 6. What You’ll Get
- The Ollama server will return a JSON object with the embedding vector:
  ```json
  {
    "embedding": [0.0123, -0.0456, 0.0789, ...]
  }
  ```
- You can store this vector in Redis or another vector database for semantic search.

---

## ✅ Recap
- **Install Ollama** → Windows installer.  
- **Pull a model** → `ollama pull mxbai-embed-large`.  
- **Invoke via CLI** → `curl` with JSON payload.  
- **Use in Node.js** → ES6 module with `fetch` or `axios`.  
- Ollama runs locally on `http://localhost:11434` and returns embeddings or chat responses.

