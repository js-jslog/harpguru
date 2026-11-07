# Harp Guru AWS pathway

A plan to extend Harp Guru with a cloud backend and web surfaces, while using that work as
the study vehicle for three AWS certifications.

It exists because course videos are less engaging than real work on a product with real
users, and because a hobby project with no users pushing on it never teaches the
interesting failure modes. Harp Guru is live in both stores, so it does.

**Two goals, and they are held in tension deliberately.** Where they pull apart, this
document says which one wins.

---

## How to use this document

The expected pattern is that an agent takes **one phase** from the list below and produces
a granular plan for it. Before doing that, read:

1. This file, end to end. The decisions section matters more than the phase list — most
   plausible-looking proposals have already been considered and rejected for reasons that
   are not obvious from the code.
2. [`aws-pathway-findings.md`](aws-pathway-findings.md) — verified technical facts, the
   domain vocabulary, the tuning data model, and the repo conventions that constrain any
   change made here. Anything dated there should be re-verified before being relied on.

External resources:

- The app source: <https://github.com/js-jslog/harpguru> (this repo)
- The strategic discussion this came from, with fuller reasoning:
  <https://claude.ai/code/artifact/52b8a52b-8d3d-48a2-ad0c-8bd4db0dface>
- Container conventions: <https://github.com/js-jslog/devcontainer-aws-base>, particularly
  its `docs/aws-conventions.md`

**Status: Phase A has shipped**, and Phase B is being planned. The status tables in
`harpguru-cloud`'s [plans](https://github.com/js-jslog/harpguru-cloud/tree/master/docs/plans)
are the record of what has shipped and what is deployed. It is not repeated here, so it cannot
go stale here.

---

## The two goals

### Product

Harp Guru is a harmonica learning tool: a visual harp face showing which scale degree or
pitch each hole interaction produces, across 51 tunings, 12 keys, 12 pozitions and 23
scales, with an explore mode and a quiz mode. It is at v18.4.0, in the App Store and Play
Store, paid, with a supporting YouTube channel.

It has **no backend of any kind** — no accounts, no telemetry, no server state.

The extension we want, in priority order:

1. **Custom tunings.** More tunings is the single most requested feature. A tuning is a
   tiny document (see the findings doc), so the creator is a small build with a real
   audience.
2. **Shareable setups.** A teacher publishes a link or QR code carrying harp key, pozition,
   tuning and scale; a student opens it and lands in exactly the right configuration.
3. **A commercial thread.** **Ronnie Shellist**, a Hohner ambassador who advocates for Harp
   Guru, and **Hohner** itself, from promoting the PentaHarp. **Both contacts are real but
   old.** Ronnie's is the warmer of the two — the interaction was more direct — though a
   long time has passed there as well. Hohner is not a closed door; it is simply not an open
   one, and nothing here should be planned as though a warm introduction is waiting. The
   plan is built to give a sponsor something measurable, which is the thing sponsors are
   usually unable to get.

Hard product constraints:

- **The app must keep working perfectly with no account and no network.** Every cloud
  feature is opt-in and additive, so any phase can be abandoned without damaging the
  product.
- **Nothing may cannibalise the paid app.** This shapes the web strategy more than anything
  else — see the conclusions below.

### Learning

Certifications in order: **Solutions Architect Associate → Security Specialty → DevOps
Professional.**

Note this is not the order originally assumed. DevOps Engineer is AWS's _professional_ tier
and is generally the hardest of the three; Security is a _specialty_. The project also
produces security-relevant work early (account foundations, identity, KMS) and a mature
deployment story only late. There are no prerequisites between AWS certifications.

The syllabus is served by covering **three architectural shapes**, which is what SAA
actually tests:

| Shape                             | Where it appears |
| --------------------------------- | ---------------- |
| Static and edge delivery          | Phases A and B   |
| Request/response with a datastore | Phase C          |
| Asynchronous orchestration        | Phase C          |

The datastore shape moved from Phase B to Phase C on 2026-11-07, when setup links became
self-describing URLs; see "Settled since writing".

**Budget: 7 hours a week guaranteed, roughly 4 build and 3 study.** Hour figures below are
allocations against that, not estimates to be held to. Around 86 build hours to the end of
Phase D, which is the point to sit SAA.

---

## Repo and container topology

Two repos, two containers, one rule.

> **If it renders a harp face, it belongs in `harpguru`. Everything else belongs in
> `harpguru-cloud`.**

