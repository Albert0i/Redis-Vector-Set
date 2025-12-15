import * as transformers from '@xenova/transformers';

async function generateSentenceEmbeddings(_sentence) {
  let modelName = 'Xenova/all-distilroberta-v1';
  let pipe = await transformers.pipeline('feature-extraction', modelName);

  let vectorOutput = await pipe(_sentence, {
    pooling: 'mean',
    normalize: true,
  });

  const embeddings = Object.values(vectorOutput?.data);
  return embeddings;
}

export { generateSentenceEmbeddings };