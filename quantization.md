
# 🧩 Understanding Quantization Options in Ollama

Quantization compresses a model’s weights to use fewer bits, reducing memory requirements and making large models run on smaller GPUs. Ollama supports several quantization schemes, each balancing **VRAM usage, speed, and accuracy**.

---

## 🔎 Available Quantization Options

| Option     | Precision | VRAM (12B model) | Accuracy | Notes |
|------------|-----------|------------------|----------|-------|
| **Q2_K**   | 2‑bit     | ~6–8 GB          | Lowest   | Extreme compression, fastest but least accurate |
| **Q3_K_M** | 3‑bit     | ~8–10 GB         | Low      | Efficient, moderate accuracy |
| **Q3_K_L** | 3‑bit     | ~9–11 GB         | Low+     | Slightly better than Q3_K_M |
| **Q4_0**   | 4‑bit     | ~10–12 GB        | Medium   | Basic 4‑bit quantization |
| **Q4_1**   | 4‑bit     | ~11–13 GB        | Medium+  | Higher accuracy than Q4_0 |
| **Q4_K_M** | 4‑bit     | ~8–10 GB         | Medium   | Most common default, balanced speed/accuracy |
| **Q4_K_S** | 4‑bit     | ~9–11 GB         | Medium+  | Slightly slower, higher accuracy |
| **Q5_0**   | 5‑bit     | ~12–14 GB        | High     | Good balance of accuracy and size |
| **Q5_1**   | 5‑bit     | ~13–15 GB        | High+    | Better accuracy than Q5_0 |
| **Q5_K_M** | 5‑bit     | ~12–14 GB        | High     | Popular choice for mid‑range GPUs |
| **Q5_K_S** | 5‑bit     | ~13–15 GB        | High+    | Slightly better accuracy |
| **Q6_K**   | 6‑bit     | ~16–18 GB        | Very High| Larger footprint, near FP16 accuracy |
| **Q8_0**   | 8‑bit     | ~24 GB           | Highest  | Near full‑precision accuracy, requires high‑end GPU |

---

## ⚡ Default Quantization Value
- For **large models** (like `gemma3:12b` or `gemma4:12b`), Ollama **defaults to `Q4_K_M`**.  
- This choice balances **VRAM efficiency (~8–10 GB)** with **reasonable accuracy**, making it accessible to most consumer GPUs.  
- If you want higher accuracy and have more VRAM, you can override the default by specifying `options.quantize` in your API call or Modelfile.

---

## 🌱 Practical Example: Gemma 3:12B on 16 GB VRAM / 40 GB RAM
Imagine you have a system with **16 GB GPU VRAM** and **40 GB system RAM**.  

- **Best quantization**: `Q5_K_M`  
  - Requires ~12–14 GB VRAM → fits comfortably in 16 GB.  
  - Uses ~30–40 GB RAM → matches your system capacity.  
  - Provides stronger accuracy than the default `Q4_K_M`.  
- **Alternatives**:  
  - `Q4_K_M` → safer, lighter, but slightly less accurate.  
  - `Q8_0` → too heavy (needs ~24 GB VRAM).  
  - `Q6_K` → borderline fit, may cause instability.  

### Node.js Example
```js
const response = await fetch(`http://${process.env.HOST}:${process.env.PORT}/api/chat`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "gemma3:12b",
    messages,
    options: {
      quantize: "Q5_K_M"   // best match for 16GB VRAM / 40GB RAM
    }
  })
});

const data = await response.json();
console.log(data);
```

✅ **Conclusion**: On a 16 GB GPU with 40 GB RAM, `Gemma 3:12B` with **`Q5_K_M` quantization** is the sweet spot — balancing accuracy and efficiency while fitting your hardware perfectly.

