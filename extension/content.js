function getVideoInfo() {
  const titleEl = document.querySelector("yt-formatted-string.ytLrVideoTitleTrayTitleText");
  const authorEl = document.querySelector("yt-formatted-string.ytLrVideoMetadataLineDetailTexts");
  const videoIdMatch = location.href.match(/v=([a-zA-Z0-9_-]{11})/);

  return {
    title: titleEl?.textContent || "Unknown",
    author: authorEl?.textContent || "Unknown",
    videoId: videoIdMatch ? videoIdMatch[1] : "",
  };
}

function isTabActive() {
  return document.visibilityState === "visible";
}

setInterval(() => {
  const videoInfo = getVideoInfo();
  const isActive = isTabActive();
  fetch("http://localhost:3020/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...videoInfo,
      isActive,
    })
  });
}, 5000);