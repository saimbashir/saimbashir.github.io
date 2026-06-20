const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const year = document.querySelector("#year");
const typingHeading = document.querySelector(".typing-heading");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

if (typingHeading) {
  const prefixTarget = typingHeading.dataset.prefix || "";
  const nameTarget = typingHeading.dataset.name || "";
  const prefixEl = typingHeading.querySelector(".typed-prefix");
  const nameEl = typingHeading.querySelector(".typed-name");
  const cursorEl = typingHeading.querySelector(".typing-cursor");

  function renderTypedText(prefix, name) {
    if (prefixEl) {
      prefixEl.textContent = prefix;
    }

    if (nameEl) {
      nameEl.textContent = name;
    }
  }

  if (reduceMotion) {
    renderTypedText(prefixTarget, nameTarget);
    if (cursorEl) {
      cursorEl.style.display = "none";
    }
  } else {
    const fullText = `${prefixTarget}${nameTarget}`;
    let index = 0;

    function typeNextCharacter() {
      index += 1;
      const currentText = fullText.slice(0, index);
      renderTypedText(
        currentText.slice(0, prefixTarget.length),
        currentText.slice(prefixTarget.length)
      );

      if (index < fullText.length) {
        window.setTimeout(typeNextCharacter, index < prefixTarget.length ? 55 : 72);
      }
    }

    window.setTimeout(typeNextCharacter, 260);
  }
}

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
