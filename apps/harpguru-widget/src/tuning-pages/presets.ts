import { getScale } from 'harpparts'
import type { DegreeIds, PozitionIds, TuningIds } from 'harpparts'

import { getUnbentDegrees, getUnbentScale } from './unbent-scale'
import { tuningPresets } from './tuning-presets'

export type Preset = {
  readonly pozitionId: PozitionIds
  // A named scale, or 'Unbent notes' where the harp's plain blow and draw
  // notes make no named scale and none has been chosen for it
  readonly scaleLabel: string
  readonly degrees: ReadonlyArray<DegreeIds>
}

export const unbentNotesLabel = 'Unbent notes'

// The tunings that have a page, in the table's order
export const getPagedTuningIds = (): ReadonlyArray<TuningIds> =>
  Object.keys(tuningPresets) as TuningIds[]

export const hasTuningPage = (tuningId: TuningIds): boolean =>
  tuningId in tuningPresets

export const getPresets = (tuningId: TuningIds): ReadonlyArray<Preset> => {
  const { [tuningId]: plan } = tuningPresets
  if (plan === undefined) throw new Error(`${tuningId} has no tuning page`)
  const { pozitions, scales = {} } = plan
  return pozitions.map((pozitionId) => {
    const scaleId = getUnbentScale(tuningId, pozitionId) ?? scales[pozitionId]
    if (scaleId === undefined) {
      return {
        pozitionId,
        scaleLabel: unbentNotesLabel,
        degrees: getUnbentDegrees(tuningId, pozitionId),
      }
    }
    const { label, degrees } = getScale(scaleId)
    return { pozitionId, scaleLabel: label, degrees }
  })
}
