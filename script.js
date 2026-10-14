/* Mobile navigation */
const toggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

function setNav(open) {
  nav.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
}

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    setNav(!nav.classList.contains("open"));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setNav(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("open")) {
      setNav(false);
      toggle.focus();
    }
  });
}

/* Footer year */
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

/* Light / dark theme toggle */
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);

  if (themeToggle) {
    const isDark = theme === "dark";
    const label = isDark ? "Switch to light mode" : "Switch to dark mode";

    themeToggle.textContent = isDark ? "☀️" : "🌙";
    themeToggle.setAttribute("aria-label", label);
    themeToggle.setAttribute("title", label);
  }
}

/* Storage can be blocked (private windows, strict settings), so never let it break the page */
function readTheme() {
  try {
    return localStorage.getItem("portfolio-theme");
  } catch (error) {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem("portfolio-theme", theme);
  } catch (error) {
    /* ignore: the theme still switches for this visit */
  }
}

applyTheme(readTheme() === "light" ? "light" : "dark");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = (root.getAttribute("data-theme") || "dark") === "dark" ? "light" : "dark";

    applyTheme(nextTheme);
    saveTheme(nextTheme);
  });
}

/* Close mobile navigation when clicking outside the header */
document.addEventListener("click", (event) => {
  if (
    toggle &&
    nav &&
    nav.classList.contains("open") &&
    !nav.contains(event.target) &&
    !toggle.contains(event.target)
  ) {
    setNav(false);
  }
});