# Expo SDK 54 → 57 upgrade plan

Findings below were verified against this working tree and against the published
SDK 55/56/57 changelogs and the `expo@57.0.16` / `expo-template-default@57.0.18`
packages on 2026-08-25.

**Decisions taken (§6):** TypeScript holds at 5.9; iOS is not a target for this
upgrade but is wanted eventually; the dead-scaffolding prune happens last, once
everything else is confirmed working.

---

## 1. Verified starting point

|                                  | Installed                       | SDK 57 target                                                 |
| -------------------------------- | ------------------------------- | ------------------------------------------------------------- |
| `expo`                           | 54.0.33                         | `~57.0.16` (**must be ≥ 57.0.9**, see §3.1)                   |
| `react-native`                   | 0.81.5                          | `0.86.2`                                                      |
| `react` / `react-dom`            | 19.1.0                          | `19.2.3`                                                      |
| `react-native-reanimated`        | 4.1.6                           | `4.5.1`                                                       |
| `react-native-worklets`          | 0.5.1 (pinned exactly)          | `0.10.1` (pin exactly, see §3.2)                              |
| `react-native-gesture-handler`   | 2.28.0                          | `~2.32.0`                                                     |
| `react-native-safe-area-context` | 5.6.2                           | `~5.7.0`                                                      |
| `react-native-screens`           | 4.16.0                          | `~4.26.0`                                                     |
| `react-native-web`               | 0.21.x                          | `~0.21.0` (unchanged)                                         |
| `@expo/vector-icons`             | 15.0.3                          | `^15.0.2` (still supported, now deprecated — §3.6)            |
| `expo-*` modules                 | 18.x / 14.x / 6.x / 31.x …      | all realign to `~57.x`                                        |
| `jest-expo`                      | 54.0.17                         | `~57.0.4` (still Jest 29 — no Jest 30 jump)                   |
| `typescript`                     | 5.8.3                           | **hold at `~5.9`** — template wants `~6.0.3`, deferred (§3.5) |
| `@types/react`                   | 19.1.x                          | `~19.2.2`                                                     |
| `@react-native/babel-preset`     | 0.83.1 resolved from `>=0.81.0` | pin `0.86.2` (§3.4)                                           |
| `@testing-library/react-native`  | 7.2.0                           | leave alone this time (§3.7)                                  |
| Node (devcontainer)              | v24.19.0                        | ✅ satisfies RN 0.86's `^20.19.4 \|\| ^22.13 \|\| ^24.3`      |
| Yarn                             | 1.22.22 (corepack)              | unchanged                                                     |

**Green baseline captured before starting** (re-run these to compare afterwards):

- `yarn tsc` — clean across all five workspaces
- `yarn lint` — clean (one pre-existing notice: `expo lint` warns "Using legacy ESLint config")
- `yarn workspace harpguru-core run test` — 76 suites, 264 passed / 1 skipped, **18 snapshots**
- `yarn expo-tunnel` + Expo Go — confirmed working by hand

---

## 2. What the three SDK majors actually demand of _this_ repo

Three majors are being crossed. Most of the published breakage does not touch this
codebase, and it is worth being explicit about why, so the upgrade isn't over-scoped.

### SDK 55 (RN 0.83)

