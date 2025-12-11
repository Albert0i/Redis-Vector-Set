### Preliminary study on [Redis Vector Set](https://redis.io/docs/latest/develop/data-types/vector-sets/)

![alt vector-radial](img/vector-radial.png)


#### Prologue 


#### Caveat
Vector Set is a new feature added in Redis 8.0. Be sure to check  the availability before jumping into it. 

```
> INFO MODULES
# Modules
module:name=vectorset,ver=1,api=1,filters=0,usedby=[],using=[],options=[handle-io-errors|handle-repl-async-load]

> MODULE LIST
1) 1) "name"
   2) "vectorset"
   3) "ver"
   4) "1"
   5) "path"
   6) ""
   7) "args"
   8) (empty list or set)
> 
```

#### [Announcing vector sets, a new Redis data type for vector similarity](https://redis.io/blog/announcing-vector-sets-a-new-redis-data-type-for-vector-similarity/)

Inspired by the core principles of Redis and developed by the original creator of Redis, Salvatore Sanfilippo, vector sets enhance Redis’s capabilities as a versatile solution for modern AI applications. Vector sets complement the existing powerful vector search in Redis (Redis Query Engine) by offering a Redis-friendly alternative for specific use-cases. 

Salvatore Sanfilippo (aka ‘antirez’), the creator of Redis, recently rejoined the company and is the creator of this innovative data type; his expertise has led to the creation of an API that is both simple and intuitive, reflecting Redis’s philosophy of delivering high-performance solutions with minimal complexity.

**What are vector sets?**
Vector sets take inspiration from sorted sets, one of Redis’s fundamental data types known for its efficiency in handling ordered collections. Vector sets extend this concept by allowing the storage and querying of high-dimensional vector embeddings, which are crucial for various AI and machine learning applications. Like a sorted set, a vector set has string elements that are associated with a vector instead of a score. The fundamental goal of vector sets is to make it possible to add items, and later get a subset of the added items that are the most similar to a specified vector.

Consider a scenario where you want to store and retrieve vector embeddings for various text descriptions or images. With vector sets, you can easily store these embeddings and perform efficient similarity searches. vector sets also implements some exciting additional capabilities including:

- **Quantization**: In a vector set, the vectors are quantized by default to 8 bit values. However, this can be modified to no quantization or binary quantization when adding the first element. 	 
---
Technical detail: 

**Vectors in Redis Vector Sets** are usually arrays of floating‑point numbers (e.g., embeddings from text or images).
• **Quantization** is a technique to reduce the precision of those numbers so they take less memory and can be searched faster.
• By default, Redis Vector Set stores vectors in **8‑bit quantized form**:
•• Each floating‑point value is scaled and mapped into a single byte (0–255).
•• This reduces storage size and speeds up similarity search.
•• The trade‑off: you lose some precision compared to full 32‑bit floats.

---

- **Dimensionality Reduction**: The number of dimensions in a vector can be reduced by random projection by specifying the option and the number of dimensions.
---
Technical detail: 

• **Dimensionality**: A vector is just a list of numbers. For example, a text embedding might have 768 dimensions (768 numbers). The more dimensions, the more detail it can capture — but also the more memory and computation it requires.
• **Dimensionality Reduction**: This means shrinking the vector from, say, 768 dimensions down to 128 or 256. You’re compressing the information into fewer numbers.
• **Random Projection**: One way to reduce dimensions is to project the high‑dimensional vector into a lower‑dimensional space using a random matrix.
•• Imagine shining a light on a 3D object to cast a 2D shadow. You lose some detail, but the shadow still preserves the overall shape.
•• Random projection does something similar mathematically: it “shadows” the original vector into fewer dimensions.
• **Specifying the Option and Number of Dimensions**: When you create your vector set, you can tell Redis:
•• “I want to reduce vectors to 128 dimensions.”
•• Redis will then apply random projection automatically when storing vectors.

---

- **Filtering**: Each element of the vector set can be associated with a set of attributes specified as a JSON blob via the VADD or VSETATTR command. This allows the ability to filter for a subset of elements using VSIM that are verified by the expression.
---
Technical detail: 

• **Each element of the vector set**
Every vector you add (e.g., an embedding for “Taipei”) isn’t just numbers — you can also attach extra information (population, area, description, etc.).
• **Associated with a set of attributes**
These extra fields are stored as a **JSON blob**. For example:
```
VADD cities VALUES 1 121.5654 25.0330 "Taipei" SETATTR "{ \"population\": 2779200, \"area_m2\": 271800000, \"description\": \"Capital city\" }"
```
• Here, the vector for Taipei has attributes: population, area, description.
• **Via VADD or VSETATTR**
• `VADD` → when you first insert the vector, you can attach attributes.
• `VSETATTR` → later, you can update or add attributes to an existing vector.

• **Filter for a subset of elements using VSIM**
When you run a similarity search (`VSIM`), you don’t have to search across *all* vectors. You can filter by attributes.
For example:
```
VSIM cities KNN 5 "industrial hub" FILTER population > 1000000
```
• This finds the 5 most similar vectors to “industrial hub,” but only among cities with population greater than 1,000,000.
• **Verified by the expression**
The filter expression (like `population > 1000000 AND area_m2 < 500000000`) is applied to the attributes. Only vectors that satisfy the expression are considered in the similarity search.

---


#### Biblipgraphy 
1. [A First Look at Vector Sets](https://medium.com/the-guy-wire/a-first-look-at-vector-sets-dd91cb59123e)
2. [Getting started with vector sets](https://redis.io/learn/howtos/vector-sets-basics)
3. [Redis vector sets](https://redis.io/docs/latest/develop/data-types/vector-sets/)
4. [Vector Sets Browser](https://github.com/redis/vector-sets-browser)
5. [Redis 8.4.0 for Windows](https://github.com/redis-windows/redis-windows/releases)


### Epilogue


### EOF (2026/01/01)
