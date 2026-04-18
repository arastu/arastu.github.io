# zamin

A warm, diary-voiced Hugo theme with a sage pastel palette and **MellSans** typography. Designed for quiet tech blogs — personal writing that values calm, readability, and breathing room over flash.

![sage pastel blog](https://arastu.io/screenshot.png)

## Features

- Single-column reading layout, type-forward home index
- **Dark / light** toggle (persisted)
- **Archive** page grouped by year
- **Tags** index + per-tag pages
- **Reading progress** bar on article pages
- **Save for later** (localStorage-based likes)
- Floating **Tweaks** panel — reader-adjustable font size
- MellSans display font (Regular + Italic) bundled
- JetBrains Mono for meta lines, code, and kickers
- Fully responsive, minimal JS, no build step

## Install

```bash
cd themes
git clone https://github.com/arastu/zamin.git
```

Or as a submodule:

```bash
git submodule add https://github.com/arastu/zamin.git themes/zamin
```

Then in your site's `config.toml`:

```toml
theme = "zamin"
```

## Configuration

See `exampleSite/config.toml` for a complete example.

```toml
baseURL = "https://arastu.io/"
title = "arastu.io"
theme = "zamin"

[params]
  description = "A quiet log of things I've debugged, learned, and half-figured-out."
  author = "arastu"
  since = "2022"

  [params.intro]
    heading = "field notes from the <em>edges of systems</em>"
    dek = "A quiet log of things I've debugged, learned, and half-figured-out."

[taxonomies]
  tag = "tags"

[[menu.main]]
  name = "writing"
  url = "/"
  weight = 10

[[menu.main]]
  name = "archive"
  url = "/archive/"
  weight = 20

[[menu.main]]
  name = "tags"
  url = "/tags/"
  weight = 30

[[menu.main]]
  name = "about"
  url = "/about/"
  weight = 40

[markup.goldmark.renderer]
  unsafe = true   # allow the <em> in the intro heading
```

## Content structure

```
content/
├── about.md           # about page (uses page/single.html layout)
├── archive.md         # archive page (uses _default/archive.html)
└── posts/
    ├── _index.md
    ├── my-first-post.md
    └── ...
```

### Post front matter

```yaml
---
title: "On quiet replication"
date: 2026-03-14
dek: "What I learned building a read-replica system."
tags: ["postgres", "distributed"]
cover: "a small boat at slack tide"   # text label for cover placeholder
summary: "Short summary shown on the index page."
---
```

- `dek` — shown under the title on the home index and on the post page
- `cover` — optional text label; renders inside a pastel striped placeholder block. Replace with real image support by editing `layouts/_default/single.html`.
- `summary` — falls back to auto-generated summary if omitted

### About page

Use `layout: "single"` and the `facts` frontmatter list:

```yaml
---
title: "about"
layout: "single"
portrait: true
facts:
  - label: "currently"
    value: "staff engineer"
  - label: "elsewhere"
    value: "<a href='https://github.com/arastu'>github</a>"
---
```

### Archive page

```yaml
---
title: "archive"
layout: "archive"
---
```

## Colors

The sage pastel palette is defined as CSS variables in `static/css/theme.css`. Override by adding a small stylesheet after the theme CSS, or edit the variables directly:

```css
:root {
  --sage:   #C9DCC8;
  --moss:   #A8C4B0;
  --accent: #6E8B70;
  --bg:     #F4F7F4;
  --ink:    #2A3028;
}
```

## Typography

**MellSans** is bundled (Regular + Italic). Because it doesn't ship bold weights, the theme uses size, tracking, and color — not weight — to build hierarchy. If you have additional MellSans weights, drop the `.otf` files into `static/fonts/` and add matching `@font-face` rules in your own stylesheet.

Mono font is **JetBrains Mono** via Google Fonts.

## Credits

- Font: MellSans (user-supplied, bundled with permission)
- Mono: [JetBrains Mono](https://www.jetbrains.com/lp/mono/)

## License

MIT