|                 | `harpguru` (this repo)                                  | `harpguru-cloud`                     |
| --------------- | ------------------------------------------------------- | ------------------------------------ |
| Container       | the existing one here                                   | fork of `devcontainer-aws-base`      |
| Toolchain       | Node, yarn, Expo, EAS                                   | AWS CLI, CDK, Terraform, JDK, Python |
| Holds           | the app, the domain packages, the widget, the workbench | CDK, the API, pipelines, analytics   |
| Must never gain | AWS tooling                                             | harmonica domain code                |

### Why the split, and why not a monorepo

The domain packages are **not published to npm and are awkward to publish** — unscoped
names, `UNLICENSED`, and `main` pointing at raw TypeScript with no build step (details in
the findings doc). Sharing them across repos would mean solving that first.

We do not need to. **The API treats a tuning as an opaque document** validated against a
JSON Schema — array lengths, integers in range. It never needs to know what a Paddy Richter
is. That is good architecture independently (dumb pipes, smart endpoints) and it means the
only shared artefact is a versioned JSON Schema, copied into both repos.

The alternative — adding AWS tooling to this container — would put roughly 2GB of CDK,
Terraform, kubectl and JDK into an image that exists to build a React Native app, and would
give an app repo the secrets posture of an infrastructure repo.

### Creating the `harpguru-cloud` fork

First task of Phase A. `devcontainer-aws-base` is built to be forked; its README carries
the canonical steps. In summary:

1. Clone `js-jslog/devcontainer-aws-base` and re-point it at a new repo. **The base is on
   `main`; this fork wants `master`**, to match `harpguru`, which it is worked on alongside.
   Rename before the first push — `git branch -m main master` — and set the default branch
   on GitHub. Doing it afterwards means a GitHub-side rename instead. Later forks of the
   base can stay on `main`: it is the current standard, and only this one has a reason to
   differ.
2. Change the image name in three places: the `image` prop in
   `.devcontainer/devcontainer.json`, the `docker pull` in `runcontainer.ps1`, and the
   `image` var in `buildimage.sh`.
3. Change the workspace volume name in two places: `workspaceMount` source in
   `.devcontainer/devcontainer.json`, and `$workspaceVolume` in `runcontainer.ps1`.
4. Decide whether the cache and credential volumes under `/home/dev` should be shared with
   the base container or separated. If separated, rename them in the `mounts` array **and**
   mirror the names into `runcontainer.ps1`'s `$homeVolumes` list, or `purge` will not find
   them. Sharing `~/.aws` is convenient; consider whether that is wanted.
   The docker-in-docker volume needs no attention — the feature names it after the
   devcontainer id, so a fork gets its own.
5. Build and push the first image manually, immediately:
   `docker build -t <user>/<image>:latest -f Dockerfile . && docker push ...`
   **The build context must be a git checkout** — the Dockerfile runs `git reset --hard` to
   restore symlinks, so a build in a directory with no `.git` fails.

### How the two connect

The widget and workbench are built here but deployed to AWS. **They are deployed by a
GitHub Actions workflow in this repo that assumes an IAM role via OIDC** — the role and the
OIDC provider are created by CDK over in `harpguru-cloud`. No AWS credentials and no AWS
tooling ever exist in this container.

That seam is deliberate and worth preserving: it is also the "no long-lived access keys
anywhere" story that the DevOps certificate cares about.

**Documents flow the other way.** The cloud container clones this repo to `/harpguru` —
deliberately outside its own `/app` workspace — so that an agent working there can read the
roadmap from a working tree and commit findings back to this repo rather than writing them
up locally. That is a checkout, not a dependency: no domain code is built or consumed over
there, and the seam above is untouched. The orientation file carries the details, including
why markdown-only pushes from that container skip the pre-push hook.

### Where the new code goes in this repo

The widget (Phase B) and the workbench (Phase C) are **new workspaces under `apps/`**,
siblings of `harpguru-expo-boilerplate`. They are applications that consume the packages,
not packages themselves. `workspaces` is already `["apps/*", "packages/*"]`, so they are
picked up automatically — but see the repo conventions in the findings doc, because the
root `test` script does **not** pick them up automatically.

**There is a blocker in front of both of them.** `harpguru-core` exports exactly one thing:

```ts
// packages/harpguru-core/src/components/index.ts
export { HarpGuru } from './harp-guru'
```

The entire component tree — `HarpFace`, `HarpFaceFragment`, `HarpRow`, `HarpCell` — is
private. A widget cannot reuse the harp face without `harpguru-core` first exporting it, and
that export is a prerequisite task, not a detail.

