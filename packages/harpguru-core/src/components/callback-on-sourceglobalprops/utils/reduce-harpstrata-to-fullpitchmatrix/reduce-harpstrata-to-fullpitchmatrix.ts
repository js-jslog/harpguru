import type { HarpStrata } from 'harpstrata'
import type { HarpFaceMatrix, Pitch } from 'harpparts'

import { doSparceIdedObjectMatricesMatch } from '../../../../packages/do-sparce-ided-object-matrices-match'

export const reduceHarpStrataToFullPitchMatrix = (
  prevPitchMatrix: HarpFaceMatrix<Pitch>,
  harpStrata: HarpStrata
): HarpFaceMatrix<Pitch> => {
  const { pitchMatrix: nextPitchMatrix } = harpStrata
  if (doSparceIdedObjectMatricesMatch(prevPitchMatrix, nextPitchMatrix))
    return prevPitchMatrix
  return nextPitchMatrix
}
