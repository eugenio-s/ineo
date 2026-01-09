// assets/js/reveal.js
(() => {
  "use strict";

  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  
  if (prefersReducedMotion) {
    // Skip animations for users who prefer reduced motion
    items.forEach(el => el.classList.add("is-in"));
    return;
  }

  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px" // Trigger slightly before element enters viewport
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add a small delay for staggered effect
        const delay = entry.target.style.animationDelay || "0s";
        const delayMs = parseFloat(delay) * 1000;
        
        setTimeout(() => {
          entry.target.classList.add("is-in");
        }, delayMs);
        
        // Stop observing once animated
        io.unobserve(entry.target);
      }
    });
  }, observerOptions);

  items.forEach((el) => io.observe(el));
})();
