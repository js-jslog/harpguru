import type { HarpStrataProps } from 'harpstrata'
import { ValvingIds } from 'harpparts'
import { getCovariantSet } from 'harpcovariance'

import type { Preset } from './tuning-pages/presets'

// A setup in the app's own words: 'Harp key Bb · 3rd position · Song key C',
// led by the tuning where the page isn't already about it.
export const describeHarp = (
  harpStrataProps: HarpStrataProps,
  { withTuning = true }: { readonly withTuning?: boolean } = {}
): string => {
  const { tuningId, harpKeyId, pozitionId, valvingId } = harpStrataProps
  const { rootPitchId } = getCovariantSet({ harpKeyId, pozitionId })
  const harp = [
    `Harp key ${harpKeyId}`,
    `${pozitionId} position`,
    `Song key ${rootPitchId}`,
  ]
  const tuning = withTuning ? [tuningId] : []
  const valving = valvingId === ValvingIds.HalfValved ? ['Half valved'] : []
  return [...tuning, ...valving, ...harp].join(' · ')
}

// A tuning page's preset, as its button and its page description name it
export const describePreset = ({ pozitionId, scaleLabel }: Preset): string =>
  `${pozitionId} position · ${scaleLabel}`
