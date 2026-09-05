/* ==========================================================================
   navbar.js — Navbar behaviour
   Owner: Mugisho

   Called by main.js AFTER components/navbar.html has been injected.
   Do not query navbar elements outside of initNavbar(): they do not exist yet.

   Responsibilities:
     - rewrite data-nav-href / data-nav-src for the current page depth
     - flag the link matching the current page
     - drive the mobile burger menu
     - toggle the sticky shadow on scroll

   Everything lives inside an IIFE so only initNavbar() reaches the global
   scope: navbar.js, footer.js and the page scripts share one global namespace.
   ========================================================================== */

"use strict";

(function () {

    var DESKTOP_QUERY = "(min-width: 992px)";
    var SCROLL_OFFSET = 4;

    /**
     * Prefix turning a frontend/-relative path into one usable from this page.
     * index.html sits at the root, pages/*.html one level deeper.
     * Mirrors resolveFromRoot() in main.js — keep both in sync.
     * @returns {string} "" at the root, "../" inside pages/
     */
    function rootPrefix() {
        return window.location.pathname.includes("/pages/") ? "../" : "";
    }

    /**
     * File name of the page currently displayed.
     * @returns {string} e.g. "about.html", or "index.html" for a directory URL
     */
    function currentFile() {
        var last = window.location.pathname.split("/").pop();
        return last === "" ? "index.html" : last;
    }

    /**
     * Point every href and src at the right depth.
     * Reads from the data-* attributes every time, so calling it twice is safe.
     * @param {HTMLElement} navbar
     */
    function resolvePaths(navbar) {
        var prefix = rootPrefix();

        navbar.querySelectorAll("[data-nav-href]").forEach(function (link) {
            link.setAttribute("href", prefix + link.dataset.navHref);
        });

        navbar.querySelectorAll("[data-nav-src]").forEach(function (image) {
            image.setAttribute("src", prefix + image.dataset.navSrc);
        });
    }

    /**
     * Mark the link pointing at the current page.
     * @param {HTMLElement} navbar
     */
    function markActiveLink(navbar) {
        var current = currentFile();

        navbar.querySelectorAll(".navbar__link").forEach(function (link) {
            var target = link.dataset.navHref.split("/").pop();
            var isActive = target === current;

            link.classList.toggle("navbar__link--active", isActive);

            if (isActive) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    /**
     * Wire the burger menu: click, Escape, outside click, breakpoint change.
     * @param {HTMLElement} navbar
     */
    function setupToggle(navbar) {
        var toggle = navbar.querySelector(".navbar__toggle");
        var menu = navbar.querySelector(".navbar__menu");

        if (!toggle || !menu) return;

        var desktop = window.matchMedia(DESKTOP_QUERY);

        function setOpen(open) {
            menu.classList.toggle("navbar__menu--open", open);
            toggle.classList.toggle("navbar__toggle--active", open);
            toggle.setAttribute("aria-expanded", String(open));
            toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        }

        function isOpen() {
            return toggle.getAttribute("aria-expanded") === "true";
        }

        toggle.addEventListener("click", function () {
            setOpen(!isOpen());
        });

        // Following a link closes the panel it was sitting in.
        menu.addEventListener("click", function (event) {
            if (event.target.closest(".navbar__link")) setOpen(false);
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && isOpen()) {
                setOpen(false);
                toggle.focus();
            }
        });

        document.addEventListener("click", function (event) {
            if (isOpen() && !navbar.contains(event.target)) setOpen(false);
        });

        // Resizing past the breakpoint must not leave the panel half-open:
        // the desktop rules make it visible again whatever the classes say.
        desktop.addEventListener("change", function (event) {
            if (event.matches) setOpen(false);
        });
    }

    /**
     * Make the host element sticky and add the shadow once the page scrolls.
     * @param {HTMLElement} navbar
     */
    function setupSticky(navbar) {
        // .navbar fills its parent, so it has no room to travel: the parent
        // (#navbar-placeholder) is what actually sticks.
        if (navbar.parentElement) {
            navbar.parentElement.classList.add("navbar-host");
        }

        function syncScrollState() {
            navbar.classList.toggle("navbar--scrolled", window.scrollY > SCROLL_OFFSET);
        }

        window.addEventListener("scroll", syncScrollState, { passive: true });
        syncScrollState();
    }

    /**
     * Initialise the navbar. Safe to call more than once.
     */
    function initNavbar() {
        var navbar = document.querySelector(".navbar");

        if (!navbar) {
            console.warn("[navbar.js] .navbar not found — was the fragment injected?");
            return;
        }

        // Paths and active state are idempotent; listeners are not.
        resolvePaths(navbar);
        markActiveLink(navbar);

        if (navbar.dataset.navbarReady === "true") return;
        navbar.dataset.navbarReady = "true";

        setupToggle(navbar);
        setupSticky(navbar);
    }

    window.initNavbar = initNavbar;

}());
