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
    var sections = document.querySelectorAll(".hero, .about, .services, .case-studies, .industries, .insights");

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
            countUp(entry.target);
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -10% 0px" });

    sections.forEach(function (section) { observer.observe(section); });
}

/**
 * Count a figure up to its final value once its section is visible.
 * The element already holds the final number, so nothing is lost when
 * JavaScript is off or motion is reduced.
 * @param {HTMLElement} section
 */
function countUp(section) {
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    section.querySelectorAll("[data-count-to]").forEach(function (node) {
        var target = Number(node.dataset.countTo);
        if (!isFinite(target)) return;

        var duration = 1100;
        var start = 0;

        function step(now) {
            if (!start) start = now;
            var progress = Math.min(1, (now - start) / duration);
            // ease-out so the last digits settle gently
            var eased = 1 - Math.pow(1 - progress, 3);
            node.textContent = String(Math.round(target * eased));
            if (progress < 1) window.requestAnimationFrame(step);
        }

        node.textContent = "0";
        window.requestAnimationFrame(step);
    });
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
 * Gentle parallax on the About portrait: it drifts a few pixels as the
 * section crosses the viewport. Skipped when motion is reduced, and the
 * image keeps its normal position if this never runs.
 */
function initParallax() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var image = document.querySelector(".about__image");
    if (!image) return;

    var section = image.closest(".about");
    var queued = false;
    var AMPLITUDE = 14;

    function update() {
        queued = false;
        var box = section.getBoundingClientRect();
        var limit = window.innerHeight + box.height;
        if (box.bottom < 0 || box.top > window.innerHeight) return;

        // -1 when the section enters from the bottom, +1 when it leaves
        var progress = 1 - ((box.bottom + box.height) / limit) * 2;
        image.style.setProperty("--parallax", (progress * AMPLITUDE).toFixed(1) + "px");
    }

    function queue() {
        if (queued) return;
        queued = true;
        window.requestAnimationFrame(update);
    }

    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    update();
}

/**
 * Initialise the Home page.
 */
function initHomePage() {
    initHomeReveal();
    initHeroScrollCue();
    initParallax();
}

document.addEventListener("DOMContentLoaded", initHomePage);
