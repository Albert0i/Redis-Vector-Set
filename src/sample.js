// vadd.js
import { redis } from './redis/redis.js'

await redis.connect();

const res1 = await redis.vAdd("points", [1.0, 1.0], "pt:A");
console.log(res1);  // >>> true

const res2 = await redis.vAdd("points", [-1.0, -1.0], "pt:B");
console.log(res2);  // >>> true

const res3 = await redis.vAdd("points", [-1.0, 1.0], "pt:C");
console.log(res3);  // >>> true

const res4 = await redis.vAdd("points", [1.0, -1.0], "pt:D");
console.log(res4);  // >>> true

const res5 = await redis.vAdd("points", [1.0, 0], "pt:E");
console.log(res5);  // >>> true

const res6 = await redis.type("points");
console.log(res6);  // >>> vectorset

const res7 = await redis.vCard("points");
console.log(res7);  // >>> 5

const res8 = await redis.vDim("points");
console.log(res8);  // >>> 2

const res9 = await redis.vEmb("points", "pt:A");
console.log(res9);  // >>> [0.9999999403953552, 0.9999999403953552]

const res10 = await redis.vEmb("points", "pt:B");
console.log(res10);  // >>> [-0.9999999403953552, -0.9999999403953552]

const res11 = await redis.vEmb("points", "pt:C");
console.log(res11);  // >>> [-0.9999999403953552, 0.9999999403953552]

const res12 = await redis.vEmb("points", "pt:D");
console.log(res12);  // >>> [0.9999999403953552, -0.9999999403953552]

const res13 = await redis.vEmb("points", "pt:E");
console.log(res13);  // >>> [1, 0]

const res14 = await redis.vSetAttr("points", "pt:A", {
  name: "Point A",
  description: "First point added"
});
console.log(res14);  // >>> true

const res15 = await redis.vGetAttr("points", "pt:A");
console.log(res15);
// >>> {name: 'Point A', description: 'First point added'}

const res16 = await redis.vSetAttr("points", "pt:A", "");
console.log(res16);  // >>> true

const res17 = await redis.vGetAttr("points", "pt:A");
console.log(res17);  // >>> null

const res18 = await redis.vAdd("points", [0, 0], "pt:F");
console.log(res18);  // >>> true

const res19 = await redis.vCard("points");
console.log(res19);  // >>> 6

const res20 = await redis.vRem("points", "pt:F");
console.log(res20);  // >>> true

const res21 = await redis.vCard("points");
console.log(res21);  // >>> 5

const res22 = await redis.vSim("points", [0.9, 0.1]);
console.log(res22);
// >>> ['pt:E', 'pt:A', 'pt:D', 'pt:C', 'pt:B']

const res23 = await redis.vSimWithScores("points", "pt:A", { COUNT: 4 });
console.log(res23);
// >>> {pt:A: 1.0, pt:E: 0.8535534143447876, pt:D: 0.5, pt:C: 0.5}

const res24 = await redis.vSetAttr("points", "pt:A", {
  size: "large",
  price: 18.99
});
console.log(res24);  // >>> true

const res25 = await redis.vSetAttr("points", "pt:B", {
  size: "large",
  price: 35.99
});
console.log(res25);  // >>> true

const res26 = await redis.vSetAttr("points", "pt:C", {
  size: "large",
  price: 25.99
});
console.log(res26);  // >>> true

const res27 = await redis.vSetAttr("points", "pt:D", {
  size: "small",
  price: 21.00
});
console.log(res27);  // >>> true

const res28 = await redis.vSetAttr("points", "pt:E", {
  size: "small",
  price: 17.75
});
console.log(res28);  // >>> true

// Return elements in order of distance from point A whose
// `size` attribute is `large`.
const res29 = await redis.vSim("points", "pt:A", {
  FILTER: '.size == "large"'
});
console.log(res29);  // >>> ['pt:A', 'pt:C', 'pt:B']

// Return elements in order of distance from point A whose size is
// `large` and whose price is greater than 20.00.
const res30 = await redis.vSim("points", "pt:A", {
  FILTER: '.size == "large" && .price > 20.00'
});
console.log(res30);  // >>> ['pt:C', 'pt:B']

const res31 = await redis.vAdd("quantSetQ8", [1.262185, 1.958231], "quantElement", {
  QUANT: 'Q8'
});
console.log(res31);  // >>> true

const res32 = await redis.vEmb("quantSetQ8", "quantElement");
console.log(`Q8: ${res32}`);
// >>> Q8: [1.2643694877624512, 1.958230972290039]

const res33 = await redis.vAdd("quantSetNoQ", [1.262185, 1.958231], "quantElement", {
  QUANT: 'NOQUANT'
});
console.log(res33);  // >>> true

const res34 = await redis.vEmb("quantSetNoQ", "quantElement");
console.log(`NOQUANT: ${res34}`);
// >>> NOQUANT: [1.262184977531433, 1.958230972290039]

const res35 = await redis.vAdd("quantSetBin", [1.262185, 1.958231], "quantElement", {
  QUANT: 'BIN'
});
console.log(res35);  // >>> true

const res36 = await redis.vEmb("quantSetBin", "quantElement");
console.log(`BIN: ${res36}`);
// >>> BIN: [1, 1]

// Create a list of 300 arbitrary values.
const values = Array.from({length: 300}, (_, x) => x / 299);

const res37 = await redis.vAdd("setNotReduced", values, "element");
console.log(res37);  // >>> true

const res38 = await redis.vDim("setNotReduced");
console.log(res38);  // >>> 300

const res39 = await redis.vAdd("setReduced", values, "element", {
  REDUCE: 100
});
console.log(res39);  // >>> true

const res40 = await redis.vDim("setReduced");
console.log(res40);  // >>> 100

await redis.quit();

/*
   Redis vector sets
   https://redis.io/docs/latest/develop/data-types/vector-sets/
*/