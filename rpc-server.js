const RPC = require("discord-rpc");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const CLIENT_ID = 'your_discord_app_client_id'; // Replace with your actual Discord App ID
RPC.register(CLIENT_ID);

const rpc = new RPC.Client({ transport: 'ipc' });

let startTimestamp = new Date();

rpc.on("ready", () => {
  console.log("RPC connected");

  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  app.post("/update", (req, res) => {
    const { title, state } = req.body;
    console.log(`Updating status: ${title} - ${state}`);

    rpc.setActivity({
      details: `Watching: ${title}`,
      state: state,
      startTimestamp,
      largeImageKey: "youtube", // You can upload this asset in your Discord dev portal
      largeImageText: "YouTube TV",
      instance: false,
    });

    res.sendStatus(200);
  });

  app.listen(3020, () => {
    console.log("Listening on port 3020 for extension data...");
  });
});

rpc.login({ clientId: CLIENT_ID });