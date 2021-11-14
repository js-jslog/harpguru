import type { HarpStrata } from 'harpstrata'
import type { HarpFaceMatrices, Pitch } from 'harpparts'

import { isMatchHarpFaceMatrices } from '../../../../utils'
import { doSparceIdedObjectMatricesMatch } from '../../../../packages/do-sparce-ided-object-matrices-match'

export const reduceHarpStrataToFullPitchMatrix = (
  prevPitchMatrix: HarpFaceMatrices<Pitch>,
  harpStrata: HarpStrata
): HarpFaceMatrices<Pitch> => {
  const { pitchMatrix: nextPitchMatrix } = harpStrata
  if (
    isMatchHarpFaceMatrices(
      doSparceIdedObjectMatricesMatch,
      prevPitchMatrix,
      nextPitchMatrix
    )
  )
    return prevPitchMatrix
  return nextPitchMatrix
}
