import { getUnbentDegreeIds } from 'harpstrata'
import { ScaleCategory, getScale, getScaleByDegreeIds } from 'harpparts'
import type { DegreeIds, PozitionIds, TuningIds } from 'harpparts'

import { tuningPresets } from './tuning-presets'

export type Preset = {
  readonly pozitionId: PozitionIds
  // A named scale, or 'Unbent notes' where the harp's plain blow and draw
  // notes make no named scale and none has been chosen for it
  readonly scaleLabel: string
  readonly degrees: ReadonlyArray<DegreeIds>
  readonly description: string
}

export const unbentNotesLabel = 'Unbent notes'

// The tunings that have a page, in the table's order
export const getPagedTuningIds = (): ReadonlyArray<TuningIds> =>
  Object.keys(tuningPresets) as TuningIds[]

export const hasTuningPage = (tuningId: TuningIds): boolean =>
  tuningId in tuningPresets

// The named scale a tuning's unbent notes make in a pozition, if there is
// one. Chords are left out: a tuning page shows what a harp is built to play,
// and that is a scale.
export const getUnbentScale = (
  tuningId: TuningIds,
  pozitionId: PozitionIds
): ReturnType<typeof getScaleByDegreeIds> =>
  getScaleByDegreeIds(
    getUnbentDegreeIds(tuningId, pozitionId),
    ScaleCategory.Scale
  )

export const getTuningDescription = (tuningId: TuningIds): string => {
  const { [tuningId]: plan } = tuningPresets
  if (plan === undefined) throw new Error(`${tuningId} has no tuning page`)
  return plan.description
}

export const getPresets = (tuningId: TuningIds): ReadonlyArray<Preset> => {
  const { [tuningId]: plan } = tuningPresets
  if (plan === undefined) throw new Error(`${tuningId} has no tuning page`)
  return plan.pozitions.map(({ pozitionId, scaleId, description }) => {
    const scale =
      getUnbentScale(tuningId, pozitionId) ??
      (scaleId === undefined ? undefined : getScale(scaleId))
    if (scale === undefined) {
      return {
        pozitionId,
        scaleLabel: unbentNotesLabel,
        degrees: getUnbentDegreeIds(tuningId, pozitionId),
        description,
      }
    }
    return {
      pozitionId,
      scaleLabel: scale.label,
      degrees: scale.degrees,
      description,
    }
  })
}
