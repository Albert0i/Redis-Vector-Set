import { generateSentenceEmbeddings } from "./text-vector-gen.js"

async function main() {
    const embeddings = await generateSentenceEmbeddings('I Love Redis !');
    console.log('length = ', embeddings.length)
    console.log('[', embeddings.toString(), ']');
}

/*
 768 dim vector output
 embeddings = [
    -0.005076113156974316,  -0.006047232076525688,   -0.03189406543970108,
    -0.019677048549056053,    0.05152582749724388,  -0.035989608615636826,
    -0.009754283353686333,   0.002385444939136505,   -0.04979122802615166,
    ....]
*/

main()