**And the components are coupled to app-wide state.** `HarpCell` reads directly from the
zustand store (`useHarpGuruStore((state) => state.activeDisplayMode)`), and that store is a
single object of 26 fields covering everything the app does — quiz degrees, page number,
fragmentation, column bounds, layout facts, size schemes. Rendering one cell therefore
requires a fully populated store, not a set of props.

**Settled 2026-09-23. The widget drives the whole store, and `harpguru-core` exposes the
harp face as one composed component.** The evidence is in the findings doc; the reasoning:

- **Drive the whole store.** Create a store instance, set the fixed tuning, expose only key
  and pozition, and leave the quiz and paging state at defaults where it is simply never
  read. The app already runs two independent stores side by side, the harp face reads only
  13 of the store's 26 fields, and `CallbackOnSourceGlobalProps` already derives all of them
  from `activeHarpStrata`.
- **Not props.** Only 13 files in the tree touch the store — but prop-drilling those fields
  would thread props through all 49. The refactor stays rejected on that arithmetic. The
  "26-plus component files" figure previously written here was the Reanimated file count and
  never belonged to this question.
- **One composed component, not a handful of named exports.** A widget needs a bundle: the
  provider, the derivation component, the harp face, and the resize behaviour that
  `harp-guru.tsx` currently holds in a discarded `useWindowDimensions()` call. Four named
  exports plus a note saying "and do not forget the resize line" is precisely how that line
  gets left out. One component cannot be assembled wrongly, and it keeps the public surface
  at two exports rather than five.

### Which container per phase

| Phase                    | `harpguru`                                                  | `harpguru-cloud`                                  |
| ------------------------ | ----------------------------------------------------------- | ------------------------------------------------- |
| A — Ground the domain    | the browser spike                                           | everything else                                   |
| B — The public harpface  | widget, tuning pages, share button, deep-link config        | CloudFront routing, deploy role, request logs     |
| C — The tuning workbench | creator UI, `TuningIds` widening                            | API, DynamoDB, schema, validation, Step Functions |
| D — Demand signal        | telemetry emission in the app                               | ingestion, Athena, reporting                      |
| E — Verified publishers  | —                                                           | Cognito, publisher console                        |
| F — Harden and migrate   | —                                                           | everything                                        |

The publisher console in Phase E renders no harp face, so it lives in `harpguru-cloud`.
Where it needs to preview a tuning it should embed the widget by iframe — which has the
pleasant side effect of dogfooding the embed before a partner sees it.

---

## Decisions, and why

### Non-obvious conclusions

These reframed the problem and are the reason the plan looks as it does. They are not
recoverable from the code.

**The web version does not compete with the app, because it does a different job.** The app
is a practice tool: drag-heavy, mobile, landscape, paid. Authoring a tuning is form-heavy,
fiddly and genuinely better with a keyboard and a large screen. So the web _authors_ and
the app _practises_. This is what makes a free web presence safe, and it is why we are not
shipping "Harp Guru in a browser" even though Expo makes that nearly free.

**The widget, the canonical tuning pages and the QR-code fallback are the same component.**
One small UI, three routes, differing only in surrounding chrome — promotional on
harpguru.com, minimal and attributed inside a partner's iframe.

**A setup link should fall back to the widget, not to a store page.** Someone scanning on a
laptop has no app to install; someone on a phone would rather see the lesson than a
purchase prompt. Giving the value first means the call to action lands warm — and it
ungates link opens from installs, so the attribution numbers later count a creator's whole
audience rather than the already-converted fraction. (Since 2026-11-07 a setup link is a
self-describing URL: the numbers count setups, and telling one creator's links from
another's waits for Phase E's creator tag.)

**A browsable gallery is an emergent feature, not a build.** It is worthless until there
are community tunings to browse. What is worth building now is the canonical page per
tuning; the index is a list added later.

**Anonymous aggregate analytics are a commercial product, and they need no accounts.**
Hohner can see what they sell; nobody can currently see what people _practise_. Which
tunings, keys and pozitions are studied — and once the workbench lands, which tunings
people _invent_ — is genuine R&D signal for a manufacturer whose PentaHarp is itself a
novel-tuning product. Because it is anonymous and unlinkable, the regulatory burden is a
privacy-label declaration rather than a compliance programme.

