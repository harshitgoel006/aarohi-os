import { Memory } from "../models/memory.model.js";

export const saveMemory = async ({
  userId,
  type,
  content,
  metadata = {},
}) => {
  try {
    
    let importance = 1;

    if (type === "event") importance = 3;
    if (type === "habit") importance = 2;
    if (type === "preference") importance = 2;
    if (type === "emotion") importance = 2;

    const memory = await Memory.create({
      userId,
      type,
      content,
      metadata,
      importance,
    });

    return memory;
  } catch (error) {
    console.error("Memory Save Error:", error.message);
    throw error;
  }
};


export const getRelevantMemories = async ({
  userId,
  query,
  limit = 5,
}) => {
  try {
    const memories = await Memory.find({
      userId,
      $text: { $search: query },
    })
      .sort({ importance: -1, createdAt: -1 })
      .limit(limit);

    for (let mem of memories) {
      mem.lastAccessed = new Date();
      mem.accessCount += 1;
      await mem.save();
    }

    return memories;
  } catch (error) {
    console.error("Memory Fetch Error:", error.message);
    throw error;
  }
};


export const updateMemoryImportance = async (memoryId, value = 1) => {
  try {
    const memory = await Memory.findById(memoryId);

    if (!memory) return null;

    memory.importance += value;

    if (memory.importance > 5) memory.importance = 5;

    await memory.save();

    return memory;
  } catch (error) {
    console.error("Memory Update Error:", error.message);
    throw error;
  }
};