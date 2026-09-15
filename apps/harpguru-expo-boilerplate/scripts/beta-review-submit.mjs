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

if (!keyId || !issuerId || !keyPath) {
  fail(
    'set ASC_KEY_ID, ASC_ISSUER_ID and ASC_KEY_PATH.\n' +
      '  The first two are in App Store Connect under Users and Access ->\n' +
      '  Integrations -> App Store Connect API: the issuer id sits above the\n' +
      '  key table, the key id is on the row for the key you hold. ASC_KEY_PATH\n' +
      '  is the .p8 file for that key, which is not in this repository.'
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

// ES256. Node signs ECDSA as DER by default; a JWT wants the raw r||s pair,
// which is what dsaEncoding: 'ieee-p1363' produces. Getting this wrong reads
// as an authentication failure rather than as a malformed signature.
const token = (() => {
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
    signature = signer.sign(
      { key: readFileSync(keyPath, 'utf8'), dsaEncoding: 'ieee-p1363' },
      'base64url'
    )
  } catch (error) {
    fail(`could not sign with the key at ${keyPath}: ${error.message}`)
  }
  return `${header}.${payload}.${signature}`
})()

const call = async (method, path, body) => {
  let response
  try {
    response = await fetch(`${API}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
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

// A build is identified by its pre-release version - 18.0.0 - and its own
// version, which is the build number. Newest first, so that omitting --build
// means "the latest build of this version", which is the usual intent after a
// release.
const buildNumber = arg('build')
const builds = await call(
  'GET',
  `/v1/builds?filter[app]=${ascAppId}` +
    `&filter[preReleaseVersion.version]=${encodeURIComponent(version)}` +
    (buildNumber ? `&filter[version]=${encodeURIComponent(buildNumber)}` : '') +
    '&include=betaAppReviewSubmission,betaGroups&sort=-version&limit=10'
)

if (builds.data.length === 0) {
  fail(
    `no build found for ${version}` +
      (buildNumber ? ` (${buildNumber})` : '') +
      ` under app ${ascAppId}`
  )
}

const build = builds.data[0]
const relatedIds = new Set(
  (build.relationships?.betaGroups?.data ?? []).map((g) => g.id)
)
const included = builds.included ?? []
const groups = included
  .filter((i) => i.type === 'betaGroups' && relatedIds.has(i.id))
  .map((g) => g.attributes?.name)
const reviewId = build.relationships?.betaAppReviewSubmission?.data?.id
const existing = included.find(
  (i) => i.type === 'betaAppReviewSubmissions' && i.id === reviewId
)

console.log(`build:        ${version} (${build.attributes?.version})`)
console.log(`id:           ${build.id}`)
console.log(`processing:   ${build.attributes?.processingState}`)
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
// state if the script is run too soon after a release.
if (build.attributes?.processingState !== 'VALID') {
  fail(
    `build is ${build.attributes?.processingState}, not VALID. ` +
      'Wait for Apple to finish processing the upload, then run again.'
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
