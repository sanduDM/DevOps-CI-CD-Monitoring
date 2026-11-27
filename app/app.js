const express = require("express");
const { Pool } = require("pg");

const app = express();
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
});

// Request logging (one JSON line per request, for monitoring)
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    console.log(
      JSON.stringify({
        time: new Date().toISOString(),
        method: req.method,
        path: req.originalUrl,
        status: res.statusCode,
        ms: Date.now() - start,
      })
    );
  });
  next();
});

app.get("/", (req, res) => res.send("Hello from a Docker container! v2"));

// Liveness check: no database needed, used by CI smoke test
app.get("/live", (req, res) => {
  res.json({ status: "alive", uptime: process.uptime() });
});

// Health check: includes the database
app.get("/health", async (req, res) => {
  try {
    const r = await pool.query("SELECT NOW()");
    res.json({ status: "ok", dbTime: r.rows[0].now });
  } catch (e) {
    console.error("Health check failed:", e.message);
    res.status(500).json({ status: "db error", message: e.message });
  }
});

module.exports = app;