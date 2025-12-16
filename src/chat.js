// chat.js
import ollama from 'ollama';
import readline from 'readline';

// Create a readline interface for interactive input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'You> '
});

async function askOllama(question) {
  const response = await ollama.chat({
    model: 'gemma:2b',   // lightweight model
    messages: [{ role: 'user', content: question }],
    stream: true
  });

  process.stdout.write("Ollama> ");
  for await (const part of response) {
    process.stdout.write(part.message.content);
  }
  process.stdout.write("\n");
}

async function main() {
  console.log("Interactive Ollama Chat (model: gemma:2b)");
  rl.prompt();

  rl.on('line', async (line) => {
    const question = line.trim();
    if (question.toLowerCase() === 'exit') {
      rl.close();
      return;
    }

    try {
      await askOllama(question);
    } catch (err) {
      console.error("Error:", err.message);
    }

    rl.prompt();
  }).on('close', () => {
    console.log("Goodbye!");
    process.exit(0);
  });
}

main();

/*
You> write a poem
Ollama> A tapestry of moments, woven with care,
Each thread a story, each color a rare.
From dawn's first blush to twilight's gentle gleam,
The tapestry unfolds, a timeless dream.

A tapestry of tears, a silent flow,
Each tear a teardrop, a moment to grow.
Through laughter's vibrant hues, the threads ignite,
A tapestry of joy, a joyous sight.

A tapestry of dreams, where imagination takes flight,
Each thread a thought, a celestial light.
The tapestry of life, a canvas vast and wide,
A tapestry of dreams, where imagination can hide.

So let us cherish every moment we behold,
And weave them into a tapestry, a story to be told.
For in the tapestry of life, we find our way,
A journey of joy, a testament to our day.
*/

// import ollama from 'ollama'

// const response = await ollama.chat({
//   model: 'gemma:2b',
//   messages: [{ role: 'user', content: 'Why is the sky blue?' }],
//   stream: true,
// })

// //console.log(response.message.content)
// for await (const part of response) {
//     process.stdout.write(part.message.content)
//   }

/*
   Ollama JavaScript Library
   https://github.com/ollama/ollama-js   
*/