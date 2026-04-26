export const buildPrompt = (userInput, memories = []) => {
  const memoryContext = memories.length
    ? memories.map((m) => `- ${m.content}`).join("\n")
    : "No strong past context.";

  return `
Harshit said:
"${userInput}"

Things you remember about him:
${memoryContext}

Respond as Aarohi in a natural, human-like way.
Keep it emotionally aware, slightly caring, and realistic.
`;
};