// assets/js/pricing.js
(() => {
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  document.addEventListener("DOMContentLoaded", () => {
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

    const base = 120;
    const extraPage = 35;
    const addonContact = 30;
    const addonSeo = 40;

    function getPages() {
      return clamp(Number(pagesInput?.value) || 1, 1, 5);
    }

    function setPages(p) {
      const pages = clamp(p, 1, 5);
      if (pagesInput) pagesInput.value = pages;
      if (pagesValue) pagesValue.textContent = pages;
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

      return {
        pages,
        pagesCost,
        addonsCost,
        total,
        summary: `Quote estimate:
Pages: ${pages}
Extra pages: £${pagesCost}
Add-ons: ${addons.length ? addons.join(", ") : "None"}
Total: £${total}`
      };
    }

    function updateUI() {
  const q = buildQuote();

  if (priceValue) {
    priceValue.textContent = `£${q.total}`;

    // 🔥 price pop animation
    priceValue.classList.remove("price-bump");
    void priceValue.offsetWidth; // force reflow so animation re-triggers
    priceValue.classList.add("price-bump");

    setTimeout(() => {
      priceValue.classList.remove("price-bump");
    }, 180);
  }

  if (rowBase) rowBase.textContent = `£${base}`;
  if (rowPages) rowPages.textContent = `£${q.pagesCost}`;
  if (rowAddons) rowAddons.textContent = `£${q.addonsCost}`;

  if (quoteSummary) {
    quoteSummary.textContent =
      `Summary: ${q.pages} page(s), ` +
      (q.addonsCost ? `Add-ons £${q.addonsCost}.` : "No add-ons.");
  }
}


    setPages(getPages());
    updateUI();

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
      try {
        const q = buildQuote();
        await navigator.clipboard.writeText(q.summary);
        copyQuoteBtn.textContent = "Copied ✅";
        setTimeout(() => (copyQuoteBtn.textContent = "Copy quote"), 1200);
      } catch {
        copyQuoteBtn.textContent = "Copy manually";
        setTimeout(() => (copyQuoteBtn.textContent = "Copy quote"), 1200);
      }
    });
  });
})();
