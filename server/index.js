const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const donationRoutes = require("./routes/donationRoutes");

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

// Core middleware
app.use(express.json());
app.use(morgan("dev"));

// CORS (dev-friendly; in production we serve client from same origin)
app.use(
  cors({
    origin: process.env.CODIO_CLIENT_ORIGIN || true,
    credentials: true,
  })
);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/donations", donationRoutes);

// IMPORTANT: export app for tests
module.exports = app;

// Start server only when run directly
if (require.main === module) {
  const port = process.env.PORT || 8080;

  connectDB()
    .then(() => {
      app.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
    })
    .catch((err) => {
      console.error("Failed to start server:", err.message);
      process.exit(1);
    });
}
