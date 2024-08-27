let currentPlayer = null;
let currentIcon = null;

function togglePlayPause(event) {
  const playIcon = "music-content/play-icon.png";
  const pauseIcon = "music-content/pause-icon.png";

  const clickedIcon = event.target;
  const audioElement = document.getElementById(
    `player-${clickedIcon.dataset.index}`
  );

  if (!audioElement) return;

  if (currentPlayer && currentPlayer !== audioElement) {
    currentPlayer.pause();
    currentPlayer.currentTime = 0;
    currentIcon.src = playIcon;
  }

  if (audioElement.paused) {
    audioElement.play();
    clickedIcon.src = pauseIcon;
    currentPlayer = audioElement;
    currentIcon = clickedIcon;
  } else {
    audioElement.pause();
    clickedIcon.src = playIcon;
    currentPlayer = null;
    currentIcon = null;
  }
}

function setupPlayPauseListeners() {
  const playIcons = document.querySelectorAll(".play-icon");

  playIcons.forEach((icon) => {
    icon.addEventListener("click", togglePlayPause);
  });
}

export { setupPlayPauseListeners };
