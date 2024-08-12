function init() {
    import("./global.search-input.js");
    import("./register-form.js");
    import("../myformproject/server.js");
  }
  
  const totalPartials = document.querySelectorAll(
    '[data-hx-trigger="load"], [hx-trigger="load"]'
  ).length;
  let loadedPartialsCount = 0;
  
  document.body.addEventListener("htmx:afterOnLoad", () => {
    loadedPartialsCount++;
    if (loadedPartialsCount === totalPartials) init();
  });
  