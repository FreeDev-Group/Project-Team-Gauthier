# Frontend Architecture — DATA Consultancy

Official frontend architecture of the team.
This document is the single source of truth. Any change to the structure must be discussed with **Mugisho (Project Lead)** before being merged into `main`.

---

## 1. Objective

Give the three developers **exactly the same working structure** so that:

- everyone knows where to create a file, without asking;
- every branch starts from the same base;
- merge conflicts stay rare and easy to solve;
- the frontend can be handed over to the backend phase without restructuring.

**Phase 1 = frontend only.**

| Allowed | Forbidden |
| --- | --- |
| HTML5 | React, Vue, Angular, Svelte |
| CSS3 | Bootstrap, Tailwind CSS |
| Vanilla JavaScript | TypeScript, EJS, any frontend framework |

The Node.js + Express + MySQL backend will be added later by **Mugisho**. Nothing backend-related goes in this repository for now.

---

## 2. Folder structure

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
    ├── icons/
    └── fonts/

docs/
└── frontend-architecture.md
```

**Do not create any other frontend folder.** Notably forbidden: `frontend/styles/`, `frontend/scripts/`, `frontend/components/ui/`, `frontend/assets/data/`, `frontend/src/`.

---

## 3. Role of each folder

| Path | Role |
| --- | --- |
| `frontend/index.html` | Home page. The only HTML file at the root of `frontend/`. |
| `frontend/pages/` | All the other pages of the site, one file per page. |
| `frontend/components/` | Reusable HTML **fragments** (navbar, footer), injected at runtime by JavaScript. They contain no `<!DOCTYPE>`, no `<html>`, no `<head>`, no `<body>`. |
| `frontend/css/base/` | Foundations: reset, design tokens, global typography. Applies to the whole site. |
| `frontend/css/components/` | Styles of reusable UI pieces (navbar, footer, buttons, cards, forms). |
| `frontend/css/pages/` | Styles specific to a single page. Never global. |
| `frontend/css/main.css` | Global entry point. Imports `base/` then `components/`. **Does not import `pages/`.** |
| `frontend/js/main.js` | General entry point. Injects the shared components and runs global behaviour. |
| `frontend/js/components/` | Behaviour of the shared components. |
| `frontend/js/pages/` | Behaviour specific to one page. |
| `frontend/assets/images/` | Photos, illustrations, backgrounds. |
| `frontend/assets/icons/` | SVG icons, favicon. |
| `frontend/assets/fonts/` | Self-hosted font files. |
| `docs/` | Team documentation. |

### How the stylesheets are loaded

Each HTML page links **two** stylesheets, in this order:

```html
<link rel="stylesheet" href="css/main.css">
<link rel="stylesheet" href="css/pages/home.css">
```

1. `main.css` brings the reset, the tokens, the typography and the components.
2. The page stylesheet comes **after**, so it can override without `!important`.

### How the scripts are loaded

```html
<script src="js/components/navbar.js"></script>
<script src="js/components/footer.js"></script>
<script src="js/main.js"></script>
<script src="js/pages/home.js"></script>
```

`main.js` fetches `components/navbar.html` and `components/footer.html`, injects them into `#navbar-placeholder` / `#footer-placeholder`, then calls `initNavbar()` and `initFooter()` — the components' markup only exists in the DOM **after** the injection.

> **Important:** because the components are loaded with `fetch()`, the site must be opened through a local server (e.g. the VS Code *Live Server* extension), **not** by double-clicking the HTML file. Opening a `file://` URL will silently block the injection.

---

## 4. Team working rules

