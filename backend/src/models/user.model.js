import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema(
  {
    deviceId: String,
    deviceName: String,
    trusted: {
      type: Boolean,
      default: true,
    },
    lastUsed: Date,
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    devices: [deviceSchema],

    preferences: {
      language: {
        type: String,
        default: "hinglish",
      },
      tone: {
        type: String,
        default: "calm",
      },
      proactivityLevel: {
        type: Number,
        default: 2,
      },
    },

    habits: {
      sleepTime: String,
      wakeTime: String,
      avgScreenTime: Number,
      studyHours: Number,
    },

    failedLoginAttempts: {
      type: Number,
      default: 0,
    },

    lockUntil: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);