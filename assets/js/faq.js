// assets/js/faq.js
(() => {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
      const question = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");
      
      if (!question) return;

      // Set initial ARIA states
      const isExpanded = item.classList.contains("active") || item.classList.contains("is-open");
      question.setAttribute("aria-expanded", isExpanded);
      if (answer) {
        answer.setAttribute("aria-hidden", !isExpanded);
        answer.id = answer.id || `faq-answer-${Math.random().toString(36).substr(2, 9)}`;
        question.setAttribute("aria-controls", answer.id);
      }

      question.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const isActive = item.classList.contains("active") || item.classList.contains("is-open");
        
        // Close all other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove("active", "is-open");
            const otherQuestion = otherItem.querySelector(".faq-question");
            const otherAnswer = otherItem.querySelector(".faq-answer");
            if (otherQuestion) otherQuestion.setAttribute("aria-expanded", "false");
            if (otherAnswer) otherAnswer.setAttribute("aria-hidden", "true");
          }
        });

        // Toggle current item (standardize on "active" class)
        item.classList.remove("is-open");
        item.classList.toggle("active", !isActive);
        question.setAttribute("aria-expanded", !isActive);
        if (answer) answer.setAttribute("aria-hidden", isActive);
      });

      // Keyboard support
      question.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          question.click();
        }
      });
    });
  });
})();
