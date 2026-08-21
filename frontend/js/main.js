/* ==========================================================================
   main.js — Global frontend entry point
   Owner: Mugisho (shared file — coordinate before editing)

   Loaded by every page. Responsibilities:
     - inject the shared components (navbar, footer)
     - run global behaviours common to all pages

   Page-specific behaviour belongs in js/pages/*.js, never here.
   ========================================================================== */

"use strict";

/**
 * Resolve a path relative to the frontend/ root, whatever the current page depth.
 * index.html lives at the root, pages/*.html live one level deeper.
 * @param {string} path - path relative to frontend/, e.g. "components/navbar.html"
 * @returns {string}
 */
function resolveFromRoot(path) {
    const isInPagesFolder = window.location.pathname.includes("/pages/");
    return (isInPagesFolder ? "../" : "") + path;
}

/**
 * Load an HTML fragment and inject it into a target element.
 * @param {string} targetSelector - CSS selector of the host element
 * @param {string} fragmentPath - path relative to frontend/
 * @returns {Promise<boolean>} true if the fragment was injected
 */
async function injectComponent(targetSelector, fragmentPath) {
    const target = document.querySelector(targetSelector);
    if (!target) return false;

    try {
        const response = await fetch(resolveFromRoot(fragmentPath));
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        target.innerHTML = await response.text();
        return true;
    } catch (error) {
        console.error(`[main.js] Could not load ${fragmentPath}:`, error);
        return false;
    }
}

/**
 * Application bootstrap.
 */
async function init() {
    const navbarLoaded = await injectComponent("#navbar-placeholder", "components/navbar.html");
    const footerLoaded = await injectComponent("#footer-placeholder", "components/footer.html");

    // Hand over to the component scripts once their markup exists in the DOM.
    if (navbarLoaded && typeof window.initNavbar === "function") {
        window.initNavbar();
    }
    if (footerLoaded && typeof window.initFooter === "function") {
        window.initFooter();
    }
}

document.addEventListener("DOMContentLoaded", init);
