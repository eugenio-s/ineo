// assets/js/pricing.js
(() => {
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  document.addEventListener("DOMContentLoaded", () => {
    // Elements
    const pagesInput = document.getElementById("pages");
    const pagesValue = document.getElementById("pagesValue");
    const plusBtn = document.getElementById("plusBtn");
    const minusBtn = document.getElementById("minusBtn");

    const contactForm = document.getElementById("contactForm");
    const seo = document.getElementById("seo");
    const analytics = document.getElementById("analytics");
    const booking = document.getElementById("booking");

    const priceValue = document.getElementById("priceValue");
    const rowBase = document.getElementById("rowBase");
    const rowPages = document.getElementById("rowPages");
    const rowAddons = document.getElementById("rowAddons");

    const quoteSummary = document.getElementById("quoteSummary");
    const copyQuoteBtn = document.getElementById("copyQuoteBtn");

    // Formspree hidden field
    const quoteField = document.getElementById("quoteField");

    // GOD-MODE PRICING - significantly increased
    const base = 280;           // Increased from 180 (was 120)
    const extraPage = 80;       // Increased from 50 (was 35)
    const addonContact = 80;    // Increased from 50 (was 30)
    const addonSeo = 120;       // Increased from 75 (was 40)
    const addonAnalytics = 60;  // Increased from 40
    const addonBooking = 150;   // NEW - premium integration

    function getPages() {
      return clamp(Number(pagesInput?.value) || 1, 1, 5);
    }

    function setPages(p) {
      const pages = clamp(p, 1, 5);
      if (pagesInput) pagesInput.value = String(pages);
      if (pagesValue) pagesValue.textContent = String(pages);
    }

    function buildQuote() {
      const pages = getPages();
      const extraPages = Math.max(0, pages - 1);
      const pagesCost = extraPages * extraPage;

      let addonsCost = 0;
      const addons = [];

      if (contactForm?.checked) {
        addonsCost += addonContact;
        addons.push(`Contact form (+£${addonContact})`);
      }

      if (seo?.checked) {
        addonsCost += addonSeo;
        addons.push(`SEO setup (+£${addonSeo})`);
      }

      if (analytics?.checked) {
        addonsCost += addonAnalytics;
        addons.push(`Analytics (+£${addonAnalytics})`);
      }

      if (booking?.checked) {
        addonsCost += addonBooking;
        addons.push(`Booking system (+£${addonBooking})`);
      }

      const total = base + pagesCost + addonsCost;

      const summary =
        `Quote estimate:\n` +
        `Pages: ${pages}\n` +
        `Extra pages: £${pagesCost}\n` +
        `Add-ons: ${addons.length ? addons.join(", ") : "None"}\n` +
        `Total: £${total}`;

      return { pages, pagesCost, addonsCost, total, summary };
    }

    function bumpPrice(el) {
      if (!el) return;
      el.classList.remove("price-bump");
      void el.offsetWidth;
      el.classList.add("price-bump");
      setTimeout(() => el.classList.remove("price-bump"), 400);
    }

    function updateUI() {
      const q = buildQuote();

      if (priceValue) {
        priceValue.textContent = `£${q.total}`;
        bumpPrice(priceValue);
      }

      if (rowBase) rowBase.textContent = `£${base}`;
      if (rowPages) rowPages.textContent = `£${q.pagesCost}`;
      if (rowAddons) rowAddons.textContent = `£${q.addonsCost}`;

      if (quoteSummary) {
        quoteSummary.textContent =
          `Summary: ${q.pages} page(s)` +
          (q.addonsCost ? `, Add-ons £${q.addonsCost}` : ", No add-ons") +
          `.`;
      }

      if (quoteField) quoteField.value = q.summary;
    }

    // Initialize
    setPages(getPages());
    updateUI();

    // Event listeners
    plusBtn?.addEventListener("click", () => {
      setPages(getPages() + 1);
      updateUI();
      plusBtn.style.transform = "scale(0.9)";
      setTimeout(() => plusBtn.style.transform = "", 100);
    });

    minusBtn?.addEventListener("click", () => {
      setPages(getPages() - 1);
      updateUI();
      minusBtn.style.transform = "scale(0.9)";
      setTimeout(() => minusBtn.style.transform = "", 100);
    });

    pagesInput?.addEventListener("input", () => {
      setPages(getPages());
      updateUI();
    });

    contactForm?.addEventListener("change", updateUI);
    seo?.addEventListener("change", updateUI);
    analytics?.addEventListener("change", updateUI);
    booking?.addEventListener("change", updateUI);

    copyQuoteBtn?.addEventListener("click", async () => {
      const q = buildQuote();

      try {
        await navigator.clipboard.writeText(q.summary);
        const originalText = copyQuoteBtn.innerHTML;
        copyQuoteBtn.innerHTML = '<span>Copied ✓</span>';
        copyQuoteBtn.style.background = "var(--accent-color)";
        copyQuoteBtn.style.color = "#000";

        setTimeout(() => {
          copyQuoteBtn.innerHTML = originalText;
          copyQuoteBtn.style.background = "";
          copyQuoteBtn.style.color = "";
        }, 2000);
      } catch {
        copyQuoteBtn.innerHTML = '<span>Copy manually</span>';
        setTimeout(() => {
          copyQuoteBtn.innerHTML = '<span>Copy quote</span>';
        }, 2000);
      }
    });
  });
})();
