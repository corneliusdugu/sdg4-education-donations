const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

function signToken(user) {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

function toSafeUser(user) {
  return { _id: user._id, name: user.name, email: user.email };
}

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const name = String(req.body.name || "").trim();
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");

    if (name.length < 2) return res.status(400).json({ message: "Name is required" });
    if (!email.includes("@")) return res.status(400).json({ message: "Valid email is required" });
    if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already exists" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash });

    const token = signToken(user);
    return res.status(201).json({ token, user: toSafeUser(user) });
  } catch (err) {
    return res.status(500).json({ message: "Registration failed" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken(user);
    return res.status(200).json({ token, user: toSafeUser(user) });
  } catch (err) {
    return res.status(500).json({ message: "Login failed" });
  }
});

// GET /api/auth/me (protected)
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json({ user: toSafeUser(user) });
  } catch (err) {
    return res.status(500).json({ message: "Failed to load profile" });
  }
});

// PUT /api/auth/me (protected)
router.put("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const payload = {};

    if (typeof req.body.name === "string") {
      const trimmedName = req.body.name.trim();
      if (trimmedName.length > 0 && trimmedName !== user.name) payload.name = trimmedName;
    }

    if (typeof req.body.password === "string") {
      const p = req.body.password.trim();
      if (p.length > 0) {
        if (p.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters" });
        payload.passwordHash = await bcrypt.hash(p, 10);
      }
    }

    if (Object.keys(payload).length === 0) {
      return res.status(400).json({ message: "No changes to save" });
    }

    const updated = await User.findByIdAndUpdate(user._id, payload, { new: true });
    return res.json({ user: toSafeUser(updated) });
  } catch (err) {
    return res.status(500).json({ message: "Failed to update profile" });
  }
});

module.exports = router;
