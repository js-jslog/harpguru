import type { DegreeIds, PitchIds } from 'harpstrata'

import { DisplayModes } from '../../../../types'

export const getRenderableToneId = (
  degreeId: DegreeIds | undefined,
  pitchId: PitchIds | undefined,
  activeDisplayMode: DisplayModes
): DegreeIds | PitchIds | undefined => {
  if (degreeId === undefined && pitchId === undefined) return undefined
  if (activeDisplayMode === DisplayModes.Degree) return degreeId
  return pitchId
}
