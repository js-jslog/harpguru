# Release automation — status and roadmap

**Working document** for branch `166-autotag-build-publish`. It records what has
been built, what is still to do, and the decisions taken along the way, so that
work can be picked up cold.

Delete this file once the roadmap is complete. The durable explanation of how
the pipeline works and why it is shaped this way lives in
[`docs/release-pipeline.md`](docs/release-pipeline.md) and is **not** repeated
here.

## Picking this up cold

Read this file top to bottom before touching anything; it is the whole state of
the work. Then:

- **The branch is `166-autotag-build-publish`**, pushed. All the code is
  written and committed. Do not re-implement anything in *What is implemented*.
- **Steps 1 and 2 of the Roadmap are done** and both stores have received a
  build. Step 3 is next, and it is a merge.
- **Two things gate Step 3**, both listed in Step 1 and both needing the
  maintainer, not an agent: the `EXPO_TOKEN` repository secret, and confirming
  the Play `beta` track has a country list.
- **Do not tag anything by hand.** Merging a new `expo.version` to `master` is
  what creates the tag. See *Decisions taken*.
- **Nothing in CI has ever run.** Treat the first workflow run as a real test
  and read *What is verified, and what is not* before claiming anything works.
- The durable design — how the pipeline works and why — is in
  [`docs/release-pipeline.md`](docs/release-pipeline.md). This file is the
  transitional record and gets deleted at Step 6.

The maintainer's conventions matter here: commits are small and frequent, with
imperative subjects and a body explaining *why*, and carry no Claude
attribution. Changelog entries accumulate under `Unreleased` as work happens;
`/cut-release` turns them into a release later.

## In one paragraph

The manual tail of the release process — `Tag harpguru and push`, then a local
`eas build` — is replaced by two GitHub Actions workflows. A **test build** is
dispatched by hand from any branch and submits to the closed testing tracks
without tagging or consuming a version. A **release** fires automatically when a
commit carrying a new `expo.version` lands on `master`, tags it `v<version>`,
builds it and submits to open testing. What makes this work is separating build
identity from release version: the iOS build number and Android version code
become counters owned by EAS, leaving `expo.version` as the only version number
a human sets.

All code for this is written. Nothing has run yet.

## Current state of the numbers

This is the part to read first — the store, EAS and repo numbers do not
currently agree, and one step must happen before anything builds.

| Where | Value | Notes |
| --- | --- | --- |
| Play Console | `versionCode 30`, marketing version `17.0.0` | shipped by the v17.0.0 production build |
| App Store Connect | `CFBundleVersion 17.0.0`, marketing version `17.0.0` | same build |
| EAS remote counters | **unset** | never initialised; a build now would start at `1` and be rejected |
| `app.json` on this branch | `version: 17.0.0`, no counters | counters deleted by this work |
| Newest tag | `v17.0.0`, on `master` | equal to `expo.version`, so no release is pending |

`v17.0.0` was tagged **and** built and submitted to production, using the
`app.json` values currently on `master`. The stores have therefore definitely
seen `versionCode 30`, which fixes the seeding value below at `30` rather than
`29`.

Because `expo.version` already equals the newest tag, the first push to `master`
carries no release. That is not a problem to route around — see the roadmap.

## What is implemented

Everything below is written and in the working tree of this branch, uncommitted.

| File | State |
| --- | --- |
| `apps/harpguru-expo-boilerplate/app.json` | `ios.buildNumber` and `android.versionCode` removed |
| `apps/harpguru-expo-boilerplate/eas.json` | `appVersionSource: remote`; `autoIncrement` on `production`; `submit` profiles `production` (Play `beta` + real Apple identifiers) and `internal` (`extends: production`, Play `internal`) |
| `apps/harpguru-expo-boilerplate/scripts/check-release-version.py` | release precondition check; stdlib only |
| `.husky/pre-push` | runs the check first, before lint/tsc/test |
| `.github/workflows/test-build.yml` | `workflow_dispatch`, `platform` input, submits with the `internal` profile |
| `.github/workflows/release.yml` | `push` to `master` filtered on `app.json`; `check` job then gated `release` job that tags and builds |
| `apps/harpguru-expo-boilerplate/package.json` | `build-android` auto-submits to `internal`; `build-ios` added; Expo template leftovers removed |
| `README.md`, `apps/harpguru-expo-boilerplate/README.md`, `docs/index.md` | release steps and build docs updated |
| `docs/release-pipeline.md` | new; the durable design document |
| `.claude/skills/cut-release/SKILL.md` | sets only `expo.version`; no longer instructs manual tagging |
| `CHANGELOG.md`, `apps/harpguru-expo-boilerplate/CHANGELOG.md` | `Unreleased` entries added |

