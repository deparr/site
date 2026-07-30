const themes = ["light", "dark"];
const is_dark = globalThis.matchMedia("(prefers-color-scheme: dark)");

const theme = new Proxy(
  {
    value: localStorage.getItem("theme")
      ?? (is_dark.matches ? "dark" : "light"),
  },
  {
    set(target, p, newValue) {
      if (p !== "value") return false;
      if (!themes.includes(newValue)) return false;
      if (target.value === newValue) return true;

      target.value = newValue;
      document.documentElement.dataset.theme = newValue;
      localStorage.setItem("theme", newValue);

      return true;
    },
  },
);

document.documentElement.dataset.theme = theme.value;

globalThis.addEventListener("DOMContentLoaded", () => {
  const theme_toggle = document.querySelector("#theme-toggle");
  document.documentElement.dataset.theme = theme.value;

  theme_toggle!.addEventListener("click", () => {
    const idx = (themes.indexOf(theme.value) + 1) % themes.length;
    theme.value = themes[idx];
  });
});
