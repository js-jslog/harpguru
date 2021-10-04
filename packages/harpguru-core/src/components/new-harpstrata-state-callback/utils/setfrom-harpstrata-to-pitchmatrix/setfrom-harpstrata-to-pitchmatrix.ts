import type { HarpStrata } from 'harpstrata'
import type { HarpFaceMatrix, Pitch } from 'harpparts'

import { doSparceIdedObjectMatricesMatch } from '../../../../packages/do-sparce-ided-object-matrices-match'

export const setFromHarpStrataToPitchMatrix = (
  newHarpStrata: HarpStrata,
  prevPitchMatrix: HarpFaceMatrix<Pitch>,
  setPitchMatrix: (arg0: HarpFaceMatrix<Pitch>) => void
): HarpFaceMatrix<Pitch> => {
  const { pitchMatrix: newPitchMatrix } = newHarpStrata
  if (!doSparceIdedObjectMatricesMatch(prevPitchMatrix, newPitchMatrix))
    setPitchMatrix(newPitchMatrix)
  return newPitchMatrix
}