**Identity is for partners, not for the audience.** A closed set of perhaps a dozen
invited, hand-approved publishers can be held to MFA and needs no self-service signup —
which removes password-reset abuse, bot signups, verification at scale and deletion volume,
while keeping federation, claims, delegated administration and audit. Those are the
examinable parts, and the tedious parts are the ones we skip.

**Provenance is the reason publishers exist at all.** Named tunings have living inventors —
Brendan Power, Lee Oskar, Will Wilde. An anonymous document cannot credibly hold a name, so
without verification a public gallery misinforms learners and irritates people whose
goodwill is worth keeping.

### Locked decisions

Reopen only with a specific new reason, and say what it is.

- **No login in the app, ever.** The app performs unauthenticated reads only. This keeps
  Apple guideline 4.8 (Sign in with Apple) and 5.1.1(v) (in-app account deletion)
  permanently untriggered — a permanent exemption, not a temporary dodge. Identity, when it
  arrives, is web-only.
- **The widget's scope is frozen.** One tuning per instance. No quiz mode, no multiple pages,
  no tuning picker, no saved state. Feature creep here is the one thing that would genuinely
  cannibalise the paid app. **Configuration and cell interaction never share a page**
  (settled 2026-11-07):

  | Page | Configuration | Cell interaction | Scale flash |
  | --- | --- | --- | --- |
  | `/s/` setup link | none: fixed by the teacher's URL | yes | yes |
  | `/t/<tuning>` | a short list of keys, pozitions, display modes and scales | no | no |
  | `/e/` embed | none: fixed by the partner's URL | yes | yes |

  Every page is public, so withholding a control is only worth doing for the page's own
  purpose: what anyone can reach is the union of all three. A lesson with several setups is
  several links; a partner showing several is several embeds. Hand-editing a URL to reach
  any setup with interactive cells is accepted, not guarded: whoever does it is invested.
- **No audio processing.** Descoped by product philosophy: Harp Guru identifies the note a
  player is aiming for, and a dedicated tuner is more direct for hitting it. Recording and
  analysing a lick is product drift. The asynchronous architecture it would have taught
  comes from the publication pipeline instead — the pillar was about _shape_, not audio.
- **No mobile release pipeline.** Store delivery is mostly an EAS concern rather than an
  AWS one, and every DevOps surface it would teach arrives via the API and site deploys.
- **Do not publish the domain packages to npm.** Hours of non-AWS work for a dependency the
  architecture does not need.
- **Java arrives as a migration, never as a first implementation.** The API ships in
  TypeScript and is rewritten onto Fargate behind an unchanged contract in Phase F. Never
  duplicate logic to manufacture a Java opportunity — AWS matters more than Java here.
- **Terraform is for deliberate labs only.** CDK is primary: CloudFormation is examinable
  and holds state server-side, which matters in a disposable container. Never build the
  same thing twice.

---

## Phases

Each ships something a real user can touch.

### Phase A — Ground the domain · ~14 hrs · mostly `harpguru-cloud`

Ships: harpguru.com serving a real site over HTTPS.

- **Spike first (~1 hr, in this repo) — done 2026-09-23, and it passed.** The harp face
  renders well in a desktop browser and cells respond to the mouse. Menu scrolling does not
  work, which is outside the widget's scope; the findings doc records the mechanism and
  what it means for Phase C.
- Create the `harpguru-cloud` fork (steps above).
- Second AWS account under Organizations; SCPs; org CloudTrail; Config; GuardDuty.
- **Budget alarm before the first deploy.**
- `cdk bootstrap` in `eu-west-2`, and for the workload account also in `us-east-1`, where the
  certificate stack has to live.
- Route 53 hosted zone for harpguru.com, then repoint the nameservers at Heart Internet.
  **Delegate, do not transfer** — registration can stay where it is. The domain is parked on
  `79.170.40.4` with no HTTPS, so no website can break. **Mail is live, though:**
  `contact@harpguru.com` forwards through Heart, so its `MX` and `mail` records go into the
  new zone before the nameservers move. See the findings doc.
- ACM certificate **in us-east-1** — a CloudFront requirement regardless of where
  everything else lives.
- S3 + CloudFront with OAC; security headers via a **response headers policy**, not
  CloudFront Functions. Fixed headers are configuration: there is nothing to test and no
  per-request charge. Functions are kept for logic that depends on the request, such as the
  `www` → apex redirect here and the geo-aware links in Phase D. Settled 2026-09-26. The
  earlier wording predated response headers policies, which arrived in late 2021.
