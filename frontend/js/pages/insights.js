"use strict";

function initInsightsPage() {
    const filterButtons = document.querySelectorAll(".filter-button");
    const insightCards = document.querySelectorAll(".insight-card");

    if (!filterButtons.length || !insightCards.length) {
        return;
    }

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const selectedFilter = button.dataset.filter;

            filterButtons.forEach(function (item) {
                const isActive = item === button;
                item.classList.toggle("is-active", isActive);
                item.setAttribute("aria-pressed", String(isActive));
            });

            insightCards.forEach(function (card) {
                const matches = selectedFilter === "all" || card.dataset.category === selectedFilter;
                card.classList.toggle("is-hidden", !matches);
            });
        });
    });
}

document.addEventListener("DOMContentLoaded", initInsightsPage);
