// assets/js/theme-ultra-divine.js - COMPLETE TRANSFORMATION
(() => {
  "use strict";

  const root = document.documentElement;
  const STORAGE_KEY = "siteMode";
  const DEFAULT_MODE = "food";

  const MODES = {
    garage: {
      accent: "#ff3b3b",
      glow: "rgba(255, 59, 59, 0.6)",
      hero1: "Premium websites for garages — built to get calls & bookings.",
      hero2: "Technical. Fast. Professional. 1–5 pages.",
      cta: "Quick quote",
      servicesTitle: "Garage Websites",
      servicesTagline: "Built for workshops and auto repair.",
      servicesItems: [
        "<strong>Booking-ready landing page</strong> (calls, enquiries, maps)",
        "<strong>Services + pricing sections</strong> that look premium",
        "<strong>Trust boosters</strong> (reviews, before/after, guarantees)",
        "<strong>SEO setup</strong> + fast load for local searches",
      ],
    },

    food: {
      accent: "#00ffcc",
      glow: "rgba(0, 255, 204, 0.6)",
      hero1: "Premium websites for restaurants & takeaways — built to convert.",
      hero2: "Mobile-first. Beautiful. Menu-ready. 1–5 pages.",
      cta: "Quick quote",
      servicesTitle: "Food Business Websites",
      servicesTagline: "Perfect for restaurants and takeaways.",
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

  // Create mega color wave effect
  function createColorWave(toColor) {
    const wave = document.createElement('div');
    wave.className = 'color-wave';
    wave.style.background = `radial-gradient(circle at center, ${toColor}, transparent)`;
    document.body.appendChild(wave);
    
    setTimeout(() => wave.remove(), 1500);
  }

  // Create enhanced particle burst (40 particles)
  function createParticleBurst(color) {
    const particleCount = 40;
    const container = document.createElement('div');
    container.className = 'particle-container';
    document.body.appendChild(container);

    // Position at center of active button
    const activeBtn = root.dataset.mode === "garage" ? $("accentCyan") : $("accentRed");
    if (activeBtn) {
      const rect = activeBtn.getBoundingClientRect();
      container.style.left = rect.left + rect.width / 2 + 'px';
      container.style.top = rect.top + rect.height / 2 + 'px';
    }

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'mode-particle';
      particle.style.background = color;
      
      const angle = (Math.PI * 2 * i) / particleCount;
      const velocity = 120 + Math.random() * 130;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;
      
      particle.style.setProperty('--tx', `${tx}%`);
      particle.style.setProperty('--ty', `${ty}%`);
      
      // Random delay for staggered burst
      particle.style.animationDelay = `${Math.random() * 0.2}s`;
      
      container.appendChild(particle);
    }

    setTimeout(() => container.remove(), 2000);
  }

  // Morph content with enhanced animation
  function applyContent(cfg) {
    const hero1 = $("heroLine1");
    const hero2 = $("heroLine2");
    const heroCta = $("heroCta");
    const servicesTitle = $("servicesTitle");
    const servicesTagline = $("servicesTagline");
    const servicesList = $("servicesList");

    const elements = [hero1, hero2, servicesTitle, servicesTagline, servicesList];
    
    // Phase 1: Dramatic fade out with scale
    elements.forEach(el => {
      if (el) {
        el.style.transition = "opacity 0.4s ease, transform 0.4s ease";
        el.style.opacity = "0";
        el.style.transform = "translateY(20px) scale(0.95)";
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

      // Phase 3: Dramatic fade in with spring
      setTimeout(() => {
        elements.forEach(el => {
          if (el) {
            el.style.transition = "opacity 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";
            el.style.opacity = "1";
            el.style.transform = "translateY(0) scale(1)";
          }
        });
      }, 100);
    }, 400);
  }

  // ULTRA-DIVINE: Complete mode transformation
  function applyMode(mode) {
    const m = normalizeMode(mode);
    const cfg = MODES[m];
    const oldMode = root.dataset.mode;

    // Don't animate if it's the same mode
    if (oldMode === m) return;

    // ULTRA-DIVINE EFFECTS START
    
    // 1. Mega color wave
    createColorWave(cfg.glow);

    // 2. Enhanced particle burst (40 particles)
    createParticleBurst(cfg.accent);

    // 3. Add intergalactic transformation class
    root.classList.add('mode-switching');
    setTimeout(() => root.classList.remove('mode-switching'), 1200);

    // 4. Update mode data attribute (triggers CSS layout changes)
    root.dataset.mode = m;

    // 5. Update CSS variables smoothly
    root.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
    root.style.setProperty("--accent-color", cfg.accent);
    root.style.setProperty("--accent-glow", cfg.glow);

    // 6. Morph content with drama
    applyContent(cfg);
    
    // 7. Update button states
    setActiveButtons(m);

    // 8. Save preference
    localStorage.setItem(STORAGE_KEY, m);

    // 9. Button press feedback
    const activeBtn = m === "garage" ? $("accentRed") : $("accentCyan");
    if (activeBtn) {
      activeBtn.style.transform = "scale(0.85)";
      setTimeout(() => {
        activeBtn.style.transform = "";
      }, 250);
    }

    // 10. Smooth scroll to top if needed
    if (window.scrollY > 150) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }

    // 11. Re-trigger reveal animations
    setTimeout(() => {
      const revealElements = document.querySelectorAll('.reveal');
      revealElements.forEach(el => {
        el.classList.remove('revealed');
        // Force reflow
        void el.offsetWidth;
        el.classList.add('revealed');
      });
    }, 600);
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

    // Initialize reveal animations
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach(el => {
      revealObserver.observe(el);
    });

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
