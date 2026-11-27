const { test, before, after } = require("node:test");
const assert = require("node:assert");
const app = require("../app");

let server;
let base;

before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, resolve);
  });
  base = `http://localhost:${server.address().port}`;
});

after(() => {
  server.close();
});

test("GET / returns the hello message", async () => {
  const res = await fetch(`${base}/`);
  assert.strictEqual(res.status, 200);
  const text = await res.text();
  assert.match(text, /Hello from a Docker container/);
});

test("GET /live returns status alive", async () => {
  const res = await fetch(`${base}/live`);
  assert.strictEqual(res.status, 200);
  const body = await res.json();
  assert.strictEqual(body.status, "alive");
});