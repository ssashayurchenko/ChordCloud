const response = await fetch("api/songs-list.json");
const compositions = await response.json();

function search() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const results = compositions.filter((composition) =>
    composition.title.toLowerCase().includes(searchInput)
  );
  const resultsContainer = document.getElementById("searchResults");

  if (results.length > 0) {
    resultsContainer.innerHTML = results
      .map(
        (result, index) => `
                <div class="composition-item" data-index="${index}"> 
                    <div class="composition-info">
                        <p class="music-title">${result.title}</p>
                        <p class="music-artist">${result.artist}</p>
                    </div>
                    <img src="music-content/play-icon.png" alt="Play Icon" class="play-icon" data-index="${index}">
                    <audio class="music-player" id="player-${index}">
                        <source src="${result.file}" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                </div>
            `
      )
      .join("");

    const playIcons = document.querySelectorAll(".play-icon");
    playIcons.forEach((icon) => {
      icon.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        togglePlayPause(index);
      });
    });
  } else {
    resultsContainer.innerHTML = "<div>No composition found</div>";
  }
}

function togglePlayPause(index) {
  const player = document.getElementById(`player-${index}`);
  const playIcon = document.querySelector(`.play-icon[data-index="${index}"]`);

  const allPlayers = document.querySelectorAll(".music-player");
  allPlayers.forEach((p, i) => {
    if (i != index && !p.paused) {
      p.pause();
      const icon = document.querySelector(`.play-icon[data-index="${i}"]`);
      icon.src = "music-content/play-icon.png";
    }
  });

  if (player.paused) {
    player.play();
    playIcon.src = "music-content/pause-icon.png";
  } else {
    player.pause();
    playIcon.src = "music-content/play-icon.png";
  }
}

document.getElementById("searchButton").addEventListener("click", search);

document
  .getElementById("searchInput")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      search();
      event.preventDefault();
    }
  });
