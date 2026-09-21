# The release pipeline

Three GitHub Actions workflows cover the tail of the release process: tagging
the released commit, building it on EAS, submitting the result to the stores,
and submitting the iOS build for Beta App Review.

| Workflow | Trigger | Builds | Submits to | Tags |
| --- | --- | --- | --- | --- |
| `test-build.yml` | manual, any branch | `--profile production` | closed testing (Play `internal`, internal TestFlight) | no |
| `release.yml` | push to `master` touching `app.json` | `--profile production` | open testing (Play `beta`, external TestFlight) | `v<expo.version>` |
| `beta-review.yml` | `release.yml` completing | — | Beta App Review, for the build `release.yml` produced | no |

The build is identical in the first two. Only the submit profile differs.

## `production` is not a production track

Nothing in this pipeline reaches either store's production track, and nothing in
it is meant to. The submit profile named `production` targets Play `beta` and
the external TestFlight group — **open testing on both stores**.

The name describes the build profile it extends, not a destination. `eas.json`
has one production *build* profile, which every build here uses; the submit
profiles differ only in where the finished artifact is sent, and neither of them
sends it to a production track. Promotion to one is a manual act in the Play
Console and in App Store Connect, and no workflow in this repository performs
it. This has already misled once, which is why it is written down.

## Build identity is not release version

A build and a release are separate acts. `CFBundleVersion` and `versionCode`
exist precisely so that one version can have many builds, and neither store
asks them to agree with `expo.version`. Holding them apart is what lets a
feature branch produce as many store-submitted test builds as it likes without
consuming a version number or needing a tag.

| Field | Owned by | Changes when |
| --- | --- | --- |
| `expo.version` | `/cut-release`, by hand | a release is cut — real ComVer arithmetic |
| iOS `buildNumber` | EAS (`autoIncrement`) | every build |
| Android `versionCode` | EAS (`autoIncrement`) | every build |

The two counters therefore no longer live in `app.json` or in git, and
`check-release-version.py` fails the release if they reappear. EAS owns both,
so they cannot drift apart, and there is no longer a counter to bump on one
platform and forget on the other.

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

The local `yarn build-android` / `yarn build-ios` scripts in
`apps/harpguru-expo-boilerplate` remain as a fallback — `yarn expo-build-android`
and `yarn expo-build-ios` from the root are workspace-qualified aliases for the
same two scripts, nothing more. They submit to the same closed tracks, but they
build the **working tree**, so the artifact in front of testers may correspond
to no commit that exists anywhere.

## The release check

`apps/harpguru-expo-boilerplate/scripts/check-release-version.py` runs before
anything is built, and again on every `git push` from a working copy via the
pre-push hook. It fails the release if a build counter has reappeared in
`app.json`, or if `expo.version` is below the newest tag. It reports "nothing
to release" when `expo.version` already equals the newest tag — which is what
makes a re-run or a force-push safe, with the tag itself acting as the record
of what has already been released.

The one push the hook deliberately does not gate is the release workflow's own
tag push. `yarn install` installs the hooks on the runner as well, so that push
uses `--no-verify`: by then the build is already queued, and a hook failure
would leave a release shipped but unnamed.

## An abandoned release still burns a version

If a version reaches open testing and is then dropped, its tag exists, so
`/cut-release` computes the next number from it and the abandoned one is simply
never reused. Nothing to undo — worth knowing only so that a gap in the version
sequence is not mistaken for a mistake.

## Credentials

Store credentials live on EAS's servers, not in this repository. CI holds two of
its own: `EXPO_TOKEN`, and the App Store Connect API key that `beta-review.yml`
submits with.

They are held differently, deliberately. `EXPO_TOKEN` is an ordinary repository
secret. The Apple key is not — it lives in an **environment** called
`apple-beta-review`, whose deployment branch policy allows `master` only.

The distinction matters because repository secrets are readable by a workflow on
any branch, and `test-build.yml` is dispatchable from any branch, so anyone able
to push a branch can read every repository secret. For `EXPO_TOKEN` that is
accepted: the exposure is EAS build credits, and this is a single-maintainer
repo. An App Manager key on the Apple account is a wider thing to leave within
reach of a pushed branch, and the environment is what narrows it. GitHub refuses
environment secrets to a job running on any other ref, and it does so
server-side, so the restriction holds whatever a workflow on a branch claims. A
dispatch of `beta-review.yml` from a branch is refused for the same reason,
which is the intended behaviour rather than something to work around.

That environment holds `ASC_KEY_ID`, `ASC_ISSUER_ID` and `ASC_KEY` — the last
being the contents of the `.p8` rather than a path to it, so the key is never
written to the runner's filesystem for a later step to read. The key needs App
Manager or Admin.

The release workflow is `master`-only, and so is `beta-review.yml` — by
construction rather than by a condition that could be edited away, since a
`workflow_run` workflow always runs the default branch's copy of its own file.

If store submission should require a click, wrap the `release` job in a GitHub
`environment` with a required reviewer — but note that with the tag step inside
that job, approval would gate the tag too.

## What Apple will not let us automate

Google Play is fully automatable: `eas submit` to `track: beta` puts the
artifact into open testing with no human step.

Apple is automatable up to `WAITING_FOR_REVIEW`. The upload reaches *internal*
TestFlight testers immediately with no review, which is what makes branch test
builds quick. Distribution to an **external** group — the open-testing
equivalent — requires Beta App Review. The review, and the wait for it, are
what cannot be bypassed; *submitting* for it can be, and is.

