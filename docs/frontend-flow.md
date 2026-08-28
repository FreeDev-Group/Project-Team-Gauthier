# Frontend Design & Implementation Flow

## 1. Purpose

This document explains how the frontend of the **DATA Consultancy** project is organized and how the HTML, CSS, JavaScript, shared components, and assets work together.

It complements `docs/frontend-architecture.md`, which remains the official source of truth for the project structure, ownership rules, and team conventions.

The purpose of this document is to make the frontend development flow easier to understand before implementing or modifying any page.

---

## 2. Frontend Overview

The project uses:

- HTML5
- CSS3
- Vanilla JavaScript

The frontend does not use any frontend framework or UI library.

The architecture is organized into the following main areas:

```text
frontend/
├── pages/
├── components/
├── css/
├── js/
└── assets/
```

Each area has a specific responsibility and must remain consistent with the official frontend architecture.

---

## 3. Frontend Structure

```text
frontend/
│
├── index.html
│
├── pages/
│   ├── about.html
│   ├── services.html
│   ├── case-studies.html
│   ├── industries.html
│   ├── insights.html
│   └── contact.html
│
├── components/
│   ├── navbar.html
│   └── footer.html
│
├── css/
│   ├── base/
│   │   ├── reset.css
│   │   ├── variables.css
│   │   └── typography.css
│   │
│   ├── components/
│   │   ├── navbar.css
│   │   ├── footer.css
│   │   ├── buttons.css
│   │   ├── cards.css
│   │   └── forms.css
│   │
│   ├── pages/
│   │   ├── home.css
│   │   ├── about.css
│   │   ├── services.css
│   │   ├── case-studies.css
│   │   ├── industries.css
│   │   ├── insights.css
│   │   └── contact.css
│   │
│   └── main.css
│
├── js/
│   ├── main.js
│   │
│   ├── components/
│   │   ├── navbar.js
│   │   └── footer.js
│   │
│   └── pages/
│       ├── home.js
│       ├── services.js
│       ├── case-studies.js
│       ├── insights.js
│       └── contact.js
│
└── assets/
    ├── images/
    │   ├── logo/
    │   ├── backgrounds/
    │   │   ├── dark/
    │   │   └── light/
    │   ├── auth/
    │   └── mockup/
    │
    ├── icons/
    └── fonts/
```
---

## 4. HTML Organization

The frontend separates the homepage from the other website pages.

The homepage is located at:

```text
frontend/index.html
```

All other pages are stored in:

```text
frontend/pages/
```

The current pages are:

```text
about.html
services.html
case-studies.html
industries.html
insights.html
contact.html
```

Each HTML page contains its own page-specific content inside the `<main>` element.

Shared elements such as the navbar and footer are not duplicated in every HTML page. Instead, each page provides placeholders where these shared components are injected at runtime.

A typical page follows this structure:

```html
<body>

    <!-- Shared navbar injected at runtime -->
    <header id="navbar-placeholder"></header>

    <main>
        <!-- Page-specific content -->
    </main>

    <!-- Shared footer injected at runtime -->
    <footer id="footer-placeholder"></footer>

</body>
```

This approach keeps the page files focused on their own content while the shared components remain centralized.

---

## 5. CSS Architecture

The CSS architecture separates global foundations, reusable components, and page-specific styles.

The main CSS structure is:

```text
frontend/css/
│
├── base/
│   ├── reset.css
│   ├── variables.css
│   └── typography.css
│
├── components/
│   ├── navbar.css
│   ├── footer.css
│   ├── buttons.css
│   ├── cards.css
│   └── forms.css
│
├── pages/
│   ├── home.css
│   ├── about.css
│   ├── services.css
│   ├── case-studies.css
│   ├── industries.css
│   ├── insights.css
│   └── contact.css
│
└── main.css
```

The styles are organized into three main levels:

```text
Base styles
    ↓
Reusable component styles
    ↓
Page-specific styles
```

### 5.1 Base Styles

The base styles are located in:

