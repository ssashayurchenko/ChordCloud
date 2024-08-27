import { initializePagination } from "./pagination.js";
import { setupPlayPauseListeners } from "./togglePlayPause.js";

async function loadCompositions() {
  const response = await fetch("api/songs-list.json");
  const data = await response.json();

  const compositions = data.find((category) => category.All).All;

  displayItems(compositions);
  setupPlayPauseListeners();

  initializePagination(compositions);

  document
    .getElementById("searchButton")
    .addEventListener("click", function () {
      search(compositions);
    });

  document
    .getElementById("searchInput")
    .addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        search(compositions);
        event.preventDefault();
      }
    });
}

function displayItems(itemsToDisplay, startIndex = 0) {
  const resultsContainer = document.getElementById("searchResults");
  resultsContainer.innerHTML = itemsToDisplay
    .map(
      (result, index) =>
        `<div class="composition-item" data-index="${startIndex + index}"> 
          <div class="composition-info">
              <p class="music-title">${result.title}</p>
              <p class="music-artist">${result.artist}</p>
          </div>
          <img src="music-content/play-icon.png" alt="Play Icon" class="play-icon" data-index="${
            startIndex + index
          }">
          <audio class="music-player" id="player-${startIndex + index}">
              <source src="${result.file}" type="audio/mpeg">
              Your browser does not support the audio element.
          </audio>
      </div>`
    )
    .join("");
}

function search(compositions) {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const resultsContainer = document.getElementById("searchResults");

  if (!searchInput.trim()) {
    resultsContainer.innerHTML = "<div>Please enter a search query</div>";
    return;
  }

  const results = compositions.filter((composition) =>
    composition.title.toLowerCase().includes(searchInput)
  );

  if (results.length > 0) {
    displayItems(results);
  } else {
    resultsContainer.innerHTML = "<div>No composition found</div>";
  }
}

loadCompositions();

export { displayItems };
