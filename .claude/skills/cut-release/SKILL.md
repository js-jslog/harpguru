---
name: cut-release
description: Cut the CHANGELOGs at the end of a piece of work, in preparation for the release tag that will be created after merge. Reviews every CHANGELOG.md in the project, draws a line under the Unreleased entries, works out the new version for each package from its Compatible Versioning markers, and applies those versions to package.json, to dependent package.json references, and to any other version-bearing files the project keeps. Use when asked to "cut the changelogs", "prepare for a tag", "prepare for release", "bump the versions", or when finishing a branch that is about to be merged and tagged.
---

# Cut a release

Turn a branch's accumulated `Unreleased` changelog entries into a named release
that does not exist yet, and make every version number in the repo agree with
what that release will be called.

This is preparation, **not** publication. The tag is created by CI when the
branch is merged. Everything written here is written in anticipation of that
tag, which is why the links point at a tag that will 404 until then.

## Before anything else: read the project's own rules

1. Look for release instructions in the project — `README.md` (often a
   "Release steps" section), `CONTRIBUTING.md`, or `docs/`. **If the project
   documents its own process, that document wins over this skill.** Use this
   skill for the mechanics and judgement it does not spell out.
2. Read one existing CHANGELOG.md in full, particularly the two most recent
   release headings and the footer. The file describes its own format; copy it
   rather than imposing the one below.

Do not proceed on assumption. If the conventions genuinely cannot be read off
the repo, stop and ask.

## The version scheme

