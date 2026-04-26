import { setupUser, loginUser } from "../services/auth.service.js";

export const setup = async (req, res) => {
  try {
    const { password } = req.body;

    const user = await setupUser(password);

    res.json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { password, deviceId } = req.body;

    const user = await loginUser(password, deviceId);

    res.json({
      success: true,
      userId: user._id,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};