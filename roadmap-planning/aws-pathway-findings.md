# AWS pathway — technical findings

Supporting reference for [`roadmap.md`](roadmap.md). Domain vocabulary, the tuning data
model, and facts established by investigation rather than assumption.

**Everything in the verified section is dated. Re-check before relying on it.**

## Domain vocabulary

Essential for reading this codebase. Condensed from the archived `harpstrata` README.

- **Apparatus** — the physical harp being represented. Governs the pitch relationships and
  which bends exist on each hole. Composed from a tuning plus a valving.
- **Interaction** — how a pitch is produced from one hole: blow, draw, bends, overblows,
  overdraws, valved blows and draws. Every hole has at least a blow and a draw.
- **Pozition** — the position the harp is played in, which relocates the root note and so
  changes the role every interaction plays. **Deliberately misspelled with a `z`**, because
  `Position` is reserved in TypeScript. It is spelled this way everywhere, without
  exception.
- **Pitch** — the tone produced at a hole interaction. Also how a harp's key is named: the
  pitch at the first-pozition root degree.
- **Degree** — the scale degree that pitch represents, given the pozition.
- **IsActive** — whether a matrix position is currently highlighted, e.g. because it is part
  of a selected scale.
- **HarpStrata** — a composition of all the above: a particular harp, viewed a particular
  way. Carries its inputs so the same strata can be reproduced.
- **Covariance** — harp key, pozition and song key are mutually dependent. Change one and
  exactly one other moves while the third holds. Which one holds depends on whether the
  harp face is currently showing pitches or degrees.

## The tuning document

The thing the whole extension is built around, and it is very small.
From `packages/harpparts/src/tuning/types/tuning-types.ts`:

```ts
export type Tuning = {
  readonly id: TuningIds // a string enum — see the refactor below
  readonly shortName?: string
  readonly category: TuningCategories
  readonly reedArrays: HarpFaceFacts<ReedArray>
}
```

A `ReedArray` is two rows of pitch identifiers — blow, then draw — of 7, 10, 12, 13 or 16
entries. The entirety of Country tuning, from `packages/harpparts/src/access-parts/constants`:

```ts
export const COUNTRY: Tuning = {
  id: Country,
  category: CommonDiatonic,
  reedArrays: {
    harpface1: [
      //  1    2    3    4    5    6    7    8    9   10
      [c1, e1, g1, c2, e2, g2, c3, e3, g3, c4], // blow
      [d1, g1, b1, d2, gb2, a2, b2, d3, f3, a3], // draw
    ],
  },
} as const
```

Sub-1KB of JSON. **Bends, overblows and overdraws are derived** from the blow/draw pairs by
`harpparts`, not stored — so a custom tuning is a name, a category and two short arrays of
integers.

Validation helpers already exist in `packages/harpparts/src/apparatus/utils/`:
`is-hole-valid` and `get-hole-array-error-messages`. The hard part of a tuning creator is
already written.

### The one app-side refactor

`id` is typed `TuningIds` — a string enum of the 47 built-in tunings
(`MajorDiatonic = 'Major diatonic'`, and so on). A user-authored tuning has no enum member,
so that identifier must widen before custom tunings can load.

It is contained work, but everything downstream of it depends on it. **Do it at the start
of Phase C, not the end.**

## Package layout

`packages/` is a yarn workspace. `main` points at `./src/index.ts` in each — raw TypeScript,
transpiled by the consumer's babel, with no build step.

| Package          | Role                                                                                     | Public API                                                   |
| ---------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `harpparts`      | Foundational concepts: pitches, degrees, pozitions, scales, tunings, valvings, apparatus | many; see its README                                         |
| `harpstrata`     | Composes a viewable harp                                                                 | `getHarpStrata`, `getPropsForHarpStrata`                     |
| `harpcovariance` | The key / pozition / song-key relationship                                               | `getCovariantSet`, `getCovarianceSeries`, `CovariantMembers` |
| `harpguru-core`  | The React Native UI                                                                      | `HarpGuru`                                                   |

