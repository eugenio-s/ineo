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

    const priceValue = document.getElementById("priceValue");
    const rowBase = document.getElementById("rowBase");
    const rowPages = document.getElementById("rowPages");
    const rowAddons = document.getElementById("rowAddons");

    const quoteSummary = document.getElementById("quoteSummary");
    const copyQuoteBtn = document.getElementById("copyQuoteBtn");

    // Formspree hidden field (in your Contact form)
    const quoteField = document.getElementById("quoteField");

    // Pricing constants
    const base = 120;
    const extraPage = 35;
    const addonContact = 30;
    const addonSeo = 40;

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
        addons.push(`Basic SEO (+£${addonSeo})`);
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
      void el.offsetWidth; // reflow so animation re-triggers
      el.classList.add("price-bump");
      setTimeout(() => el.classList.remove("price-bump"), 180);
    }

    function updateUI() {
      const q = buildQuote();

      // Total
      if (priceValue) {
        priceValue.textContent = `£${q.total}`;
        bumpPrice(priceValue);
      }

      // Breakdown
      if (rowBase) rowBase.textContent = `£${base}`;
      if (rowPages) rowPages.textContent = `£${q.pagesCost}`;
      if (rowAddons) rowAddons.textContent = `£${q.addonsCost}`;

      // Summary line under buttons
      if (quoteSummary) {
        quoteSummary.textContent =
          `Summary: ${q.pages} page(s), ` +
          (q.addonsCost ? `Add-ons £${q.addonsCost}.` : "No add-ons.");
      }

      // ✅ Keep hidden quote field updated for Formspree
      if (quoteField) quoteField.value = q.summary;
    }

    // Init
    setPages(getPages());
    updateUI();

    // Events
    plusBtn?.addEventListener("click", () => {
      setPages(getPages() + 1);
      updateUI();
    });

    minusBtn?.addEventListener("click", () => {
      setPages(getPages() - 1);
      updateUI();
    });

    pagesInput?.addEventListener("input", () => {
      setPages(getPages());
      updateUI();
    });

    contactForm?.addEventListener("change", updateUI);
    seo?.addEventListener("change", updateUI);

    copyQuoteBtn?.addEventListener("click", async () => {
      const q = buildQuote();

      try {
        await navigator.clipboard.writeText(q.summary);
        copyQuoteBtn.textContent = "Copied ✅";
      } catch {
        copyQuoteBtn.textContent = "Copy manually";
      }

      setTimeout(() => (copyQuoteBtn.textContent = "Copy quote"), 1200);
    });
  });
})();
