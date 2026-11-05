import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Groq from "groq-sdk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Load .env from the root folder
dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();
app.use(cors());
app.use(express.json());

// 2. Initialize Groq with a safety check
const apiKey = process.env.GROQ_API_KEY;
if (!apiKey) {
    console.error("❌ ERROR: GROQ_API_KEY is missing from your .env file!");
} else {
    console.log("✅ SUCCESS: Groq API Key loaded.");
}

const groq = new Groq({ apiKey: apiKey });

app.post("/api/analyze", async (req, res) => {
  const { code, language, action } = req.body;
  console.log(`📥 Request received: ${action} for ${language}`);

  if (!code) return res.status(400).json({ error: "No code provided" });

  const prompts = {
    explain: `Explain this ${language} code clearly:`,
    bugs: `Find bugs in this ${language} code and provide the fix:`,
    optimize: `Optimize this ${language} code for performance:`,
    complexity: `Analyze the time and space complexity of this ${language} code:`
  };

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You are an expert software engineer." },
        { role: "user", content: `${prompts[action] || "Analyze this:"}\n\n${code}` }
      ],
      model: process.env.GROQ_MODEL || "openai/gpt-oss-120b",
    });

    const result = chatCompletion.choices[0]?.message?.content || "";
    res.json({ result });
    console.log("✅ Analysis sent successfully");

  } catch (error) {
    console.error("❌ Groq Error:", error.message);
    res.status(500).json({ error: "AI failed", details: error.message });
  }
});

// Test route to verify backend is alive
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is running and connected!" });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`🚀 Server spinning on http://localhost:${PORT}`));

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`\n❌ Port ${PORT} is already in use.`);
    if (Number(PORT) === 5000) {
      console.error(
        "💡 Note: On macOS, AirPlay Receiver uses port 5000 by default.\n   Either disable AirPlay Receiver (System Settings > General > AirDrop & AirPlay > uncheck 'AirPlay Receiver'),\n   or run on another port, e.g., PORT=5001 npm start"
      );
    }
  } else {
    console.error("❌ Server error:", err);
  }
});
