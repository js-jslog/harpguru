import {
  readDisplayModeParam,
  readPozitionParam,
  readSetupParams,
  writePozitionParam,
} from 'harpstrata'
import type { SetupDisplayMode } from 'harpstrata'
import type { TuningIds } from 'harpparts'

import { getPresets } from './presets'
import type { Preset } from './presets'

// A tuning page's state, as its URL carries it: p, the preset's pozition, and
// m, the display. Each is read by the same rules as in a setup link. The harp
// key is C, and a URL without k means C, so other keys can be added later.
export type TuningView = {
  readonly preset: Preset
  readonly displayMode: SetupDisplayMode
}

// Accepts only the presets the page offers. Anything else falls back to the
// first preset, or to degrees, and the page corrects its address.
export const readTuningQuery = (
  tuningId: TuningIds,
  query: string
): TuningView => {
  const presets = getPresets(tuningId)
  const params = readSetupParams(query)
  const pozitionId = readPozitionParam(params.get('p'))
  const preset =
    presets.find((candidate) => candidate.pozitionId === pozitionId) ??
    presets[0]
  const displayMode = readDisplayModeParam(params.get('m')) ?? 'degree'
  return { preset, displayMode }
}

export const writeTuningQuery = ({ preset, displayMode }: TuningView): string =>
  [
    `p=${writePozitionParam(preset.pozitionId)}`,
    ...(displayMode === 'pitch' ? ['m=pitch'] : []),
  ].join('&')
