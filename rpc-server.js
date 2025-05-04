#!/usr/bin/env node
const RPC = require("discord-rpc");
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const CLIENT_ID = "1368478869371355209"; // Replace with your actual client ID
const rpc = new RPC.Client({ transport: "ipc" });
const app = express();

app.use(bodyParser.json());
const PORT = 3020;
const THUMB_DIR = path.join(__dirname, "thumbs");

if (!fs.existsSync(THUMB_DIR)) fs.mkdirSync(THUMB_DIR);

function downloadThumbnail(videoId) {
  return new Promise(async (resolve, reject) => {
    const filePath = path.join(THUMB_DIR, `${videoId}.jpg`);
    if (fs.existsSync(filePath)) return resolve(videoId);

    try {
      const res = await axios.get(`http://localhost:3030/thumbs/${videoId}`, {
        responseType: "stream",
      });
      const stream = fs.createWriteStream(filePath);
      res.data.pipe(stream);
      stream.on("finish", () => resolve(videoId));
      stream.on("error", reject);
    } catch (err) {
      console.error("Thumbnail download error:", err);
      resolve("default_thumb");
    }
  });
}

async function updateActivity({ title, state, videoId }) {
  const thumbKey = await downloadThumbnail(videoId);

  rpc.setActivity({
    details: title || "Unknown video",
    state: state || "Idle",
    largeImageKey: thumbKey, // Must be uploaded in Discord Dev App manually if not using Electron
    largeImageText: title || "YouTube TV",
    instance: false,
  });
}

app.post("/update", async (req, res) => {
  const { title, author, videoId, isActive } = req.body;
  await updateActivity({
    title,
    state: isActive ? author : "Paused",
    videoId,
  });
  res.sendStatus(200);
});

rpc.on("ready", () => {
  console.log("RPC connected");
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} for extension data...`);
  });
});

RPC.register(CLIENT_ID);
rpc.login({ clientId: CLIENT_ID });