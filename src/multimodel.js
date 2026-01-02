import ollama from 'ollama'

async function main() {
  const imagePath = './img/cat.jpg'
  const response = await ollama.generate({
    model: 'gemma3:latest',
    prompt: 'describe this image:',
    images: [ imagePath ],
    stream: false,
  })

  // With stream true, 
  //for await (const part of response) {
  //   process.stdout.write(part.response)
  //}
  // With stream:false, response is a single object
  console.log(response.response)
}

main().catch(console.error)

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
*/