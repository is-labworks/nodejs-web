const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error registering user", details: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    req.session.userId = user._id;
    res.cookie("sid", req.sessionID, { httpOnly: true, secure: true, maxAge: 1000 * 60 * 60});

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: "Error logging in", details: error.message });
  }
});

// Logout
router.post("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Error logging out" });

    res.clearCookie("sid");
    res.clearCookie("connect.sid");
    
    res.status(200).json({ message: "Logout successful" });
  });
});

// Protected route
router.get("/profile", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const user = await User.findById(req.session.userId).select("-password");
  res.status(200).json(user);
});

module.exports = router;