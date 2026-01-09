// assets/js/cursor.js
(() => {
  "use strict";

  // Check if device supports hover (skip on touch devices)
  const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!supportsHover) return;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  const cursor = document.getElementById("cursorFollower");
  if (!cursor) return;

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let isActive = false;

  // Smooth follow animation
  function animate() {
    // Lerp (linear interpolation) for smooth following
    const speed = 0.15;
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;

    cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
    
    requestAnimationFrame(animate);
  }

  // Track mouse movement
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Add active state on interactive elements
  const interactiveElements = document.querySelectorAll("a, button, .btn, .chip, .check");
  
  interactiveElements.forEach(el => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("active");
    });
    
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("active");
    });
  });

  // Start animation
  animate();
})();
