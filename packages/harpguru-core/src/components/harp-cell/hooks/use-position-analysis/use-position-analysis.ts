import { useGlobal } from 'reactn'
import type { DegreeIds, PitchIds, Pitch, Degree } from 'harpstrata'
import { IsActiveIds } from 'harpstrata'

import type { YXCoord } from '../../../harp-cell'

export type PositionFacts = {
  readonly thisDegree: Degree | undefined
  readonly thisPitch: Pitch | undefined
  readonly thisDegreeId: DegreeIds | undefined
  readonly thisPitchId: PitchIds | undefined
  readonly thisIsActiveId: IsActiveIds | undefined
}

export const usePositionAnalysis = (yxCoord: YXCoord): PositionFacts => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const {
    degreeMatrix,
    pitchMatrix,
    isActiveComplex: { activeDegreeIds },
  } = activeHarpStrata
  const [yCoord, xCoord] = yxCoord
  const {
    [yCoord]: { [xCoord]: thisDegree },
  } = degreeMatrix
  const {
    [yCoord]: { [xCoord]: thisPitch },
  } = pitchMatrix
  const { id: thisDegreeId } = thisDegree || { id: undefined }
  const { id: thisPitchId } = thisPitch || { id: undefined }
  const thisIsActiveId = (() => {
    if (thisDegreeId === undefined) return undefined
    if (activeDegreeIds.includes(thisDegreeId)) return IsActiveIds.Active
    return IsActiveIds.Inactive
  })()
  return {
    thisDegree,
    thisPitch,
    thisDegreeId,
    thisPitchId,
    thisIsActiveId,
  }
}
