import type { HarpStrataProps } from 'harpstrata'
import {
  DegreeIds,
  PitchIds,
  PozitionIds,
  TuningIds,
  ValvingIds,
  getDegreeIds,
  getPozitionIds,
  getScale,
  getScaleIdBySlug,
  getTuningIdBySlug,
  getTuningSlug,
} from 'harpparts'

import { DisplayModes } from '../types'

// The URL format every widget page shares, and the app's share button and
// link handling with them. Printed QR codes carry it, so it only ever grows:
// a key's meaning never changes, its default never changes, and an unknown
// key is ignored. The full table is in roadmap-planning/aws-pathway-findings.md.

export const siteOrigin = 'https://harpguru.com'

export type Setup = {
  readonly harpStrataProps: HarpStrataProps & {
    readonly activeIds: ReadonlyArray<DegreeIds>
  }
  readonly displayMode: DisplayModes
}

export const defaultSetup: Setup = {
  harpStrataProps: {
    tuningId: TuningIds.MajorDiatonic,
    valvingId: ValvingIds.NotValved,
    pozitionId: PozitionIds.Second,
    harpKeyId: PitchIds.C,
    activeIds: [],
  },
  displayMode: DisplayModes.Degree,
} as const

// Long enough for any real setup many times over. Anything longer is refused
// before it is read.
const maxQueryLength = 1000

// A Map, not an object, so a key such as 'constructor' finds nothing
const sharpsAsFlats: ReadonlyMap<string, PitchIds> = new Map([
  ['a#', PitchIds.Bb],
  ['c#', PitchIds.Db],
  ['d#', PitchIds.Eb],
  ['f#', PitchIds.Gb],
  ['g#', PitchIds.Ab],
])

const readQuery = (query: string): ReadonlyMap<string, string> => {
  const params = new Map<string, string>()
  const trimmed = query.startsWith('?') ? query.slice(1) : query
  if (trimmed.length > maxQueryLength) return params
  trimmed.split('&').forEach((pair) => {
    if (pair === '') return
    const separator = pair.indexOf('=')
    const rawKey = separator === -1 ? pair : pair.slice(0, separator)
    const rawValue = separator === -1 ? '' : pair.slice(separator + 1)
    const key = safeDecode(rawKey).toLowerCase()
    // The first of a repeated key wins
    if (key === '' || params.has(key)) return
    params.set(key, safeDecode(rawValue).trim())
  })
  return params
}

const safeDecode = (value: string): string => {
  try {
    return decodeURIComponent(value.replace(/\+/g, ' '))
  } catch {
    return ''
  }
}

const readTuning = (value: string | undefined): TuningIds | undefined =>
  value === undefined ? undefined : getTuningIdBySlug(value.toLowerCase())

const readHarpKey = (value: string | undefined): PitchIds | undefined => {
  if (value === undefined) return undefined
  const lower = value.toLowerCase()
  const flat = Object.values(PitchIds).find(
    (pitchId) => pitchId.toLowerCase() === lower
  )
  return flat ?? sharpsAsFlats.get(lower)
}

const readPozition = (value: string | undefined): PozitionIds | undefined => {
  if (value === undefined) return undefined
  const digits = value.toLowerCase().replace(/(st|nd|rd|th)$/, '')
  if (!/^\d{1,2}$/.test(digits)) return undefined
  const { [Number(digits) - 1]: pozitionId } = getPozitionIds()
  return pozitionId
}

const readDegrees = (
  value: string | undefined
): ReadonlyArray<DegreeIds> | undefined => {
  if (value === undefined) return undefined
  const given = value
    .toLowerCase()
    .split(',')
    .map((token) => token.trim())
  return getDegreeIds().filter((degreeId) => given.includes(degreeId))
}

const readScale = (
  value: string | undefined
): ReadonlyArray<DegreeIds> | undefined => {
  if (value === undefined) return undefined
  const scaleId = getScaleIdBySlug(value.toLowerCase())
  return scaleId === undefined ? undefined : getScale(scaleId).degrees
}

const readDisplayMode = (
  value: string | undefined
): DisplayModes | undefined => {
  const lower = value?.toLowerCase()
  if (lower === 'degree') return DisplayModes.Degree
  if (lower === 'pitch') return DisplayModes.Pitch
  return undefined
}

const readValving = (value: string | undefined): ValvingIds | undefined => {
  if (value === undefined) return undefined
  if (value.toLowerCase() === 'half') return ValvingIds.HalfValved
  return undefined
}

// Reads a query string into a setup. Never fails: a missing or bad value
// falls back to its key's default. Write the result back with
// writeSetupQuery to see whether the address needs correcting.
export const readSetupQuery = (query: string): Setup => {
  const params = readQuery(query)
  const { harpStrataProps: defaults } = defaultSetup

  return {
    harpStrataProps: {
      tuningId: readTuning(params.get('t')) ?? defaults.tuningId,
      valvingId: readValving(params.get('v')) ?? defaults.valvingId,
      pozitionId: readPozition(params.get('p')) ?? defaults.pozitionId,
      harpKeyId: readHarpKey(params.get('k')) ?? defaults.harpKeyId,
      activeIds:
        readDegrees(params.get('d')) ??
        readScale(params.get('s')) ??
        defaults.activeIds,
    },
    displayMode: readDisplayMode(params.get('m')) ?? defaultSetup.displayMode,
  }
}

const pozitionNumber = (pozitionId: PozitionIds): number =>
  getPozitionIds().indexOf(pozitionId) + 1

// The canonical query for a setup, without its '?'. Always carries t, k, p
// and d, so a link says what it shows even to someone reading it; m and v
// only when they are not the default.
export const writeSetupQuery = (setup: Setup): string => {
  const { harpStrataProps, displayMode } = setup
  const degrees = getDegreeIds().filter((degreeId) =>
    harpStrataProps.activeIds.includes(degreeId)
  )
  const parts = [
    `t=${getTuningSlug(harpStrataProps.tuningId)}`,
    `k=${harpStrataProps.harpKeyId}`,
    `p=${pozitionNumber(harpStrataProps.pozitionId)}`,
    `d=${degrees.join(',')}`,
  ]
  if (displayMode === DisplayModes.Pitch) parts.push('m=pitch')
  if (harpStrataProps.valvingId === ValvingIds.HalfValved) parts.push('v=half')
  return parts.join('&')
}

// A setup link, as shared and printed. With the marker, the same setup at the
// path the app's link rules leave out, so it opens in the browser.
export const writeSetupUrl = (
  setup: Setup,
  { openInBrowser = false }: { readonly openInBrowser?: boolean } = {}
): string =>
  `${siteOrigin}/s/${openInBrowser ? 'web' : ''}?${writeSetupQuery(setup)}`

// Reads a link the app has been handed. Anything other than a harpguru.com
// setup link is refused with undefined, rather than guessed at; within a
// setup link, bad values fall back as readSetupQuery describes.
export const readSetupUrl = (url: string): Setup | undefined => {
  const match = /^https:\/\/(www\.)?harpguru\.com\/s\/?(\?[^#]*)?(#.*)?$/i.exec(
    url.trim()
  )
  if (match === null) return undefined
  const { 2: query = '' } = match
  if (query.length > maxQueryLength) return undefined
  return readSetupQuery(query)
}