1. **Never commit directly on `main`.** `main` always stays deployable.
2. One branch per page or per feature, created from an up-to-date `main`:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feat/about-page
   ```
3. **Pull `main` before starting** and regularly during development.
4. One Pull Request per branch, reviewed by **Mugisho** before merging.
5. **Do not touch a file you do not own** (see §7). If you need a change in someone else's file, ask them.
6. Do not modify the folder structure. A new folder = a discussion first.
7. Do not add any framework or library. HTML5 / CSS3 / Vanilla JS only.
8. No page design work before the mockup is validated.
9. Test your page in a browser before opening a PR.

---

## 5. Naming conventions

### Files and folders

- `kebab-case` everywhere: `case-studies.html`, `case-studies.css`, `case-studies.js`.
- A page, its stylesheet and its script share the **same base name**.
- Lowercase only, no accents, no spaces, no underscore.

### CSS

- Classes in `kebab-case`: `.hero-title`, `.card-list`.
- BEM for component variations: `.card`, `.card__title`, `.card--featured`.
- Prefix page-specific classes with the page name to avoid collisions: `.about-hero`, `.contact-form`.
- Never style by ID or by raw tag outside of `base/`.
- Always use the tokens from `variables.css` (`var(--color-primary)`, `var(--space-md)`, ...). **No hardcoded colors, sizes or durations.**

### JavaScript

- Variables and functions in `camelCase`: `initContactPage`.
- Constants in `UPPER_SNAKE_CASE`: `const MAX_ITEMS = 6;`.
- One `init<Page>Page()` function per page file, called on `DOMContentLoaded`.
- `"use strict";` at the top of every file.

### Assets

- `kebab-case`, descriptive: `hero-banner.jpg`, `icon-arrow-right.svg`.

### Git branches

| Prefix | Usage | Example |
| --- | --- | --- |
| `feat/` | New page or feature | `feat/services-page` |
| `fix/` | Bug fix | `fix/navbar-mobile` |
| `docs/` | Documentation only | `docs/architecture` |

### Commit messages

`type: short description in English`, e.g. `feat: add services page structure`.

---

## 6. Rules about shared files

These files are used by **all three developers**. A careless edit breaks everyone's pages.

| Shared file | Rule |
| --- | --- |
| `css/base/reset.css` | Do not edit without Mugisho's approval. |
| `css/base/variables.css` | Only Mugisho **adds** tokens. Never rename or delete an existing token. |
| `css/base/typography.css` | Do not edit without Mugisho's approval. |
| `css/main.css` | Only Mugisho changes the import order. |
| `css/components/buttons.css` | Shared. Propose the change, do not commit it alone. |
| `css/components/cards.css` | Shared. Propose the change, do not commit it alone. |
| `css/components/forms.css` | Shared. Propose the change, do not commit it alone. |
| `js/main.js` | Owned by Mugisho. Never add page logic here. |
| `components/navbar.html` / `footer.html` | Owned by Mugisho. |

**Procedure to request a change in a shared file:**

1. Do not edit the file yourself.
2. Open an issue or message the owner with: which file, which rule, why.
3. The owner makes the change and merges it into `main`.
4. You pull `main` and continue.

**Missing a token?** Do not hardcode the value. Ask Mugisho to add it to `variables.css`.

---

## 7. Responsibilities of the three developers

### Mugisho — Project Lead

```text
Home
Navbar
Footer
Global frontend integration
```

### Edourd — Frontend Developer

```text
About
Services
Contact
```

### Arnold — Frontend Developer

```text
Case Studies
Industries
Insights
```

---

## 8. File ownership

### Mugisho owns primarily

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

Mugisho is also the owner of the whole `css/base/` folder, of `css/main.css` and of the shared components `buttons.css`, `cards.css`, `forms.css`.

### Edourd owns primarily

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

### Arnold owns primarily

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

> **Note:** `about.html` and `industries.html` have no dedicated JS file, because those pages have no specific behaviour planned for now. If one becomes necessary, ask Mugisho before creating `js/pages/about.js` or `js/pages/industries.js` — adding a file to the structure is a team decision.

---

## 9. Checklist before opening a Pull Request

- [ ] My branch was created from an up-to-date `main`.
- [ ] I only modified the files I own.
- [ ] No framework, no library, no CDN added.
- [ ] No hardcoded value: I used the tokens from `variables.css`.
- [ ] My page opens correctly through a local server.
- [ ] The navbar and the footer are injected properly.
- [ ] No error in the browser console.
- [ ] The page is readable on mobile.
- [ ] My commit messages follow the convention.
