import { useGlobal } from 'reactn'
import type { PitchIds, Pitch, Degree, DegreeIds } from 'harpparts'

import type { YXCoord } from '../../../harp-cell'

export type PositionFacts = {
  readonly thisDegree: Degree | undefined
  readonly thisPitch: Pitch | undefined
  readonly thisDegreeId: DegreeIds | undefined
  readonly thisPitchId: PitchIds | undefined
  readonly thisIsActive: boolean
}

export const usePositionAnalysis = (
  yxCoord: YXCoord,
  harpfaceIndex: 0 | 1
): PositionFacts => {
  const [degreeMatrix] = useGlobal('activeDegreeMatrix')
  const [pitchMatrix] = useGlobal('activePitchMatrix')
  const [activeDegreeIds] = useGlobal('activeDegreeIds')
  const [yCoord, xCoord] = yxCoord
  const {
    [harpfaceIndex]: {
      [yCoord]: { [xCoord]: thisDegree },
    },
  } = degreeMatrix
  const {
    [harpfaceIndex]: {
      [yCoord]: { [xCoord]: thisPitch },
    },
  } = pitchMatrix
  const { id: thisDegreeId } = thisDegree || { id: undefined }
  const { id: thisPitchId } = thisPitch || { id: undefined }
  const thisIsActive = (() => {
    if (thisDegreeId === undefined) return false
    if (activeDegreeIds.includes(thisDegreeId)) return true
    return false
  })()
  return {
    thisDegree,
    thisPitch,
    thisDegreeId,
    thisPitchId,
    thisIsActive,
  }
}
