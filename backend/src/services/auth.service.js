import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";

const SALT_ROUNDS = 10;

/**
 * 🔐 Register / Setup (only once)
 */
export const setupUser = async (password) => {
  const existingUser = await User.findOne();

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await User.create({
    name: "Harshit",
    password: hashedPassword,
  });

  return user;
};

/**
 * 🔑 Login
 */
export const loginUser = async (password, deviceId) => {
  const user = await User.findOne();

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    user.failedLoginAttempts += 1;
    await user.save();
    throw new Error("Invalid password");
  }

  // reset attempts
  user.failedLoginAttempts = 0;

  // add device
  const exists = user.devices.find((d) => d.deviceId === deviceId);

  if (!exists) {
    user.devices.push({
      deviceId,
      deviceName: "New Device",
      trusted: true,
      lastUsed: new Date(),
    });
  }

  await user.save();

  return user;
};