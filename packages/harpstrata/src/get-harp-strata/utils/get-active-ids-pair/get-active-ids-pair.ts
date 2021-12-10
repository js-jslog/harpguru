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
      activeDegreeIds: degreeIds.filter((_, index) =>
        activeIds.includes(pitchIds[index])
      ),
      activePitchIds: pitchIds.filter((id) => activeIds.includes(id)),
    }
  return {
    activeDegreeIds: degreeIds.filter((id) => activeIds.includes(id)),
    activePitchIds: pitchIds.filter((_, index) =>
      activeIds.includes(degreeIds[index])
    ),
  }
}
