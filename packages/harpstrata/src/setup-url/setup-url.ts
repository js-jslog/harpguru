import {
  DegreeIds,
  PitchIds,
  PozitionIds,
  TuningIds,
  ValvingIds,
  getDegreeIds,
  getPitch,
  getPitchIds,
  getPozition,
  getPozitionIds,
  getScale,
  getScaleIdBySlug,
  getTuningIdBySlug,
  getTuningSlug,
  isNaturalPitch,
} from 'harpparts'

import type { HarpStrataProps } from '../types'

// The URL format every harpguru.com page shares, and the app's share button
// and link handling with them. Printed QR codes carry it, so it only ever
// grows: a key's meaning never changes, its default never changes, and an
// unknown key is ignored. The keys, in the order they are written:
//
//   t  tuning, a slug from harpparts' frozen table   default major-diatonic
//   k  harp key, a flat or natural; sharps are read   default C
//   p  pozition, 1 to 12                              default 2
//   d  active degrees, comma separated                default none
//   s  a named scale's slug, ignored when d is given  default none
//   m  display, degree or pitch                       default degree
//   v  valving, half                                  default not valved

export const siteOrigin = 'https://harpguru.com'

// How the harp face labels its cells. The app's display modes map onto these.
export type SetupDisplayMode = 'degree' | 'pitch'

export type Setup = {
  readonly harpStrataProps: HarpStrataProps & {
    readonly activeIds: ReadonlyArray<DegreeIds>
  }
  readonly displayMode: SetupDisplayMode
}

export const defaultSetup: Setup = {
  harpStrataProps: {
    tuningId: TuningIds.MajorDiatonic,
    valvingId: ValvingIds.NotValved,
    pozitionId: PozitionIds.Second,
    harpKeyId: PitchIds.C,
    activeIds: [],
  },
  displayMode: 'degree',
} as const

// Long enough for any real setup many times over. Anything longer is refused
// before it is read.
const maxQueryLength = 1000

// 'a#' for Bb, from each pitch's own sharp spelling. A Map, not an object, so
// a key such as 'constructor' finds nothing.
const sharpsAsPitchIds: ReadonlyMap<string, PitchIds> = new Map(
  getPitchIds().flatMap((pitchId): Array<[string, PitchIds]> => {
    const pitch = getPitch(pitchId)
    if (isNaturalPitch(pitch)) return []
    const {
      contextualDisplayValues: { sharp },
    } = pitch
    return [[`${sharp}#`.toLowerCase(), pitchId]]
  })
)

const safeDecode = (value: string): string => {
  try {
    return decodeURIComponent(value.replace(/\+/g, ' '))
  } catch {
    return ''
  }
}

// A query's keys, lower-cased, with their values decoded and trimmed. The
// first of a repeated key wins. Empty when the query is too long to be real.
export const readSetupParams = (query: string): ReadonlyMap<string, string> => {
  const params = new Map<string, string>()
  const trimmed = query.startsWith('?') ? query.slice(1) : query
  if (trimmed.length > maxQueryLength) return params
  trimmed.split('&').forEach((pair) => {
    if (pair === '') return
    const separator = pair.indexOf('=')
    const rawKey = separator === -1 ? pair : pair.slice(0, separator)
    const rawValue = separator === -1 ? '' : pair.slice(separator + 1)
    const key = safeDecode(rawKey).toLowerCase()
    if (key === '' || params.has(key)) return
    params.set(key, safeDecode(rawValue).trim())
  })
  return params
}

const readTuning = (value: string | undefined): TuningIds | undefined =>
  value === undefined ? undefined : getTuningIdBySlug(value.toLowerCase())

const readHarpKey = (value: string | undefined): PitchIds | undefined => {
  if (value === undefined) return undefined
  const lower = value.toLowerCase()
  const pitchId = getPitchIds().find((id) => id.toLowerCase() === lower)
  return pitchId ?? sharpsAsPitchIds.get(lower)
}

// p: '3', '03' or '3rd'
export const readPozitionParam = (
  value: string | undefined
): PozitionIds | undefined => {
  if (value === undefined) return undefined
  const digits = value.toLowerCase().replace(/(st|nd|rd|th)$/, '')
  if (!/^\d{1,2}$/.test(digits)) return undefined
  const number = String(Number(digits))
  return getPozitionIds().find(
    (pozitionId) => writePozitionParam(pozitionId) === number
  )
}

export const writePozitionParam = (pozitionId: PozitionIds): string => {
  const {
    simpleSplitValue: [number],
  } = getPozition(pozitionId)
  return number
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

const displayModes: ReadonlyArray<SetupDisplayMode> = ['degree', 'pitch']

export const readDisplayModeParam = (
  value: string | undefined
): SetupDisplayMode | undefined => {
  const lower = value?.toLowerCase()
  return displayModes.find((displayMode) => displayMode === lower)
}

const readValving = (value: string | undefined): ValvingIds | undefined =>
  value?.toLowerCase() === 'half' ? ValvingIds.HalfValved : undefined

// Reads a query string into a setup. Never fails: a missing or bad value
// falls back to its key's default. Write the result back with
// writeSetupQuery to see whether the address needs correcting.
export const readSetupQuery = (query: string): Setup => {
  const params = readSetupParams(query)
  const { harpStrataProps: defaults } = defaultSetup

  return {
    harpStrataProps: {
      tuningId: readTuning(params.get('t')) ?? defaults.tuningId,
      valvingId: readValving(params.get('v')) ?? defaults.valvingId,
      pozitionId: readPozitionParam(params.get('p')) ?? defaults.pozitionId,
      harpKeyId: readHarpKey(params.get('k')) ?? defaults.harpKeyId,
      activeIds:
        readDegrees(params.get('d')) ??
        readScale(params.get('s')) ??
        defaults.activeIds,
    },
    displayMode:
      readDisplayModeParam(params.get('m')) ?? defaultSetup.displayMode,
  }
}

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
    `p=${writePozitionParam(harpStrataProps.pozitionId)}`,
    `d=${degrees.join(',')}`,
  ]
  if (displayMode !== defaultSetup.displayMode) parts.push(`m=${displayMode}`)
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
// /s/ setup link is refused with undefined, rather than guessed at, and that
// includes /s/web, the app's own hand-off to the browser. Within a setup
// link, bad values fall back as readSetupQuery describes.
export const readSetupUrl = (url: string): Setup | undefined => {
  const match = /^https:\/\/(www\.)?harpguru\.com\/s\/?(\?[^#]*)?(#.*)?$/i.exec(
    url.trim()
  )
  if (match === null) return undefined
  const { 2: query = '' } = match
  if (query.length > maxQueryLength) return undefined
  return readSetupQuery(query)
}
