// assets/js/theme.js - DIVINE INTERGALACTIC MODE SWITCHING
(() => {
  "use strict";

  const root = document.documentElement;
  const STORAGE_KEY = "siteMode";
  const DEFAULT_MODE = "food";

  const MODES = {
    garage: {
      accent: "#ff3b3b",
      glow: "rgba(255, 59, 59, 0.5)",
      hero1: "Premium websites for garages — built to get calls & bookings.",
      hero2: "Mobile-first. Fast. Clear pricing. 1–5 pages.",
      cta: "Quick quote",
      servicesTitle: "Garage websites",
      servicesTagline: "What I can build for your workshop.",
      servicesItems: [
        "<strong>Booking-ready landing page</strong> (calls, enquiries, maps)",
        "<strong>Services + pricing sections</strong> that look premium",
        "<strong>Trust boosters</strong> (reviews, before/after, guarantees)",
        "<strong>SEO setup</strong> + fast load for local searches",
      ],
    },

    food: {
      accent: "#00ffcc",
      glow: "rgba(0, 255, 204, 0.5)",
      hero1: "Premium websites for restaurants & takeaways — built to convert.",
      hero2: "Mobile-first. Fast. Menu-ready. 1–5 pages.",
      cta: "Quick quote",
      servicesTitle: "Food business websites",
      servicesTagline: "What I can build for your food business.",
      servicesItems: [
        "<strong>Menu / offers section</strong> (clean and easy to scan)",
        "<strong>Order / booking CTA</strong> that drives action",
        "<strong>Opening hours + location</strong> clearly shown",
        "<strong>SEO setup</strong> + fast load for local searches",
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

  // DIVINE: Create color wave effect
  function createColorWave(fromColor, toColor) {
    const wave = document.createElement('div');
    wave.className = 'color-wave';
    wave.style.background = `radial-gradient(circle at center, ${toColor}, transparent)`;
    document.body.appendChild(wave);
    
    setTimeout(() => wave.remove(), 1200);
  }

  // DIVINE: Create particle burst
  function createParticleBurst(color) {
    const particleCount = 30;
    const container = document.createElement('div');
    container.className = 'particle-container';
    document.body.appendChild(container);

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'mode-particle';
      particle.style.background = color;
      
      const angle = (Math.PI * 2 * i) / particleCount;
      const velocity = 100 + Math.random() * 100;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;
      
      particle.style.setProperty('--tx', `${tx}%`);
      particle.style.setProperty('--ty', `${ty}%`);
      
      container.appendChild(particle);
    }

    setTimeout(() => container.remove(), 1500);
  }

  // DIVINE: Morph content with cross-fade
  function applyContent(cfg) {
    const hero1 = $("heroLine1");
    const hero2 = $("heroLine2");
    const heroCta = $("heroCta");
    const servicesTitle = $("servicesTitle");
    const servicesTagline = $("servicesTagline");
    const servicesList = $("servicesList");

    const elements = [hero1, hero2, servicesTitle, servicesTagline, servicesList];
    
    // Phase 1: Fade out
    elements.forEach(el => {
      if (el) {
        el.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        el.style.opacity = "0";
        el.style.transform = "translateY(10px)";
      }
    });

    setTimeout(() => {
      // Phase 2: Update content
      if (hero1) hero1.textContent = cfg.hero1;
      if (hero2) hero2.textContent = cfg.hero2;
      
      if (heroCta) {
        const span = heroCta.querySelector('span');
        if (span) span.textContent = cfg.cta;
      }

      if (servicesTitle) servicesTitle.textContent = cfg.servicesTitle;
      if (servicesTagline) servicesTagline.textContent = cfg.servicesTagline;

      if (servicesList) {
        servicesList.innerHTML = cfg.servicesItems.map((t) => `<li>${t}</li>`).join("");
      }

      // Phase 3: Fade in
      setTimeout(() => {
        elements.forEach(el => {
          if (el) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }
        });
      }, 50);
    }, 300);
  }

  // DIVINE: Main mode application with spectacular effects
  function applyMode(mode) {
    const m = normalizeMode(mode);
    const cfg = MODES[m];
    const oldMode = root.dataset.mode;

    // Don't animate if it's the same mode or initial load
    if (oldMode === m) return;

    // DIVINE EFFECTS START
    
    // 1. Create color wave
    createColorWave(
      oldMode === "garage" ? "rgba(255, 59, 59, 0.3)" : "rgba(0, 255, 204, 0.3)",
      cfg.glow
    );

    // 2. Create particle burst from active button
    const activeBtn = m === "garage" ? $("accentRed") : $("accentCyan");
    if (activeBtn) {
      const rect = activeBtn.getBoundingClientRect();
      const container = document.querySelector('.particle-container');
      if (container) {
        container.style.left = rect.left + rect.width / 2 + 'px';
        container.style.top = rect.top + rect.height / 2 + 'px';
      }
      createParticleBurst(cfg.accent);
    }

    // 3. Add intergalactic pulse to body
    root.classList.add('mode-switching');
    setTimeout(() => root.classList.remove('mode-switching'), 1000);

    // 4. Update CSS variables with smooth transition
    root.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
    root.style.setProperty("--accent-color", cfg.accent);
    root.style.setProperty("--accent-glow", cfg.glow);

    // 5. Set mode data attribute
    root.dataset.mode = m;

    // 6. Mode pulse effect (existing)
    root.classList.remove("mode-pulse");
    void root.offsetWidth;
    root.classList.add("mode-pulse");

    // 7. Morph content
    applyContent(cfg);
    
    // 8. Update button states
    setActiveButtons(m);

    // 9. Save preference
    localStorage.setItem(STORAGE_KEY, m);

    // 10. Button press effect
    if (activeBtn) {
      activeBtn.style.transform = "scale(0.9)";
      setTimeout(() => {
        activeBtn.style.transform = "";
      }, 200);
    }

    // 11. Scroll to top smoothly if not in viewport
    if (window.scrollY > 100) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  function init() {
    const saved = localStorage.getItem(STORAGE_KEY);
    const initialMode = saved || DEFAULT_MODE;
    
    // Set initial mode without animation
    root.dataset.mode = initialMode;
    const cfg = MODES[initialMode];
    root.style.setProperty("--accent-color", cfg.accent);
    root.style.setProperty("--accent-glow", cfg.glow);
    applyContent(cfg);
    setActiveButtons(initialMode);

    const redBtn = $("accentRed");
    const cyanBtn = $("accentCyan");

    if (redBtn) {
      redBtn.addEventListener("click", () => {
        applyMode("garage");
      });
    }
    
    if (cyanBtn) {
      cyanBtn.addEventListener("click", () => {
        applyMode("food");
      });
    }

    // Keyboard navigation
    [redBtn, cyanBtn].forEach(btn => {
      if (btn) {
        btn.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            btn.click();
          }
        });
      }
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
