import { generateResponse } from "../services/ai.service.js";
import { Memory } from "../models/memory.model.js";

/**
 * 🎯 Event-Based Trigger (IMPORTANT)
 */
export const eventReminderTrigger = async (userId) => {
  const now = new Date();

  const upcomingEvents = await Memory.find({
    userId,
    type: "event",
    expiresAt: { $gte: now },
  }).sort({ expiresAt: 1 });

  if (upcomingEvents.length === 0) return;

  const event = upcomingEvents[0];

  const prompt = `Remind him about this event: ${event.content}`;

  const reply = await generateResponse({
    userId,
    userInput: prompt,
  });

  console.log("📅 Aarohi:", reply);
};

/**
 * 💤 Smart Inactivity
 */
export const smartInactivityTrigger = async (userId) => {
  const prompt = `
User has been inactive for a while.
Check casually but intelligently based on his habits.
`;

  const reply = await generateResponse({
    userId,
    userInput: prompt,
  });

  console.log("💤 Aarohi:", reply);
};

/**
 * 🌙 Habit-Based Night Trigger
 */
export const habitNightTrigger = async (userId) => {
  const prompt = `
Check if user is awake late.
If yes, gently suggest rest based on his habits.
`;

  const reply = await generateResponse({
    userId,
    userInput: prompt,
  });

  console.log("🌙 Aarohi:", reply);
};

/**
 * 💬 Random Light Interaction (controlled)
 */
export const randomCheckInTrigger = async (userId) => {
  const prompt = `
Start a light, natural conversation.
Ask what he is doing or how his day is going.
Keep it short.
`;

  const reply = await generateResponse({
    userId,
    userInput: prompt,
  });

  console.log("💬 Aarohi:", reply);
};