const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

const FIREBASE_PROJECT_ID = "admin-pannel-61378";
const FIREBASE_RTDB_URL =
  process.env.FIREBASE_RTDB_URL ||
  `https://${FIREBASE_PROJECT_ID}-default-rtdb.firebaseio.com`;

app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(express.static(__dirname));

let cachedState = null;

async function syncFromFirebase() {
  try {
    const res = await fetch(`${FIREBASE_RTDB_URL}/archer_c24_state.json`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.routerInfo) {
        cachedState = data;
        return data;
      }
    }
  } catch (err) {
    // Fallback to in-memory cache
  }
  return cachedState;
}

async function syncToFirebase(state) {
  cachedState = state;
  try {
    await fetch(`${FIREBASE_RTDB_URL}/archer_c24_state.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state)
    });
  } catch (err) {
    // Keep in-memory state if RTDB is unreachable
  }
}

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Archer C24 Admin & Hotspot Billing Backend",
    firebaseProjectId: FIREBASE_PROJECT_ID,
    firebaseRtdbUrl: FIREBASE_RTDB_URL,
    timestamp: new Date().toISOString()
  });
});

app.get("/api/state", async (req, res) => {
  const state = await syncFromFirebase();
  res.json({ ok: true, state: state || null });
});

app.post("/api/state", async (req, res) => {
  const newState = req.body;
  if (!newState || !newState.routerInfo) {
    return res.status(400).json({ ok: false, error: "Invalid state payload" });
  }
  await syncToFirebase(newState);
  res.json({ ok: true, syncedAt: new Date().toISOString() });
});

app.post("/api/pay", async (req, res) => {
  const state = (await syncFromFirebase()) || cachedState;
  if (!state) {
    return res.status(200).json({ ok: true, note: "Client-side Firebase sync active" });
  }
  const txn = req.body;
  if (txn && txn.id) {
    state.transactions = state.transactions || [];
    state.transactions.unshift(txn);
    await syncToFirebase(state);
  }
  res.json({ ok: true, transaction: txn });
});

app.get("/", (req, res) => {
  const indexPath = path.join(__dirname, "index.html");
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.json({ status: "ok", message: "Archer C24 Hotspot Backend Running" });
  }
});

app.get("/portal", (req, res) => {
  res.sendFile(path.join(__dirname, "portal.html"));
});

app.listen(PORT, () => {
  console.log(`Archer C24 Hotspot Admin Backend running on port ${PORT}`);
});
