const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

// Health check (used to confirm server is running)
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

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
