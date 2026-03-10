import Groq from "groq-sdk";

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GROQ_API_KEY is not configured" });
  }

  const groq = new Groq({ apiKey });

  const { code, language, action } = req.body;

  if (!code) {
    return res.status(400).json({ error: "No code provided" });
  }

  const prompts = {
    explain: `Explain this ${language} code clearly:`,
    bugs: `Find bugs in this ${language} code and provide the fix:`,
    optimize: `Optimize this ${language} code for performance:`,
    complexity: `Analyze the time and space complexity of this ${language} code:`,
  };

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You are an expert software engineer." },
        {
          role: "user",
          content: `${prompts[action] || "Analyze this:"}\n\n${code}`,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    const result = chatCompletion.choices[0]?.message?.content || "";
    return res.json({ result });
  } catch (error) {
    console.error("Groq Error:", error.message);
    return res
      .status(500)
      .json({ error: "AI failed", details: error.message });
  }
}