- Landing page: store links, YouTube channel.
- `/.well-known/apple-app-site-association` and `/.well-known/assetlinks.json`, served as
  JSON over HTTPS with **no redirects**. Universal Links and Android App Links both require
  this, so **nothing in Phase B works without it**.

AWS: S3 · CloudFront · OAC · Response headers policies · CloudFront Functions · Route 53 · ACM · CDK · Organizations · CloudTrail · Config · Budgets · IAM

### Phase B — The public harpface · ~30 hrs · both repos

Ships: a live, configured harp face anyone can open from a QR code.

A **new, deliberately small UI** — not the app on the web.

In this repo (a new `apps/` workspace — see "Where the new code goes"):

- **Prerequisite:** export the harp face component tree from `harpguru-core`, and settle the
  store question. Both are described in the topology section and both block everything else
  in this phase.
- The widget, in the three page types of the frozen-scope table under "Locked decisions":
  interactive cells and the scale flash on `/s/` and `/e/`, configuration controls on `/t/`.
  On `/t/`, playing key is **derived output, not a third control** — move harp key or
  pozition and the other holds. `harpcovariance` already computes this; the UI is new.
- **The URL is the page's state, on all three.** One parameter format, read by the bundle
  after load; changing a `/t/` control rewrites the address bar without a reload, so every
  view can be shared. Validation differs: `/s/` and `/e/` accept any real setup, `/t/` only
  the options its controls offer, and a bad parameter falls back to that control's default
  and corrects the address bar rather than failing.
- **Shared URLs are a permanent contract.** QR codes get printed. Tuning identifiers need
  stable slugs (`TuningIds` values are display strings such as `'Major diatonic'`), the format
  must leave room for Phase C's custom tunings, and `/t/`'s option lists may only grow.
- Click-to-toggle rather than drag: a different input model from the app's, and simpler.
- Responsive sizing into an iframe of unknown width. A harp face is 10–16 holes wide and a
  partner's sidebar may be 320px. The app's existing zoom option suggests this problem is
  already familiar. **Know the mechanism before touching it:** resize response comes
  entirely from a discarded `useWindowDimensions()` call in `harp-guru.tsx`, which the
  composed harp face component has to reproduce or the widget will size once on mount and
  never again.
- **Trim the bundle.** 4 MB of the 6.2 MB web export is `@expo/vector-icons` fonts. An
  embed that drops megabytes onto a partner's product page will not stay on it.
- Two chrome variants: promotional on harpguru.com, minimal and attributed in an embed.
  Hohner will not host a buy-the-app call to action on their own product page.
- Generate a canonical page for each of the 51 built-in tunings. **One page per tuning, not
  per permutation** — 51 tunings × 12 keys × 12 pozitions × 23 scales is over 160,000
  near-identical pages, which is textbook doorway spam and gets penalised. Key and pozition
  change client-side, as query parameters, and each page declares the bare `/t/<tuning>` as
  its canonical URL. `/s/` and `/e/` are kept out of the index.
- **A share button in the app**: it builds the `/s/` URL for the setup on screen and draws
  its QR code on the device. No network, no account, no write.
- **Deep-link configuration** (`associatedDomains`, intent filters) and **opening a link,
  app first**: when the app is installed, a `/s/` link opens it, and the app asks where the
  setup goes — harp face 1, harp face 2, or open in the browser. A lesson of several setups
  may work better as browser tabs; the user with the app must never be worse off than the
  one without. "Open in the browser" re-opens the URL with a marker the link rules exclude.
- **The app validates every incoming URL.** Anyone's QR code now drives the app's state; a
  malformed or hostile link is refused cleanly, and never crashes the app or corrupts a harp
  face.

In `harpguru-cloud`:

- One CloudFront distribution, several behaviours: apex to marketing, `/t/*` to tuning
  pages, `/e/*` to embeds, `/s/*` to setup links. Cheaper than several distributions,
  and behaviour ordering is examinable. The pages come from a second bucket that this repo's
  workflow deploys to, so the site's own upload can never prune them. The cache key ignores
  query strings: one cached copy per page, whatever it is configured to show.
- A `frame-ancestors` response headers policy restricting embeds to a partner allowlist —
  a genuine security control rather than a contrived one. `/t/` and `/s/` refuse framing.
- Request logs. Every browser view's configuration is in its URL, so the logs count which
  setups and tunings are opened, and embeds per partner, without a datastore.
- The GitHub OIDC provider and the deploy role this repo's workflow assumes (see "How the
  two connect").
