/* ==========================================================================
   services.js — Services page behaviour
   Owner: Edouard

   Loaded only by frontend/pages/services.html.
   Keep everything scoped to this page. Shared logic belongs in main.js.
   ========================================================================== */

"use strict";


/* ==========================================================================
   Services Page Initialisation
   ========================================================================== */

/**
 * Initialises all Services page interactions.
 */
function initServicesPage() {
    initServicesSmoothScroll();
    initServicesCards();
    initServicesScrollReveal();
}


/* ==========================================================================
   Smooth Scroll
   ========================================================================== */

/**
 * Enables smooth scrolling for internal Services page links.
 */
function initServicesSmoothScroll() {
    const scrollLinks = document.querySelectorAll("[data-services-scroll]");

    if (!scrollLinks.length) {
        return;
    }

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

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
                behavior: prefersReducedMotion ? "auto" : "smooth",
                block: "start"
            });
        });
    });
}


/* ==========================================================================
   Service Card Accessibility
   ========================================================================== */

/**
 * Adds a visual focus state to service items containing interactive elements.
 */
function initServicesCards() {
    const serviceCards = document.querySelectorAll("[data-service-card]");

    if (!serviceCards.length) {
        return;
    }

    serviceCards.forEach((card) => {
        const interactiveElement = card.querySelector("a, button");

        if (!interactiveElement) {
            return;
        }

        interactiveElement.addEventListener("focus", () => {
            card.classList.add("services-item--focused");
        });

        interactiveElement.addEventListener("blur", () => {
            card.classList.remove("services-item--focused");
        });
    });
}


/* ==========================================================================
   Scroll Reveal
   ========================================================================== */

/**
 * Reveals Services page elements once when they enter the viewport.
 *
 * Elements are unobserved immediately after being revealed, so animations
 * do not replay when the user scrolls back through the page.
 */
function initServicesScrollReveal() {
    const revealElements = document.querySelectorAll(
        "[data-reveal], [data-reveal-item]"
    );

    if (!revealElements.length) {
        return;
    }

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });

        return;
    }

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("is-visible");

                // Reveal each element only once per page load.
                observer.unobserve(entry.target);
            });
        },
        {
            root: null,
            threshold: 0.14,
            rootMargin: "0px 0px -8% 0px"
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
}


/* ==========================================================================
   Start
   ========================================================================== */

document.addEventListener("DOMContentLoaded", initServicesPage);