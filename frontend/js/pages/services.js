/* ==========================================================================
   services.js — Services page behaviour
   Owner: Edouard

   Loaded only by frontend/pages/services.html.
   Keep everything scoped to this page. Shared logic belongs in main.js.
   ========================================================================== */

"use strict";

/**
 * Initialise the Services page.
 */
function initServicesPage() {
    // Services behaviour to be developed by Edourd.

    initServicesSmoothScroll();
    initServicesCards();
}


/**
 * Enables smooth scrolling for internal Services page links.
 */
function initServicesSmoothScroll() {
    const scrollLinks = document.querySelectorAll("[data-services-scroll]");

    scrollLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || !targetId.startsWith("#")) {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });
}


/**
 * Prepares service cards for keyboard interaction.
 */
function initServicesCards() {
    const serviceCards = document.querySelectorAll("[data-service-card]");

    serviceCards.forEach((card) => {
        const interactiveElement = card.querySelector("a, button");

        if (!interactiveElement) {
            return;
        }

        interactiveElement.addEventListener("focus", () => {
            card.classList.add("services-card--focused");
        });

        interactiveElement.addEventListener("blur", () => {
            card.classList.remove("services-card--focused");
        });
    });
}


document.addEventListener("DOMContentLoaded", initServicesPage);