```text
frontend/css/base/
```

They provide the global foundations used throughout the website.

#### `reset.css`

This file provides the project's CSS reset.

It handles common browser defaults including:

- box sizing;
- default margins and padding;
- images and other media;
- form controls;
- buttons;
- links;
- lists;
- tables;
- heading and paragraph wrapping;
- reduced-motion accessibility preferences.

Its purpose is to provide a consistent starting point across browsers.

#### `variables.css`

This file contains the global design tokens used throughout the frontend.

The current token categories include:

- brand and neutral colors;
- semantic colors;
- typography;
- font sizes and weights;
- line heights;
- letter spacing;
- spacing;
- container dimensions;
- border radius;
- border widths;
- shadows;
- transition durations and easing;
- z-index levels;
- breakpoint references.

Page styles should use these tokens instead of defining independent design values.

Example:

```css
.example {
    color: var(--color-primary);
    padding: var(--space-md);
    border-radius: var(--radius-md);
}
```

This helps maintain visual consistency across the project.

#### `typography.css`

This file defines the global typography rules.

It currently manages:

- the base HTML font size;
- body typography;
- heading typography;
- paragraphs;
- small text;
- strong and emphasized text;
- links;
- text utility classes;
- responsive heading sizes.

Page-specific typography remains in the corresponding page stylesheet when necessary.

### 5.2 Component Styles

Reusable component styles are stored in:

```text
frontend/css/components/
```

The current component stylesheets are:

```text
navbar.css
footer.css
buttons.css
cards.css
forms.css
```

These files are intended for UI elements that can be reused by several pages.

Page-specific rules should not be placed in these shared files.

### 5.3 Page-Specific Styles

Each page has its own stylesheet inside:

```text
frontend/css/pages/
```

For example:

```text
about.html     → about.css
services.html  → services.css
contact.html   → contact.css
```

This keeps styles related to one page isolated from the rest of the website and reduces unintended CSS conflicts.

---

## 6. CSS Loading Flow

The global CSS entry point is:

```text
frontend/css/main.css
```

`main.css` imports the base styles first and the reusable component styles afterward.

The current import order is:

```css
@import url("base/reset.css");
@import url("base/variables.css");
@import url("base/typography.css");

@import url("components/navbar.css");
@import url("components/footer.css");
@import url("components/buttons.css");
@import url("components/cards.css");
@import url("components/forms.css");
```

It also provides global layout helpers including:

```text
.container
.section
.sr-only
```

Page-specific stylesheets are deliberately **not imported into `main.css`**.

Instead, each HTML page loads two stylesheets in this order:

```html
<link rel="stylesheet" href="../css/main.css">
<link rel="stylesheet" href="../css/pages/services.css">
```

Therefore, the complete CSS loading flow for a page is:

```text
reset.css
    ↓
variables.css
    ↓
typography.css
    ↓
component styles
    ↓
main.css global helpers
    ↓
page-specific stylesheet
```

Loading the page stylesheet after `main.css` allows page-specific rules to override global styles when necessary without changing the shared CSS architecture.
---

## 7. JavaScript Architecture

The JavaScript architecture separates global application behavior, shared component behavior, and page-specific behavior.

The current structure is:

```text
frontend/js/
│
├── main.js
│
├── components/
│   ├── navbar.js
│   └── footer.js
│
└── pages/
    ├── home.js
    ├── services.js
    ├── case-studies.js
    ├── insights.js
    └── contact.js
```

The JavaScript flow can be divided into three levels:

```text
Global JavaScript
        ↓
Shared component JavaScript
        ↓
Page-specific JavaScript
```

### 7.1 Global JavaScript

The global JavaScript entry point is:

```text
frontend/js/main.js
```

This file is loaded by every page.

Its current responsibilities are:

- resolving paths depending on the current page location;
- loading shared HTML fragments;
- injecting the navbar into the page;
- injecting the footer into the page;
- initializing the shared components after injection.

The application bootstrap is triggered when the DOM is ready:

