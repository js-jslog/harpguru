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

## [Unreleased](https://github.com/js-jslog/harpguru/compare/v17.0.0...master) - yyyy-mm-dd

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

- MINOR: Release steps in `README.md` no longer include tagging by hand; the
  merge to `master` is the release trigger
- MINOR: `cut-release` skill sets only `expo.version`, and no longer instructs
  the user to tag

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

- [unreleased](https://github.com/js-jslog/harpguru/compare/v17.0.0...HEAD)
- [v4.0.0](https://github.com/js-jslog/harpguru/releases/tag/v17.0.0)
- [v3.0.0](https://github.com/js-jslog/harpguru/releases/tag/v16.0.0)
- [v2.0.0](https://github.com/js-jslog/harpguru/releases/tag/v15.0.0)
