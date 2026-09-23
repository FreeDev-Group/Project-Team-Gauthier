/* ==========================================================================
   home.js — Home page behaviour
   Owner: Mugisho

   Loaded only by frontend/index.html.
   Keep everything scoped to this page. Shared logic belongs in main.js.

   Responsibilities:
     - reveal sections as they scroll into view
     - hide the hero scroll cue once the page has moved
   ========================================================================== */

"use strict";

/**
 * Fade each marked section in the first time it enters the viewport.
 * The hidden state lives behind .js-reveal on <html>, so the page stays
 * fully readable when JavaScript is off or IntersectionObserver is missing.
 */
function initHomeReveal() {
    var sections = document.querySelectorAll(".hero, .about");

    if (!sections.length) return;

    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || !("IntersectionObserver" in window)) {
        sections.forEach(function (section) { section.classList.add("is-visible"); });
        return;
    }

    document.documentElement.classList.add("js-reveal");

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -10% 0px" });

    sections.forEach(function (section) { observer.observe(section); });
}

/**
 * Fade the hero scroll cue out as soon as the page leaves the top.
 */
function initHeroScrollCue() {
    var hero = document.querySelector(".hero");

    if (!hero || !hero.querySelector(".hero__scroll")) return;

    var queued = false;

    function update() {
        queued = false;
        hero.classList.toggle("hero--scrolled", window.scrollY > 40);
    }

    window.addEventListener("scroll", function () {
        if (queued) return;
        queued = true;
        window.requestAnimationFrame(update);
    }, { passive: true });

    update();
}

/**
 * Initialise the Home page.
 */
function initHomePage() {
    initHomeReveal();
    initHeroScrollCue();
}

document.addEventListener("DOMContentLoaded", initHomePage);
