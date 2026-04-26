import OpenAI from "openai";
import { aarohiPersonality } from "../ai/personality.js";
import { buildPrompt } from "../ai/prompt.js";
import { getRelevantMemories, saveMemory } from "./memory.service.js";

const getOpenAIClient = () => {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
};

/**
 * 🧠 Generate Aarohi Response
 */
export const generateResponse = async ({ userId, userInput }) => {
  try {
    // 🔍 fetch memory
    const memories = await getRelevantMemories({
      userId,
      query: userInput,
    });

    // 🧠 build prompt
    const prompt = buildPrompt(userInput, memories);

    // 🤖 call LLM
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: aarohiPersonality },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const reply = response.choices[0].message.content;

    // 🧾 save conversation memory (summary style)
    await saveMemory({
      userId,
      type: "conversation",
      content: `User: ${userInput} | Aarohi: ${reply}`,
    });

    return reply;
  } catch (error) {
    console.error("AI Error:", error.message);
    throw error;
  }
};