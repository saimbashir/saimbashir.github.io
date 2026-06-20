const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const year = document.querySelector("#year");
const profilePhoto = document.querySelector("#profilePhoto");
const portraitArea = document.querySelector(".portrait-area");

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

if (profilePhoto && profilePhoto.dataset.realSrc) {
  const realPhoto = new Image();

  realPhoto.onload = () => {
    profilePhoto.src = profilePhoto.dataset.realSrc;
    profilePhoto.alt = "Portrait of Saim Bashir";
    if (portraitArea) {
      portraitArea.classList.add("has-photo");
    }
  };

  realPhoto.src = profilePhoto.dataset.realSrc;
}
