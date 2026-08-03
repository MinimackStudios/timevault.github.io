(() => {
  const root = document.documentElement;
  const savedTheme = window.localStorage.getItem("timevault-theme");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  const favicon = document.querySelector("#site-favicon");
  const themeIcons = document.querySelectorAll("[data-theme-icon]");

  function applyTheme(theme) {
    root.dataset.theme = theme;
    window.localStorage.setItem("timevault-theme", theme);
    const iconPath = theme === "dark" ? "icon-dark.png" : "icon-light.png";
    themeIcons.forEach((icon) => {
      icon.src = iconPath;
    });
    if (favicon) favicon.href = iconPath;
  }

  applyTheme(savedTheme === "dark" || savedTheme === "light" ? savedTheme : systemTheme);

  document.querySelector("[data-theme-toggle]")?.addEventListener("click", () => {
    applyTheme(root.dataset.theme === "dark" ? "light" : "dark");
  });

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealTargets = document.querySelectorAll(".reveal");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach((target) => target.classList.add("shown"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("shown");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((target) => observer.observe(target));
})();
