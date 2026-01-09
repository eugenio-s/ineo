// assets/js/stats.js
(() => {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const stats = document.querySelectorAll(".stat-value[data-target]");
    
    if (!stats.length) return;

    const animateValue = (el, start, end, duration) => {
      const startTimestamp = performance.now();
      const step = (timestamp) => {
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        el.textContent = current;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = end;
        }
      };
      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute("data-target"));
            animateValue(el, 0, target, 2000);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    stats.forEach(stat => observer.observe(stat));
  });
})();
