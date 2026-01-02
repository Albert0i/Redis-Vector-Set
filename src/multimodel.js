import ollama from 'ollama'

async function main() {
  const imagePath = './img/cat.jpg'
  const response = await ollama.generate({
    model: 'gemma3:latest',
    prompt: 'describe this image:',
    images: [imagePath],
    stream: true,
  })
  for await (const part of response) {
    process.stdout.write(part.response)
  }
}

main().catch(console.error)

/*
   multimodal
   https://github.com/ollama/ollama-js/tree/main/examples/multimodal

   Gemma3
   https://github.com/ollama/ollama?tab=readme-ov-file#libraries-1
*/