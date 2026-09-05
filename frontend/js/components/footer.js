/* ==========================================================================
   footer.js — Footer behaviour
   Owner: Mugisho

   Called by main.js AFTER components/footer.html has been injected.
   Do not query footer elements outside of initFooter(): they do not exist yet.
   ========================================================================== */

"use strict";

(function () {
    function rootPrefix() {
        return window.location.pathname.includes("/pages/") ? "../" : "";
    }

    function resolveRelativePath(pathValue) {
        if (!pathValue) {
            return pathValue;
        }

        if (/^(?:[a-z]+:)?\/\//i.test(pathValue) || pathValue.charAt(0) === "#" || pathValue.indexOf("mailto:") === 0 || pathValue.indexOf("tel:") === 0) {
            return pathValue;
        }

        return rootPrefix() + pathValue;
    }

    function resolveFooterLinks() {
        var footer = document.querySelector(".footer");
        if (!footer) return;

        footer.querySelectorAll("[data-nav-href]").forEach(function (link) {
            var href = link.getAttribute("data-nav-href");
            if (!href) return;
            link.setAttribute("href", resolveRelativePath(href));
        });

        footer.querySelectorAll("[data-nav-src]").forEach(function (img) {
            var src = img.getAttribute("data-nav-src");
            if (!src) return;
            img.setAttribute("src", resolveRelativePath(src));
        });
    }

    function initFooter() {
        resolveFooterLinks();
    }

    if (typeof window !== "undefined") {
        window.initFooter = initFooter;
    }

    if (typeof document !== "undefined") {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", initFooter);
        } else {
            initFooter();
        }
    }
}());
