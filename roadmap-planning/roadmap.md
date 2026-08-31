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

**Status: nothing built yet.** Phase A not started.

---

## The two goals

### Product

Harp Guru is a harmonica learning tool: a visual harp face showing which scale degree or
pitch each hole interaction produces, across 47 tunings, 12 keys, 12 pozitions and 23
scales, with an explore mode and a quiz mode. It is at v16.0.0, in the App Store and Play
Store, paid, with a supporting YouTube channel.

It has **no backend of any kind** — no accounts, no telemetry, no server state.

The extension we want, in priority order:

1. **Custom tunings.** More tunings is the single most requested feature. A tuning is a
   tiny document (see the findings doc), so the creator is a small build with a real
   audience.
2. **Shareable setups.** A teacher publishes a link or QR code carrying harp key, pozition,
   tuning and scale; a student opens it and lands in exactly the right configuration.
3. **A commercial thread.** There is an existing relationship with **Hohner** (from
   promoting the PentaHarp) and their ambassador **Ronnie Shellist**, who advocates for
   Harp Guru. The plan is built to give them something measurable, which is the thing
   sponsors are usually unable to get.

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
| Request/response with a datastore | Phase B          |
| Asynchronous orchestration        | Phase C          |

**Budget: 7 hours a week guaranteed, roughly 4 build and 3 study.** Hour figures below are
allocations against that, not estimates to be held to. Around 86 build hours to the end of
Phase D, which is the point to sit SAA.

---

## Repo and container topology

Two repos, two containers, one rule.

> **If it renders a harp face, it belongs in `harpguru`. Everything else belongs in
> `harpguru-cloud`.**

|                 | `harpguru` (this repo)                                  | `harpguru-cloud` (to be created)     |
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

1. Clone `js-jslog/devcontainer-aws-base` and re-point it at a new repo.
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
single object of 27 fields covering everything the app does — quiz degrees, page number,
fragmentation, column bounds, layout facts, size schemes. Rendering one cell therefore
requires a fully populated store, not a set of props.

Two ways through, and this should be settled before Phase B is planned in detail:

- **Drive the whole store from the widget.** Create a store instance, set the fixed tuning,
  expose only key and pozition, and leave the quiz and paging state at defaults where it is
  simply never read. Cheap, and keeps one source of truth. `createHarpGuruStore`,
  `StoreProvider` and `useHarpGuruStore` are already exported from
  `harpguru-core/src/store`, and `getInitialGlobalState` already builds the initial state.
- **Decouple the components to take props.** Cleaner, and better for an embeddable widget,
  but it is a refactor across 26-plus component files and would put the Phase B estimate at
  serious risk.

The first is almost certainly right for Phase B. The second is only worth considering if
the widget turns out to need genuine isolation from app concepts.

### Which container per phase

| Phase                    | `harpguru`                             | `harpguru-cloud`                   |
| ------------------------ | -------------------------------------- | ---------------------------------- |
| A — Ground the domain    | the browser spike                      | everything else                    |
| B — The public harpface  | widget, tuning pages, deep-link config | API, DynamoDB, CloudFront, routing |
| C — The tuning workbench | creator UI, `TuningIds` widening       | schema, validation, Step Functions |
| D — Demand signal        | telemetry emission in the app          | ingestion, Athena, reporting       |
| E — Verified publishers  | —                                      | Cognito, publisher console         |
| F — Harden and migrate   | —                                      | everything                         |

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
audience rather than the already-converted fraction.

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
- **The widget's scope is frozen.** One tuning, a few keys and pozitions, cell selection.
  No quiz mode, no multiple pages, no tuning picker, no saved state. Feature creep here is
  the one thing that would genuinely cannibalise the paid app.
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

- **Spike first (~1 hr, in this repo):** serve the existing web export and look at a harp
  face in a browser. It bundles cleanly; what is unverified is layout and mouse-driven
  gestures. Everything in B and C assumes this is acceptable.
- Create the `harpguru-cloud` fork (steps above).
- Second AWS account under Organizations; SCPs; org CloudTrail; Config; GuardDuty.
- **Budget alarm before the first deploy.**
- `cdk bootstrap` in `eu-west-2`.
- Route 53 hosted zone for harpguru.com, then repoint the nameservers at Heart Internet.
  **Delegate, do not transfer** — registration can stay where it is. The domain is parked on
  `79.170.40.4` with no HTTPS, so nothing live can break.
- ACM certificate **in us-east-1** — a CloudFront requirement regardless of where
  everything else lives.
- S3 + CloudFront with OAC; security headers via CloudFront Functions.
- Landing page: store links, YouTube channel.
- `/.well-known/apple-app-site-association` and `/.well-known/assetlinks.json`, served as
  JSON over HTTPS with **no redirects**. Universal Links and Android App Links both require
  this, so **nothing in Phase B works without it**.

AWS: S3 · CloudFront · OAC · Route 53 · ACM · CDK · Organizations · CloudTrail · Config · Budgets · IAM

### Phase B — The public harpface · ~30 hrs · both repos

Ships: a live, configured harp face anyone can open from a QR code.

A **new, deliberately small UI** — not the app on the web.

