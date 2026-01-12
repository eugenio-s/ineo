// assets/js/floating.js
(() => {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const floatingCta = document.getElementById("floatingCta");
    const contactSection = document.getElementById("contact");
    
    if (!floatingCta || !contactSection) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateFloatingCta = () => {
      const scrollY = window.scrollY;
      const contactTop = contactSection.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      // Show button after scrolling down 300px
      // Hide when contact section is visible
      const shouldShow = scrollY > 300 && contactTop > windowHeight * 0.5;
      
      floatingCta.classList.toggle("visible", shouldShow);
      
      ticking = false;
    };

    const onScroll = () => {
      lastScrollY = window.scrollY;
      
      if (!ticking) {
        requestAnimationFrame(updateFloatingCta);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    
    // Initial check
    updateFloatingCta();
  });
})();
