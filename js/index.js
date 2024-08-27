function init() {
  import("./global.search-input.js");
  import("./register-form.js");
  import("./modal-window.js")
  import("../myformproject/server.js");
  import("./burger-menu.js");
  import("./music-navigation.js");
  import("./togglePlayPause.js");
  import("./pagination.js");
}

const totalPartials = document.querySelectorAll(
  '[data-hx-trigger="load"], [hx-trigger="load"]'
).length;
let loadedPartialsCount = 0;

document.body.addEventListener("htmx:afterOnLoad", () => {
  loadedPartialsCount++;
  if (loadedPartialsCount === totalPartials) init();
});
