import { getPozitionIds } from 'harpparts'
import type { TuningIds } from 'harpparts'
import { DisplayModes } from 'harpguru-core/standalone'

import { getPresets } from './presets'
import type { Preset } from './presets'

// A tuning page's state, as its URL carries it: p, the preset's pozition, and
// m, the display. The keys mean what they mean in a setup link. The harp key
// is C, and a URL without k means C, so other keys can be added later.
export type TuningView = {
  readonly preset: Preset
  readonly displayMode: DisplayModes
}

const readParams = (query: string): ReadonlyMap<string, string> => {
  const params = new Map<string, string>()
  new URLSearchParams(query).forEach((value, key) => {
    const lowerKey = key.toLowerCase()
    if (!params.has(lowerKey)) params.set(lowerKey, value.trim().toLowerCase())
  })
  return params
}

const pozitionNumber = (preset: Preset): number =>
  getPozitionIds().indexOf(preset.pozitionId) + 1

// Accepts only the presets the page offers. Anything else falls back to the
// first preset, or to degrees, and the page corrects its address.
export const readTuningQuery = (
  tuningId: TuningIds,
  query: string
): TuningView => {
  const presets = getPresets(tuningId)
  const params = readParams(query)
  const preset =
    presets.find(
      (candidate) =>
        String(pozitionNumber(candidate)) ===
        params.get('p')?.replace(/(st|nd|rd|th)$/, '')
    ) ?? presets[0]
  const displayMode =
    params.get('m') === 'pitch' ? DisplayModes.Pitch : DisplayModes.Degree
  return { preset, displayMode }
}

export const writeTuningQuery = ({ preset, displayMode }: TuningView): string =>
  [
    `p=${pozitionNumber(preset)}`,
    ...(displayMode === DisplayModes.Pitch ? ['m=pitch'] : []),
  ].join('&')
