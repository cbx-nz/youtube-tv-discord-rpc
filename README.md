# YouTube TV Discord RPC

🎮 A lightweight Node.js + Chrome Extension setup to display YouTube TV activity as Discord Rich Presence.

![screenshot](https://i.imgur.com/your_image.png) <!-- Replace with your actual screenshot if desired -->

## 🚀 Features

- Shows the title of the currently watched video on [YouTube TV](https://youtube.com/tv)
- Displays playback state (Playing / Paused)
- Custom YouTube icon and tooltip on Discord
- Updates every 15 seconds

---

## 🧩 Components

This project consists of:

1. **Chrome Extension** – runs on `https://youtube.com/tv`, reads video info and playback state.
2. **Node.js RPC Server** – receives data from extension and updates Discord Rich Presence.

---

## 📦 Installation

### 🖥 Node.js RPC Server

1. Install [Node.js](https://nodejs.org/)
2. Clone the repo:

   git clone ```https://github.com/cbx-nz/youtube-tv-discord-rpc.git```
   cd youtube-tv-discord-rpc
