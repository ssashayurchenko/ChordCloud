import { initializePagination } from "./pagination.js";
import { setupPlayPauseListeners } from "./togglePlayPause.js";
import { savedUserName } from "./register-form.js";

async function loadCompositions() {
  const response = await fetch("api/songs-list.json");
  const data = await response.json();

  const compositions = data.find((category) => category.All).All;

  displayItems(compositions);
  initializePagination(compositions);
  setupPlayPauseListeners();

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

  document.getElementById("favorites").addEventListener("click", function () {
    if (!savedUserName) {
      document.getElementById("musicResults").innerHTML =
        "<div>You are not logged in. Please log in to view your favorites.</div>";
    } else {
      displayFavorites();
    }
  });
}

function displayItems(itemsToDisplay, startIndex = 0) {
  const resultsContainer = document.getElementById("musicResults");
  resultsContainer.innerHTML = itemsToDisplay
    .map(
      (result, index) =>
        `<div class="composition-item" data-index="${startIndex + index}"> 
          <div class="composition-info">
              <p class="music-title">${result.title}</p>
              <p class="music-artist">${result.artist}</p>
          </div>
          <img src="music-content/favorites.png" class="favorites-btn" data-index="${
            startIndex + index
          }" data-title="${result.title}" data-artist="${
          result.artist
        }" data-file="${result.file}">
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

  const favoritesBtns = document.querySelectorAll(".favorites-btn");
  favoritesBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      if (!savedUserName) {
        alert("Log in first");
      } else {
        toggleFavorite(btn.dataset.title, btn.dataset.artist, btn.dataset.file);
      }
    });
  });

  setupPlayPauseListeners();
}

function search(compositions) {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const resultsContainer = document.getElementById("musicResults");

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

function toggleFavorite(title, artist, file) {
  const favorites = getFavorites();
  const key = `${title}-${artist}-${file}`;

  if (favorites[key]) {
    delete favorites[key];
    alert("This composition was deleted from your favorites.");
  } else {
    favorites[key] = { title, artist, file };
    alert("This composition was added to your favorites.");
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  displayFavorites();
}

function getFavorites() {
  const favorites = localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : {};
}

function displayFavorites(startIndex = 0) {
  const favorites = getFavorites();
  const resultsContainer = document.getElementById("musicResults");

  if (Object.keys(favorites).length > 0) {
    const favoritesCompositions = Object.values(favorites).map(
      (item, index) => ({
        title: item.title,
        artist: item.artist,
        file: item.file,
      })
    );

    displayItems(favoritesCompositions, startIndex);
    initializePagination(favoritesCompositions);
  } else {
    resultsContainer.innerHTML =
      "<div>There is no composition added to your favorites.</div>";
  }
}

loadCompositions();

export { displayItems };