- The `/s/*` rule in `apple-app-site-association` gains the exclusion for the open-in-browser
  marker.

Nothing is dynamic at request time: prerendered HTML plus a client bundle. No server
participates in a page view, and there is no setup datastore: a setup link is a
self-describing URL (settled 2026-11-07).

AWS: S3 · CloudFront behaviours · Cache policies · Response headers policies · CloudFront Functions · CloudFront logging · IAM OIDC federation

### Phase C — The tuning workbench · ~24 hrs · both repos

Ships: the most requested feature.

- **Widen the `TuningIds` identifier first.** See the findings doc — this is the one real
  app-side refactor and everything downstream depends on it.
- Creator UI, reusing `harpparts` and the existing `is-hole-valid` and
  `get-hole-array-error-messages` helpers. The hard validation logic is already written.
- Versioned JSON Schema for the tuning document; validation in the API. **This is where the
  request/response-with-a-datastore shape lands**: tuning documents are stored in DynamoDB
  behind API Gateway. It is also the first public, anonymous write, so WAF and throttling
  arrive here.
- Publication pipeline in Step Functions: submit → validate → **hold on `waitForTaskToken`**
  for approval → render a preview card → regenerate affected pages → invalidate the CDN.
  A workflow paused on human latency bills nothing while it waits, and the alternative is a
  hand-rolled status column plus a poller.
- Ownership without accounts: an edit token in browser local storage. No identity
  infrastructure at this stage.
- Publishing targets the read surfaces built in Phase B; nothing new is designed here.

AWS: API Gateway · DynamoDB · WAF · Step Functions · EventBridge · S3 events · SQS + DLQ · Lambda · CloudFront invalidation

### Phase D — Anonymous demand signal · ~18 hrs · mostly `harpguru-cloud`

Ships: a monthly report worth putting in front of Hohner. **Sit SAA around here.**

- Opt-in, aggregate, unlinkable telemetry: which tunings, keys and pozitions are studied;
  which setup links are opened and where; which tunings people invent.
- Firehose → S3 → Glue → Athena. Batch, not streaming — the cheap shape and the right one.
- Monthly report generation on a schedule, delivered by SES.
- Geo-aware Hohner affiliate links: **CloudFront Functions**, not Lambda@Edge, using the
  `CloudFront-Viewer-Country` header. Faster, and a fraction of the cost.
- Privacy-label declaration and privacy policy copy.

AWS: Kinesis Firehose · S3 · Glue · Athena · QuickSight · EventBridge Scheduler · SES

### Phase E — Verified publishers · ~16 hrs · `harpguru-cloud`

Ships: a console Hohner and Ronnie can log into.

- Cognito user pool, **invitation only, no self-service signup**, MFA mandatory.
- Groups and claims; pre-token-generation Lambda.
- **Federate a partner IdP** — Hohner almost certainly run Microsoft 365 — over SAML or
  OIDC. The standout exercise: a real B2B pattern that cannot be practised convincingly on
  a toy project, because it needs a genuine second organisation.
- Application-level authorization. "Hohner may edit tunings owned by Hohner" is not
  expressible in an IAM policy; consider Verified Permissions / Cedar.
- Publisher dashboard: setup-link opens, geography, tunings studied. **The same data serves
  Hohner's attribution and Ronnie's motivation** — one feature, two audiences. A
  self-describing URL says what was shared, not who shared it, so counting a publisher's own
  links needs an optional creator tag in the URL, added here; links without one keep working.
- Audit log of who published what, when.

The app learns nothing from this beyond a `verified` boolean on a fetched document.

AWS: Cognito · SAML/OIDC federation · JWT authorizers · KMS · Verified Permissions

### Phase F — Harden and migrate · ~25 hrs+ · `harpguru-cloud`

Ships: nothing user-visible. Exists for the DevOps certificate and for operational
confidence in a system partners now depend on.

- Rewrite the tunings API in **Java on ECS Fargate** behind an unchanged contract; blue/green
  cutover; delete the Lambda version. Java exposure, VPC design and a real rollback story,
  with the existing tests as the safety net and zero duplicated logic.
- **Design the VPC NAT-free**, using interface endpoints. Simultaneously the largest cost
  saving available and a design decision the exam asks about.
- GitHub Actions federated to IAM via OIDC for `harpguru-cloud`'s own deploys. The provider
  arrives in Phase B, for this repo's widget deploys.
- X-Ray end to end; CloudWatch dashboards and alarms; Logs Insights.
- CodePipeline / CodeDeploy with canary deployment.

