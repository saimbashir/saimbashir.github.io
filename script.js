const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const year = document.querySelector("#year");

function applyTheme(theme) {
  root.dataset.theme = theme;
  themeToggle.setAttribute(
    "aria-label",
    theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
  );
}

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  localStorage.setItem("theme", nextTheme);
});

applyTheme(root.dataset.theme || "light");

if (year) {
  year.textContent = new Date().getFullYear();
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion) {
  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY || 0;
    const backgroundOffset = `${Math.min(scrollY * -0.045, 0)}px`;
    const heroOffset = `${Math.min(scrollY, 260)}px`;

    root.style.setProperty("--parallax-offset", backgroundOffset);
    root.style.setProperty("--hero-parallax", heroOffset);
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    },
    { passive: true }
  );

  updateParallax();
}
