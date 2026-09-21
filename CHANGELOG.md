# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to ~~[Semantic Versioning](https://semver.org/spec/v2.0.0.html).~~
[Compatible Versioning](https://gitlab.com/staltz/comver).

### Format

- Added: for new features.
- Changed: for changes in existing functionality.
- Deprecated: for once-stable features removed in upcoming releases.
- Removed: for deprecated features removed in this release.
- Fixed: for any bug fixes.
- Security: to invite users to upgrade in case of vulnerabilities.

## [Unreleased](https://github.com/js-jslog/harpguru/compare/v18.1.0...master) - yyyy-mm-dd

### Added

- MINOR: `beta-review.yml`, which submits the released iOS build for Beta App
  Review — the App Store Connect call `eas submit` does not make, and the last
  step of a release that still had to be run by hand. It triggers on the release
  workflow completing, polls until Apple has finished processing the upload, and
  submits the build assigned to the external TestFlight group. Its App Store
  Connect key is held in a `master`-only GitHub environment rather than in
  repository secrets, which any branch can read

### Changed

- MINOR: `beta-review-submit.mjs` takes `--wait <minutes>`, polling App Store
  Connect until the released build has arrived and reached `VALID` rather than
  failing on the first look, and accepts the signing key inline as `ASC_KEY` as
  well as by path, so CI never writes it to the runner's filesystem
- MINOR: `docs/release-pipeline.md` records that the submit profile named
  `production` targets open testing on both stores and that nothing in the
  pipeline reaches either store's production track, and that EAS's `skipping
  TestFlight setup` log line has nothing to do with Beta App Review
- MINOR: `cut-release` skill says explicitly that an untouched package's
  `Unreleased` link is left pointing at an older tag, and to read the other
  packages' links before deciding — a link that looks stale is the convention,
  not a slip

### Fixed

- MINOR: The release workflow's tag push ran the pre-push hook, because
  `yarn install` installs the hooks on the runner — putting the release check,
  lint, tsc and the whole test suite between a queued build and its tag. It now
  pushes with `--no-verify`

## [v5.1.0](https://github.com/js-jslog/harpguru/releases/tag/v18.1.0) - 2026-09-21

### Added

- MINOR: `beta-review-submit.mjs`, which submits a TestFlight build for Beta
  App Review — the App Store Connect call `eas submit` does not make, without
  which a released build never leaves *Ready to Submit*

### Changed

- MINOR: Workflow actions bumped off the Node 20 runtime GitHub now warns
  about — `actions/checkout` v4 to v7, `actions/setup-node` v4 to v7 and
  `expo/expo-github-action` v8 to v9, all in both workflows
- MINOR: `eas-version` pinned to 24.4.2, the version that ran the v18.0.0
  release, rather than tracking `latest` where an eas-cli release could change
  the pipeline's behaviour with no commit in the repository

### Fixed

- MINOR: `docs/release-pipeline.md` claimed Apple was automated as far as
  "submitted for Beta App Review". It is automated as far as uploaded and
  assigned to the external group; the submission is a separate resource and is
  now documented as a per-release step
- MINOR: Release steps in `README.md` did not mention the iOS submission

## [v5.0.0](https://github.com/js-jslog/harpguru/releases/tag/v18.0.0) - 2026-09-14

### Added

- MINOR: `Test build` GitHub Actions workflow, manually dispatched on any
  branch, building both platforms on EAS and submitting them to the closed
  testing tracks without creating a tag or consuming a version
- MINOR: `Release` GitHub Actions workflow, tagging and building any push to
  `master` that carries a new `expo.version`, and submitting to open testing
- MINOR: `check-release-version.py` release precondition check, run by the
  release workflow before anything is built and by the pre-push hook
- MINOR: `docs/release-pipeline.md` describing the pipeline and the reasoning
  behind tagging on the trunk rather than on the branch
- MINOR: `expo-build-ios` root script, the counterpart to `expo-build-android`

### Changed

- MAJOR: Releasing no longer includes tagging by hand. The merge to `master` is
  the release trigger, so the old procedure does not merely become redundant —
  a hand-cut tag now races CI for the same name
- MINOR: `cut-release` skill sets only `expo.version`, and no longer instructs
  the user to tag
- MINOR: `README.md` release steps defer to the `/cut-release` skill and set out
  what to check in the plan it presents, rather than restating its mechanics

## [v4.0.0](https://github.com/js-jslog/harpguru/releases/tag/v17.0.0) - 2026-09-01

### Changed

- MAJOR: Dev container refounded on the prebuilt `jslog/devcontainer-harpguru`
  image (itself built on `devcontainer-node-base`) rather than building the
  Dockerfile in place on every create
- MAJOR: Dev container runs as the `node` user rather than `root`
- MAJOR: Workspace volume renamed from `harpguru-volume` to
  `devcontainer-harpguru-volume`
- MAJOR: `runcontainer.ps1 destructive` now removes the workspace volume along
  with the container, where it previously reused the volume
- MINOR: Node upgraded from 20 to 24, and yarn 1.22.22 activated through
  corepack and recorded in the root `packageManager` field

### Added

- MINOR: `buildimage.sh` for building and publishing the dev container image
- MINOR: Docker-in-Docker dev container feature

### Removed

- MAJOR: `.devcontainer` provisioning scripts for lazygit, GCM, Neovim, tmux,
  Claude Code and git config, all now baked into the image

## [v3.0.0](https://github.com/js-jslog/harpguru/releases/tag/v16.0.0) - 2026-02-07

### Removed

- MAJOR: Socat clipboard tooling from devcontainer

### Added

- MINOR: Claude Code dev container configuration

## [v2.0.0](https://github.com/js-jslog/harpguru/releases/tag/v15.0.0) - 2024-08-16

### Added

- MINOR: Dev container context

### Changed

- MAJOR: Converted from lerna to basic yarn 1 workspace
- MAJOR: Modified all run scripts

### Removed

- MAJOR: Removed Prettier
- MINOR: Removed pre-commmit hook
- MINOR: Trimmed unnecessary root dev dependencies

## Github release list

- [unreleased](https://github.com/js-jslog/harpguru/compare/v18.1.0...HEAD)
- [v5.1.0](https://github.com/js-jslog/harpguru/releases/tag/v18.1.0)
- [v5.0.0](https://github.com/js-jslog/harpguru/releases/tag/v18.0.0)
- [v4.0.0](https://github.com/js-jslog/harpguru/releases/tag/v17.0.0)
- [v3.0.0](https://github.com/js-jslog/harpguru/releases/tag/v16.0.0)
- [v2.0.0](https://github.com/js-jslog/harpguru/releases/tag/v15.0.0)
