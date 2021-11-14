import { useGlobal } from 'reactn'
import type { PitchIds, Pitch, Degree, DegreeIds } from 'harpparts'

import type { YXCoord } from '../../../harp-cell'
import { extractHarpFaceMatrix } from '../../../../utils'

export type PositionFacts = {
  readonly thisDegree: Degree | undefined
  readonly thisPitch: Pitch | undefined
  readonly thisDegreeId: DegreeIds | undefined
  readonly thisPitchId: PitchIds | undefined
  readonly thisIsActive: boolean
}

export const usePositionAnalysis = (
  yxCoord: YXCoord,
  harpfaceIndex: 'harpface1' | 'harpface2'
): PositionFacts => {
  const [degreeMatrices] = useGlobal('activeDegreeMatrix')
  const [pitchMatrices] = useGlobal('activePitchMatrix')
  const [activeDegreeIds] = useGlobal('activeDegreeIds')
  const [yCoord, xCoord] = yxCoord
  const degreeMatrix = extractHarpFaceMatrix(degreeMatrices, harpfaceIndex)
  const pitchMatrix = extractHarpFaceMatrix(pitchMatrices, harpfaceIndex)

  const {
    [yCoord]: { [xCoord]: thisDegree },
  } = degreeMatrix
  const {
    [yCoord]: { [xCoord]: thisPitch },
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