These projects use [Compatible Versioning](https://gitlab.com/staltz/comver),
not SemVer. Every changelog entry is prefixed with its impact:

| Prefix | Meaning | Bump |
| --- | --- | --- |
| `MAJOR:` | breaking change | `X.Y.Z` → `X+1.0.0` |
| `MINOR:` | anything non-breaking | `X.Y.Z` → `X.Y+1.0` |
| `PATCH:` | rare, deliberate break from ComVer | `X.Y.Z` → `X.Y.Z+1` |
| `INITIAL-DEVELOPMENT:` | pre-1.0 history | no rule; leave alone |

A package's bump is driven by **the strongest prefix in its own Unreleased
section**. One `MAJOR:` among twenty `MINOR:`s makes it a major bump.

**The root package is not the repo.** In a monorepo the root `package.json` is
private and versions only the workspace's own scaffolding — dev container, CI,
tooling, workspace config. It is bumped by the prefixes in the *root*
changelog's Unreleased section and nothing else. A package taking a `MAJOR:`
never bumps root. The root version will sit far below the tag; that gap is
correct and must not be closed.

The tag, by contrast, does cover everything: it names the whole repo at a point
in time, so a break in any package is a break in what the tag identifies. The
tag can therefore take a major bump while root is untouched, and vice versa.

## Step 1 — gather

```bash
# every changelog, and the package.json that owns it
find . -name CHANGELOG.md -not -path "*/node_modules/*"
find . -name package.json -not -path "*/node_modules/*" -maxdepth 3

# the last tag, which is what the current Unreleased links compare against
git tag | sort -V | tail -5
git log --oneline $(git describe --tags --abbrev=0)..HEAD
```

Read the `Unreleased` section of every changelog. Then read the commit log
since the last tag and check the two against each other. **Work that happened
but was never written down is the most common thing this process misses** — if
you find commits with no corresponding entry, list them for the user rather
than inventing entries yourself.

Equally, watch for entries in the wrong file. A monorepo root changelog should
carry only what is genuinely root-level (tooling, dev container, CI, workspace
config); changes to a package belong in that package's changelog and must not
be duplicated upward.

## Step 2 — work out the new numbers

**The repo tag.** The next tag is the last tag bumped by the strongest prefix
found *anywhere* in the repo's Unreleased sections. If any package has a
`MAJOR:` entry, the tag takes a major bump.

**Each package's version.** Bump that package's *current `package.json`
version* by the strongest prefix in *its own* Unreleased section. Packages
with an empty Unreleased section are not bumped and get no new heading — leave
their changelog's `Unreleased` link alone too, unless the project's existing
files show otherwise.

The package version and the tag are two different numbers and drift apart
freely. That is expected and correct.

## Step 3 — the dependency cascade

For each package whose version changed, find every other `package.json` in the
repo referencing it in `dependencies`, `devDependencies` or `peerDependencies`,
and update the range. Match the existing range style — these projects use
`^MAJOR.0.0` (e.g. a dependency at `11.1.0` is written `^11.0.0`), so a minor
bump usually needs no reference change and a major bump always does.

A package whose only change is a dependency bump is a judgement call: it may
deserve its own changelog entry and version bump, or the reference update may
be housekeeping. **Raise it with the user; do not write changelog entries on
their behalf.**

## Step 4 — show the plan and get agreement

Before editing anything, present a table: package, current version, new
version, why (the strongest prefix and the entry that caused it), plus the
anticipated tag and any dependency references that will move. Include the
store version field from step 6 as its own row, current and intended, even
when the branch has already set it correctly. List separately
anything you want the user to decide, and anything that looks wrong in the
existing files.

Wait for confirmation.

## Step 5 — cut each changelog

Three edits per file that has content, all of which must agree.

**1. Insert a release heading directly beneath `Unreleased`, above the
entries** — the entries stay where they are, the heading slides in above them.

```
## [vNEW_PACKAGE_VERSION](https://github.com/OWNER/REPO/releases/tag/vNEW_TAG) - YYYY-MM-DD
```

The label is the **package's** new version. The link target is the
**repository's** anticipated tag. They are usually different numbers, and
getting this backwards is the classic mistake in these files. Use today's date.

**2. Update the `Unreleased` heading** so it compares against the new tag:

```
## [Unreleased](https://github.com/OWNER/REPO/compare/vNEW_TAG...master) - yyyy-mm-dd
```

Preserve whatever right-hand side that file already uses — some say `master`,
some say `HEAD`. Do not normalise them.

**3. Update the `Github release list` footer** at the bottom: change the
`unreleased` compare link to the new tag, and insert the new release as the
first entry in the list, in the same label/link pairing as the heading.

### Worked example

Package at `12.0.0`, last tag `v16.0.0`, Unreleased contains a `MAJOR:` entry,
so the package becomes `13.0.0` and the tag will be `v17.0.0`:

```diff
-## [Unreleased](https://github.com/js-jslog/harpguru/compare/v16.0.0...master) - yyyy-mm-dd
+## [Unreleased](https://github.com/js-jslog/harpguru/compare/v17.0.0...master) - yyyy-mm-dd
+
+## [v13.0.0](https://github.com/js-jslog/harpguru/releases/tag/v17.0.0) - 2026-09-01

 ### Changed

 - MAJOR: React Native peer upgraded from 0.81 to 0.86
```

```diff
 ## Github release list

-- [unreleased](https://github.com/js-jslog/harpguru/compare/v16.0.0...HEAD)
+- [unreleased](https://github.com/js-jslog/harpguru/compare/v17.0.0...HEAD)
+- [v13.0.0](https://github.com/js-jslog/harpguru/releases/tag/v17.0.0)
 - [v16.0.0](https://github.com/js-jslog/harpguru/releases/tag/v16.0.0)
```

## Step 6 — apply the versions

- Set each bumped package's `package.json` `version` to the number used in its
  new changelog heading. These two must always match.
- Apply the dependency reference updates from step 3.
- Update any other version-bearing files the project keeps.

### The store version field

An Expo app carries the version the app stores see in `app.json`. Never take
"the branch already handled it" on trust: read the field, state its current and
intended value in the step 4 plan, and assert it again in step 7. Set it
whether or not the branch got there first.

| Field | New value |
| --- | --- |
| `expo.version` | the new tag without its leading `v` |

```bash
python3 -c "import json;print(json.load(open('<app>/app.json'))['expo']['version'])"
```

Two things to watch:

- **Find the right `app.json`.** A monorepo can hold several, and the one at
  the repo root may carry only an EAS `projectId` and no version fields at all.
  The file you want is the one that already has `expo.version`.
- **Check `eas.json` first.** This project is `cli.appVersionSource: "remote"`,
  so EAS auto-increments `buildNumber` and `versionCode` on its own servers and
  they do not appear in `app.json` at all. Bump only `expo.version`, and treat
  `expo.ios.buildNumber` or `expo.android.versionCode` reappearing in the file
  as an error to raise rather than a field to set — CI fails the release if it
  finds either. Under `"local"`, by contrast, the hand-maintained `app.json`
  values would be authoritative and would all need setting here.

An Expo SDK upgrade often bumps `app.json` early in order to make a test
build, so finding the values already correct is normal — confirm each one and
report it as verified rather than as skipped.

## Step 7 — verify

```bash
git diff                       # read every hunk
yarn install                   # workspace deps must resolve locally
```

`yarn install` is the real check on step 3: if a dependency range no longer
matches the sibling package's version, yarn silently installs a published copy
into a local `node_modules` instead of linking the workspace. New package
directories appearing under any `node_modules` means a reference is wrong.

Then confirm by eye that every new heading's label matches its package.json
version, and every new link points at the same anticipated tag. Re-read
`expo.version` and check it against the table in step 6.

The release precondition check that CI will run is also runnable here, and says
directly whether the repo is in a releasable state:

```bash
python3 apps/harpguru-expo-boilerplate/scripts/check-release-version.py
```

It should report the new version and `Releasing v<new>`. It also runs on
`git push`, so a mistake here will block the push rather than the release.

## Afterwards

Commit with a message in the project's established style for this operation
(check `git log` — these repos use "Prepare for new tag" and similar). Leave
the merge to the user, and say plainly which tag the repo is now prepared for.

**Do not tag by hand.** Merging the branch to `master` is what creates the tag:
CI reads the new `expo.version`, tags the merge commit `v<version>`, builds it
and submits to open testing. Tagging manually would only race that.

## Things to surface rather than silently fix

- Commits since the last tag with no changelog entry.
- Entries in the root changelog that duplicate a package's changelog.
- Historical headings whose label does not match what that package's version
  was at the time. Audit this rather than eyeballing it: for each heading, read
  the version out of `git show <tag>:<path>/package.json` and compare. An
  isolated slip is not worth rewriting — say so and move on. A *systematic*
  run of them, where the correct values are all recoverable from git, is worth
  correcting, in its own commit ahead of the release cut so the tag prep diff
  stays readable. Fix the `Github release list` footer entries to match. The
  correction is self-checking: once done, each file's labels should form an
  unbroken ascending run into the new heading, with no invented numbers.
- A package pulled along only by a dependency bump.
- Anything where the project's documented process and the files disagree.