`apps/harpguru-expo-boilerplate` is a thin Expo shell: `registerRootComponent(App)` where
`App` renders `<HarpGuru />`. Note the existing doc explaining why `react-native-reanimated`
and `react-native-gesture-handler` are declared there despite only being used in
`harpguru-core` — omitting them makes EAS builds crash on open.

### Domain content counts

Checked 2026-08-31 by counting the `ordered*.set(...)` calls in
`packages/harpparts/src/access-parts/constants/`.

| | |
| --- | --- |
| Tunings | 47 |
| Pozitions | 12 |
| Scales | 23 |
| Pitches | 12 |
| Degrees | 12 |

### `harpguru-core` exposes nothing but the whole app

This constrains Phase B more than anything else in the codebase.

```ts
// packages/harpguru-core/src/components/index.ts — the entire file
export { HarpGuru } from './harp-guru'
```

`HarpFace`, `HarpFaceFragment`, `HarpRow`, `HarpCell` and the rest are private. **A widget
cannot reuse the harp face until `harpguru-core` exports it**, so that export is a
prerequisite task rather than an incidental one.

Worse, the components are not prop-driven. `HarpCell` reads app-wide state directly:

```ts
const activeDisplayMode = useHarpGuruStore((state) => state.activeDisplayMode)
```

`HarpGuruState` is a single zustand object of **27 fields** — `activeHarpStrata`,
`activeQuizDegrees`, `fragmentHarpFaceByOctaves`, `columnBounds`, `layoutFacts`,
`dynamicSizes`, page and display modes, and so on. Rendering one cell therefore needs a
fully populated store, not a set of props.

The store itself *is* exported, which is the way through:

```ts
// packages/harpguru-core/src/store/index.ts
export { createHarpGuruStore } from './create-harp-guru-store'
export { StoreProvider, useHarpGuruStore, useHarpGuruStoreInstance } from './store-context'
```

`getInitialGlobalState` (in `components/harp-guru/utils`) already builds an initial state.
So a widget can plausibly create a store, fix the tuning, expose only key and pozition, and
leave the unused fields at their defaults — without refactoring 26-plus components to take
props. See the open questions in the roadmap; this is unsettled.

## Repo conventions

Constraints on any change made here. Non-obvious, and each one bites.

**Adding a workspace does not add it to the test run.** `workspaces` is `["apps/*",
"packages/*"]`, and root `lint` and `tsc` use `yarn workspaces run`, so they pick up a new
workspace automatically. Root `test` does **not** — it enumerates workspaces by name:

```json
"test": "yarn workspace harpcovariance run test && yarn workspace harpparts run test && yarn workspace harpstrata run test && yarn workspace harpguru-core run test"
```

A new `apps/harpguru-widget` with tests will be silently skipped in CI unless that line is
edited. Note also that the current list contains no `apps/*` entry at all.

**A husky `pre-push` hook runs `yarn lint`, `yarn tsc` and `yarn test`.** So the gap above
is live at push time: `lint` and `tsc` will cover a new workspace, `test` will quietly not.
See `docs/git-hooks.md`.

**Releases are coordinated across the monorepo**, and the process is manual. From the root
README: every changed package gets a CHANGELOG entry whose label tag is the package version
but whose link target is the anticipated `harpguru` tag; package versions are incremented;
inter-package dependency ranges are updated; and `apps/harpguru-expo-boilerplate/app.json`
gets `expo.version`, `expo.ios.buildNumber` and an incremented `expo.android.versionCode`.

This matters for Phase C: **widening `TuningIds` is a change to `harpparts`**, which means a
version bump and CHANGELOG entries in `harpparts` and in everything depending on it. Budget
for it rather than discovering it at the tag.

**Each package has `.eslintrc.js` and `.prettierrc.js` extending the root base configs.** A
new workspace needs both, or it will be linted inconsistently.

---

## Verified findings

