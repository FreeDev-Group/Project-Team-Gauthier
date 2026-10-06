/* ==========================================================================
   about.js — About page behaviour
   Owner: Edouard

   Loaded only by frontend/pages/about.html.
   Keep everything scoped to this page. Shared logic belongs in main.js.
   ========================================================================== */
"use strict";

/**
 * Initializes the About page interactions.
 */
function initAboutPage() {
    initAboutScrollReveal();
    initAboutCounters();
}

/**
 * Reveals About page elements once they enter the viewport.
 * Elements remain visible after their first reveal.
 */
function initAboutScrollReveal() {
    const revealElements = document.querySelectorAll("[data-reveal]");

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

    revealElements.forEach((element) => {
        const delay = Number(element.dataset.revealDelay) || 0;
        element.style.setProperty("--reveal-delay", `${delay}ms`);
    });

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("is-visible");

                // Stop observing after the first reveal.
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.14,
            rootMargin: "0px 0px -8% 0px",
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
}

/**
 * Animates experience counters once they enter the viewport.
 */
function initAboutCounters() {
    const counters = document.querySelectorAll("[data-counter-target]");

    if (!counters.length) {
        return;
    }

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const setFinalValue = (counter) => {
        const target = Number(counter.dataset.counterTarget);
        counter.textContent = `${target}+`;
    };

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
        counters.forEach(setFinalValue);
        return;
    }

    const animateCounter = (counter) => {
        const target = Number(counter.dataset.counterTarget);
        const duration = 1200;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(target * easedProgress);

            counter.textContent = `${currentValue}+`;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = `${target}+`;
            }
        };

        requestAnimationFrame(updateCounter);
    };

    const counterObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                animateCounter(entry.target);
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.5,
        }
    );

    counters.forEach((counter) => {
        counterObserver.observe(counter);
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAboutPage);
} else {
    initAboutPage();
}