AWS: CodePipeline · GitHub OIDC · ECS Fargate · ALB · VPC endpoints · X-Ray · CloudWatch · Config

---

## Off the critical path

Cheap, high value, deliberately unscheduled. Drop into any blocked week.

- **Well-Architected Review** of the live workload. The AWS tool is free, it takes an
  evening, it is directly SAA-relevant, and it produces something to talk about. Best after
  Phase C, when there is enough system to review.
- **DR drill** — redeploy into a second region from IaC and backups, verify it serves, tear
  it down the same day. The best story in an architecture interview.
- **Public domain API** — a thin Lambda over the harp-matrix logic with API Gateway usage
  plans, keys and caching. Useful to other harmonica tool builders; nothing is rewritten.
- **Terraform labs** — EKS, Transit Gateway, multi-region. Things the product will never
  need. Same-day teardown.

## Where the money leaks

Everything through Phase D should sit in low single-digit pounds per month.

| Service           | Why it bites                                                                                                                |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------- |
| NAT Gateway       | ~£25/mo. Only relevant from Phase F. Design around it with VPC interface endpoints from the start rather than retrofitting. |
| EKS control plane | ~£60/mo. Labs only, same-day teardown.                                                                                      |
| OpenSearch        | The obvious-looking answer once there are tunings to browse, and the wrong one at this scale. Use a static index or Athena. |
| QuickSight        | Per-author monthly pricing that does not stop when you stop looking. Consider a rendered report before a live dashboard.    |

Also: **`runcontainer.ps1 destructive` and `purge` destroy the workspace volume**, taking
local Terraform state with it and orphaning paid resources. Destroy infrastructure first,
or use an S3 backend. CDK is safe here because CloudFormation holds state server-side.

## Partner strategy

**Ronnie before Hohner, because his is the warmer of two cold contacts.** He is an advocate,
the interaction was direct, and the conversation costs nothing to restart. Hohner is colder
— not closed, but far enough back that a pitch arriving on its own would be starting from
nothing. Arriving with their own ambassador as the reference case is a different proposition
entirely.

**The setup link is what gets shown to him.** If the feature lands with Ronnie, the argument
to Hohner follows from it: a harp face that demonstrates a novel tuning in two seconds is a
manufacturer's problem solved, and their ambassador using it is the evidence. Other routes
to Hohner may exist, but this is the primary one and the plan should be sequenced as though
it is the only one.

When that message goes out, lead with what he gets rather than what we get: because a setup
link falls back to a working harp face rather than a store page, **his links work for his
whole audience** — desktop viewers, and people who have never installed the app. He is not
handing students an advert. That the attribution numbers then count his entire reach is the
part that matters to us, and it lands better as a consequence than as the pitch. Counting
*his* links apart from everyone else's needs Phase E's creator tag; until then the numbers
are for setups, not people.

**Approach Hohner during Phase D, with a report in hand rather than an idea.** An idea asks
them to imagine something; a working feature with three months of numbers asks them to make
a decision, which is far easier to get. There is no live introduction here to spend
carelessly — there is a lapsed one to revive, and reviving it through Ronnie is worth more
than reviving it cold. A premature approach spends the chance of doing it the better way.

## Open questions

- Should the `harpguru-cloud` fork share the `~/.aws` credential volume with
  `devcontainer-aws-base`, or have its own? **Taken as separate when the fork was created
  on 2026-09-25**, on the default this question recorded: isolation is the cheaper mistake
  to undo, since separating later means untangling credentials while sharing later is a
  volume rename. Verified empty in the new container, so the rename took.

  It stays here rather than moving to the settled list, because it was answered by a
  default rather than by knowing. The reason it was open — that it needs more AWS
  familiarity than existed — still holds, and once SSO sessions are a daily reality the
  convenience of sharing may turn out to be worth having. Revisit with a reason, not in
  passing.

- **Should the app hold more than two harp faces?** Raised 2026-11-07. A lesson of several
  setups works better in browser tabs than in an app that shuffles through two, and the
  user with the app should never be worse off. The store is already one instance per harp
  face, so three or more is mostly a UI question: shuffling through stops scaling past two.
  Not a Phase B blocker, since the open-in-browser choice covers the lesson case, but the
  harp-face picker that opens a link should be built to list any number.

### Settled since writing

