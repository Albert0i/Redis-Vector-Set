import fs from 'fs';
import 'dotenv/config'

/**
 * Step 1: Generate a caption/description of the image using a multimodal model
 */
async function describeImage(imagePath) {
  const buffer = fs.readFileSync(imagePath);
  const base64Image = buffer.toString('base64');

  const body = {
    model: 'gemma3:latest', // or gemma3:latest if multimodal
    prompt: 'Describe this image in detail:',
    images: [ base64Image ],
    stream: false
  };

  const response = await fetch(`http://${process.env.HOST}:${process.env.PORT}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const result = await response.json();
  return result.response;
}

/**
 * Step 2: Generate embeddings from the caption using a text embedding model
 */
async function embedText(text) {
  const body = {
    model: 'mxbai-embed-large:latest', // embedding model
    prompt: text
  };

  const response = await fetch(`http:/${process.env.HOST}:${process.env.PORT}/api/embeddings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const result = await response.json();
  return result.embedding; // numeric vector
}

/**
 * Step 3: Full pipeline — describe image, then embed description
 */
async function main() {
  const imagePath = './img/cat.jpg';

  console.log('\n🔎 Generating caption from image...');
  const caption = await describeImage(imagePath);
  console.log('Caption:', caption);

  console.log('\n📐 Generating embedding from caption...');
  const embedding = await embedText(caption);
  console.log('Embedding vector length:', embedding.length);
  console.log('First 10 values:', embedding.slice(0, 10));
}

main().catch(console.error);