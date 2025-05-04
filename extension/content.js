function getVideoTitle() {
  const titleEl = document.querySelector(".ytp-title-link");
  return titleEl ? titleEl.textContent : "Unknown video";
}

function getPlaybackState() {
  const playBtn = document.querySelector(".ytp-play-button");
  if (playBtn?.title?.includes("Pause")) return "Playing";
  if (playBtn?.title?.includes("Play")) return "Paused";
  return "Unknown state";
}

function sendRPCUpdate() {
  const title = getVideoTitle();
  const state = getPlaybackState();

  fetch("http://localhost:3020/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, state }),
  }).catch(console.error);
}

setInterval(sendRPCUpdate, 15000);