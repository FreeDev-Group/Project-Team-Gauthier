# Icons — Data Consultancy

## Source

Toutes les icônes viennent de **Lucide** : <https://lucide.dev/icons/>

Besoin d'une icône absente ? Télécharge-la depuis ce lien, en **SVG**, et dépose-la ici.
N'utilise aucune autre librairie d'icônes : le set doit rester visuellement homogène.

## Règles

- **Format** : privilégie le `.svg` (net à toutes les tailles, colorable en CSS via `currentColor`).
  Les `.png` sont conservés en secours uniquement.
- **Nommage** : `kebab-case`, le nom exact de Lucide — `chevron-right.svg`, `map-pin.svg`.
- Ne renomme pas une icône existante : elle est peut-être déjà utilisée dans une autre page.

## Icônes disponibles

`check` · `chevron-left` · `chevron-right` · `download` · `eye` · `house` ·
`map-pin` · `menu` · `pencil` · `search` · `trash-2` · `triangle-alert` · `user`

Chacune existe en `.svg` et en `.png`.

## Usage

```html
<!-- Depuis frontend/index.html -->
<img src="assets/icons/menu.svg" alt="" width="24" height="24">

<!-- Depuis frontend/pages/*.html -->
<img src="../assets/icons/menu.svg" alt="" width="24" height="24">
```

Icône purement décorative (accompagnée d'un texte) → `alt=""`.
Icône seule et porteuse de sens (bouton burger, fermeture) → décris l'action :
`alt="Ouvrir le menu"`, ou un `aria-label` sur le bouton parent.