## What is verified, and what is not

**Verified locally.** `check-release-version.py` was exercised across every
branch: version equal to the newest tag (no-op), a minor and a patch bump
(release), rollback to an older *existing* tag and to a version below all tags
(both fail), a malformed version (fails), and each build counter reintroduced
(fails, naming the field). Both workflow files parse as YAML. `eas.json` parses
as JSON.

**Verified end to end on both stores.** Android build `6e336091` (commit
`9188d93a`, version code 31) reached the Play `internal` track, and iOS build
`e38c35d6` (commit `efaee20a`, build number 31) reached TestFlight. That
settles:

- the remote counters are seeded and auto-increment as intended — seeded at
  `30`, both platforms were issued `31`, and the Android sequence 29 → 30 → 31
  runs with no gap and no duplicate;
- both store credentials work: the Play service account and the App Store
  Connect API key, the latter having been stored unvalidated and now proved by
  a real submission;
- the `internal` submit profile resolves to the closed tracks on both
  platforms, confirming the `extends` structure;
- `--non-interactive` builds without prompting for a keystore, which is the
  thing that would otherwise break CI;
- builds are recorded against pushed commits, so provenance holds;
- a failed submission costs only a retry — the Android submission failed on a
  disabled Play Developer API and was recovered by resubmitting the same
  artifact by build id, without repeating three hours of queue time.

Note that this was proved through the **local** `yarn` scripts, not through a
dispatched workflow, so the first acceptance criterion is not yet met even
though the capability behind it is.

**Still unverified.** Neither workflow has ever run — the whole CI path,
`EXPO_TOKEN` included, is untested, as is the check script anywhere other than
locally. No tag has been created by automation. The `production` submit
profile, and therefore the Play `beta` track and the external TestFlight
group, has never been exercised, so open testing is entirely unproven on both
platforms.

### iOS open testing needs a manual step after the first release

The open-testing equivalent of Play's `beta` track is not the external group
itself but its **public link**, set to *Open to Anyone*. Without it, an approved
build reaches only individually invited testers — an empty group means a
release that succeeds and reaches nobody.

The link cannot be enabled until the group has a build approved by Beta App
Review, so it cannot be configured in advance. The order is forced: the first
release submits and is assigned to the group, review happens, and only then can
the link be switched on. That is a one-time manual click sitting *after* the
first automated release. Later versions still face review, but the link
persists.

### iOS signing credentials expire, and CI cannot prompt

EAS generates and stores the distribution certificate and provisioning profile
on the first interactive iOS build, and reuses them thereafter. There is nothing
to maintain locally and nothing in the repo.

Apple certificates expire after a year, however, and both workflows run
`--non-interactive`. If renewal ever needs a decision, the release will fail
rather than prompt. EAS may renew silently — it holds an App Store Connect API
key with the App Manager role, which may suffice — but this is untested and
will not be known for about a year.

If a release ever fails on iOS credentials, run `yarn build-ios` locally. That
is interactive, so EAS can prompt and regenerate, after which CI works again.

## Roadmap

The order matters, and two constraints fix it:

- **A `workflow_dispatch` workflow is not dispatchable until its file is on the
  default branch.** GitHub will not list or trigger a workflow that exists only
  on a feature branch. So the Actions button cannot be used before this branch
  merges.
- **The local `yarn` build scripts have no such restriction**, so the whole
  credential and counter chain *can* be proved from this branch first.

### Step 1 — seed the counters and set up credentials — **DONE**

Nothing else can happen until this is done. It is manual and one-off.

`eas-cli` is not installed in the dev container and is not a dependency of any
workspace, so every local invocation goes through `npx` — as the `build-android`
and `build-ios` scripts already do. In CI it *is* on `PATH`, installed by
`expo/expo-github-action`, which is why the workflows call `eas` bare.

`build:version:set` takes no value flag and prompts for the number, so it cannot
be scripted:

```bash
cd apps/harpguru-expo-boilerplate
npx eas-cli build:version:set -p android   # answer 30 at the prompt
npx eas-cli build:version:set -p ios       # answer 30 at the prompt
npx eas-cli build:version:get -p android && npx eas-cli build:version:get -p ios
```