In this repo (a new `apps/` workspace — see "Where the new code goes"):

- **Prerequisite:** export the harp face component tree from `harpguru-core`, and settle the
  store question. Both are described in the topology section and both block everything else
  in this phase.
- The widget: fixed tuning, a short list of keys and pozitions, click-to-toggle cells.
  Playing key is **derived output, not a third control** — move harp key or pozition and the
  other holds. `harpcovariance` already computes this; the UI is new.
- Click-to-toggle rather than drag: a different input model from the app's, and simpler.
- Responsive sizing into an iframe of unknown width. A harp face is 10–16 holes wide and a
  partner's sidebar may be 320px. The app's existing zoom option suggests this problem is
  already familiar.
- **Trim the bundle.** 4 MB of the 6.2 MB web export is `@expo/vector-icons` fonts. An
  embed that drops megabytes onto a partner's product page will not stay on it.
- Two chrome variants: promotional on harpguru.com, minimal and attributed in an embed.
  Hohner will not host a buy-the-app call to action on their own product page.
- Generate a canonical page for each of the 47 built-in tunings. **One page per tuning, not
  per permutation** — 47 tunings × 12 keys × 12 pozitions × 23 scales is over 150,000
  near-identical pages, which is textbook doorway spam and gets penalised. Key and pozition
  change client-side.
- Deep-link configuration (`associatedDomains`, intent filters) and a fetch client for
  setup documents.

In `harpguru-cloud`:

- Setup-link documents → short code, DynamoDB behind API Gateway.
- One CloudFront distribution, several behaviours: apex to marketing, `/t/*` to tuning
  pages, `/e/*` to embeds, `/s/*` to the link resolver. Cheaper than several distributions,
  and behaviour ordering is examinable.
- A `frame-ancestors` response headers policy restricting embeds to a partner allowlist —
  a genuine security control rather than a contrived one, and per-partner embed counts fall
  out of the same request logs.

Nothing is dynamic at request time: prerendered HTML plus a client bundle. No server
participates in a page view.

AWS: API Gateway · Lambda · DynamoDB · CloudFront behaviours · Response headers policies · WAF

### Phase C — The tuning workbench · ~24 hrs · both repos

Ships: the most requested feature.

- **Widen the `TuningIds` identifier first.** See the findings doc — this is the one real
  app-side refactor and everything downstream depends on it.
- Creator UI, reusing `harpparts` and the existing `is-hole-valid` and
  `get-hole-array-error-messages` helpers. The hard validation logic is already written.
- Versioned JSON Schema for the tuning document; validation in the API.
- Publication pipeline in Step Functions: submit → validate → **hold on `waitForTaskToken`**
  for approval → render a preview card → regenerate affected pages → invalidate the CDN.
  A workflow paused on human latency bills nothing while it waits, and the alternative is a
  hand-rolled status column plus a poller.
- Ownership without accounts: an edit token in browser local storage. No identity
  infrastructure at this stage.
- Publishing targets the read surfaces built in Phase B; nothing new is designed here.

AWS: Step Functions · EventBridge · S3 events · SQS + DLQ · Lambda · CloudFront invalidation

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
  Hohner's attribution and Ronnie's motivation** — one feature, two audiences.
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
- GitHub Actions federated to IAM via OIDC.
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

**Ronnie before Hohner.** He is already an advocate, the conversation costs nothing, and a
Hohner pitch arriving with their own ambassador as the reference case is a fundamentally
different proposition to one arriving with a prototype.

When that message goes out, lead with what he gets rather than what we get: because a setup
link falls back to a working harp face rather than a store page, **his links work for his
whole audience** — desktop viewers, and people who have never installed the app. He is not
handing students an advert. That the attribution numbers then count his entire reach is the
part that matters to us, and it lands better as a consequence than as the pitch.

**Approach Hohner during Phase D, with a report in hand rather than an idea.** An idea asks
them to imagine something; a working feature with three months of numbers asks them to make
a decision, which is far easier to get. Warm introductions have a limited re-approach
budget and a premature pitch spends it. If the relationship needs keeping alive sooner, a
note that asks for nothing — "here is what I have been building, thought you would want
early sight" — is a different act from a pitch.

## Open questions

- Does the harp face actually _look_ right in a browser, and do the gestures work under a
  mouse? Phase A spike answers this.
- Is the Hohner relationship warm enough to act on in roughly six months, or does it need a
  low-cost holding note sooner?
- Does the widget need a scale selector, or is that already scope creep against the frozen
  scope?
- Should the `harpguru-cloud` fork share the `~/.aws` credential volume with
  `devcontainer-aws-base`, or have its own?
- **Does the widget drive the full `harpguru-core` store, or do the harp face components get
  decoupled to take props?** Settle before planning Phase B in detail — it is the largest
  single risk to that phase's estimate. See "Where the new code goes".
- How should `harpguru-core` expose the harp face — a handful of named exports, or a
  purpose-built composed component (a `HarpFaceOnly`, say) that the widget and the app both
  use? The second keeps the public surface small but is more upfront work.
- Does a new `apps/` workspace need its own release cadence and CHANGELOG, or can the web
  surfaces version independently of the store releases? The current process assumes every
  package moves together at a tag.