```javascript
document.addEventListener("DOMContentLoaded", init);
```

The `init()` function loads the shared components and then initializes their behavior.

### 7.2 Path Resolution

The project has HTML files at two different directory levels:

```text
frontend/index.html
frontend/pages/*.html
```

Because of this difference, `main.js` uses the `resolveFromRoot()` function.

Its role is to determine whether the current page is inside the `pages/` directory and adjust the path accordingly.

The current implementation is:

```javascript
function resolveFromRoot(path) {
    const isInPagesFolder = window.location.pathname.includes("/pages/");
    return (isInPagesFolder ? "../" : "") + path;
}
```

This allows the same component-loading system to work from both the homepage and pages located inside `frontend/pages/`.

---

## 8. Shared Component Injection

The project uses reusable HTML fragments for the navbar and footer.

They are located in:

```text
frontend/components/navbar.html
frontend/components/footer.html
```

These files are HTML fragments rather than complete HTML documents.

They therefore do not contain:

```text
<!DOCTYPE html>
<html>
<head>
<body>
```

Instead, the main HTML pages provide placeholders:

```html
<header id="navbar-placeholder"></header>

<footer id="footer-placeholder"></footer>
```

The `injectComponent()` function in `main.js` loads a component using `fetch()` and inserts its HTML into the corresponding placeholder.

The component injection flow is:

```text
HTML page loaded
        ↓
DOMContentLoaded
        ↓
main.js executes init()
        ↓
injectComponent()
        ↓
fetch components/navbar.html
        ↓
Inject navbar into #navbar-placeholder
        ↓
fetch components/footer.html
        ↓
Inject footer into #footer-placeholder
        ↓
Initialize component behavior
```

This approach avoids duplicating the navbar and footer markup across every page.

---

## 9. Component JavaScript

The behavior of shared components is separated from `main.js`.

The relevant files are:

```text
frontend/js/components/navbar.js
frontend/js/components/footer.js
```

### 9.1 Navbar

`navbar.js` defines:

```javascript
function initNavbar() {
    // Navbar behaviour
}

window.initNavbar = initNavbar;
```

The navbar initialization function is exposed through `window` so that `main.js` can call it after `navbar.html` has been successfully injected.

The important execution order is:

```text
navbar.js loaded
        ↓
main.js injects navbar.html
        ↓
Navbar markup becomes available in the DOM
        ↓
main.js calls initNavbar()
```

Navbar elements should therefore not be queried before the component has been injected.

### 9.2 Footer

`footer.js` follows the same architecture:

```javascript
function initFooter() {
    // Footer behaviour
}

window.initFooter = initFooter;
```

After `footer.html` is injected, `main.js` checks whether `window.initFooter` exists and calls it.

The flow is:

```text
footer.js loaded
        ↓
main.js injects footer.html
        ↓
Footer markup becomes available in the DOM
        ↓
main.js calls initFooter()
```

---

## 10. Page-Specific JavaScript

JavaScript behavior that belongs to a specific page is stored in:

```text
frontend/js/pages/
```

The current page scripts are:

```text
home.js
services.js
case-studies.js
insights.js
contact.js
```

Page-specific logic must remain in these files instead of being added to `main.js`.

Not every page requires JavaScript.

According to the current frontend architecture:

```text
about.html
industries.html
```

do not currently have dedicated JavaScript files because no page-specific behavior is planned for them.

If dedicated JavaScript becomes necessary for these pages, the architecture documentation requires coordination with the Project Lead before adding new files.

---

## 11. JavaScript Loading Order

A page that requires page-specific JavaScript loads the scripts in the following order:

```html
<script src="../js/components/navbar.js"></script>
<script src="../js/components/footer.js"></script>
<script src="../js/main.js"></script>
<script src="../js/pages/services.js"></script>
```

For the Services page, the resulting structure is:

```text
services.html
    │
    ├── navbar.js
    ├── footer.js
    ├── main.js
    └── services.js
```

The shared component functions are therefore defined before `main.js` initializes the application.