- **Where does this roadmap live once `harpguru-cloud` exists?** Here, canonically, and
  nowhere else. `harpguru-cloud` carries a short orientation file pointing at the public
  GitHub URL rather than a copy. Two copies of a directing document drift, and the loser is
  whichever reader does not know theirs is stale. It also removes any need to copy findings
  back: work done in the cloud repo that establishes a fact commits that fact *here*, to the
  findings doc, where there is one history to check. This is consistent with the repo split
  — `harpguru-cloud` holds no domain content, and the roadmap is about the product.
  Settled 2026-09-23.
- **Is the Hohner relationship warm enough to act on in roughly six months?** No. Both
  contacts have gone cold with time — Hohner more so than Ronnie, whose interaction was more
  direct. Neither is a closed door, but the plan previously described an *existing*
  relationship with Hohner, which overstated it; that is corrected at source in "The two
  goals" and in the partner strategy. Ronnie is the entry point, the setup-link feature is
  what gets shown to him, and the manufacture-and-brand argument to Hohner follows from his
  response. Settled 2026-09-23.
- **Does the widget need a scale selector?** No, and the frozen scope stands. But a setup
  link carries a scale, so the widget must show the one it is handed: a flash and the
  scale's name is sufficient. Display, never a control — and `notify-of-scale` and
  `notification-flash` already exist in `harpguru-core`, so this is reuse rather than new
  UI. Settled 2026-09-23.
- **Does the widget drive the full `harpguru-core` store, or do the harp face components get
  decoupled to take props? And how should the harp face be exposed?** The store, and as one
  composed component. This was the largest single risk to Phase B's estimate, and the
  verification retired it: the app already runs independent store instances, the harp face
  reads 13 of 26 fields and writes one, and the derivation from `activeHarpStrata` is
  already a component. Settled 2026-09-23; the reasoning is under "Where the new code goes"
  and the evidence in the findings doc.
- **Does the harp face look right in a browser, and do the gestures work under a mouse?**
  Yes to both. This was the last thing that could have invalidated Phases B and C, and it
  did not. The spike ran on
  2026-09-23 against `master` at `bafbd03e`: the harp face renders well and cells respond
  to clicks. The one failure — menu scrolling — is outside the widget's frozen scope. See
  the findings doc for the mechanism.
- **Does a new `apps/` workspace need its own release cadence and CHANGELOG?** Not for
  versioning. The premise this was asked under — that every package moves together at a
  tag, by hand — no longer holds. `/cut-release` does the arithmetic across the monorepo
  and merging a new `expo.version` to `master` does the tagging, so a new workspace joins
  the existing cadence at no extra cost. **Deployment is a separate question and stays
  open:** the release workflow reacts to `expo.version` and drives store submission only,
  so what triggers a widget deploy is a Phase B design decision rather than a
  release-process one. Settled 2026-09-22; see `docs/release-pipeline.md`.
- **How does a teacher make a setup link, and does it need a datastore?** In the app, with
  a share button, and no datastore: **a setup link is a self-describing URL**, built and
  drawn as a QR code on the device. Neither the roadmap nor the original discussion had said
  where links were made; Phase B listed only a fetch client. Teachers' experience is central
  to the product, so creation has to be free of friction, and identity remains for partners
  only. Short codes in DynamoDB were weighed and dropped. What they would have added: a
  count of opens inside the app, which would cost a network round trip on every open and is
  Phase D's opt-in telemetry's job; telling teachers apart, which an optional creator tag
  does in Phase E; and a smaller QR code, which is negligible. What dropping them gains: the
  app never writes, so "unauthenticated reads only" holds untouched; links work offline; and
  Phase B has no public write to defend, so WAF and the datastore move to Phase C, where
  tuning documents need both. Settled 2026-11-07, with the user.
- **Which page gets which controls?** Configuration and cell interaction never share a page;
  the table is under "Locked decisions". Every page is public, so a control withheld from one
  page but present on another protects nothing: a control is withheld only where it does not
  serve the page's purpose. Hand-edited URLs are accepted rather than obfuscated against.
  `/t/` validates its parameters against its own short option lists, so its URLs can be shared
  for conversations about tunings without becoming a way round its limits. Settled
  2026-11-07, with the user.
- **What happens when a setup link is opened on a phone with the app?** The app opens and
  asks where the setup goes: harp face 1, harp face 2, or the browser. App first, rather than
  a web page offering an "open in the app" button, because a page cannot tell whether the
  app is installed and iOS will not open an app from a link to the page's own domain. Settled
  2026-11-07, with the user. Excluding the open-in-browser marker from Android's link rules
  by query parameter is unverified; a path marker is the fallback.
