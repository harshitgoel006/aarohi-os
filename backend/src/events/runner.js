import {
  eventReminderTrigger,
  smartInactivityTrigger,
  habitNightTrigger,
  randomCheckInTrigger,
} from "./triggers.js";

export const startEventEngine = (userId) => {
  // 🎯 event reminders every 30 min
  setInterval(() => {
    eventReminderTrigger(userId);
  }, 30 * 60 * 1000);

  // 💤 inactivity check every 1 hour
  setInterval(() => {
    smartInactivityTrigger(userId);
  }, 60 * 60 * 1000);

  // 🌙 night behavior every 2 hours
  setInterval(() => {
    habitNightTrigger(userId);
  }, 2 * 60 * 60 * 1000);

  // 💬 random interaction every 3 hours
  setInterval(() => {
    randomCheckInTrigger(userId);
  }, 3 * 60 * 60 * 1000);
};