The complete frontend JavaScript flow is:

```text
Browser loads HTML
        ↓
Component scripts are loaded
        ↓
main.js is loaded
        ↓
Page-specific script is loaded
        ↓
DOMContentLoaded
        ↓
main.js executes init()
        ↓
Navbar and footer fragments are fetched
        ↓
Shared components are injected
        ↓
initNavbar() and initFooter() are called
        ↓
Page-specific behavior operates independently
```

This separation keeps global behavior, shared component behavior, and page-specific behavior organized and easier to maintain.

---

## 12. Local Server Requirement

Because `main.js` uses `fetch()` to load the navbar and footer HTML fragments, the frontend must be served through an HTTP server.

The project should not be tested by directly opening an HTML file using a URL such as:

```text
file:///...
```

Direct `file://` access can prevent the browser from loading the shared HTML fragments correctly.

The frontend should instead be opened through a local development server.

For example:

```text
http://localhost:3000/
```

A page inside the `pages/` directory can then be accessed through:

```text
http://localhost:3000/pages/services.html
```

This ensures that the shared component injection system can operate under normal HTTP conditions.
---

## 13. Page Loading Flow

Each frontend page follows the same general loading process.

The architecture combines:

- global CSS;
- page-specific CSS;
- reusable HTML components;
- global JavaScript;
- component JavaScript;
- page-specific JavaScript when required.

The complete page loading flow is:

```text
User opens a page
        ↓
HTML document is loaded
        ↓
css/main.css is loaded
        ↓
Global base styles are applied
        ↓
Shared component styles are applied
        ↓
Page-specific CSS is loaded
        ↓
Page-specific styles are applied
        ↓
Component JavaScript files are loaded
        ↓
main.js is loaded
        ↓
Page-specific JavaScript is loaded when required
        ↓
DOMContentLoaded event
        ↓
main.js starts the application
        ↓
Navbar fragment is fetched and injected
        ↓
Footer fragment is fetched and injected
        ↓
Shared component behavior is initialized
        ↓
Page becomes fully operational
```

This flow ensures that every page uses the same global foundations while keeping its own content, styling, and behavior isolated.

---

## 14. Example: Services Page Flow

The Services page is located at:

```text
frontend/pages/services.html
```

Its page-specific stylesheet is:

```text
frontend/css/pages/services.css
```

Its page-specific JavaScript file is:

```text
frontend/js/pages/services.js
```

The Services page loads the global stylesheet first:

```html
<link rel="stylesheet" href="../css/main.css">
```

Then it loads its own stylesheet:

```html
<link rel="stylesheet" href="../css/pages/services.css">
```

The page contains placeholders for the shared components:

```html
<header id="navbar-placeholder"></header>
```

and:

```html
<footer id="footer-placeholder"></footer>
```

The scripts are loaded at the end of the document:

```html
<script src="../js/components/navbar.js"></script>
<script src="../js/components/footer.js"></script>
<script src="../js/main.js"></script>
<script src="../js/pages/services.js"></script>
```

Therefore, the Services page follows this flow:

```text
services.html
        │
        ├── CSS
        │   │
        │   ├── main.css
        │   │     │
        │   │     ├── reset.css
        │   │     ├── variables.css
        │   │     ├── typography.css
        │   │     └── shared component CSS
        │   │
        │   └── services.css
        │
        ├── Shared HTML Components
        │   │
        │   ├── navbar.html
        │   └── footer.html
        │
        └── JavaScript
            │
            ├── navbar.js
            ├── footer.js
            ├── main.js
            └── services.js
```

This same pattern is used for the other frontend pages, with the appropriate page-specific CSS and JavaScript files.

---

## 15. Frontend Page Ownership

The frontend work is divided between the three developers.

### Mugisho — Project Lead

Primary responsibilities:

```text
Home
Navbar
Footer
Global frontend integration
```

Primary files:

```text
frontend/index.html

frontend/components/navbar.html
frontend/components/footer.html

frontend/css/components/navbar.css
frontend/css/components/footer.css

frontend/css/pages/home.css

frontend/js/main.js
frontend/js/components/
frontend/js/pages/home.js
```

