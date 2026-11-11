# Handover from harpguru-cloud: Phase B, the harpguru side

As of 2026-11-09. The AWS side of Phase B is built and live. Everything left in Phase B,
except one small AWS change (#4 below), is work in this repo. Phase B ships when a
configured harp face opens live from a QR code.

**Progress, for a session picking this up:** steps 1 to 6 below are built, and so is the
pages' first design; the report-back on the marker and the CSP is written. What is left, and
in what order, is under "Where Phase B stands" in `aws-pathway-findings.md`. Where this
handover and the roadmap or findings disagree, the later documents are right: `/t/` starts
with 10 tuning pages, not 51. **Once #182 is merged, `master` holds the current roadmap and
findings**, and "the feature branch" below means `master`: findings go on a branch off it and
merge back, and harpguru-cloud reads them there.

## Where you are

You are in the `harpguru` app container, where this repo's pre-push hook runs. The branch
`178-build-the-harp-face-widget` is ahead of `master` and holds the current roadmap and
findings. Pull before relying on it.

**`harpguru-cloud` is public: `https://github.com/js-jslog/harpguru-cloud`, on `master`.**
Read it for reference. Clone it read-only if that helps, but don't push to it: changes on the
AWS side go to its own agent, in the cloud container, through the user. Worth reading:

- `docs/plans/phase-b.md`: the status table, and "What this side needs from that side"
- `infra/lib/site-stack.ts`: the paths, cache and headers, the CSPs included
- `infra/lib/functions/viewer-request.js`: how paths map to objects
- `infra/lib/github-stack.ts`: the deploy role's trust policy and permissions
- `infra/lib/partners.ts`: who may frame `/e/` (empty for now)
- `infra/site/.well-known/`: the AASA file and `assetlinks.json` as served

**No AWS credentials or AWS tooling belong in this container or this repo.** The widget's
only route to AWS is the GitHub workflow below. The user runs any `aws` or `cdk` command,
from the harpguru-cloud side.

## Pushing

Push normally: the pre-push hook runs the release version check, `yarn lint`, `yarn tsc` and
`yarn test`, and must pass. Don't use `--no-verify`. No AI attribution in commits or PRs.

## Read first, in this repo

- `roadmap-planning/roadmap.md`:
  - "Phase B — The public harpface"
  - "Locked decisions" (the frozen-scope table for the three page types)
  - "Settled since writing" (the 2026-11-07 entries)
  - "Open questions" (more than two harp faces)
  - "How the two connect"
  - "Where the new code goes in this repo"
- `roadmap-planning/aws-pathway-findings.md`:
  - "What a web export needs from a content security policy, checked 2026-11-07"
  - "Phase B step 1 deployed: the widget's paths, 2026-11-07"
  - "Phase B step 2 deployed: the deploy role, 2026-11-08"
  - "Phase B step 3 deployed: what the request logs look like, 2026-11-09"

## What is live on harpguru.com

- **One CloudFront distribution.** The apex serves the landing page. `/w/*`, `/t/*`, `/s/*`
  and `/e/*` are served from a separate, private pages bucket, which is empty, so those paths
  return 404 until your first deploy.
- **A function on every request maps paths to objects:**
  - `/s/<anything>` → `s/index.html`, one shell for every setup
  - `/e/<anything>` → `e/index.html`, one shell for every embed
  - `/t/<slug>` → `t/<slug>/index.html`, one page per tuning
  - `/t`, `/s` and `/e` without a trailing slash are redirected to add it.
  - The query string is left alone for the page to read.
- **Caching:** the cache key ignores the query string, so there is one cached copy per page,
  whatever it is configured to show. Cache lifetimes come from the `Cache-Control` your
  upload sets; without one, CloudFront keeps a copy for a day.
- **The CSP on the pages:**
  `default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; manifest-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors …`
  - That means no `eval`, no third-party scripts, fonts or images, no requests to other
    origins, no `<base>` tag, and no form submissions.
  - `/w/`, `/t/` and `/s/` refuse to be framed (`frame-ancestors 'none'`).
  - `/e/` may be framed by harpguru.com and the partners in harpguru-cloud's `infra/lib/partners.ts`.
- **App links:**
  - The AASA file claims `/s/*` for `com.jslog.harpguru`.
  - `assetlinks.json` is live.
  - Android's paths come from the app's intent filters, which are this repo's to write.
- **Request logs** record every request, query string included, and are kept for 90 days.
  Phase D will count views from them, so the URL is the analytics.

## The contract the widget's deploy must meet

1. **Everything under `/w/`.** A default Expo web export uses two top-level prefixes,
   `/_expo/` and `/assets/`. Expo's base URL setting moves both under `/w/`.
2. **Object keys in the pages bucket:**
   - `w/...` for the bundle
   - `t/<slug>/index.html`, one per built-in tuning: 51 pages
   - `s/index.html`
   - `e/index.html`
3. **Stay within the CSP above.** The findings doc checked a full-app export on 2026-11-07:
   - it needs `'unsafe-inline'` for styles, which is allowed;
   - it needs no `eval`;
   - its fonts and images are on harpguru.com itself.

   If the widget needs anything more, say so first. The CSP is a change in harpguru-cloud,
   deployed before the widget that relies on it.
4. **Set `Cache-Control` on upload:**
   - long and `immutable` for the hashed files under `w/`;
   - `no-cache` for the HTML.

   After a deploy, invalidate the HTML paths.

## The deploy workflow

- **The job:**
  - runs in the GitHub environment `harpguru.com`, which accepts deployments from `master`
    only;
  - has `permissions: id-token: write` (plus `contents: read`);
  - signs in with `aws-actions/configure-aws-credentials`:
    - `role-to-assume: ${{ vars.AWS_PAGES_DEPLOY_ROLE_ARN }}`
    - `aws-region: eu-west-2`
- **The bucket** is `${{ vars.AWS_PAGES_BUCKET }}`, and the distribution is
  `${{ vars.AWS_DISTRIBUTION_ID }}`. All three variables already exist in that environment.
- **What the role may do:**
  - list, put, delete and abort multipart uploads in the pages bucket;
  - `cloudfront:CreateInvalidation` on the distribution.

  Nothing else: it can't read objects or stack outputs. `aws s3 sync --delete` needs only
  the listing. Its credentials last at most an hour.
- **Setting `Cache-Control` takes two sync passes:**
  - one for the HTML;
  - one for everything else.

  An excluded file is never deleted by `--delete`, so each pass leaves the other's files
  alone.
- **The first run is the trust policy's first real test.** The role trusts only the token
  subject `repo:js-jslog/harpguru:environment:harpguru.com`, matched exactly, with the
  audience `sts.amazonaws.com`. If the run fails with "Not authorized to perform
  sts:AssumeRoleWithWebIdentity", either the job isn't in that environment or a name doesn't
  match.

## Decide early: these are permanent

QR codes get printed, so shared URLs are a permanent contract.

- **One parameter format for `/t/`, `/s/` and `/e/`:**
  - stable slugs for tunings (`TuningIds` values are display strings);
  - room for Phase C's custom tunings;
  - `/t/`'s option lists may only grow.
- **Validation differs by page:**
  - `/s/` and `/e/` accept any real setup;
  - `/t/` accepts only the options its controls offer;
  - a bad parameter falls back to that control's default and corrects the address bar.
- **The open-in-browser marker.** When a user opening a link picks "open in the browser",
  the app re-opens the URL with a marker that the link rules exclude.
  - **iOS:** the AASA file can exclude a path pattern.
  - **Android:** nobody has checked whether an intent filter can exclude a query parameter.
    Check it. The planned fallback is a path marker, outside what the intent filters match,
    for which harpguru-cloud adds a behaviour.
  - **This blocks harpguru-cloud's #4.** Record the decision and its form in the findings
    doc.

## Suggested order

1. Export the harp face from `harpguru-core` as one composed component, and settle the store
   question. It must reproduce the resize response that today comes from a discarded
   `useWindowDimensions()` call in `harp-guru.tsx`, or the widget sizes itself once and
   never again.
2. Fix the URL format and the marker (above).
3. Build the widget's three page types:
   - `/s/` and `/e/`: cells you click to toggle, and the scale flash;
   - `/t/`: the configuration controls, with the playing key shown as a result;
   - the URL is the state, and a `/t/` control rewrites the address bar without reloading;
   - promotional chrome on harpguru.com, minimal chrome in an embed.
4. Make the web export fit the contract:
   - the `/w/` base URL;
   - the page layout above;
   - trim the bundle: 4 MB of 6.2 MB is icon fonts.
5. Build the 51 tuning pages. Each declares its bare `/t/<slug>` as canonical. Keep `/s/`
   and `/e/` out of search indexes.
6. Write the deploy workflow (above). Its first run is the end-to-end test.
7. Make the app changes:
   - the share button and its QR code;
   - `associatedDomains` and intent filters;
   - app first: the picker offers harp face 1, harp face 2, or the browser, built to list
     any number;
   - check every incoming URL.

## Report back to harpguru-cloud

Write these in `roadmap-planning/aws-pathway-findings.md` on
`178-build-the-harp-face-widget`, which is where the harpguru-cloud side reads them, and
tell the user:

- the marker's form and name: this unblocks #4;
- anything the widget needs beyond the CSP above;
- the first workflow run's result and date, so the trust policy and the live pages can be
  checked.

## Rules that hold across both repos

- No account IDs, portal URLs or email addresses in either repo. The role's ARN lives only
  in the GitHub variable.
- No AI attribution in commits or PRs.
