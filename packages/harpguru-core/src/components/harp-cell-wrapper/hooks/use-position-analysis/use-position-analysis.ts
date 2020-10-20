import { useGlobal } from 'reactn'
import type {
  IsActiveIds,
  DegreeIds,
  PitchIds,
  Pitch,
  Degree,
} from 'harpstrata'

import type { YXCoord } from '../../harp-cell-wrapper'

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
    isActiveComplex: { isActiveMatrix },
  } = activeHarpStrata
  const [yCoord, xCoord] = yxCoord
  const {
    [yCoord]: { [xCoord]: thisDegree },
  } = degreeMatrix
  const {
    [yCoord]: { [xCoord]: thisPitch },
  } = pitchMatrix
  const {
    [yCoord]: { [xCoord]: thisIsActiveId },
  } = isActiveMatrix
  const { id: thisDegreeId } = thisDegree || { id: undefined }
  const { id: thisPitchId } = thisPitch || { id: undefined }
  return {
    thisDegree,
    thisPitch,
    thisDegreeId,
    thisPitchId,
    thisIsActiveId,
  }
}