Mugisho also owns the shared CSS foundations and shared reusable component styles.

---

### Edourd — Frontend Developer

Primary responsibilities:

```text
About
Services
Contact
```

Primary files:

```text
frontend/pages/about.html
frontend/pages/services.html
frontend/pages/contact.html

frontend/css/pages/about.css
frontend/css/pages/services.css
frontend/css/pages/contact.css

frontend/js/pages/services.js
frontend/js/pages/contact.js
```

The About page currently has no dedicated JavaScript file because no page-specific behavior is planned for it.

---

### Arnold — Frontend Developer

Primary responsibilities:

```text
Case Studies
Industries
Insights
```

Primary files:

```text
frontend/pages/case-studies.html
frontend/pages/industries.html
frontend/pages/insights.html

frontend/css/pages/case-studies.css
frontend/css/pages/industries.css
frontend/css/pages/insights.css

frontend/js/pages/case-studies.js
frontend/js/pages/insights.js
```

The Industries page currently has no dedicated JavaScript file because no page-specific behavior is planned for it.

---

## 16. Shared Files and Development Boundaries

Some files affect the entire frontend and must therefore be treated as shared resources.

These include:

```text
frontend/css/base/reset.css
frontend/css/base/variables.css
frontend/css/base/typography.css

frontend/css/main.css

frontend/css/components/buttons.css
frontend/css/components/cards.css
frontend/css/components/forms.css

frontend/js/main.js

frontend/components/navbar.html
frontend/components/footer.html
```

Developers should not modify shared files independently when implementing their assigned pages.

If a page requires a change to a shared file, the expected flow is:

```text
Developer identifies shared requirement
        ↓
Developer does not modify the shared file
        ↓
Requirement is communicated to the Project Lead
        ↓
Shared change is reviewed
        ↓
Project Lead updates the shared architecture
        ↓
Change is merged into main
        ↓
Developer updates the working branch
        ↓
Page development continues
```

This reduces merge conflicts and prevents one page implementation from unintentionally affecting other pages.

---

## 17. Page Development Flow

When implementing a page, the developer should work only inside the files assigned to that page.

For example, development of the Services page should primarily involve:

```text
frontend/pages/services.html
        ↓
frontend/css/pages/services.css
        ↓
frontend/js/pages/services.js
```

The general development flow is:

```text
Update local main
        ↓
Create or use the assigned feature branch
        ↓
Identify owned page files
        ↓
Implement HTML structure
        ↓
Implement page-specific CSS
        ↓
Implement page-specific JavaScript if required
        ↓
Run the site through a local server
        ↓
Verify shared component injection
        ↓
Test desktop layout
        ↓
Test tablet layout
        ↓
Test mobile layout
        ↓
Check browser console
        ↓
Review Git changes
        ↓
Commit
        ↓
Push branch
        ↓
Open Pull Request
```

The page must remain compatible with the existing frontend architecture throughout this process.

---

## 18. Separation of Responsibilities

The architecture follows a clear separation of responsibilities:

| Layer | Responsibility |
|---|---|
| HTML | Page structure and semantic content |
| `css/base/` | Global foundations and design tokens |
| `css/components/` | Reusable component styling |
| `css/pages/` | Page-specific styling |
| `components/` | Shared HTML fragments |
| `js/main.js` | Global application initialization |
| `js/components/` | Shared component behavior |
| `js/pages/` | Page-specific behavior |
| `assets/` | Images, icons, fonts, and visual resources |

This separation allows developers to work on different pages while reducing unnecessary overlap between files.

A page should therefore not contain responsibilities belonging to another layer.

For example:

```text
Page-specific styling
        → css/pages/

Shared component styling
        → css/components/

Page-specific behavior
        → js/pages/

Shared component behavior
        → js/components/

Global initialization
        → js/main.js
```

This organization is the basis of the frontend development workflow used by the project.