Before seeding, both platforms report `No remote versions are configured for
this project` — confirmed, which is exactly the state that would start a build
at `1`.

`build:version:set` records the *last used* value, so the first
auto-incremented build is `31` on both. `31` is accepted by Play as an increase
over `30`, and by Apple over `17.0.0` because `CFBundleVersion` is compared
component-wise (`31 > 17`).

This is confirmed rather than assumed: with the counters seeded to `30`, the
first Android build was issued `Version code: 31`.

Verify by eye. The getters must print exactly:

```
Android versionCode - 30
iOS buildNumber - 30
```

Nothing in CI can detect an unseeded or mis-seeded counter — the check script
guards `expo.version`, not these — and a wrong value here fails late, at the
first store submission. A digit dropped from the iOS seed would be the
expensive one: `3` rather than `30` gives a first build of `4`, which Apple
rejects against the existing `17.0.0`, because `CFBundleVersion` is compared
component-wise and `4 < 17`. Read both numbers back before building.

- [x] Expo **robot user** access token added as repository secret `EXPO_TOKEN`.
      Robot users are available on a personal account, but under the
      *account*-scoped settings — https://expo.dev/accounts/jslog/settings/access-tokens
      — not the personal `expo.dev/settings/access-tokens`, which offers only
      personal tokens. The distinction is easy to miss, since the Settings menu
      leads to the personal page. Give the robot the **Developer** role, the
      least privilege that can build and submit; raise to Admin only if
      something fails on permissions. A robot cannot sign in and owns nothing,
      so revoking it can never lock the maintainer out.
      The robot is named `github-actions` after its consumer, since no
      per-project scoping is offered and the role is account-wide — it can
      therefore reach every EAS project the `jslog` account owns, not just
      `harp-guru`, and a project-flavoured name would misstate that. Its token
      is named `harpguru` after the repository whose secret holds it, so that
      one repo's credential can be revoked without disturbing another's.
      Verify before trusting it, in a terminal that is not being recorded —
      `EXPO_TOKEN=<token> npx eas-cli whoami` — which prints the robot's name,
      not `jslog`
- [x] Google Play service account created in **Google Cloud Console** (not Play
      Console), with the *Google Play Android Developer API* enabled in the same
      project, and its JSON key uploaded to EAS via `npx eas-cli credentials`.
      A Play-only Google account has no GCP project, and the service accounts
      page stays empty until one is created — no billing account is needed.
      **Enabling the API is the step that actually gets missed**, and it fails
      at the first submission rather than at setup, with
      `PERMISSION_DENIED: Google Play Android Developer API has not been used
      in project <n> before or it is disabled`. The build is unaffected, so the
      fix is to enable it and resubmit the same artifact — no rebuild
- [x] That service account's email granted *Release to testing tracks* on Harp
      Guru, via Play Console → **Users and permissions** → *Invite new users*.
      The old *Setup → API access* page is gone from newer consoles; service
      accounts are now invited like users
- [x] App Store Connect API key generated at ASC → *Users and Access* →
      **Integrations** → *App Store Connect API* → **Team Keys**, with the
      *App Manager* role, and uploaded to EAS with its Key ID and Issuer ID.
      The `.p8` downloads once only; team keys are not scoped per app.
      Uploading it reports *"Unable to validate App Store Connect API Key, you
      are not authenticated with Apple"* alongside the success line — the key
      is stored and assigned, but unchecked, so a mistyped Key ID or Issuer ID
      surfaces only at the first submission. Recovery is cheap: the build still
      succeeds and can be resubmitted with
      `npx eas-cli submit -p ios --id <build-id> --profile internal`
- [x] iOS distribution certificate and provisioning profile, which the API key
      does **not** cover — EAS generates them during the first iOS build, which
      must therefore be run locally and interactively, not through CI
- [x] Play `internal` track exists — confirmed by the submission landing in it
- [x] Play `beta` track — *Open testing* in the console UI — exists and has
      prior releases, so its region configuration is almost certainly in place.
      The *Countries/regions* tab could not be read (console error
      `6623A6C4`), so this is inferred rather than seen. Judged not worth
      blocking on: a track with prior releases is unlikely to be missing region
      config, and a failed submission costs only a resubmit by build id.
      Earlier revisions of this document overstated the risk as the one item
      that could sink the first release