The two paths are asymmetric because TestFlight is. Internal access is a
property of the *person*: an App Store Connect user in the internal group
receives every build automatically, with no review and nothing named in
`eas.json` — uploading is the distribution. External access is a property of
the *build*: it must be assigned to a group, and the first build of each
version faces Beta App Review. So the `production` submit profile names the
external group in `ios.groups` and the `internal` profile omits it, which is
what keeps test builds internal. Distribution on approval is an App
Store Connect setting, so once a build is approved the process is unattended.

### The build does not submit itself

Being in a beta group and being submitted for Beta App Review are two separate
resources in App Store Connect. `eas submit` creates the first and never the
second, so a released build is assigned to `External Testers`, shows *Ready to
Submit*, and waits there indefinitely. Nothing is queued at Apple and nothing
times out; it simply never progresses.

This is not a first-release quirk. Every release lands in that state, observed
identically on build 34 of v18.0.0 and build 35 of v18.1.0. So
`beta-review.yml` makes the missing call on every release. Four things about how
it does it:

- It triggers on `release.yml` **completing**, not on the tag push, because tags
  pushed with the default `GITHUB_TOKEN` do not trigger workflows. That is
  GitHub's loop protection, and `release.yml` depends on it.
- A successful `release.yml` run is not the same thing as a release: its check
  job reports "nothing to release" for a push that carries no new version, and
  the release job is then skipped. So `beta-review.yml` looks for a `v*` tag on
  the released commit and does nothing when there is none, rather than polling
  for an hour after a build that was never queued. The tag also names the
  version to submit, so this does not depend on `app.json` still agreeing.
- It polls App Store Connect for up to 90 minutes, because `release.yml` queues
  with `--no-wait`: when the follow-on run starts, the build may not have
  reached Apple at all, and a submission against a build that is not `VALID` is
  rejected. Ninety minutes is generous on purpose — two releases are a thin
  basis for a timeout, and the cost of guessing low is a red run on a release
  that was fine.
- It waits for the newest build of that version **assigned to the external
  group**, not simply the newest of that version. A test build dispatched from a
  branch after a release carries the same `expo.version` and a higher build
  number, so it would be the newer of the two — and it is submitted with the
  `internal` profile, so it is not a build that should ever reach Beta App
  Review.

Creating the submission is idempotent: the script reports an existing submission
rather than making a second one. So re-running the workflow is always safe, and
re-running it is how a timeout is recovered.

When a run fails, the same script is both the diagnostic tool and the fallback:

```
ASC_KEY_ID=<key id> ASC_ISSUER_ID=<issuer id> ASC_KEY_PATH=<path to .p8> \
  node apps/harpguru-expo-boilerplate/scripts/beta-review-submit.mjs
```

Without `--submit` it reports what the API knows and changes nothing, which is
also the quickest way to find out what a confusing console is actually showing:
the build's processing state, the groups it belongs to, and whether a review
submission exists. It reads the app id from `eas.json` and the version from
`app.json`, and defaults to the newest build of that version. Add `--submit` to
make the call by hand. The key needs App Manager or Admin — a Developer-role
key reads builds and then fails the submission with a bare 403.

The console is worth distrusting here, because it reports two different statuses
for the same build: *Build uploads* shows *Complete* once processing finishes,
while the per-version list shows *Ready to Submit*. The second is the one that
tracks review, and neither of them names the resource that is missing.

Things that are *not* the cause, all of which look plausible when a build is
stuck: an empty tester list on the group, the absent public link, and missing
Test Information. An external group with no testers accepts and reviews a build
perfectly happily — audience and review are unrelated.

### The external group's own settings

Do not turn on automatic distribution for the external group. It applies to
every build the app receives, so it would pull test builds into Beta App Review
too, and the two submit profiles would stop meaning anything different on iOS.

One further wrinkle is that the open-testing equivalent of Play's `beta` track
is the external group's **public link**, set to *Open to Anyone*, and that link
cannot be enabled until the group holds a build approved by Beta App Review. It
therefore cannot be set up in advance — it is a one-time manual step after the
first release. An external group with no link and no invited testers accepts a
release perfectly happily and shows it to nobody.

### There is no shortcut through EAS

Recorded so that it is not investigated a second time. Both release logs contain

```
No complete App Store Connect credentials, skipping TestFlight setup
```

which reads as though EAS would do this work if its credentials were completed.
It would not. That line comes from
[`ensureTestFlightSetup.ts`](https://github.com/expo/eas-cli/blob/v24.4.2/packages/eas-cli/src/submit/ios/ensureTestFlightSetup.ts),
and the step it skips is
[`ensureTestFlightGroupExistsAsync`](https://github.com/expo/eas-cli/blob/v24.4.2/packages/eas-cli/src/credentials/ios/appstore/ensureTestFlightGroup.ts),
which creates an *internal* group named `Team (Expo)` and returns immediately if
the app already has any beta group. This app has two. It would do nothing even
if it ran, and it has nothing to do with Beta App Review.

The root cause of that log line, and of `Failed to display prompt: Apple Team
ID` during the build, is that the ASC API key held on EAS carries no Apple Team
ID. Neither symptom is related to the submission gap.

## In short

**Test builds are immediate on both platforms; a release reaches open testing
unattended on Android, and on iOS reaches Beta App Review unattended and then
waits on Apple.**
