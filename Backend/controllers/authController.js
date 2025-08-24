import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    // Compare plain password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET, // add JWT_SECRET in your .env
      { expiresIn: "1h" }
    );

    // Send user info + token
    res.json({
      message: "Login successful",
      user: { name: user.name, email: user.email },
      token
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
