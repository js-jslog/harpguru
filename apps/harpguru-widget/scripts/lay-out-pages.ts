// Arranges a web export into the object keys harpguru.com's pages bucket
// serves (see roadmap-planning/aws-pathway-findings.md, "Phase B step 1
// deployed"):
//
//   w/...                  the bundle, which Expo's baseUrl already points at
//   s/index.html           the one shell for every setup link
//   e/index.html           the one shell for every embed
//   t/<slug>/index.html    one page per built-in tuning
//
// Each page is the export's index.html with its own head. The bundle reads
// the path and query once it loads; the head is for search engines and link
// previews, which never run it.
//
// Run with: node --import ./scripts/ts-hooks.mjs scripts/lay-out-pages.ts dist site
import { join } from 'node:path'
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'

import { getTuningSlug } from 'harpparts'
import type { TuningIds } from 'harpparts'

import { getPagedTuningIds, getPresets } from '../src/tuning-pages/presets'

const origin = 'https://harpguru.com'

const [exportDir, siteDir] = process.argv.slice(2)
if (exportDir === undefined || siteDir === undefined) {
  throw new Error('Usage: lay-out-pages.ts <export dir> <site dir>')
}

const escape = (text: string): string =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

type Head = {
  readonly title: string
  readonly description: string
  readonly canonical?: string
  readonly isIndexed: boolean
}

const template = readFileSync(join(exportDir, 'index.html'), 'utf8')

// Everything the export references must be under /w/, or it would be served
// from the site bucket, which doesn't have it
const references = [...template.matchAll(/(?:src|href)="([^"]+)"/g)].map(
  (match) => match[1]
)
const strays = references.filter((reference) => !reference.startsWith('/w/'))
if (strays.length > 0) {
  throw new Error(`The export references files outside /w/: ${strays.join(', ')}`)
}

const page = ({ title, description, canonical, isIndexed }: Head): string => {
  const head = [
    `<title>${escape(title)}</title>`,
    `<meta name="description" content="${escape(description)}" />`,
    canonical ? `<link rel="canonical" href="${escape(canonical)}" />` : '',
    isIndexed ? '' : '<meta name="robots" content="noindex" />',
    '<link rel="icon" href="/icon.png" type="image/png" />',
    '<meta name="apple-itunes-app" content="app-id=1552752923" />',
  ]
    .filter((line) => line !== '')
    .join('\n    ')
  if (!template.includes('<title>Harp Guru</title>')) {
    throw new Error('The export index.html no longer has the expected <title>')
  }
  // A function, so a $ in a tuning's name is never read as a replacement pattern
  return template.replace('<title>Harp Guru</title>', () => head)
}

const write = (path: string, html: string): void => {
  mkdirSync(join(siteDir, path, '..'), { recursive: true })
  writeFileSync(join(siteDir, path), html)
}

const describeTuning = (tuningId: TuningIds): string => {
  const presets = getPresets(tuningId)
    .map(({ pozitionId, scaleLabel }) => `${pozitionId} position (${scaleLabel})`)
    .join(', ')
  return `The ${tuningId} harmonica tuning on a C harp: every hole's note and scale degree, played in ${presets}.`
}

rmSync(siteDir, { recursive: true, force: true })
mkdirSync(siteDir, { recursive: true })

for (const dir of ['_expo', 'assets']) {
  if (existsSync(join(exportDir, dir))) {
    cpSync(join(exportDir, dir), join(siteDir, 'w', dir), { recursive: true })
  }
}

write(
  's/index.html',
  page({
    title: 'A harp face from Harp Guru',
    description:
      'A harmonica setup, shared from Harp Guru: tap the holes to see each note and scale degree.',
    isIndexed: false,
  })
)
write(
  'e/index.html',
  page({
    title: 'Harp Guru',
    description: 'A harmonica harp face from Harp Guru.',
    isIndexed: false,
  })
)
const tuningIds = getPagedTuningIds()
for (const tuningId of tuningIds) {
  const slug = getTuningSlug(tuningId)
  write(
    `t/${slug}/index.html`,
    page({
      title: `${tuningId} harmonica tuning | Harp Guru`,
      description: describeTuning(tuningId),
      canonical: `${origin}/t/${slug}`,
      isIndexed: true,
    })
  )
}

console.log(`Laid out ${tuningIds.length} tuning pages, a setup shell and an embed shell in ${siteDir}`)