- [ ] Watch on the first release: open testing currently holds an
      un-completed release at version code 30, offering a rollout, while 30 is
      also in production — a staged rollout never finished, or a draft never
      sent. Submitting 31 as `completed` should supersede it, but if the first
      release fails on the `beta` track, look here before the country list
- [x] Internal TestFlight group exists with you in it. Internal testers receive
      every build automatically once uploaded, with no review and no group named
      in `eas.json` — but only if they are in that group. Being the Account
      Holder does not put you there, and an empty group means a submission that
      succeeds and reaches nobody
- [x] External TestFlight group exists — named `External Testers`, matching
      `ios.groups` exactly — with automatic distribution **off**. It needs no
      testers in it for submission to work, but see the public link note below. It is named in `submit.production.ios.groups`
      instead, so only release builds are assigned to it. Enabling automatic
      distribution would sweep every build, test builds included, into Beta App
      Review and out to the public

### Step 2 — prove it from this branch, before merging — **DONE**

```bash
yarn expo-build-android
```

This exercises the EAS build, the remote counters and the Play `internal`
submission without needing anything on `master`. Build `31` should appear in the
Play Console internal track. Repeat with `yarn expo-build-ios` for TestFlight.

Local builds compile the **working tree**, so make sure it is clean and matches
`HEAD` first, or the artifact will correspond to no commit.

### Step 3 — merge this branch with `expo.version` still `17.0.0`

`release.yml` fires, because this branch edits `app.json` and the paths filter
matches. The check job reports "nothing to release" and exits green. No tag, no
build, no credits, no store submission.

This is the only way to get both workflows onto `master`, and it validates
checkout, tag enumeration, the check script and the job outputs at zero risk.

- [ ] Confirm the run is green and reports `v17.0.0 is already tagged`
- [ ] Confirm **Test build** now appears under the Actions tab

### Step 4 — dispatch a test build from the Actions button

Actions → *Test build* → **Run workflow**, choosing branch and platform. Same
result as step 2, but built from a known commit. Install it on a device.

### Step 5 — cut the first automated release

Run `/cut-release`, then merge to `master`. On the current changelog entries
that produces:

| | Now | After |
| --- | --- | --- |
| Repo tag | `v17.0.0` | `v18.0.0` |
| `expo.version` | `17.0.0` | `18.0.0` |
| `harpguru-expo-boilerplate` | `10.0.0` | `11.0.0` |
| root `package.json` | `4.0.0` | `4.1.0` |

The merge tags `v18.0.0`, builds it and submits to open testing.

Note the shape of this step: a branch containing nothing but a version bump and
cut changelogs. Because a new `expo.version` landing on `master` *is* the
release trigger, cutting a release and shipping it stop being two acts.
Ordinarily the bump rides along with the feature work; a release-only branch is
just the case where the work has already merged.

### Step 6 — clean up

- [ ] Delete this file
- [ ] Tick off the acceptance criteria below against real runs

## Decisions taken

Recorded because the reasoning is not recoverable from the diff.

**The no-op merge is a step, not an accident.** It was tempting to treat the
first `master` push carrying no release as unlucky timing. It is in fact the
only route to getting `workflow_dispatch` onto the default branch, so it is
step 3 rather than a thing to work around.

**The release check compares against the newest tag, not against tag
existence.** The original design said "no-op if a tag `v<version>` already
exists". Under that rule, rolling `expo.version` *back* to `16.0.0` matched an
existing tag and reported success, contradicting the acceptance criterion that a
non-greater version must fail. The check now treats equality with the newest tag
as the no-op and anything below it as an error.

**`submit.internal` extends `submit.production`.** The original sketch claimed
iOS needs no configuration to reach internal TestFlight. It needs the app
identity like any other submission, so extending keeps the three Apple
identifiers in one place.

**The Apple identifiers are committed.** `appleId`, `ascAppId` and `appleTeamId`
are public identifiers, not secrets. The actual secret is the App Store Connect
API key, which lives on EAS.

**No `environment` gate on the release job.** Merging to `master` tags and ships
with no approval click. If that is revisited, note that with the tag step inside
the `release` job, a required reviewer would gate the tag too; the tag step would
need splitting into its own job first.

**The local build scripts stay.** They now auto-submit to the same closed tracks
as CI, so a local build and a CI test build land in the same place. They remain
the documented fallback, and they are the only route available before step 3.

