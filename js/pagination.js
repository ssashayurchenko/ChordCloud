import { displayItems } from "./global.search-input.js";
import { setupPlayPauseListeners } from "./togglePlayPause.js";

let currentPage = 1;
let itemsPerPage = 7;
let totalItems = 0;
let compositions = [];

function updatePagination() {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  document.getElementById("prevPage").disabled = currentPage === 1;
  document.getElementById("nextPage").disabled = currentPage === totalPages;
}

function displayPage(page) {
  currentPage = page;
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const itemsToDisplay = compositions.slice(start, end);
  displayItems(itemsToDisplay, start);
  updatePagination();
  setupPlayPauseListeners();
}

function setupPagination() {
  document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
      displayPage(currentPage - 1);
    }
  });

  document.getElementById("nextPage").addEventListener("click", () => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (currentPage < totalPages) {
      displayPage(currentPage + 1);
    }
  });
}

function initializePagination(data) {
  compositions = data;
  totalItems = compositions.length;
  displayPage(1);
  setupPagination();
}

export { initializePagination, displayPage };
