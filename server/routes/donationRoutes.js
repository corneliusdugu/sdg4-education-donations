const express = require("express");
const Donation = require("../models/Donation");
const auth = require("../middleware/auth");

const router = express.Router();

// POST /api/donations (protected)
router.post("/", auth, async (req, res) => {
  try {
    const amount = Number(req.body.amount);

    if (!Number.isFinite(amount) || amount < 1) {
      return res.status(400).json({ message: "Amount must be at least 1" });
    }

    const message =
      typeof req.body.message === "string" ? req.body.message.trim() : "";

    const donation = await Donation.create({
      userId: req.user.userId,
      amount,
      message,
      // purpose default is SDG4_QUALITY_EDUCATION (immutable)
      // currency default GBP
      // status default recorded
    });

    return res.status(201).json({ donation });
  } catch (err) {
    return res.status(500).json({ message: "Donation failed" });
  }
});

// GET /api/donations/mine (protected)
router.get("/mine", auth, async (req, res) => {
  try {
    const donations = await Donation.find({ userId: req.user.userId })
      .sort({ createdAt: -1 });

    return res.json({ donations });
  } catch (err) {
    return res.status(500).json({ message: "Failed to load donations" });
  }
});

module.exports = router;
