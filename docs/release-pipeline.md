# The release pipeline

Two GitHub Actions workflows cover the tail of the release process — what used
to be `Tag harpguru and push` followed by a local `eas build`.

| Workflow | Trigger | Builds | Submits to | Tags |
| --- | --- | --- | --- | --- |
| `test-build.yml` | manual, any branch | `--profile production` | closed testing (Play `internal`, internal TestFlight) | no |
| `release.yml` | push to `master` touching `app.json` | `--profile production` | open testing (Play `beta`, external TestFlight) | `v<expo.version>` |

The build is identical in both. Only the submit profile differs.

## Build identity is not release version

A new *build* and a new *release* used to be the same act, because
`ios.buildNumber` was required to equal `expo.version`. The stores do not
require that — `CFBundleVersion` and `versionCode` exist precisely so one
version can have many builds. Separating them is what lets a feature branch
produce as many store-submitted test builds as it likes without consuming a
version number or needing a tag.

| Field | Owned by | Changes when |
| --- | --- | --- |
| `expo.version` | `/cut-release`, by hand | a release is cut — real ComVer arithmetic |
| iOS `buildNumber` | EAS (`autoIncrement`) | every build |
| Android `versionCode` | EAS (`autoIncrement`) | every build |

The two counters therefore no longer live in `app.json` or in git, and
`check-release-version.py` fails the release if they reappear. EAS owns both,
so they cannot drift apart — which deletes, rather than guards against, the
old human error of bumping the iOS build number and forgetting the Android
version code.

The visible consequence is that the stores show several builds under one
version string — `17.0.0 (31)` tested internally, `17.0.0 (34)` in open
testing. That is normal store behaviour, but release notes should not imply
the two numbers match.

## Why the tag is cut on the trunk, not the branch

Tagging the feature-branch commit that produced the tested artifact was the
original idea, and it was rejected. A squash merge means the tagged commit is
never an ancestor of `master`; so does *rebase and merge*, which rewrites
SHAs — so "outlaw squash merges" is not a sufficient rule, and a force-push
after tagging breaks it anyway. Worse, the point of testing on a branch is
that fixes follow the build, so the tagged commit generally is *not* what ends
up merged.

Building on the branch but tagging on `master` was rejected too: a tag naming a
different commit from the one that produced the artifact is worse than no
automation.

So the tag and the released artifact are always the same commit, that commit is
always on the trunk, and any merge strategy is safe. The trunk build is a
rebuild of the same source at the same version as the branch build that was
tested — a different binary with a different build number. For a JS/React
Native app with no native changes between the two, that is a formality, and it
is the price of a tag that permanently names a trunk commit.

## Running a test build

Actions → **Test build** → *Run workflow*, pick the branch and the platform.

A terminal wrapper is preferable but blocked on `gh` not being baked into the
dev container image. When it is, note two traps: `gh workflow run --ref
<branch>` dispatches against the **remote** branch, so unpushed commits
silently build the wrong code, and `--ref` requires the workflow file to exist
on that ref.

`workflow_dispatch` rather than `on: push` is deliberate — building every
branch push would spend EAS credits on commits nobody wanted built.

The local `yarn build-android` / `yarn build-ios` scripts remain as a fallback.
They submit to the same closed tracks, but they build the **working tree**, so
the artifact in front of testers may correspond to no commit that exists
anywhere.

## The release check

`apps/harpguru-expo-boilerplate/scripts/check-release-version.py` runs before
anything is built, and again on every `git push` via the pre-push hook. It
fails the release if a build counter has reappeared in `app.json`, or if
`expo.version` is below the newest tag. It reports "nothing to release" when
`expo.version` already equals the newest tag — which is what makes a re-run or
a force-push safe, with the tag itself acting as the record of what has already
been released.

## An abandoned release still burns a version

If a version reaches open testing and is then dropped, its tag exists, so
`/cut-release` computes the next number from it and the abandoned one is simply
never reused. Nothing to undo — worth knowing only so that a gap in the version
sequence is not mistaken for a mistake.

## Credentials

Store credentials live on EAS's servers, not in this repository. The only
repository secret is `EXPO_TOKEN`.

Note that GitHub secrets are readable by workflows on every branch, so anyone
able to push a branch can dispatch a test build and spend EAS credits. For a
single-maintainer repo that is acceptable. The release workflow is `master`-only.

If store submission should require a click, wrap the `release` job in a GitHub
`environment` with a required reviewer — but note that with the tag step inside
that job, approval would gate the tag too.

## What Apple will not let us automate

Google Play is fully automatable: `eas submit` to `track: beta` puts the
artifact into open testing with no human step.

Apple is automatable up to "submitted for Beta App Review". The upload reaches
*internal* TestFlight testers immediately with no review, which is what makes
branch test builds quick. Distribution to an **external** group — the
open-testing equivalent — requires Beta App Review, which cannot be bypassed.
The two paths are asymmetric because TestFlight is. Internal access is a
property of the *person*: an App Store Connect user in the internal group
receives every build automatically, with no review and nothing named in
`eas.json` — uploading is the distribution. External access is a property of
the *build*: it must be assigned to a group, and the first build of each
version faces Beta App Review. So the `production` submit profile names the
external group in `ios.groups` and the `internal` profile omits it, which is
what keeps test builds internal. Distribution on approval is an App
Store Connect setting, so the process is unattended, but there is an
Apple-side wait.

Do not turn on automatic distribution for the external group. It applies to
every build the app receives, so it would pull test builds into Beta App Review
too, and the two submit profiles would stop meaning anything different on iOS.

One further wrinkle is that the open-testing equivalent of Play's `beta` track
is the external group's **public link**, set to *Open to Anyone*, and that link
cannot be enabled until the group holds a build approved by Beta App Review. It
therefore cannot be set up in advance — it is a one-time manual step after the
first release. An external group with no link and no invited testers accepts a
release perfectly happily and shows it to nobody.

In short: **test builds are immediate on both platforms; the open-testing
release is immediate on Android and unattended-but-queued on iOS.**
