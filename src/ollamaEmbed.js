// ollamaEmbed.js
// ES6 module to request embeddings from Ollama
import 'dotenv/config'

export async function getEmbedding(prompt) {
    const response = await fetch(`http://${process.env.HOST}:${process.env.PORT}/api/embeddings`, {
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

  export async function getChatMessage(messages) {
    const response = await fetch(`http://${process.env.HOST}:${process.env.PORT}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gemma3:12b", 
        //model: "gemma3", 
        //model: "gemma:2b", // lightweight model
        messages,
        options: {
          quantize: "Q4_K_M"   // or "q5_K_M", "q8_0" depending on your GPU
        }
      })
    });
  
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";
    let fullReply = "";
  
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
  
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop(); // keep incomplete line
  
      for (const line of lines) {
        if (!line.trim()) continue;
        const data = JSON.parse(line);
  
        if (data.message?.content) {
          fullReply += data.message.content;
        }
  
        if (data.done) {
          return fullReply.trim();
        }
      }
    }
  
    return fullReply.trim();

  }

/*
import fetch from "node-fetch"; // If Node <18, install with: npm install node-fetch

export async function getChatMessage(prompt) {
  const response = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gemma3", // make sure you've pulled this model: ollama pull gemma3
      messages: [{ role: "user", content: prompt }]
    })
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffer = "";
  let fullReply = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop(); // keep incomplete line

    for (const line of lines) {
      if (!line.trim()) continue;
      const data = JSON.parse(line);

      if (data.message?.content) {
        fullReply += data.message.content;
      }

      if (data.done) {
        return fullReply.trim();
      }
    }
  }

  return fullReply.trim();
}

// Example usage:
(async () => {
  const reply = await getChatMessage("Hello Ollama, why is the sky blue?");
  console.log("Final reply:", reply);
})();
*/