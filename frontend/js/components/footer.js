/* ==========================================================================
   footer.js — Footer behaviour
   Owner: Mugisho

   Called by main.js AFTER components/footer.html has been injected.
   Do not query footer elements outside of initFooter(): they do not exist yet,
   which is why this file never runs on its own.

   Responsibilities:
     - rewrite data-footer-href / data-footer-src for the current page depth
     - keep the copyright year current
   ========================================================================== */

"use strict";

(function () {

    /**
     * Prefix turning a frontend/-relative path into one usable from this page.
     * Mirrors resolveFromRoot() in main.js — keep both in sync.
     * @returns {string} "" at the root, "../" inside pages/
     */
    function rootPrefix() {
        return window.location.pathname.includes("/pages/") ? "../" : "";
    }

    /**
     * Point every internal link and image at the right depth.
     * Reads from the data-* attributes every time, so calling it twice is safe.
     * @param {HTMLElement} footer
     */
    function resolvePaths(footer) {
        var prefix = rootPrefix();

        footer.querySelectorAll("[data-footer-href]").forEach(function (link) {
            link.setAttribute("href", prefix + link.dataset.footerHref);
        });

        footer.querySelectorAll("[data-footer-src]").forEach(function (image) {
            image.setAttribute("src", prefix + image.dataset.footerSrc);
        });
    }

    /**
     * Write the current year into the copyright line.
     * @param {HTMLElement} footer
     */
    function setYear(footer) {
        var year = footer.querySelector("[data-footer-year]");
        if (year) year.textContent = String(new Date().getFullYear());
    }

    /**
     * Initialise the footer. Safe to call more than once.
     */
    function initFooter() {
        var footer = document.querySelector(".footer");

        if (!footer) {
            console.warn("[footer.js] .footer not found — was the fragment injected?");
            return;
        }

        resolvePaths(footer);
        setYear(footer);
    }

    window.initFooter = initFooter;

}());
