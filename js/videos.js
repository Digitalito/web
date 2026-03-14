const CHANNEL_ID = "UCXl48fi70tadw2BwzuU6DtQ";
const PROXY = "https://api.allorigins.win/get?url=";
const FEED_URL = encodeURIComponent(
  `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`
);

async function loadVideos() {
  try {
    const res = await fetch(PROXY + FEED_URL);
    const data = await res.json();
    const parser = new DOMParser();
    const xml = parser.parseFromString(data.contents, "text/xml");
    const entries = xml.querySelectorAll("entry");
    const grid = document.getElementById("videos-grid");
    if (!grid) return;

    let count = 0;
    entries.forEach((entry) => {
      if (count >= 3) return;
      const title = entry.querySelector("title")?.textContent || "";
      const videoId = entry.querySelector("videoId")?.textContent || "";
      const thumb = `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;
      const link = `https://www.youtube.com/watch?v=${videoId}`;

      const card = document.createElement("a");
      card.href = link;
      card.target = "_blank";
      card.rel = "noopener noreferrer";
      card.className = "video-card";
      card.innerHTML = `
        <div class="video-thumb-wrapper">
          <img src="${thumb}" alt="${title}" loading="lazy">
          <div class="video-play-icon">▶</div>
        </div>
        <p class="video-title">${title}</p>
      `;
      grid.appendChild(card);
      count++;
    });

    if (count === 0) {
      document.getElementById("latest-videos").style.display = "none";
    }
  } catch (e) {
    const section = document.getElementById("latest-videos");
    if (section) section.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", loadVideos);