## Open judgement calls

**The `MAJOR:` prefixes in the app changelog drive the tag to `v18.0.0`.** Two
entries — `appVersionSource` flipping to remote, and the counters leaving
`app.json` — are marked `MAJOR:`, which under ComVer makes the next tag
`v18.0.0` rather than `v17.1.0`. These were written by an agent, not chosen by
the maintainer. The justification is house precedent: the v4.0.0 release marked
"Dev container runs as the `node` user rather than `root`" and "Workspace volume
renamed" as `MAJOR:`, and those are equally developer-tooling-only changes that
break an existing setup. Downgrading both to `MINOR:` is a two-line edit and
gives `v17.1.0`.

## Deferred

**A terminal wrapper for the test build.** Preferable to the Actions button, but
it needs `gh`, which is not in the devcontainer image; per the house pattern
tools are baked into the root `Dockerfile`, so adding it means a `buildimage.sh`
rebuild and a push to `jslog/devcontainer-*`. When that happens:

```jsonc
"test-build": "gh workflow run test-build.yml --ref $(git branch --show-current) -f platform=all"
```

Two traps to handle: `gh workflow run --ref <branch>` dispatches against the
**remote** branch, so unpushed commits silently build the wrong code — the
script must assert `HEAD` matches its upstream, or push first; and `--ref`
requires the workflow file to exist on that ref.

**`docs/git-hooks.md` describes a `pre-commit` hook that no longer exists.**
Only `pre-push` is present. Unrelated to this work, but spotted while wiring the
check in.

**The EAS GitHub integration** (`expo.dev/accounts/jslog/projects/harp-guru/github`)
connects the repo to the EAS project and can trigger builds on push, on pull
request, or on git tag creation. It is *not* an alternative to the release
workflow: it cannot create tags, only respond to them, and tagging the trunk
commit plus the version precondition is the substance of that workflow.

There is a coherent architecture in which Actions runs the check and creates
the tag, and the integration builds on tag creation — dropping `EXPO_TOKEN`
from the release path and tying the build to the tagged commit by
construction. Not taken, for three reasons: the "build on tag" feature is
**Build Triggers, which Expo has deprecated**; its replacement, EAS Workflows,
is a second CI system (`.eas/workflows/`) to maintain alongside Actions; and
release logic would be split across two places, so a failed release means
diagnosing both. Worth revisiting only if the Actions path proves troublesome.

**`eas-version: latest`** in both workflows is unpinned, so an eas-cli release
could change behaviour without a commit here. Pinning is the safer choice once
the pipeline has been proved.

## Acceptance criteria

None can be ticked until the roadmap has actually run. The check-script items
are verified locally but not yet in CI.

- [ ] A manually dispatched test build on any branch produces an Android and an
      iOS build and submits both to the closed testing tracks (Play `internal`,
      internal TestFlight), with no tag and no version change.
- [ ] A push to `master` whose `apps/harpguru-expo-boilerplate/app.json` carries
      an `expo.version` with no corresponding tag causes:
  - [ ] a tag `v<expo.version>` on the pushed commit,
  - [ ] an EAS production build for `--platform all` **of that same commit**,
  - [ ] submission of the Android artifact to the Play **open testing** track,
  - [ ] submission of the iOS artifact to App Store Connect, assigned to the
        external TestFlight group.
- [ ] A push to `master` that touches `app.json` without changing `expo.version`
      is a no-op reporting success. *(step 3 tests this)*
- [ ] A re-run or a force-push does not produce a second tag or a second release
      build.
- [ ] A push to `master` whose `expo.version` is not greater than the last tag
      fails **before** any build starts, naming the problem. *(verified locally)*
- [ ] A push to `master` whose `app.json` has reintroduced `ios.buildNumber` or
      `android.versionCode` fails, naming the field. *(verified locally)*
- [ ] Squash-merging a feature branch produces a correct release.
- [ ] No Apple or Google credentials are stored in the repository. *(met — only
      public identifiers are committed)*

## Out of scope

- The AWS (CDK / Step Functions / CodeBuild) rebuild of this pipeline.
- Promotion from open testing to production on either store.
- Automating `/cut-release` itself — CHANGELOG cutting, ComVer arithmetic and
  the dependency cascade all stay manual.
- Running tests, lint or `tsc` in CI. Worth doing, but separate from this work;
  the pre-push hooks cover it for now.