### Checked 2026-08-31, against `master` at `f5a52f24`

**The domain packages are not on npm, and publishing them is not trivial.** Names are
unscoped (`harpparts`, not `@jslog/harpparts`), the licence is `UNLICENSED`, and `main`
points at raw TypeScript with no build step. Publishing properly would mean adding builds,
scoping the names, choosing a licence and running a release process — hours of non-AWS work
plus ongoing burden.

_This is why the roadmap has the API treat tunings as opaque documents._ Do not casually
propose publishing these packages; the architecture is arranged so it is unnecessary.

**Toolchain versions.** Expo SDK 54, React Native 0.81.5, React 19.1.0, Reanimated
**4.1.1**, gesture-handler 2.28.0, worklets 0.5.1, zustand 5. `react-native-web@0.21` and
`react-dom@19.1` are already dependencies, and a `"web": "expo start --web"` script already
exists. `app.json` declares `"platforms": ["ios", "android", "web"]`, app version 16.0.0.

**The app builds for web.** This was expected to fail and did not.

```
yarn install
cd apps/harpguru-expo-boilerplate && npx expo export --platform web
```

Result: **exit 0**, 1303 modules, bundled in 7.8s, a 2.27 MB JS bundle, **zero warnings or
errors** (checked against `warn|error|fail|unable|not supported|shim|deprecat`).
`HarpCell`, `harpface1`, `PozitionIds` and `overblow` are all present in the emitted
bundle, so it is not tree-shaking the app away.

Reanimated 4.1.1, gesture-handler 2.28 and worklets 0.5.1 each ship complete web
implementations — Reanimated's published tarball contains a CSS animations manager, web
layout animations, `Easing.web.js`, `findHostInstance.web.js` and much more. Earlier
scepticism was reasonable but applied to Reanimated 2 and 3, where web was a degraded
JS-thread fallback.

**What this does not establish: appearance.** Bundling proves no native-only module blocks
the build — the failure mode that would have killed Phases B and C. It says nothing about
layout, or about touch-designed gestures under a mouse. That needs a browser, and it is the
Phase A spike.

**Bundle weight.** The full export is 6.2 MB, of which **4 MB is `@expo/vector-icons`
fonts** — Expo emits every family. Trim for the embed.

**Reanimated API surface in `harpguru-core`** — 26 files, all mainstream: `Animated.View`
(33 uses), `useAnimatedStyle`, `useDerivedValue`, `useSharedValue`, `withTiming`,
`withSpring`, `interpolate`, `interpolateColor`, `Easing`, `runOnJS`, `useAnimatedProps`,
`SharedValue`. Nothing in the exotic tier where web support is thin — no layout animations,
scroll handlers, sensors or frame callbacks.

**Gesture APIs are mixed, favourably.** `components/harp-cell/harp-cell.tsx` — the
interactive cell — uses the modern `GestureDetector`, as do `menu-access-open` and
`menu-access-close`. The legacy `PanGestureHandler` survives only in
`components/zoom-slide-vertical/`, **which the frozen-scope widget does not include.**

### harpguru.com, checked 2026-08-31

Registered through Heart Internet; nameservers `ns.heartinternet.uk` / `ns2.heartinternet.uk`;
`A` record `79.170.40.4`, a parked shared-hosting address. **No HTTPS** — the TLS handshake
fails outright. Nothing live depends on it, so repointing the nameservers at a Route 53
hosted zone is risk-free. Delegate rather than transfer; registration can stay put.

## How to re-verify

```bash
git clone --depth 1 https://github.com/js-jslog/harpguru.git && cd harpguru
yarn install
cd apps/harpguru-expo-boilerplate
CI=1 npx expo export --platform web --output-dir /tmp/webexport
```

Expect exit 0 and no warnings. To check the domain without `dig`:

```bash
curl -s -H 'accept: application/dns-json' \
  "https://cloudflare-dns.com/dns-query?name=harpguru.com&type=NS" | jq -r '.Answer[].data'
```
