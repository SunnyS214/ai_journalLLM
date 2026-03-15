const axios = require("axios");

async function analyzeEmotion(text) {

  const prompt = `
Analyze the emotion of the following journal entry.

Return ONLY JSON in this format:

{
 "emotion": "",
 "keywords": [],
 "summary": ""
}

Text: ${text}
`;

  try {

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3-8b-instruct",
        messages: [
          { role: "user", content: prompt }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.LLM_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const output = response.data.choices[0].message.content;

    console.log("LLM RESPONSE:", output);

    // extract JSON safely
    const jsonMatch = output.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error("No JSON found in response");
    }

    return JSON.parse(jsonMatch[0]);

  } catch (error) {

    console.log("LLM ERROR:", error.message);

    return {
      emotion: "unknown",
      keywords: [],
      summary: "Could not analyze text"
    };
  }
}

module.exports = analyzeEmotion;