// ollamaEmbed.js
// ES6 module to request embeddings from Ollama

export async function getEmbedding(prompt) {
    const response = await fetch("http://localhost:11434/api/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mxbai-embed-large",
        prompt
      })
    });
  
    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }
  
    const data = await response.json();
    return data; // contains the embedding vector
  }
  