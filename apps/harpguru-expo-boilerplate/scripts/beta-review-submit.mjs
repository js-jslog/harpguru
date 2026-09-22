#!/usr/bin/env node
// Submit a TestFlight build for Beta App Review.
//
// Belonging to a beta group and being submitted for Beta App Review are two
// separate App Store Connect resources. `eas submit` creates the first, through
// `ios.groups` in the production submit profile, and never the second - so a
// released build sits at "Ready to Submit" indefinitely and Apple never sees
// it. This makes the missing call.
//
// Dry run by default: it reports what the API knows about the build and stops.
// Pass --submit to create the review submission.
//
//   ASC_KEY_ID=XXXXXXXXXX \
//   ASC_ISSUER_ID=aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee \
//   ASC_KEY_PATH=/path/to/AuthKey.p8 \
//     node apps/harpguru-expo-boilerplate/scripts/beta-review-submit.mjs
//
// The key needs App Manager or Admin; a Developer-role key reads builds fine
// and then fails the submission with a bare 403.
//
// .github/workflows/beta-review.yml runs this after every release with
// --submit --wait, so the manual invocation above is now a fallback for when
// that run fails. See docs/release-pipeline.md.

import { createSign } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const API = 'https://api.appstoreconnect.apple.com'

// Config and the answer are both located relative to this file, so the result
// does not depend on where the script was invoked from.
const APP_DIR = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (name) => JSON.parse(readFileSync(join(APP_DIR, name), 'utf8'))

const arg = (name) => {
  const i = process.argv.indexOf(`--${name}`)
  return i === -1 ? undefined : process.argv[i + 1]
}
const flag = (name) => process.argv.includes(`--${name}`)

const fail = (message) => {
  console.error(`FAIL: ${message}`)
  process.exit(1)
}

const keyId = process.env.ASC_KEY_ID
const issuerId = process.env.ASC_ISSUER_ID
const keyPath = process.env.ASC_KEY_PATH
// ASC_KEY carries the key itself rather than a path to it. That is what CI
// uses: a GitHub secret goes straight into the environment, so the key is never
// written to the runner's filesystem for a later step to read.
const keyPem = process.env.ASC_KEY

if (!keyId || !issuerId || !(keyPath || keyPem)) {
  fail(
    'set ASC_KEY_ID, ASC_ISSUER_ID and either ASC_KEY_PATH or ASC_KEY.\n' +
      '  The first two are in App Store Connect under Users and Access ->\n' +
      '  Integrations -> App Store Connect API: the issuer id sits above the\n' +
      '  key table, the key id is on the row for the key you hold. ASC_KEY_PATH\n' +
      '  is the .p8 file for that key, which is not in this repository; ASC_KEY\n' +
      '  is its contents, for where a file is awkward.'
  )
}

// The app id is the one already recorded for submission, so the two cannot
// drift apart.
const ascAppId = read('eas.json').submit?.internal?.ios?.ascAppId
if (!ascAppId) fail('no submit.internal.ios.ascAppId in eas.json')

// Default to the version this repository currently carries, which after a
// release is the version that was just shipped.
const version = arg('version') ?? read('app.json').expo?.version
if (!version) fail('no expo.version in app.json and no --version given')

// The key is read once, rather than on each signing below, so that an
// unreadable path is reported as itself instead of as a signing failure.
const key = (() => {
  if (keyPem) return keyPem
  try {
    return readFileSync(keyPath, 'utf8')
  } catch (error) {
    fail(`could not read the key at ${keyPath}: ${error.message}`)
  }
})()

// ES256. Node signs ECDSA as DER by default; a JWT wants the raw r||s pair,
// which is what dsaEncoding: 'ieee-p1363' produces. Getting this wrong reads
// as an authentication failure rather than as a malformed signature.
//
// A token is minted per request rather than once for the process. Apple caps
// the lifetime at 20 minutes and rejects anything longer, while --wait polls
// for up to 90, so one token cannot cover a run that waits: it expires part
// way through and every poll after that is a 401, on credentials that were
// working a minute earlier. Signing is local and costs nothing, so there is
// nothing to hold a token for.
const token = () => {
  const encode = (o) => Buffer.from(JSON.stringify(o)).toString('base64url')
  const iat = Math.floor(Date.now() / 1000)
  const header = encode({ alg: 'ES256', kid: keyId, typ: 'JWT' })
  const payload = encode({
    iss: issuerId,
    iat,
    exp: iat + 20 * 60,
    aud: 'appstoreconnect-v1',
  })
  const signer = createSign('SHA256')
  signer.update(`${header}.${payload}`)
  signer.end()
  let signature
  try {
    signature = signer.sign({ key, dsaEncoding: 'ieee-p1363' }, 'base64url')
  } catch (error) {
    const where = keyPem ? 'in ASC_KEY' : `at ${keyPath}`
    fail(`could not sign with the key ${where}: ${error.message}`)
  }
  return `${header}.${payload}.${signature}`
}

const call = async (method, path, body) => {
  let response
  try {
    response = await fetch(`${API}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${token()}`,
        ...(body ? { 'Content-Type': 'application/json' } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    })
  } catch (error) {
    fail(`could not reach App Store Connect: ${error.message}`)
  }
  const text = await response.text()
  const json = text ? JSON.parse(text) : {}
  if (!response.ok) {
    const detail = (json.errors ?? [])
      .map((e) => `${e.title}: ${e.detail}`)
      .join('\n  ')
    fail(`${method} ${path} -> ${response.status}\n  ${detail || text}`)
  }
  return json
}

