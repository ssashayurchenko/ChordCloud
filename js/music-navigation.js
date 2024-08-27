import { displayItems } from "./global.search-input.js";
import { initializePagination } from "./pagination.js";
import { setupPlayPauseListeners } from "./togglePlayPause.js";

const elements = document.querySelectorAll(".header__nav-list-link");
const burgerMenu = document.querySelector(".header__nav");

elements.forEach((element) => {
  element.addEventListener("click", function (event) {
    const title = event.target.title;
    loadCategoryCompositions(title);
    if (burgerMenu.classList.contains("open")) {
      burgerMenu.classList.remove("open");
    }
  });
});

async function loadCategoryCompositions(categoryName) {
  const response = await fetch("api/songs-list.json");
  const data = await response.json();

  const compositions = data.find((category) => category[categoryName])[
    categoryName
  ];

  displayItems(compositions);
  initializePagination(compositions);
  setupPlayPauseListeners();
}
