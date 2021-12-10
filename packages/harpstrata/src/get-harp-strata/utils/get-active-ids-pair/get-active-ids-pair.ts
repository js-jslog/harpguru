import { DegreeIds, getDegreeIds, getPitchIds, isPitchIdArray } from 'harpparts'
import type { PitchIds } from 'harpparts'

type ActiveIds = ReadonlyArray<DegreeIds> | ReadonlyArray<PitchIds>
type ActiveIdsPair = {
  readonly activeDegreeIds: ReadonlyArray<DegreeIds>
  readonly activePitchIds: ReadonlyArray<PitchIds>
}

export const getActiveIdsPair = (
  rootPitchId: PitchIds,
  activeIds: ActiveIds
): ActiveIdsPair => {
  const degreeIds = getDegreeIds()
  const pitchIds = getPitchIds(rootPitchId)
  if (isPitchIdArray(activeIds))
    return {
      activeDegreeIds: activeIds.map((id) => degreeIds[pitchIds.indexOf(id)]),
      activePitchIds: activeIds,
    }
  return {
    activeDegreeIds: activeIds,
    activePitchIds: activeIds.map((id) => pitchIds[degreeIds.indexOf(id)]),
  }
}
