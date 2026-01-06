// assets/js/theme.js
(() => {
  "use strict";

  const root = document.documentElement;
  const STORAGE_KEY = "siteMode"; // "food" | "garage"
  const DEFAULT_MODE = "food";

  const MODES = {
    garage: {
      accent: "#ff3b3b",
      glow: "rgba(255, 59, 59, 0.4)",
      hero1: "Premium websites for garages — built to get calls & bookings.",
      hero2: "Mobile-first. Fast. Clear pricing. 1–5 pages.",
      cta: "Get a garage quote",
      servicesTitle: "Garage websites",
      servicesTagline: "What I can build for your workshop.",
      servicesItems: [
        "<strong>Booking-ready landing page</strong> (calls, enquiries, maps)",
        "<strong>Services + pricing sections</strong> that look premium",
        "<strong>Trust boosters</strong> (reviews, before/after, guarantees)",
        "<strong>Basic SEO</strong> + fast load for local searches",
      ],
    },

    food: {
      accent: "#00ffcc",
      glow: "rgba(0, 255, 204, 0.4)",
      hero1: "Premium websites for restaurants & takeaways — built to convert.",
      hero2: "Mobile-first. Fast. Menu-ready. 1–5 pages.",
      cta: "Get a food quote",
      servicesTitle: "Food business websites",
      servicesTagline: "What I can build for your food business.",
      servicesItems: [
        "<strong>Menu / offers section</strong> (clean and easy to scan)",
        "<strong>Order / booking CTA</strong> that drives action",
        "<strong>Opening hours + location</strong> clearly shown",
        "<strong>Basic SEO</strong> + fast load for local searches",
      ],
    },
  };

  const $ = (id) => document.getElementById(id);

  function normalizeMode(mode) {
    return mode === "garage" || mode === "food" ? mode : DEFAULT_MODE;
  }

  function setActiveButtons(mode) {
    const redBtn = $("accentRed");
    const cyanBtn = $("accentCyan");
    if (redBtn) redBtn.classList.toggle("is-active", mode === "garage");
    if (cyanBtn) cyanBtn.classList.toggle("is-active", mode === "food");
  }

  function applyContent(cfg) {
    const hero1 = $("heroLine1");
    const hero2 = $("heroLine2");
    const heroCta = $("heroCta");
    const servicesTitle = $("servicesTitle");
    const servicesTagline = $("servicesTagline");
    const servicesList = $("servicesList");

    if (hero1) hero1.textContent = cfg.hero1;
    if (hero2) hero2.textContent = cfg.hero2;
    if (heroCta) heroCta.textContent = cfg.cta;

    if (servicesTitle) servicesTitle.textContent = cfg.servicesTitle;
    if (servicesTagline) servicesTagline.textContent = cfg.servicesTagline;

    if (servicesList) {
      servicesList.innerHTML = cfg.servicesItems.map((t) => `<li>${t}</li>`).join("");
    }
  }

  function applyMode(mode) {
    const m = normalizeMode(mode);
    const cfg = MODES[m];

    // Theme vars used across your CSS
    root.style.setProperty("--accent-color", cfg.accent);
    root.style.setProperty("--accent-glow", cfg.glow);

    // Useful for CSS selectors like: html[data-mode="food"] ...
    root.dataset.mode = m;

      // Mode switch pulse (flex)
    root.classList.remove("mode-pulse");
    void root.offsetWidth; // force reflow to restart animation
    root.classList.add("mode-pulse");

    applyContent(cfg);
    setActiveButtons(m);

    localStorage.setItem(STORAGE_KEY, m);
  }

  function init() {
    // If you ever changed key names before, this prevents old junk winning.
    // Uncomment once if needed:
    // localStorage.removeItem("food");

    const saved = localStorage.getItem(STORAGE_KEY);
    applyMode(saved || DEFAULT_MODE);

    const redBtn = $("accentRed");
    const cyanBtn = $("accentCyan");

    if (redBtn) redBtn.addEventListener("click", () => applyMode("garage"));
    if (cyanBtn) cyanBtn.addEventListener("click", () => applyMode("food"));
  }

  document.addEventListener("DOMContentLoaded", init);
})();
