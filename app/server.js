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

app.get("/", (req, res) => res.send("Hello from a Docker container! v2"));

app.get("/health", async (req, res) => {
  try {
    const r = await pool.query("SELECT NOW()");
    res.json({ status: "ok", dbTime: r.rows[0].now });
  } catch (e) {
    res.status(500).json({ status: "db error", message: e.message });
  }
});

app.listen(process.env.PORT || 3000, () => console.log("App running"));
