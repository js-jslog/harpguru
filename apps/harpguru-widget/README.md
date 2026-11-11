# harpguru-widget

The public harp face: harpguru.com's setup links, embeds and tuning pages. A
small web-only app, deliberately not the app in a browser. Its scope is frozen;
see "Locked decisions" in `roadmap-planning/roadmap.md`.

| Path | Page | Cells | Controls |
| --- | --- | --- | --- |
| `/s/?…`, `/s/web?…` | a shared setup | tap to toggle, scale flash | none |
| `/e/?…` | a partner's embed | tap to toggle, scale flash | none |
| `/t/<slug>?…` | a tuning's reference page | fixed | presets, degree or pitch |

The URL is each page's state. The format lives in `harpstrata`'s
`setup-url`, and is described in `roadmap-planning/aws-pathway-findings.md`.
The harp face comes from `harpguru-core/standalone`, and the pages' colours
from its `getColors`, used as the app uses them.

## Building

```bash
yarn workspace harpguru-widget run export
```

Exports the bundle to `dist/`, then lays it out in `site/` as the pages bucket's
object keys: `w/…` for the bundle, `s/index.html`, `e/index.html`, and
`t/<slug>/index.html` for each tuning listed in
`src/tuning-pages/tuning-presets.ts`, each with its own head.

`yarn workspace harpguru-widget run web` serves it for development, at the
root rather than under `/w/`.

The build scripts are TypeScript, run by Node through `scripts/ts-hooks.mjs`,
which resolves the packages' extensionless imports and strips types with Babel.