| Change                                                                        | Impact here                                                                                                                                                                                                                                                                                                                              |
| ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| New Architecture mandatory, `newArchEnabled` removed from the config schema   | **None.** `app.json` never set it; new arch is already the default on SDK 54, and Reanimated 4 is new-arch-only anyway. Key confirmed absent from the SDK 57 schema.                                                                                                                                                                     |
| Edge-to-edge mandatory, `edgeToEdgeEnabled` removed                           | **None.** Verified in the installed `@expo/prebuild-config`: SDK 54 already defaults `edgeToEdgeEnabled` to `true` (`raw !== false`), so the app is _already_ running edge-to-edge. Still worth an eyeball on device — the UI is landscape with `StatusBar hidden` and nothing in `harpguru-core` uses `react-native-safe-area-context`. |
| Node minimum raised                                                           | None — container is on 24.19.0.                                                                                                                                                                                                                                                                                                          |
| Xcode 26 minimum                                                              | Not in scope — iOS is not a target for this upgrade (§3.11). Superseded by SDK 56's Xcode 26.4 anyway.                                                                                                                                                                                                                                   |
| `expo-status-bar` prop deprecations                                           | None — `expo-status-bar` is never imported (`App.tsx` uses RN's own `StatusBar`).                                                                                                                                                                                                                                                        |
| `expo-router`: `ExpoRequest`/`ExpoResponse` removed, `reset` → `resetOnFocus` | None — zero `expo-router` imports anywhere.                                                                                                                                                                                                                                                                                              |
| `eas update` now requires `--environment`                                     | None — `expo-updates` is not installed.                                                                                                                                                                                                                                                                                                  |
| Expo package majors realign to the SDK major                                  | Cosmetic but large diff: every `expo-*` version string changes shape.                                                                                                                                                                                                                                                                    |

### SDK 56 (RN 0.85)

| Change                                                                                   | Impact here                                                                                                              |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Hermes v1 memory regression with `react-native-worklets` / `react-native-reanimated`** | **Directly applicable** — this app leans hard on both. Fixed in SDK 57 (≥ 57.0.9). This is the reason not to stop at 56. |
| `expo` no longer depends on `@expo/vector-icons`                                         | Already safe — the app declares `@expo/vector-icons` explicitly in its own `dependencies`.                               |
| `expo-router` no longer depends on `react-navigation`; codemod offered                   | None — zero `@react-navigation/*` imports. Codemod not needed.                                                           |
| `expo/fetch` becomes global `fetch`                                                      | None.                                                                                                                    |
| `expo-file-system` `copy()`/`move()` become async                                        | None — not imported.                                                                                                     |
| `@expo/dom-webview` replaces `react-native-webview` for DOM components                   | None.                                                                                                                    |
| iOS min 16.4, Xcode 26.4, macOS 13.4                                                     | Not in scope now, but this is the bar to clear when iOS is picked up (§3.11).                                            |
| Template TypeScript moves to 6.0.3                                                       | Not adopted — holding at 5.9 (§3.5).                                                                                     |

### SDK 57 (RN 0.86)

Expo describe RN 0.86 as having no intended breaking changes from 0.85. The only
substantive content for us is the library bumps (Reanimated 4.5.1, Worklets 0.10.1,
RNGH 2.32.0) and the Hermes fix. **This is the easy hop; 55 and 56 carry the weight.**

---

## 3. Project-specific risks — the actual work

### 3.1 Do not stop at SDK 56

`react-native-worklets` + `react-native-reanimated` are core to this app (18 Reanimated
import sites, `runOnJS` in the tap-handling hooks, `'worklet'` directives in
`get-input-range` / `get-output-range` / `use-interpolate-option-stack-transition-value`).
SDK 56 has a known Hermes v1 memory regression that specifically hits that combination.
Go straight to `expo@~57.0.16` in a single hop — do not land an intermediate 55 or 56 commit.

### 3.2 Worklets must match Expo Go's native binary exactly — highest-risk item

Commit `38b0b63c` ("Fix Expo Go crash: pin react-native-worklets to 0.5.1") records that
Expo Go bundles one specific native worklets build and the JS dependency must match it
exactly. `expo@57.0.16`'s `bundledNativeModules.json` specifies `react-native-worklets`
as **`0.10.1`** (exact, no range) and `react-native-reanimated` as **`4.5.1`** (exact).

Pin both **exactly** — no `~`, no `^` — in **both** `apps/harpguru-expo-boilerplate/package.json`
**and** `packages/harpguru-core/package.json`. Yarn 1 hoisting means a mismatch between the
two will silently resolve to something Expo Go rejects at startup.

### 3.3 Legacy gesture-handler API is still in use — verified survivable

`harpguru-core` uses the pre-2.0 RNGH API and RNGH's own component re-exports:

- `PanGestureHandler` + `PanGestureHandlerGestureEvent` — `components/zoom-slide-vertical/`
- RNGH `TouchableOpacity` — `option-item`, `option-item-with-display-mode`,
  `option-item-with-degree-matrix`, `option-stack-pointer`
- RNGH `FlatList` — `components/option-list/`

I unpacked `react-native-gesture-handler@2.32.0` and confirmed all of these are **still
exported** (`src/index.ts` lines 47, 94, 102; `lib/typescript/index.d.ts` lines 23, 47, 48).
No forced migration for this upgrade. Migrating `zoom-slide-vertical` to the modern
`Gesture` API is worthwhile follow-up work, not a blocker.

Likewise `runOnJS` is still exported from `react-native-reanimated@4.5.4` — verified.

### 3.4 `@react-native/babel-preset` has already drifted

`packages/harpguru-core/package.json` declares `"@react-native/babel-preset": ">=0.81.0"`,
which has resolved to **0.83.1** against `react-native@0.81.5`. An unbounded range on a
package that is supposed to track React Native's version is a latent trap. Pin it to
`0.86.2` as part of this work.

### 3.5 TypeScript holds at 5.9 — decided

**Decision: TypeScript stays at `~5.9` for this upgrade.** The SDK 57 template ships
`typescript@~6.0.3`, but the repo is on `@typescript-eslint@5.45` + `eslint@8.28`, which
cannot parse TS 6 (typescript-eslint 5 predates it by years). TypeScript is a
devDependency only, and nothing here actually needs TS 6 — the usual driver,
`expo-router`'s generated route types, isn't in play. Holding at 5.9 keeps the SDK jump
a single-variable change and keeps the `tsc` / `lint` gates meaningful.

Deferred to its own PR (§ Phase 6): `typescript@~6.0.3` + `typescript-eslint@^8.68` +
`eslint@^8.57`. Worth recording now that typescript-eslint 8 accepts `eslint@^8.57.0`, so
that bump can be done **without** migrating to flat config — the existing
`.eslintrc.base.js` / per-package `.eslintrc.js` layout survives. `expo lint` is already
nudging about legacy config, so it is a "when", not an "if".

### 3.6 `@expo/vector-icons` is deprecated

Used in 9 components (`MaterialIcons`, `FontAwesome`, `AntDesign`,
`MaterialCommunityIcons`, `Entypo`, `Feather`). It is still listed in SDK 57's
`bundledNativeModules.json` at `^15.0.2`, so it keeps working — but Expo have flagged it
for removal in favour of scoped `@react-native-vector-icons/*` packages
(`npx @react-native-vector-icons/codemod`). Out of scope for this PR; queue it.

### 3.7 Test-layer exposure

- 18 snapshots assert against React Native component internals. Two RN minors will
  probably churn them. Review the diffs individually rather than reaching for `jest -u`.
- `@testing-library/react-native@7.2.0` is very old (current is 14.0.1) and depends on
  `react-test-renderer`, which React 19 deprecates. `react-test-renderer@19.1.0` is
  currently hoisted; React 19.2.3 needs `19.2.3`, which arrives transitively via
  `jest-expo@57` (it depends on exactly `react-test-renderer@19.2.3`). Verify the hoist
  actually lands. Keep RNTL 7 for now; RNTL 14 is a separate migration.
- `harpguru-core/jest.config.js` uses `preset: 'react-native'` (not `jest-expo`), so it
  tracks the RN package directly — another reason to pin `@react-native/babel-preset`.
- `jest-setup.js` reaches into `../../node_modules/react-native-gesture-handler/jestSetup.js`
  by relative path. That path assumes root hoisting; re-check after reinstall.

### 3.8 `app.json`'s splash config is no longer valid — confirmed breaking

I diffed `@expo/config-types` 54 vs 57. In SDK 57 the **top-level `splash` key is gone**,
as are `ios.splash` and `android.splash`; only `web.splash` remains. The current
`app.json` has a top-level:

```json
"splash": { "image": "./assets/splash.png", "resizeMode": "contain", "backgroundColor": "#efcded" }
```

This must move to the `expo-splash-screen` config plugin:

```json
"plugins": [
  ["expo-splash-screen", {
    "image": "./assets/splash.png",
    "resizeMode": "contain",
    "backgroundColor": "#efcded"
  }]
]
```

So `expo-splash-screen` is one of the scaffold packages that must be **kept** (see §3.9).
Everything else in `app.json` survives the schema change — `orientation`, `icon`,
`platforms`, `updates`, `versionCode`, `permissions`, `supportsTablet`, `buildNumber`,
`bundleIdentifier`, `package` are all still present in the SDK 57 types.

Also cruft that `expo-doctor` will likely flag: `updates.fallbackToCacheTimeout` (there is
no `expo-updates` dependency) and the empty `android.permissions: []`.

### 3.9 Dead scaffold dependencies — pruned last, once everything works

Verified zero import sites across `apps/` and `packages/` for: `expo-router`,
`expo-linking`, `expo-web-browser`, `expo-constants`, `expo-font`, `expo-status-bar`,
`expo-system-ui`, `react-native-screens`, `react-native-safe-area-context`. They are
leftovers from a `create-expo-app` scaffold (the `"THE_FOLLOWING_WERE_JUST_AUTO_CREATED"`
marker script and the `reset-project` script are from the same source).

Removing ~9 packages would meaningfully shrink the upgrade surface — **but doing it in the
same change means any failure has two candidate causes.**

**Decision: this happens at the very end**, as the final step after the SDK bump has been
verified green on Expo Go _and_ through a working EAS Android build. Not in the upgrade
commit, and not before Phase 4 has passed. See Phase 6.

Two things must be kept regardless: `expo-splash-screen` (per §3.8) and
`react-dom` / `react-native-web` (`app.json` lists `web` in `platforms`).
`react-native-reanimated` and `react-native-gesture-handler` must also stay duplicated in
the boilerplate despite being used only in `harpguru-core` — see
`apps/harpguru-expo-boilerplate/docs/unnecessary-reanimated-and-gesture-handler-packages.md`;
removing them produced an EAS binary that crashed on open.

### 3.10 Duplicate `app.json` / `eas.json` at the repo root

There are two of each, with **different values**:

|                    | root              | `apps/harpguru-expo-boilerplate/` |
| ------------------ | ----------------- | --------------------------------- |
| EAS `projectId`    | `e81e29f5-287a-…` | `74089c1e-e0a1-…`                 |
| Android package    | `com.jslog.root`  | `com.jslog.harpguru`              |
| `cli.version`      | `>= 16.32.0`      | `>= 16.0.0`                       |
| `appVersionSource` | `remote`          | _absent_                          |

Both `expo-tunnel` and `expo-build-android` run via `yarn workspace`, so the app-level
files win and this is currently harmless — but `expo-doctor` and newer EAS CLI will get
noisier about it (EAS now expects `appVersionSource` to be set explicitly). Worth
resolving, ideally as its own commit so the intent is legible.

### 3.11 iOS — not a target now, but keep the door open

iOS is explicitly **out of scope for this upgrade**. Only `build-android` is scripted, and
there is no local macOS. But it is wanted eventually, so this upgrade should avoid
foreclosing it:

- **Do not strip the iOS config.** Leave `ios.bundleIdentifier` (`com.jslog.harpguru`),
  `ios.buildNumber` and `ios.supportsTablet` in `app.json`, and keep `ios` in `platforms`.
  Keep bumping `ios.buildNumber` alongside the Android `versionCode` in Phase 5 so the two
  don't drift apart while iOS is dormant.
- **The bar to clear when iOS is picked up** (raised by SDK 55/56, so it is already paid
  for by this upgrade — nothing extra to do now): Xcode **26.4** minimum, iOS/tvOS
  deployment target **16.4** (up from 15.1), macOS 13.4. All of that is EAS-build-image
  territory rather than anything in this repo.
- `eas.json` has no `ios` build profile at all, and no `submit` config in the app-level
  file. That is the actual work item for "get iOS going" later — plus an Apple developer
  account and credentials — and it is independent of the SDK version.
- One thing genuinely worth checking at that point: the app is landscape-only with
  `StatusBar hidden`, and nothing in `harpguru-core` uses `react-native-safe-area-context`.
  Android edge-to-edge already forces that question (§2); iOS safe areas / notches will
  raise it again more sharply.

### 3.12 Things I checked that are _not_ problems

- **The tunnel workflow survives.** I unpacked `@expo/cli@57.0.18`: `--tunnel` still
  resolves `@expo/ngrok@^4.1.0` by default (`build/src/start/doctor/ngrok/NgrokResolver.js`).
  The new `@expo/ws-tunnel` path is opt-in behind `EXPO_UNSTABLE_TUNNEL_V2` /
  webcontainer detection (`BundlerDevServer.js:_createTunnel`). The `@expo/ngrok`
  devDependency added in `772a04b4` stays correct.
- **`expo/metro-config` still exists** in `expo@57.0.16` (re-exports `@expo/metro-config`),
  so `apps/harpguru-expo-boilerplate/metro.config.js` and its monorepo `watchFolders` /
  `nodeModulesPaths` setup need no change.
- **Jest stays on 29.** `jest-expo@57.0.4` still depends on `babel-jest@^29` /
  `@jest/globals@^29`. No Jest 30 migration bundled into this.
- **Zustand 5** is unaffected.

### 3.13 Expo Go is no longer a first-class target — development build wanted

Discovered while running Phase 3 on 2026-08-26, so not part of the original analysis.

**Expo Go is frozen at SDK 54 on both app stores.** SDK 55 shipped in February 2026 and
never reached either store; 56 and 57 followed and neither did. On iOS the blocker is
Apple review — Expo submitted, it stalled, and their
[May 2026 changelog](https://expo.dev/changelog/expo-go-and-app-store-may-2026) still
reports it "waiting for approval" with no timeline. For Google Play they have given no
explanation at all, which — given Play review would not plausibly stall three SDKs for six
months — reads as Expo's own decision rather than a store problem.

Expo Go itself is still built and released per SDK (57.0.9 on 2026-08-15); only the
distribution changed. SDK 55+ now comes from [expo.dev/go](https://expo.dev/go) (Android
APK), `sign.expo.dev` (iOS, re-signed with your own Apple ID and expiring every ~7 days),
or `eas go`. Expo's stated position is that Expo Go is "first and foremost an educational
tool" and that they "don't recommend using expo go for any real world project".

**Why this repo should follow them off it:**

- Expo Go has already given this project a false pass once, and it is on record:
  `apps/harpguru-expo-boilerplate/docs/unnecessary-reanimated-and-gesture-handler-packages.md`
  documents Expo Go running happily without `react-native-reanimated` /
  `react-native-gesture-handler` in the app workspace while the EAS binary crashed on open.
  Phase 6 step 23 already encodes that distrust by making the EAS build the non-negotiable
  gate. A development build collapses the gap — the daily loop becomes the same binary
  shape that ships.
- Expo Go only ever exposes the native modules Expo chose to bundle. The
  `@react-native-vector-icons/*` migration queued in §3.6 is natively linked, so it
  probably cannot run under Expo Go at all. Worth confirming, but if so the move is forced
  regardless.
- iOS (§3.11) is materially worse on Expo Go now: a 7-day re-signing treadmill versus an
  ordinary EAS build.

**The gap to close:** `eas.json` already has a `development` profile with
`developmentClient: true`, but `expo-dev-client` is not a dependency, so that profile does
not currently produce a working dev client.

**Explicitly not part of this upgrade.** Swapping the runtime harness mid-upgrade breaks
the same one-variable discipline that §3.1 and §3.9 are built on, Phase 3's checklist is
written against Expo Go, and the SDK 57 Expo Go APK is free and available today. Sideload
it for Phase 3, finish the plan as written, then do this.

---

## 4. Sequenced plan

### Phase 0 — prepare

1. Branch from `162-refound-on-devcontainer-node-base` (or master once that merges).
2. Re-record the baseline from §1 so post-upgrade diffs are attributable.
3. Note the test device will need **Expo Go for SDK 57**, which is **not on the Play
   Store** — install it from [expo.dev/go](https://expo.dev/go) (§3.13). Expo Go is a
   single app per SDK, so 54 and 57 cannot coexist on one device; the SDK 54 APK stays
   downloadable from the same place if a rollback comparison is needed.

### Phase 1 — one-hop version bump

4. In `apps/harpguru-expo-boilerplate/`: `npx expo install expo@^57.0.0 --fix`
   (must be run from the workspace dir, not the repo root — Yarn 1 workspaces).
5. Hand-edit `packages/harpguru-core/package.json` in lockstep — the Expo CLI does not
   know about the second copy of these deps:
   - `react-native-reanimated`: `4.5.1` (exact)
   - `react-native-worklets`: `0.10.1` (exact)
   - `react-native-gesture-handler`: `~2.32.0`
   - `@react-native/babel-preset`: `0.86.2` (replacing `>=0.81.0`)
   - widen `peerDependencies.react-native` if needed (currently `>=0.70.0` — fine)
6. Apply the `app.json` splash → `expo-splash-screen` plugin migration (§3.8).
7. Hold TypeScript at `~5.9` (§3.5).
8. Clean reinstall: `rm -rf node_modules apps/*/node_modules packages/*/node_modules && yarn install`.
   Hoisting changes are the likeliest source of weird failures; don't do an incremental install.
9. `npx expo-doctor@latest` — pay particular attention to the duplicate-module check,
   which is the safety net for step 5.

### Phase 2 — static gates

10. `yarn tsc` — expect fallout from React 19.2 types (`@types/react` 19.2) more than from RN.
11. `yarn lint`.
12. `yarn test`. Review each snapshot diff on its merits before regenerating.

### Phase 3 — runtime verification on Expo Go

13. `yarn expo-tunnel`, open in Expo Go SDK 57.
14. Exercise the surfaces where a worklets/native mismatch or a Reanimated 4.5 change
    would actually surface:
    - harp cell tap (`use-tap-rerender-logic` — `Gesture.Tap` + `runOnJS`)
    - the vertical zoom slide (legacy `PanGestureHandler`)
    - menu open/close and the option-stack transitions (`useAnimatedStyle`, `useDerivedValue`)
    - option list scrolling (RNGH `FlatList`)
    - notification flash
    - Android edge-to-edge: confirm nothing important sits under the system bars in landscape

### Phase 4 — EAS build

15. `yarn expo-build-android` — **Android only**; no iOS build is attempted (§3.11).
    Reconcile the `eas.json` `cli.version` range and `appVersionSource` first (§3.10).
16. Install the resulting APK and confirm it **opens** — per the boilerplate's own doc,
    a crash-on-open is the historical signature of Reanimated/RNGH being missing from
    the app workspace's dependencies.

### Phase 5 — land it

17. CHANGELOG entries following the repo's Compatible Versioning convention, mirroring
    the shape of the v16.0.0 entries: root, `apps/harpguru-expo-boilerplate`,
    `packages/harpguru-core`. MAJOR for Expo 54→57 / React 19.1→19.2 / RN 0.81→0.86.
18. Bump `app.json` `version` / `ios.buildNumber` / `android.versionCode`. Bump
    `ios.buildNumber` even though iOS isn't built, so it doesn't drift (§3.11).
19. Update `docs/` if the reanimated/gesture-handler note needs revising.

### Phase 6 — the dead-scaffolding prune (last, and only once Phases 2–4 are green)

Deliberately the final step, so that any breakage it causes cannot be confused with SDK
upgrade fallout. Do not start it until Expo Go is verified _and_ an EAS Android build has
been installed and confirmed to open.

20. Remove the nine verified-unused packages from
    `apps/harpguru-expo-boilerplate/package.json`: `expo-router`, `expo-linking`,
    `expo-web-browser`, `expo-constants`, `expo-font`, `expo-status-bar`,
    `expo-system-ui`, `react-native-screens`, `react-native-safe-area-context` (§3.9).
21. **Keep** `expo-splash-screen` (§3.8), `react-dom` + `react-native-web` (web is in
    `platforms`), and the duplicated `react-native-reanimated` /
    `react-native-gesture-handler` (crash-on-open, per the boilerplate's own doc).
22. Also drop the scaffold leftovers `"THE_FOLLOWING_WERE_JUST_AUTO_CREATED"` and the
    `reset-project` script — the latter points at `./scripts/reset-project.js`, which does
    not exist in this repo, so it is already dead.
23. Clean reinstall, then re-run the **full** gate set: `yarn tsc`, `yarn lint`,
    `yarn test`, `yarn expo-tunnel` on device, **and another `yarn expo-build-android`
    with the APK opened**. The EAS build is the non-negotiable one here — it is the only
    check that catches a dependency that Expo Go tolerates but a native binary does not.
24. Separate CHANGELOG entries for the prune, so the upgrade and the cleanup stay
    independently revertable.

### Also deferred, independent of the above (separate PRs, no ordering constraint)

- Reconcile / delete the root `app.json` + `eas.json` (§3.10).
- TypeScript 6 + `typescript-eslint@8` + `eslint@^8.57` — no flat-config migration
  needed (§3.5).
- `@expo/vector-icons` → `@react-native-vector-icons/*` codemod (§3.6).
- `@testing-library/react-native` 7 → 14 (§3.7).
- `zoom-slide-vertical`: legacy `PanGestureHandler` → modern `Gesture` API (§3.3).
- Standing up iOS: an `ios` build profile in `eas.json`, credentials, and a safe-area
  pass over the landscape layout (§3.11).
- Move the dev loop from Expo Go to a development build: add `expo-dev-client`, build
  the existing `development` EAS profile, and retire sideloaded Expo Go as the default
  way of running the app on device (§3.13).

---

## 5. Rollback

No native directories exist (fully CNG / Expo Go + EAS), so rollback is just
`git checkout` the branch point plus a clean `yarn install`, and switching the device
back to Expo Go SDK 54. The only irreversible-ish step is Phase 4's EAS build, which
consumes build credits and increments remote versioning if `appVersionSource: remote`
ends up in effect — worth being deliberate about which `eas.json` is live before running it.

## 6. Decisions taken

1. **TypeScript holds at `~5.9`.** The TS 6 + eslint/typescript-eslint modernisation is
   its own PR, later. (§3.5)
2. **iOS is not a target for this upgrade**, but is wanted eventually — so the iOS config
   in `app.json` stays put and `ios.buildNumber` keeps getting bumped. The Xcode 26.4 /
   iOS 16.4 minimums are noted for whenever it's picked up; nothing to do now. (§3.11)
3. **The dead-scaffolding prune happens at the very end**, after Expo Go _and_ a
   confirmed-working EAS Android build — not in the upgrade commit. (§3.9, Phase 6)
