document.getElementById("burger-menu").addEventListener("click", function () {
  document.querySelector(".header__nav").classList.toggle("open");
  document.documentElement.classList.toggle("no-scroll");
  document.body.classList.toggle("no-scroll");
});
