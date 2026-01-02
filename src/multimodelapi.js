import fs from 'fs';
import 'dotenv/config'

async function main() {
  // Read the image file into a buffer
  const buffer = fs.readFileSync('./img/cat.jpg');

  // Convert buffer to base64 string
  const base64Image = buffer.toString('base64');

  // Build request body with proper structure
  const body = {
    model: 'gemma3:latest',
    prompt: 'describe this image:',
    images: [ base64Image ],
    stream: false
  };

  // Send request to Ollama REST API  
  const response = await fetch(`http://${process.env.HOST}:${process.env.PORT}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  // Parse and log the full response
  const result = await response.json();
  console.log(result.response);
}

main().catch(console.error);

/*
   Ollama-JS examples/multimodal
   https://github.com/ollama/ollama-js/tree/main/examples/multimodal


   Gemma3 Model library
   https://github.com/ollama/ollama?tab=readme-ov-file#libraries-1

   Caveat: 
   According to https://ollama.com/library/gemma3
   gemma3:latest, gemma3:4b, gemma3:12b and gemma3:27b 
   support Text/Image. 

   gemma3:270m and gemma3:1b support Text only. 


   Ollama JavaScript Library
   https://github.com/ollama/ollama-js

   images <Uint8Array[] | string[]>: (Optional) Images to be included in the message, either as Uint8Array or base64 encoded strings.
*/