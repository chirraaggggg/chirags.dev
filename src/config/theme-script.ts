/**
 * Inline script injected into <head> so the theme class is applied before
 * first paint (no flash of the wrong theme).
 *
 * - Defaults to LIGHT regardless of the visitor's OS `prefers-color-scheme`.
 * - Persists the user's explicit choice in `localStorage["theme"]` — the same
 *   key next-themes uses, so both stay in sync.
 * - One-time migration: older builds had no toggle, yet the pages-router blog
 *   wrote `theme: "dark"` into localStorage by default. Since nobody could
 *   have intentionally chosen dark, clear that accidental value exactly once
 *   so affected visitors get the intended light default again.
 */
export const THEME_INIT_SCRIPT = `(function () {
  try {
    var stored = localStorage.getItem("theme");
    if (stored === "dark" && !localStorage.getItem("theme-migrated")) {
      localStorage.setItem("theme", "light");
      localStorage.setItem("theme-migrated", "1");
      stored = "light";
    }
    document.documentElement.classList.add(
      stored === "dark" ? "dark" : "light",
    );
  } catch (e) {
    document.documentElement.classList.add("light");
  }
})();`;
