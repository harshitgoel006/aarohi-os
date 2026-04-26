import mongoose from "mongoose";

const memorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: ["conversation", "habit", "event", "preference", "emotion"],
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    metadata: {
      type: Object,
      default: {},
    },

    importance: {
      type: Number,
      default: 1,
    },

    expiresAt: {
      type: Date,
    },

    lastAccessed: {
      type: Date,
      default: Date.now,
    },

    accessCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

memorySchema.index({ userId: 1, type: 1 });
memorySchema.index({ content: "text" });

export const Memory = mongoose.model("Memory", memorySchema);