// --wait is for CI. The release workflow queues the build with --no-wait, so
// when the follow-on run starts the build may not have reached App Store
// Connect at all yet, let alone finished processing. Given --wait, poll for one
// instead of failing on the first look. 90 minutes is deliberately generous:
// two releases are a thin basis for a timeout, and the cost of guessing low is
// a red run on a release that was fine. Re-running is always the recovery,
// since creating the submission is idempotent.
const POLL_SECONDS = 60
const waitArg = arg('wait')
const waitMinutes = !flag('wait')
  ? 0
  : waitArg === undefined || waitArg.startsWith('--')
    ? 90
    : Number(waitArg)
if (!Number.isFinite(waitMinutes) || waitMinutes < 0) {
  fail(`--wait wants a number of minutes, not "${waitArg}"`)
}

// In wait mode the build to submit is not simply the newest of this version. A
// test build dispatched from a branch after a release carries the same
// expo.version and a higher build number, so it would be the newest - and it is
// submitted with the internal profile, which omits ios.groups, so it is not a
// build that should ever reach Beta App Review. What the release produces, and
// so what this waits for, is the newest build assigned to the external group.
// The group name comes from the same file as the app id, so the two cannot
// drift from what was actually submitted.
const releaseGroups = read('eas.json').submit?.production?.ios?.groups ?? []
if (waitMinutes && releaseGroups.length === 0) {
  fail(
    'no submit.production.ios.groups in eas.json, so --wait cannot tell a ' +
      'release build from a test build'
  )
}

// A build is identified by its pre-release version - 18.0.0 - and its own
// version, which is the build number. Newest first, so that omitting --build
// means "the latest build of this version", which is the usual intent after a
// release.
const buildNumber = arg('build')
const select = async () => {
  const builds = await call(
    'GET',
    `/v1/builds?filter[app]=${ascAppId}` +
      `&filter[preReleaseVersion.version]=${encodeURIComponent(version)}` +
      (buildNumber
        ? `&filter[version]=${encodeURIComponent(buildNumber)}`
        : '') +
      '&include=betaAppReviewSubmission,betaGroups&sort=-version&limit=10'
  )
  const included = builds.included ?? []
  const describe = (build) => {
    const relatedIds = new Set(
      (build.relationships?.betaGroups?.data ?? []).map((g) => g.id)
    )
    const reviewId = build.relationships?.betaAppReviewSubmission?.data?.id
    return {
      build,
      processing: build.attributes?.processingState,
      groups: included
        .filter((i) => i.type === 'betaGroups' && relatedIds.has(i.id))
        .map((g) => g.attributes?.name),
      existing: included.find(
        (i) => i.type === 'betaAppReviewSubmissions' && i.id === reviewId
      ),
    }
  }
  const candidates = builds.data.map(describe)
  return waitMinutes
    ? candidates.find((c) => c.groups.some((n) => releaseGroups.includes(n)))
    : candidates[0]
}

// The loop decides only when to stop waiting. Anything other than PROCESSING is
// a state waiting cannot improve on - VALID, or a failure - so it falls through
// to the reporting below, which says what was found and refuses to submit
// anything that is not VALID. An unrecognised state stops the wait too, which
// is the right way round: better a run that reports something odd than one that
// polls for ninety minutes over it.
let selected = await select()
if (waitMinutes) {
  const deadline = Date.now() + waitMinutes * 60 * 1000
  const describeWait = () =>
    selected
      ? `build ${selected.build.attributes?.version} is ${selected.processing}`
      : `no build of ${version} in ${releaseGroups.join(' or ')} yet`
  while (!selected || selected.processing === 'PROCESSING') {
    if (Date.now() >= deadline) {
      fail(
        `waited ${waitMinutes} minutes and ${describeWait()}. ` +
          'Re-run to keep waiting; creating the submission is idempotent, so ' +
          'a re-run cannot double-submit.'
      )
    }
    console.log(`waiting: ${describeWait()}`)
    await new Promise((resolve) => setTimeout(resolve, POLL_SECONDS * 1000))
    selected = await select()
  }
}

if (!selected) {
  fail(
    `no build found for ${version}` +
      (buildNumber ? ` (${buildNumber})` : '') +
      ` under app ${ascAppId}`
  )
}

const { build, groups, existing, processing } = selected

console.log(`build:        ${version} (${build.attributes?.version})`)
console.log(`id:           ${build.id}`)
console.log(`processing:   ${processing}`)
console.log(`expired:      ${build.attributes?.expired}`)
console.log(`beta groups:  ${groups.length ? groups.join(', ') : '(none)'}`)
console.log(
  `review:       ${existing ? existing.attributes?.betaReviewState : '(no submission)'}`
)

if (existing) {
  console.log('\nAlready submitted for Beta App Review. Nothing to do.')
  process.exit(0)
}

// Apple rejects a submission for a build it has not finished processing, and
// the release workflow queues builds with --no-wait, so this is the expected
// state if the script is run too soon after a release. --wait is how CI avoids
// it; by hand, the answer is to run it again in a few minutes.
if (processing !== 'VALID') {
  fail(
    `build is ${processing}, not VALID. ` +
      (processing === 'PROCESSING'
        ? 'Wait for Apple to finish processing the upload, then run again.'
        : 'That is not a state it will come out of, so there is nothing to ' +
          'wait for: the release needs a new build.')
  )
}

if (!flag('submit')) {
  console.log('\nDry run. Re-run with --submit to create the review submission.')
  process.exit(0)
}

const created = await call('POST', '/v1/betaAppReviewSubmissions', {
  data: {
    type: 'betaAppReviewSubmissions',
    relationships: { build: { data: { type: 'builds', id: build.id } } },
  },
})

console.log(`\nSubmitted. State: ${created.data.attributes?.betaReviewState}`)
