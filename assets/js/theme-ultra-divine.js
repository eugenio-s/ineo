// assets/js/theme-ultra-divine.js - Light/Dark Mode System
(() => {
  "use strict";

  const root = document.documentElement;
  const STORAGE_KEY = "siteTheme";
  const DEFAULT_THEME = "dark";

  const $ = (id) => document.getElementById(id);

  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
  }
    return DEFAULT_THEME;
  }

  function setTheme(theme) {
    const validTheme = theme === 'light' ? 'light' : 'dark';
    const loadingScreen = $('loadingScreen');

    // Show loading screen during theme switch to prevent FPS drop
    if (loadingScreen) {
      loadingScreen.classList.remove('hidden');
      
      // Small delay to let loading screen appear
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Update theme while loading screen is visible
          root.dataset.theme = validTheme;
          localStorage.setItem(STORAGE_KEY, validTheme);
          
          // Update meta theme color
          const metaTheme = document.querySelector('meta[name="theme-color"]');
          if (metaTheme) {
            const isWorkPage = window.location.pathname.includes('work.html');
            const darkColor = isWorkPage ? '#ff3b3b' : '#00ffcc';
            metaTheme.content = validTheme === 'light' ? '#ffffff' : darkColor;
      }
          
          // Update toggle button state
          updateToggleButton(validTheme);
          
          // Hide loading screen after theme applied
      setTimeout(() => {
            loadingScreen.classList.add('hidden');
          }, 150);
        });
      });
    } else {
      // Fallback if no loading screen
      root.dataset.theme = validTheme;
      localStorage.setItem(STORAGE_KEY, validTheme);
      updateToggleButton(validTheme);
    }
  }

  function toggleTheme() {
    const currentTheme = root.dataset.theme || DEFAULT_THEME;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }

  function updateToggleButton(theme) {
    const toggleBtn = $('themeToggle');
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-label', 
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      );
    }
  }

  // Hamburger Menu Functions
  function initHamburgerMenu() {
    const hamburger = $('hamburgerBtn');
    const sideMenu = $('sideMenu');
    const overlay = $('menuOverlay');
    const closeBtn = $('closeMenuBtn');
    
    if (!hamburger || !sideMenu) return;

    function openMenu() {
      sideMenu.classList.add('is-open');
      overlay?.classList.add('is-visible');
      hamburger.classList.add('is-active');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      sideMenu.classList.remove('is-open');
      overlay?.classList.remove('is-visible');
      hamburger.classList.remove('is-active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () => {
      const isOpen = sideMenu.classList.contains('is-open');
      isOpen ? closeMenu() : openMenu();
    });

    overlay?.addEventListener('click', closeMenu);
    closeBtn?.addEventListener('click', closeMenu);

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && sideMenu.classList.contains('is-open')) {
        closeMenu();
    }
    });

    // Close menu when clicking a link
    sideMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        setTimeout(closeMenu, 150);
      });
    });
  }

  // Initialize reveal animations with IntersectionObserver
  function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;
    
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.classList.contains('revealed')) {
            // Use requestAnimationFrame for smoother animation
            requestAnimationFrame(() => {
            entry.target.classList.add('revealed');
            });
            // Stop observing once revealed
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { 
        threshold: 0.1, 
        rootMargin: '0px 0px -30px 0px' 
      }
    );

    // Start observing after a short delay for page to stabilize
    requestAnimationFrame(() => {
      revealElements.forEach((el, index) => {
        // Add staggered delay based on index for initial viewport elements
        if (el.getBoundingClientRect().top < window.innerHeight) {
          setTimeout(() => {
            el.classList.add('revealed');
          }, 100 + (index * 80));
        } else {
      revealObserver.observe(el);
        }
      });
    });
  }

  // Page Transition System
  function initPageTransitions() {
    const overlay = $('pageTransition');
    if (!overlay) return;

    // Handle all internal navigation links
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      
      // Skip anchors, external links, and javascript links
      if (!href || 
          href.startsWith('#') || 
          href.startsWith('javascript:') ||
          href.startsWith('mailto:') ||
          href.startsWith('tel:') ||
          href.startsWith('http://') ||
          href.startsWith('https://')) {
        return;
      }

      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Show transition overlay
        overlay.classList.add('active');
        
        // Navigate after animation
        setTimeout(() => {
          window.location.href = href;
        }, 300);
      });
    });

    // Fade out overlay when page loads
    window.addEventListener('pageshow', () => {
      overlay.classList.remove('active');
      });
    }

  // Hide loading screen
  function hideLoadingScreen() {
    const loadingScreen = $('loadingScreen');
    if (loadingScreen) {
      // Small delay for smooth transition
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
      }, 400);
    }
  }

  function init() {
    // Set initial theme without animation
    const initialTheme = getPreferredTheme();
    root.dataset.theme = initialTheme;
    updateToggleButton(initialTheme);

    // Hide loading screen
    hideLoadingScreen();

    // Initialize reveal animations
    initRevealAnimations();

    // Initialize hamburger menu
    initHamburgerMenu();

    // Initialize page transitions
    initPageTransitions();

    // Theme toggle button
    const toggleBtn = $('themeToggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggleTheme);
      
      // Keyboard support
      toggleBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
          toggleTheme();
        }
      });
    }

    // Listen for system theme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Only auto-switch if user hasn't manually set a preference
        if (!localStorage.getItem(STORAGE_KEY)) {
          setTheme(e.matches ? 'dark' : 'light');
          }
        });
      }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
