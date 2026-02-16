const express = require("express");

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
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
