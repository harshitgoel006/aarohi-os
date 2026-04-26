import { generateResponse } from "../services/ai.service.js";

export const chatWithAarohi = async (req, res) => {
  try {
    const { message, userId } = req.body;

    if (!message || !userId) {
      return res.status(400).json({
        success: false,
        message: "Message and userId required",
      });
    }

    const reply = await generateResponse({
      userId,
      userInput: message,
    });

    return res.status(200).json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("Chat Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};