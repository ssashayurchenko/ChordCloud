const element = document.querySelector(".header__nav-list-link");
element.addEventListener("click", function musicNavigation(event) {
  const title = event.target.title;
  if (title === "Popular") {
    console.log("It's popular playlist!");
  }
});
