# harpguru

A monorepo containing the component packages to run and build the harpguru application

# Release steps

Run `/cut-release`. It reads every CHANGELOG.md, works out each package's new
version from its Compatible Versioning markers, and applies those numbers
across the repo. It presents a plan before editing anything; what to check in
that plan:

- A package's version comes from the strongest `MAJOR:`/`MINOR:` prefix in
  *its own* Unreleased section. The anticipated **tag** comes from the
  strongest prefix found anywhere in the repo. These are two different numbers
  and they drift apart on purpose — the root package version sitting far below
  the tag is correct.
- New changelog headings are labelled with the *package* version but link to
  the *repo* tag, which will 404 until the merge creates it. Getting those two
  the wrong way round is the classic mistake in these files.
- `expo.version` in `apps/harpguru-expo-boilerplate/app.json` is set to the
  anticipated tag without its leading `v`. It is the only version field that
  belongs there: the iOS build number and the Android version code are
  counters owned by EAS and must not be reintroduced.
- References between harpguru packages move only when a package takes a major
  bump, because the ranges are written `^MAJOR.0.0`. `yarn install` is the real
  check: a wrong range silently installs a published copy into a local
  `node_modules` instead of linking the workspace.

Then merge the branch to `master`. **That merge is the release trigger** — CI
tags the merge commit `v<expo.version>`, builds it on EAS and submits to open
testing on both stores. Do not tag by hand; a manual tag races CI for the same
name.

iOS needs nothing afterwards. `eas submit` assigns the upload to the external
TestFlight group but does not submit it for Beta App Review, so a second
workflow makes that call once Apple has finished processing the build. What
remains is Apple's review, which takes as long as it takes. See
[ the release pipeline ](./docs/release-pipeline.md) for what to do if that run
fails.

Afterwards, check that the links in the CHANGELOG.md files find the new tag.

See [ the release pipeline ](./docs/release-pipeline.md) for what CI does, how
to run a test build from a branch, and the one-off credential setup.

# Build guide

New build guide under development [ here ](./apps/harpguru-expo-boilerplate/README.md)

## iOS build

Expected questions and answers:

```
? You are removing certificate used by @jslog/harp-guru. Do you want to continue? Yes
Removing Distribution Certificate...

Removing Provisioning Profile for @jslog/harp-guru (com.jslog.harpguru)
Removing Provisioning Profile...

? Do you also want to revoke it on Apple Developer Portal? No
? Removing this key/cert will disable notifications in @jslog/harp-guru. Do you want to continue? No
Aborting
? Do you have access to the Apple account that will be used for submitting this app to the App Store? Yes
Please enter your Apple Developer Program account credentials. These credentials are needed to manage certificates, keys and
provisioning profiles in your Apple Developer account.
The password is only used to authenticate with Apple and never stored
Learn more here
? Apple ID:
```

# Testing guide

## iOS simulator

A simulator build can be created from the harpguru-expo-boilerplate package (see package.json).

Double click the tar file produced to extract a `harpguru.app` file.

To load this app in to a simulated device, first you need to acquire the device id and the command xcode to install the app to it.

eg:

```
xcrun simctl list # to recover the device id
xcrun simctl install <device id> <path to app file>
# eg
xcrun simctl install 74F3E445-D2CF-4CC3-916D-70A7D5C432F3 ~/Desktop/harp-guru.app
# Requires that a device has been booted
xcrun simctl boot <device id>
```

# Manual render speed testing

See [ this code review discussion ](https://github.com/js-jslog/harpguru/pull/133#discussion_r761787427) for some version specific results at v10.0.0.
